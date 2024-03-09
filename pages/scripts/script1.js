const button1 = document.querySelector('.postBtn')
const button2 = document.querySelector('.getBtn')
const body = document.querySelector('body')

const getData = url => {
	return new Promise((resolve, reject) =>
		fetch(url)
			.then(response => response.json())
			.then(json => resolve(json))
			.catch(error => reject(error))
	)
}

const postData = (url, product) => {
	return new Promise((resolve, reject) =>
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(product),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
			.then(response => response.json())
			.then(json => resolve(json))
			.catch(error => reject(error))
	)
}

button1.addEventListener('click', async () => {
	try {
		const name = prompt('Введите имя: ')
		const age = prompt('Введите возраст: ')
		await postData('http://localhost:3000/page1', {
			name: name,
			age: age
		}).then(response => {
			console.log(response, 'данные успешно добавлены')
		})
	} catch (error) {
		console.error(error)
	}
})

button2.addEventListener('click', async () => {
	try {
		const products = await getData('http://localhost:3000/data')
		body.insertAdjacentHTML('beforeend', 
		`
		<div class="container"></div>
		`)
		const container = document.querySelector('.container')
		products.forEach(el => {
			container.insertAdjacentHTML('beforeend',
			`
			<div class="product">
				<p class="pipi">Имя: ${el.name}</p>
				<h2>Возраст: ${el.age}</h2>
			</div>
			`)
		})
		console.log(products)
	} catch (err) {
		console.error(err)
	}
})
