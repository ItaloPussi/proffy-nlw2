import React, {useState, FormEvent} from 'react'
import {useHistory} from 'react-router-dom'
import './styles.css'
import successBackground  from '../../assets/images/success-background.svg'
import api from '../../services/api'
import eyeIcon from '../../assets/images/icons/eye.svg'
import hideIcon from '../../assets/images/icons/hide.svg'
import {Link} from 'react-router-dom'

function Register(){
	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [againPassword, setAgainPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const history = useHistory()
	async function handleSubmit(event:FormEvent){
		event.preventDefault()
		if(password !== againPassword){
			alert('As senhas não coincidem!')
			return false
		}
		const response = await api.post('register', {
			name,
			email,
			password
		})
		if(response){
			history.push('/login')
		}
	}

	return (
		<div className="register-page">
			<div className="register-container">
				<form className="register-form" onSubmit={handleSubmit}>	
					<h1>Registre-se</h1>

					<div className="inputGroup">
						<label htmlFor="name" className={name != '' ? 'labelColor' : ''}>Nome completo</label>
						<input type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)}placeholder="Nome completo"/>
					</div>

					<div className="inputGroup">
						<label htmlFor="email" className={email != '' ? 'labelColor' : ''}>E-mail</label>
						<input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}placeholder="E-mail"/>
					</div>

					<div className="inputGroup">
						<label htmlFor="password" className={password != '' ? 'labelColor' : ''}>Senha</label>
						<input type={showPassword? 'text' : 'password'} className="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Senha"/>
						<button type="button" className="visiblePassword" onClick={()=>setShowPassword(!showPassword)}>
							<img src={showPassword ? hideIcon : eyeIcon} />
						</button>
					</div>

					<div className="inputGroup">
						<label htmlFor="againPassword" className={againPassword != '' ? 'labelColor' : ''}>Repita a senha</label>
						<input type={showPassword? 'text' : 'password'} className="password" id="againPassword" value={againPassword} onChange={(e)=>setAgainPassword(e.target.value)} placeholder="Repita a senha"/>
						<button type="button" className="visiblePassword" onClick={()=>setShowPassword(!showPassword)}>
							<img src={showPassword ? hideIcon : eyeIcon} />
						</button>
					</div>

					<button type="submit" disabled={(name&&email&&password&&againPassword)!='' ? false :true} className={(name&&email&&password&&againPassword)!='' ? 'buttonReady' : ''}>Entrar</button>
				
					<div className="registerBlock">
						<span>Já tem conta?</span>
						<Link to="login" className="registerButton">Login</Link>
						
					</div>
				</form>
			</div>
			<div className="register-background"> 
				 <img src={successBackground} className='backgroundImage' />
			</div>
		</div>
	)
}
export default Register