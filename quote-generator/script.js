const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

// Hide Loading Spinner
function removeLoadingSpinner() {
	quoteContainer.hidden = false;
	loader.hidden = true;
}

function showNewQuote() {
	showLoadingSpinner();

	const randomQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
	if (!randomQuote.author) {
		authorText.textContent = 'Unknown Author'
	} else {
		authorText.textContent = randomQuote.author
	}

	//Check Quote length to determine styling
	if (randomQuote.text.length > 120) {
		quoteText.classList.add('long-quote');
	} else {
		quoteText.classList.remove('long-quote');
	}

	//Set Quote, Remove Loading Spinner
	quoteText.textContent = randomQuote.text;
	removeLoadingSpinner();
}

async function getQuotesFromApi() {
	showLoadingSpinner();
	const apiUrl = 'https://type.fit/api/quotes';
	try {
		const response = await fetch(apiUrl);
		apiQuotes = await response.json();
		showNewQuote();
	} catch (error) {
		console.log(error)
	}
}

function tweetQuote() {
	const tweeterUrl = `https://twitter.com/intent/tweet?text=${ quoteText.textContent } - ${ authorText.textContent }`;
	window.open(tweeterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', showNewQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On Load;
getQuotesFromApi();
