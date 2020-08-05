import Knex from "knex"
export async function up(knex:Knex){
	return knex.schema.createTable("proffys", table=>{
		table.increments("id").primary()
		table.string("name").notNullable()
		table.string("imageURL").notNullable()
		table.string("description").notNullable()
		table.integer("whatsapp").notNullable()
	})
}
export async function down(knex:Knex){
	return knex.schema.dropTable("proffys")
}