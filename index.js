import { menuArray } from '/data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

let cardsContainer = document.querySelector('.cards-container')
let totalElement = document.getElementById('total')
let orderTotalContainer = document.querySelector('.order-container')
let htmlString = ''
let total = 0
let orderArray = []

// listen for clicks anywhere on the page
document.addEventListener('click', function (e) {
	// listen for click on add button
	if (e.target.dataset.id) {
		let string = getHTMLString(e.target.dataset.id)
		renderTotalMenu(string)
	}
	if (e.target.dataset.index) {
		console.log(e.target.dataset.index)
	}
})

function renderMainMenu() {
	let htmlString = ''
	// create html for object data in menuArray
	menuArray.forEach(function (item, index) {
		htmlString += `<div class="card">
    <img class="emoji" src="/images/${item.name}.png" />
    <div class="card-text">
    <p class="title">${item.name}</p>
    <p class="ingredients">${item.ingredients}</p>
    <p class="price">$${item.price}</p>
    </div>
    <i class="fa-solid fa-plus" data-id=${item.id}></i>
    </div>
    `
	})
	// display the main menu with the object data
	cardsContainer.innerHTML = htmlString
	// add event listener to add button
}

function getHTMLString(id) {
	// display hidden order total menu items
	displayElements()

	// get the object using the dataset id
	const orderObject = menuArray.filter(function (item) {
		return item.id == id
	})[0]

	// add items to an array
	orderArray.push(orderObject)

	// loop through the array and create HTML for each item
	orderArray.forEach(function (item, index) {
		total += orderObject.price
		htmlString += `
    
    <div class="order-text">
       <div>
        <p class="title">${orderObject.name}</p>
        <p class="remove" data-index=${index}>remove</p>
      </div>
      <p class="price">$${orderObject.price}</p>
    </div>
      
    `
	})

	return htmlString
}

function displayElements() {
	// display title
	document.getElementById('order-title').style.display = 'block'

	// display summary
	document.getElementById('summary').style.display = 'block'
}

function renderTotalMenu(string) {
	// render total
	totalElement.innerHTML = total
	// render the total menu
	orderTotalContainer.innerHTML = htmlString
	// clear the array out after rendering
	orderArray = []
}

renderMainMenu()
