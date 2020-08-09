import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import './styles.css'
import PageHeader from '../../components/PageHeader'
import InputBlock from '../../components/InputBlock'
import TextareaBlock from '../../components/TextareaBlock'
import SelectBlock from '../../components/SelectBlock'
import api from '../../servers/api'
import warningIcon from '../../assets/images/icons/warning.svg'

function TeacherForm(){
	const [schedule, setSchedule] = useState([
		{weekday:0, from: '', to: ''},
	])
	const [name, setName] = useState('')
	const [avatar, setAvatar] = useState('')
	const [whatsapp, setWhatsapp] = useState('')
	const [description, setDescription] = useState('')
	const [subject,setSubject] = useState('')
	const [price,setPrice] = useState('')
	const history = useHistory()
	function addNewScheduleItem(){
		setSchedule([
			...schedule,
			{weekday:0, from: '', to: ''}
		])
	}
	function RemoveScheduleItem(){
		console.log(schedule)
		const scheduleItems = schedule
		scheduleItems.pop()
		console.log(scheduleItems)
		setSchedule([...scheduleItems])
	}


	function handleCreateProffy(event:any){
		event.preventDefault()
		if(name.length< 3){
			let input = document.getElementById('name')
			if(input){
				input.focus()
			}
			return false
		}
		api.post('classes',{
			name,
			avatar,
			whatsapp,
			description,
			subject,
			price: price,
			schedule
		}).then((response)=>{
			alert('Cadastro realizado com sucesso!')
			history.push('/')
		}).catch((response)=>{
			alert('Erro no cadastro!')
		})
		
	}

	function setScheduleItemValue(position:number, field:string, value:string){
		const updateScheduleItems = schedule.map((scheduleItem, index)=>{
			if (index === position){
				return {
					...scheduleItem,
					[field]:value
				}
			}
			return scheduleItem
		})
		setSchedule(updateScheduleItems)
	}
	return (
		<div id="page-teacher-form" className="container">
			<PageHeader 
				title="Que incrível que você quer dar aulas."
				description="O primeiro passo é preencher esse formulário de inscrição"
			/>
			<main>
				<form onSubmit={handleCreateProffy}>
					<fieldset>
						<legend>Seus dados</legend>

						<InputBlock id="name"text="Nome completo" value={name} onChange={event => {setName(event.target.value)}} />
						<InputBlock id="avatar" text="Avatar" value={avatar} onChange={event => {setAvatar(event.target.value)}} />
						<InputBlock id="whatsapp" text="Whatsapp" value={whatsapp} onChange={event => {setWhatsapp(event.target.value)}} />
						<TextareaBlock id="description" text="Biografia" value={description} onChange={event => {setDescription(event.target.value)}} />
					</fieldset>

					<fieldset>
						<legend>Sobre a aula</legend>

						<SelectBlock 
							id="subject" 
							text="Matéria"
							value={subject}
							onChange={event=>{setSubject(event.target.value)}}
							options={[
								{value: 'Artes', label: 'Artes'},
								{value: 'Biologia', label: 'Biologia'},
								{value: 'Física', label: 'Física'},
								{value: 'Educação Física', label: 'Educação Física'},
								{value: 'Matemática', label: 'Matemática'},
								{value: 'Português', label: 'Português'},
								{value: 'Química', label: 'Química'},
								{value: 'História', label: 'História'},
								{value: 'Geografia', label: 'Geografia'},
								{value: 'Filosofia', label: 'Filosofia'},
								{value: 'Sociologia', label: 'Sociologia'},
								{value: 'Inglês', label: 'Inglês'},
							]} 
						/>
						<InputBlock id="price" value={price} text="Custo da sua hora por aula" onChange={event => {setPrice(event.target.value)}} />
						
					</fieldset>

					<fieldset>
						<legend>
							Horários disponíveis
							<button type="button" onClick={addNewScheduleItem}>+ Novo Horário</button>
						</legend>

						{schedule.map((scheduleItem, index) =>{
							return (
								<div key={index} className="schedule-item">
									<SelectBlock 
										id="weekday" 
										text="Dia da semana" 
										value={schedule[index].weekday}
										onChange={e => setScheduleItemValue(index, 'weekday', e.target.value)}
										options={[
											{value: '0', label: 'Domingo'},
											{value: '1', label: 'Segunda-feira'},
											{value: '2', label: 'Terça-feira'},
											{value: '3', label: 'Quarta-feira'},
											{value: '4', label: 'Quinta-feira'},
											{value: '5', label: 'Sexta-feira'},
											{value: '6', label: 'Sábado'}
										]}
									/>

									<InputBlock 
										id="from" 
										text="Das" 
										type="time" 
										value={schedule[index].from}
										onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
									/>
									<InputBlock 
										id="to" 
										text="Até" 
										type="time" 
										value={schedule[index].to}
										onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
									/>
								</div>
							)
						})}
						{schedule.length >1 && <button type="button" onClick={RemoveScheduleItem} className="removeButton">Remover</button>}

					</fieldset>

					<footer>
						<p>
							<img src={warningIcon} alt="Aviso importante" />
							Importante <br />
							Preencha todos os dados
						</p>
						<button type="submit">Salvar cadastro</button>
					</footer>
				</form>
			</main>
		</div>
	)
}

export default TeacherForm