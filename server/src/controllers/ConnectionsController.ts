import db from '../database/connection'
import {Request, Response} from 'express'

class ConnectionsController{
	async index(request:Request,response: Response){
		const connections = await db('connections').count('id as registers')
		return response.json({connections:connections[0].registers})
	}
	async create(request:Request,response: Response){
		try{

			const {user} = request.body
			if(isNaN(user)){
				throw 'Error';
				  
			}
			await db.raw('PRAGMA foreign_keys = ON;')
			console.log(Number(user))
			const res = await db('connections').insert([{user_id: Number(user)}])
			return response.send('OK')
		}
		catch{
			return response.status(400).send('O ID do usuário informado está incorreto ou não existe!')
		}
	}
}

export default ConnectionsController;