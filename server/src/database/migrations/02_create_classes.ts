import Knex from "knex"
export async function up(knex:Knex){
	return knex.schema.createTable("classes", table=>{
		table.increments("id").primary()
		table.string("subject").notNullable()
		table.decimal("price").notNullable()
		table.integer("user_id").unsigned()
		table.foreign("user_id").references("id").inTable("proffys").onDelete("CASCADE").onUpdate("CASCADE")
	})
}
export async function down(knex:Knex){
	return knex.schema.dropTable("classes")
}