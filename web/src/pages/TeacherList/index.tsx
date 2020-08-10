import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import TeacherItem from '../../components/TeacherItem'
import InputBlock from '../../components/InputBlock'
import SelectBlock from '../../components/SelectBlock'
import api from '../../services/api'
import './styles.css'

function TeacherList(){
	const [subject,setSubject] = useState('any')
	const [weekday,setWeekday] = useState('any')
	const [time,setTime] = useState('')
	const [proffys, setProffys] = useState([])
	const [loading, setLoading] = useState(true)
	const [page, setPage] = useState(1)
	const [maxPage, setMaxPage] = useState()

	function getItems(){
		setLoading(true)
		let newTime = time
		if(time === ''){
			newTime = 'any'
		}
		api.get(`classes`,{
			params:{
				subject,
				weekday,
				time: newTime,
				page
			}
		}).then((res)=>{
			setProffys(res.data.data)
			setLoading(false)
			if(res.data.pagination.lastPage !==undefined){
				setMaxPage(res.data.pagination.lastPage)
			}
		}).catch(res=>{
			console.log(res)
		})
	}
	useEffect(()=>{
		getItems()
	},[page])

	useEffect(()=>{
		setPage(1)
		getItems()
	},[subject, weekday, time])

	function handlePageItems(type:string){
		let currentPage = page
		if(type === 'negative'){
			if(currentPage ===1){
				return false
			}
			currentPage--
		}else{
			if(currentPage === maxPage){
				return false
			}
			currentPage++
		}
		setPage(currentPage)
	}

	

	return (
		<div id="page-teacher-list" className="container">
			<PageHeader title="Estes são os proffys disponíveis.">
				<form id="search-teachers">
					<SelectBlock 
						id="subject" 
						text="Matéria"
						value={subject} 
						options={[
							{value: 'any', label: 'Todas'},
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
							{value: 'any', label: 'Qualquer'},
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
			<footer>
				<button 
					type="button" 
					onClick={()=>handlePageItems('negative')}
					disabled={page===1 ? true : false}
					className={page===1 ? 'disabledButton' : ''}
				>
					&lt;- Anterior
				</button>

				<button 
					type="button" 
					onClick={()=>handlePageItems('positive')}
					disabled={page===maxPage ? true : false}
					className={page===maxPage ? 'disabledButton' : ''}

				>
					Próxima-&gt;	
				</button>
			</footer>
		</div>
	)
}

export default TeacherList