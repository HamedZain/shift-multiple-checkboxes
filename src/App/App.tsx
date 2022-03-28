import './App.scss'
import { FC, useEffect, useState } from "react"
import { Checkbox } from "../Components/Checkbox/Checkbox"


export const App: FC = () => {

	const [shiftDown, setShiftDown] = useState<boolean>(false)
	const [lastChecked, setLastChecked] = useState<number>(0)

	const [list, setList] = useState([
		{
			checked: false,
			label: 'Trailer'
		},
		{
			checked: false,
			label: 'James Q Quick Origin Story'
		},
		{
			checked: false,
			label: 'Amy Dutton’s Origin Story'
		},
		{
			checked: false,
			label: 'Tech Behind the Podcast'
		},
		{
			checked: false,
			label: 'Tech Behind SelfTeach.me'
		},
		{
			checked: false,
			label: 'Freelancing (Part 1)'
		}
	])

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === 'Shift') {
				setShiftDown(e.type === 'keydown')
			}
		}

		window.addEventListener('keydown', handler)
		window.addEventListener('keyup', handler)

		return () => {
			window.removeEventListener('keydown', handler)
			window.removeEventListener('keyup', handler)
		}

	}, [shiftDown])

	const changeHandler = (idx: number) => {
		const copy = [...list]
		copy[idx].checked = !copy[idx].checked
		setList(copy)
	}

	const clickHandler = (index: number) => {

		if (index === lastChecked) {
			return
		}

		if (!shiftDown) {
			setLastChecked(index)
			return
		}

		// multi select
		const isUp = index < lastChecked

		const copy = [...list]

		const start = isUp ? index : lastChecked
		const end = isUp ? lastChecked : index

		for (let i = start; i <= end; i++) {
			copy[i].checked = true
		}

		setList(copy)

	}


	return (
		<div className={`App${shiftDown ? ' App--shift-down' : ''}`}>
			<div className="App__wrapper">
				<div className="App__cover">
					<img src="img/podcast-cover.jpg" alt="podcast cover image" />
				</div>

				<div className="App__content">
					<h2>LISTEN TO ALL THE COMPRESSED.FM EPISODES</h2>
					<div className="App__content__list">
						{list.map((item, index) => (
							<Checkbox key={`item-${index}`}
							          label={`${index} || ${item.label}`}
							          checked={item.checked}
							          onChange={() => changeHandler(index)}
							          onClick={() => clickHandler(index)} />
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
