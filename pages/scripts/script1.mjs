import getData from "./modules/getData.mjs"

const block = document.querySelector('.container')

document.addEventListener('DOMContentLoaded', async(e) => {
    e.preventDefault()
    const products = await getData('http://localhost:3000/data')
    products.forEach(el => {
        block.insertAdjacentHTML('beforeend',
        `
        <div class="product">
            <p class="pipi">Имя: ${el.name}</p>
            <p class="pipi">Возраст: ${el.age}</p>
            <p class=""pipi>Cтрана: ${el.country}</p>
        </div>
        `)
    })
})
