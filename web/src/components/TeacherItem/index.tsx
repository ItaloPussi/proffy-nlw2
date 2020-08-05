import React from 'react'
import api from '../../servers/api'
import './styles.css'
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

interface TeacherItemProps{
	teacher:{
		id: number,
		name: string,
		imageURL: string,
		subject: string,
		description: string,
		price: string,
		whatsapp?: string,
	}

}
const TeacherItem:React.FC<TeacherItemProps> = ({teacher}) =>{
	 const handleContact = (user:number) =>{
		api.post('connections',{
			user
		}).then(()=>{
			alert('Sucesso')
		}).catch(()=>{
			alert('erro')
		})

	}
	return (
		<main>
				<article className="teacher-item">
					<header>
						<img src={teacher.imageURL} alt={teacher.name} />
						<div>
							<strong> {teacher.name}</strong>
							<span> {teacher.subject}</span>
						</div>
					</header>
					<p>
						{teacher.description}
					</p>

					<footer>
						<p>
							Preço/Hora
							<strong>R$ {teacher.price}</strong>
						</p>
						<a href={`https://wa.me/${teacher.whatsapp}`} target="_new" onClick={()=>{handleContact(teacher.id)}}>
							<img src={whatsappIcon} alt="Whatsapp"/>
							Entrar em contato
						</a>
					</footer>
				</article>
			</main>
	)
}

export default TeacherItem