import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import TeacherItem from '../../components/TeacherItem'
import InputBlock from '../../components/InputBlock'
import SelectBlock from '../../components/SelectBlock'
import api from '../../servers/api'
import './styles.css'

function TeacherList(){
	const [subject,setSubject] = useState('')
	const [weekday,setWeekday] = useState('')
	const [time,setTime] = useState('')
	const [proffys, setProffys] = useState([])
	const [loading, setLoading] = useState(true)
	useEffect(()=>{
		setLoading(true)
		api.get(`classes`,{
			params:{
				subject,
				weekday,
				time
			}
		}).then((res)=>{
			setProffys(res.data)
			console.log(proffys)
			setLoading(false)
		}).catch(res=>{
			console.log(res)
		})
	},[subject, weekday, time])
	return (
		<div id="page-teacher-list" className="container">
			<PageHeader title="Estes são os proffys disponíveis.">
				<form id="search-teachers">
					<SelectBlock 
						id="subject" 
						text="Matéria"
						value={subject} 
						options={[
							{value: 'Artes', label: 'Artes'},
							{value: 'Biologia', label: 'Biologia'},
							{value: 'Física', label: 'Física'},
							{value: 'Educação Física', label: 'Educação Física'},
							{value: 'Matemática', label: 'Matemática'},
							{value: 'Português', label: 'Português'},
							{value: 'Química', label: 'Química'},
							{value: 'Historia', label: 'História'},
							{value: 'Geografia', label: 'Geografia'},
							{value: 'Filosofia', label: 'Filosofia'},
							{value: 'Sociologia', label: 'Sociologia'},
							{value: 'Inglês', label: 'Inglês'}
						]}
						onChange={event => {setSubject(event.target.value)}}
					/>
					<SelectBlock 
						id="weekday" 
						text="Dia da semana"
						value={weekday} 
						options={[
							{value: '0', label: 'Domingo'},
							{value: '1', label: 'Segunda-feira'},
							{value: '2', label: 'Terça-feira'},
							{value: '3', label: 'Quarta-feira'},
							{value: '4', label: 'Quinta-feira'},
							{value: '5', label: 'Sexta-feira'},
							{value: '6', label: 'Sábado'}
						]}
						onChange={event => {setWeekday(event.target.value)}}

					/>
					<InputBlock id="time" text="Hora" type="time" value={time} 	onChange={event => {setTime(event.target.value)}}/>
				</form>
			</PageHeader>
			{!loading && proffys.map((proffy:any)=>{
				return (
					<TeacherItem 
						key={proffy.id}
						teacher={proffy}
					/>
				)
			})}
		</div>
	)
}

export default TeacherList