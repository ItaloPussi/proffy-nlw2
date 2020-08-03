import React from 'react'
import './styles.css'
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

interface TeacherItemProps{
	name: string,
	image: string,
	subject: string,
	description: string,
	price: string,
	whatsapp?: string,

}
const TeacherItem:React.FC<TeacherItemProps> = (props) =>{
	return (
		<main>
				<article className="teacher-item">
					<header>
						<img src={props.image} />
						<div>
							<strong> {props.name}</strong>
							<span> {props.subject}</span>
						</div>
					</header>
					<p>
						{props.description}
					</p>

					<footer>
						<p>
							Preço/Hora
							<strong>R$ {props.price}</strong>
						</p>
						<button type="button">
							<img src={whatsappIcon} alt="Whatsapp"/>
							Entrar em contato
						</button>
					</footer>
				</article>
			</main>
	)
}

export default TeacherItem