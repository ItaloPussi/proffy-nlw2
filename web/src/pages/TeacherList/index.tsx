import React from 'react'
import {Link} from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import TeacherItem from '../../components/TeacherItem'
import './styles.css'

function TeacherList(){
	return (
		<div id="page-teacher-list" className="container">
			<PageHeader title="Estes são os proffys disponíveis.">
				<form id="search-teachers">
					<div className="input-block">
						<label htmlFor="subject">Matéria</label>
						<input type="text" id="subject" />
					</div>
					
					<div className="input-block">
						<label htmlFor="weekday">Dia da semana</label>
						<input type="text" id="weekday" />
					</div>

					<div className="input-block">
						<label htmlFor="time">Hora</label>
						<input type="text" id="time" />
					</div>
				</form>
			</PageHeader>
			<TeacherItem 
				name="Italo Pussi" 
				image="https://avatars3.githubusercontent.com/u/40703778?s=460&u=f0289648d31cdc2ed124aa413d015b9631c06d2c&v=4"
				subject="Matemática" 
				description="Ama invenções mirabolantes e levemente perigosas. Apaixonado por automações, esse professor é fera na matemática levando seus alunos a loucura" 
				price="80.00"
				whatsapp="5511989906009" 
			/>
			
		</div>
	)
}

export default TeacherList