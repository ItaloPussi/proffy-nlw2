import db from '../database/connection'
import {Request, Response} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
class AuthController{
	async register(request:Request, response:Response){
		try{
			const {name, email, password} = request.body

			const cryptPass = await bcrypt.hash(password, 8)

			await db('proffys').insert({name, email, password:cryptPass})
			return response.status(200).json({response: 'Ok'})
		}catch (err){
			console.log(err)
			return response.status(400).json({response: 'Erro, tente novamente mais tarde'})
		}
	}

	async login(request:Request, response:Response){
		try{
			const {email, password} = request.body
			console.log(email, password)
			const user = await db('proffys').select('*').where('proffys.email', '=', email)

			if(user.length === 0){
				return response.status(400).json({response: 'Não existe conta para o email digitado'})
			}

			const verifyCredentials = await bcrypt.compare(password, user[0].password)
			if(verifyCredentials){
				const token = await jwt.sign(user[0].id, 'proffy!e!o!melhor!do!mundo', {})
				return response.status(200).json({auth: true, token})
			}else{
				return response.status(400).json({response: 'Senha Incorreta'})
			}
		}catch(err){
			console.log(err)
			return response.status(400).json({response: 'Erro, tente novamente mais tarde'})
		}
		// 
	}	
}

export default AuthController