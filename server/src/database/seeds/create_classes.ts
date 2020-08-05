import Knex from 'knex'

export async function seed(knex:Knex){
	await knex.raw('PRAGMA foreign_keys = ON;')
	await knex('proffys').insert([
		{name:'Italo Pussi', imageURL: 'fake', description: 'Oi eu sou o goku', whatsapp: 11989906009, },
		{name:'Ana Maria', imageURL: 'fake', description: 'Oi eu sou a Ana', whatsapp: 11953856133, },
		{name:'Claudineis Pussi', imageURL: 'fake', description: 'Oi eu sou um crente', whatsapp: 1139449174, },
		{name:'Joaquim', imageURL: 'fake', description: 'Oi, psiu!', whatsapp: 11954875984, },
	])
	await knex('classes').insert([
		{subject:'Portugues', price: 90.00, user_id: 4}
	])
	await knex('connections').insert([
		{user_id:1},
		{user_id:3},
		{user_id:2},
		{user_id:1},
		{user_id:1},
		{user_id:4},
	])
	await knex('proffys').delete('*').where('id', 1)
} 