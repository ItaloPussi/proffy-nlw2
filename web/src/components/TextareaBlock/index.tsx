import React, {TextareaHTMLAttributes} from 'react'
import './styles.css'

interface TextareaBlockProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	id: string,
	text: string,
}
const TextareaBlock:React.FC<TextareaBlockProps> = ({id, text, ...rest}) =>{
	return (
		<div className="textarea-block">
			<label htmlFor={id}>{text}</label>
			<textarea id={id} required={true} {...rest}/>
		</div>
	)
}

export default TextareaBlock