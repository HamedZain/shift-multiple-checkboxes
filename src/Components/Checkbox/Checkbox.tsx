import { ChangeEvent, FC, MouseEvent } from "react"

import './Checkbox.scss'

import { ReactComponent as CheckIcon } from '../../assets/svg/check.svg'

interface CheckboxProps {
	label: string
	checked: boolean
	onClick?: (e: MouseEvent<HTMLLabelElement>) => void
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox: FC<CheckboxProps> = ({ label, onClick, ...props }) => {
	return (
		<label className="Checkbox" onClick={onClick}>
			<input {...props} className="Checkbox__input" type="checkbox" />

			<span className="Checkbox__box">
					<CheckIcon />
				</span>

			<span className="Checkbox__label">{label}</span>
		</label>
	)
}
