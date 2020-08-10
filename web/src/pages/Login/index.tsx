import React, {useState, FormEvent} from 'react'
import {useHistory} from 'react-router-dom'
import './styles.css'
import successBackground  from '../../assets/images/success-background.svg'
import api from '../../services/api'
import {login} from '../../services/auth'


function Login(){
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const history = useHistory()
	async function handleSubmit(event:FormEvent){
		event.preventDefault()
		const response = await api.post('login', {
			email,
			password
		})
		if(response.data.auth){
			login(response.data.token)
			history.push('/')
		}
	}
	return (
		<div className="login-page">
			<div className="login-background"> 
				 <img src={successBackground} className='backgroundImage' />
			</div>
			<div className="login-container">
				<form className="login-form" onSubmit={handleSubmit}>	
					<h1>Fazer login</h1>
					<div className="inputGroup">
						<label htmlFor="email" className={email != '' ? 'labelColor' : ''}>E-mail</label>
						<input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}placeholder="E-mail"/>
					</div>

					<div className="inputGroup">
						<label htmlFor="password" className={password != '' ? 'labelColor' : ''}>Senha</label>
						<input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Senha"/>
					</div>

					<button type="submit">Enviar</button>
				</form>
			</div>
		</div>
	)
}

export default Login