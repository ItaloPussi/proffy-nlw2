import React, {SelectHTMLAttributes} from 'react'
import './styles.css'

interface SelectBlockProps extends SelectHTMLAttributes<HTMLSelectElement> {
	id: string,
	text: string,
	options: Array<{
		value: string,
		label:string
	}>
}
const SelectBlock:React.FC<SelectBlockProps> = ({id, text, options, ...rest}) =>{
	return (
		<div className="select-block">
			<label htmlFor={id}>{text}</label>
			<select id={id} {...rest} >
				<option value="" disabled hidden> Selecione uma opção </option>
				{options.map(option =>{
					return <option key={option.value} value={option.value}>{option.label}</option>
				})}
			</select>
		</div>
	)
}

export default SelectBlock