import { menuArray } from '/data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

let cardsContainer = document.querySelector('.cards-container')
let totalElement = document.getElementById('total')
let orderTotalContainer = document.querySelector('.order-container')
let orderTotalMenu = document.querySelector('.order-total-menu')
let orderCompleteBtn = document.querySelector('.btn')
let modal = document.querySelector('.modal')
let payBtn = document.querySelector('.pay-btn')
let name = document.getElementById('name')
let goodbyeMessage = document.querySelector('.order-complete')
let banner = document.getElementById('banner')

// listen for click on order complete button
orderCompleteBtn.addEventListener('click', function () {
	// display the payment modal
	modal.style.display = 'block'
})

// listen for click on pay btn
payBtn.addEventListener('click', function (e) {
	// get customer's name
	let customer = name.value
	// close the modal
	modal.style.display = 'none'
	// close the order summary
	orderTotalMenu.style.display = 'none'
	// change the message inside
	banner.textContent = `Thank you, ${customer} Your order is on the way!`
	// show the goodbye message
	goodbyeMessage.style.display = 'inline-block'
	e.preventDefault()
})

let htmlString = ''
let total = 0
let orderArray = []

// listen for clicks anywhere on the page
document.addEventListener('click', function (e) {
	// listen for click on add button
	if (e.target.dataset.id) {
		getHTMLString(e.target.dataset.id)
	}
	if (e.target.dataset.uuid) {
		document.getElementById(`${e.target.dataset.uuid}`).style.display = 'none'
		total -= e.target.dataset.price
		renderTotal()
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
}

function getHTMLString(id) {
	// display hidden order total menu items
	displayElements()

	// get the object using the dataset id
	const orderObject = menuArray.filter(function (item) {
		return item.id == id
	})[0]

	// add uuid to the object
	orderObject.uuid = uuidv4()

	// add items to an array
	orderArray.push(orderObject)

	// loop through the array and create HTML for each item
	orderArray.forEach(function (item, index) {
		total += orderObject.price
		htmlString += `
    
    <div class="order-text" id="${orderObject.uuid}">
       <div>
        <p class="title">${orderObject.name}</p>
        <p class="remove" data-price=${orderObject.price} data-uuid=${orderObject.uuid}>remove</p>
      </div>
      <p class="price">$${orderObject.price}</p>
    </div>
      
    `
	})
	renderTotal()
	renderTotalMenu()
}

function displayElements() {
	// display title
	document.getElementById('order-title').style.display = 'block'

	// display summary
	document.getElementById('summary').style.display = 'block'

	//display button
}

function renderTotal() {
	// render total
	totalElement.innerHTML = total
}

function renderTotalMenu() {
	// render the  menu
	orderTotalContainer.innerHTML = htmlString
	// clear the array out after rendering
	orderArray = []
}

renderMainMenu()
