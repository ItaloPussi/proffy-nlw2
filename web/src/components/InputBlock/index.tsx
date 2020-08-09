import React, {InputHTMLAttributes} from 'react'
import './styles.css'

interface InputBlockProps extends InputHTMLAttributes<HTMLInputElement> {
	id: string,
	text: string,
	type?: string
}
const InputBlock:React.FC<InputBlockProps> = ({id, text, ...rest}) =>{
	return (
		<div className="input-block">
			<label htmlFor={id}>{text}</label>
			<input type='text' required={true} id={id} {...rest} />
		</div>
	)
}

export default InputBlock