import jwt from 'jsonwebtoken'
import {Response} from 'express'
import {RequestParams} from '../utils/requestDefinitionFile'

async function authMiddleware(request:RequestParams, response:Response, next:Function){
	const authHeader = request.headers.authorization
	if(!authHeader){
		return response.status(400).json({response: 'Nenhum token fornecido'})
	}

	const [scheme, token] = authHeader.split(" ")
	
	try{
		const verifyToken = await jwt.verify(token, 'proffy!e!o!melhor!do!mundo')
		request.user_id = Number(verifyToken)
		return next()
	}catch (e){
		return response.status(400).json({response: 'Token inválido'})
	}
}

export default authMiddleware