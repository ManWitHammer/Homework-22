import postData from "./modules/postData.mjs"
import randomU from "./modules/randomUsers.mjs"

const button1 = document.querySelector('.postBtn1')
const button2 = document.querySelector('.postBtn2')
const formed = document.querySelector('.formed')
const wellDone = document.querySelector('.wellDone')

const notindependent = async(e) => {
	formed.innerHTML = ''
	wellDone.innerHTML = ''
	button2.addEventListener('click', independent)
	button1.removeEventListener('click', notindependent)
	let newUser = randomU()
	formed.insertAdjacentHTML('beforeend',
	`
	<p class="ThisT">Нравится ли вам имя: ${newUser.name}, возраст: ${newUser.age} и его cтрана:
	${newUser.country}?</p>
	<div class="buttons">
		<button class="yes">Да</button>
		<button class="not">Нет</button>
	</div>
	`)
	const yes = document.querySelector('.yes')
	const not = document.querySelector('.not')
	not.addEventListener('click', () => {
		newUser = randomU()
		document.querySelector('.ThisT').innerText = `Нравится ли вам имя: ${newUser.name}, возраст: ${newUser.age} и его cтрана: ${newUser.country}?`
	})
	yes.addEventListener('click', async(e) => {
		await postData('http://localhost:3000/data', newUser)
		formed.insertAdjacentHTML('beforeend',
		`
		<div class="infoblock">
			<p class="PText">был добавлен пользователь! Имя: ${newUser.name}, возраст: ${newUser.age}, страна: ${newUser.country}</p>
		</div>
		`)
	})
}

const independent = async(e) => {
	
	e.preventDefault()
	formed.innerHTML = ''
	wellDone.innerHTML = ''
	button2.removeEventListener('click', independent)
	button1.addEventListener('click', notindependent)
	formed.insertAdjacentHTML('beforeend',
	`
	<form>
		<input type="text" name="name" placeholder="Введите имя">
		<input type="number" name="age" placeholder="Введите Возраст" /></br>
		<input type="text" name="country" placeholder="Введите страну">
		<button class="createBtn">Создать</button>
	</form>
	`)
	const form = document.querySelector('form')
	document.querySelector('.createBtn').addEventListener('click', async(e) => {
		e.preventDefault()
		const data = new FormData(form)
		const user = {
			name: data.get('name'),
			age: data.get('age'),
			country: data.get('country'),
			id: data.get('name').trim()
		}
		form.reset()
		const res = await postData('http://localhost:3000/data', user)
		wellDone.insertAdjacentHTML('beforeend',
		`
		<div class="infoblock">
			<p class="PText">был добавлен пользователь! Имя: ${res.name}, возраст: ${res.age}, страна: ${res.country}</p>
		</div>
		`)
	})
}

button2.addEventListener('click', independent)
button1.addEventListener('click', notindependent)