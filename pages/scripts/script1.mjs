import getData from "./modules/getData.mjs"
import patchData from "./modules/putData.mjs"

const block = document.querySelector('.container')

document.addEventListener('DOMContentLoaded', async(e) => {
    e.preventDefault()
    const products = await getData('http://localhost:3000/data')
    products.forEach(el => {
        block.insertAdjacentHTML('beforeend',
        `
        <div id="${el.id}" class="product">
            <p class="pipi1">Имя: ${el.name}</p>
            <p class="pipi2">Возраст: ${el.age}</p>
            <p class="pipi3">Cтрана: ${el.country}</p>
        </div>
        `)
    })
    const product = document.querySelectorAll('.product')
    product.forEach(el => {
        el.addEventListener('dblclick', async(e) => {
            const name = el.id
            const newName = prompt('Введите новое имя', el.querySelector('.pipi1').innerText.slice(5))
            const newAge = +prompt('Введите новый возраст', el.querySelector('.pipi2').innerText.slice(9))
            const newCountry = prompt('Введите новую страну', el.querySelector('.pipi3').innerText.slice(8))
            const newProduct = {
                name: newName,
                age: newAge,
                country: newCountry,
                id: name
            }
            await patchData('http://localhost:3000/data', name, newProduct)
        })
    })
})
