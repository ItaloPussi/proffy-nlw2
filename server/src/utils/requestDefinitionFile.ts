import {Request} from 'express'
export interface RequestParams extends Request{
	user_id?: number,
}