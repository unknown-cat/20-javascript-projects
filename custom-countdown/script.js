const inputContainer = document.getElementById('input-container')
const countdownForm = document.getElementById('countdownForm')
const dateEl = document.getElementById('date-picker')

const countDownEl = document.getElementById('countdown')
const countdownElTitle = document.getElementById('countdown-title')
const countdownButton = document.getElementById('countdown-button')
const timeElements = document.querySelectorAll('span')

const completeEl = document.getElementById('complete')
const completeElInfo = document.getElementById('complete-info')
const completeButton = document.getElementById('complete-button')

let countdownTitle = ''
let countodwnDate = ''
let countdownValue = Date
let countdownActive

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

// Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0]
dateEl.setAttribute('min', today)

// Populate Countdown / Complete UI
function updateDOM() {
	countdownActive = setInterval(() => {
		const now = new Date().getTime()
		const distance = countdownValue - now
		console.log(distance)

		const days = Math.floor(distance / day)
		const hours = Math.floor((distance % day) / hour)
		const minutes = Math.floor((distance % hour) / minute)
		const seconds = Math.floor((distance % minute) / second)
		console.log(days, hours, minutes, seconds)

		// Hide Input
		inputContainer.hidden = true

		//If countdown has ended. show complete
		if (distance < 0) {
			countDownEl.hidden = true
			clearInterval(countdownActive)
			completeElInfo.textContent = `${ countdownTitle } finished on ${ countodwnDate }`
			completeEl.hidden = false
		} else {
			// Else, show countdown in progress
			countdownElTitle.textContent = `${ countdownTitle }`
			timeElements[0].textContent = `${ days }`
			timeElements[1].textContent = `${ hours }`
			timeElements[2].textContent = `${ minutes }`
			timeElements[3].textContent = `${ seconds }`
			completeEl.hidden = true
			countDownEl.hidden = false
		}

	}, second)
}

// Take Values from Form Input
function updateCountdown(e) {
	e.preventDefault()
	countdownTitle = e.srcElement[0].value
	countodwnDate = e.srcElement[1].value
	// Check for valid date
	if (countodwnDate === '') {
		alert('Please select a date for the countdown.')
	} else {
		// Get number version of current Date, updateDOM
		countdownValue = new Date(countodwnDate).getTime()
		updateDOM()
	}
}

// Reset All Values
function reset() {
	// Hide Countdowns, show input
	countDownEl.hidden = true
	completeEl.hidden = true
	inputContainer.hidden = false
	// Stop the countdown
	clearInterval(countdownActive)
	// Reset Values
	countdownTitle = ''
	countodwnDate = ''
	console.log('here' , countdownTitle, countodwnDate)
}

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown)
countdownButton.addEventListener('click', reset)
completeButton.addEventListener('click', reset)