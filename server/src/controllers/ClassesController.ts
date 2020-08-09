import db from '../database/connection'
import {Request, Response} from 'express'
import HourToMinutes from '../utils/convertHourToMinutes'

interface ScheduleItem{
	weekday:number,
	from: string,
	to: string
}
class ClassesController{
	async index(request:Request,response: Response){
		let page = 1
		const filters = request.query
		if(!filters.weekday || !filters.subject || !filters.time){
			return response.status(400).json({error: "Missing Filters"})
		}
		if(Number(filters.page)){
			page = Number(filters.page)
		}
		const weekdayModify = function(queryBuilder:any){
			if(filters.weekday != "any"){
				return queryBuilder.whereRaw('`class_schedule`.`weekday` = ??', [(Number(filters.weekday))])
			}
			return queryBuilder
		}

		const timeModify = function(queryBuilder:any){
			if(filters.time != "any"){
				const timeInMinutes = HourToMinutes(filters.time as string)
				return queryBuilder.whereRaw('`class_schedule`.`from`<= ??',[timeInMinutes]).whereRaw('`class_schedule`.`to`> ??',[timeInMinutes])
			}
			return queryBuilder
		}

		const subjectModify = function(queryBuilder:any){
			if(filters.subject != "any"){
				return queryBuilder.where('classes.subject', '=', filters.subject)
			}
			return queryBuilder
		}
		const classes = await db('classes')
		.whereExists(function (){
			this.select('class_schedule.*')
				.from('class_schedule')
				.whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
				.modify(weekdayModify)
				.modify(timeModify)	
		})
		.modify(subjectModify)
		.join('proffys', 'classes.user_id', '=', 'proffys.id')
		.select(['classes.*', 'proffys.*'])
		.paginate({ perPage: 10, currentPage: page })
		return response.json(classes)
	}
	async create(request:Request,response: Response){
		await db.raw('PRAGMA foreign_keys = ON;')
		const trx = await db.transaction()

		try{
			const {name, avatar, whatsapp, description, subject, price, schedule} = request.body;


			const user_id = await trx('proffys').insert([{name, imageURL: avatar, whatsapp, description}])
			const class_id = await trx('classes').insert([{subject,price,user_id}])

			const classSchedule = schedule.map((scheduleItem:ScheduleItem)=>{
				return {
					weekday: scheduleItem.weekday,
					from:HourToMinutes(scheduleItem.from),
					to:HourToMinutes(scheduleItem.to),
					class_id
				}
			})
			const schedule_id = await trx('class_schedule').insert(classSchedule)
			await trx.commit()
			return response.status(200).send('OK')

		}
		catch (e){
			trx.rollback()
			console.log(e)
			return response.status(400).send('Error')
		}
	}
}

export default ClassesController;