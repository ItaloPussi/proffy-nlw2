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
		const filters = request.query
		if(!filters.weekday || !filters.subject || !filters.time){
			return response.status(400).json({error: "Missing Filters"})
		}
		const timeInMinutes = HourToMinutes(filters.time as string)
		const classes = await db('classes')
		.whereExists(function (){
			this.select('class_schedule.*')
				.from('class_schedule')
				.whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
				.whereRaw('`class_schedule`.`weekday` = ??', [(Number(filters.weekday))])
				.whereRaw('`class_schedule`.`from`<= ??',[timeInMinutes])
				.whereRaw('`class_schedule`.`to`> ??',[timeInMinutes])
		})
		.where('classes.subject', '=', filters.subject)
		.join('proffys', 'classes.user_id', '=', 'proffys.id')
		.select(['classes.*', 'proffys.*'])
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