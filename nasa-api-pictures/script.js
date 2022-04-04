const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfermed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');
const btnUp = document.querySelector('.btn-up')
const btnDown = document.querySelector('.btn-down')
const searchInput = document.querySelector('.search-by-name')

// NASA API
const count = 10;
const apiKey = config.NASA_API_KEY;
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

function showContent(page) {
  window.scrollTo({ top: 0, behavior: 'instant', })
  if (page === 'results') {
    favoritesNav.classList.add('hidden')
    resultsNav.classList.remove('hidden')
  } else {
    favoritesNav.classList.remove('hidden')
    resultsNav.classList.add('hidden')
  }
  loader.classList.add('hidden');
}

function createDOMNodes(page, ascDesc = null, str) {
  let currentArray = page === 'results' ? resultsArray : Object.values(favorites);

  if (ascDesc === 'asc') {
    currentArray.sort((a, b) => b.date.localeCompare(a.date))
  }
  if (ascDesc === 'desc') {
    currentArray.sort((a, b) => a.date.localeCompare(b.date))
  }
  if (str) {
    currentArray = currentArray.filter(item => {
      if (item.copyright) {
        return item.copyright.toLowerCase().includes(str)
      }
    })
  }

  currentArray.forEach((result) => {
    // Card Container
    const card = document.createElement('div');
    card.classList.add('card')
    // Link
    const link = document.createElement('a');
    link.href = result.hdurl;
    link.title = 'View Full Image';
    link.target = '_blank';
    // Image
    const image = document.createElement('img');
    image.src = result.url;
    image.alt = 'NASA Picture Of The Day';
    image.loading = 'lazy';
    image.classList.add('card-img-top');
    // Card Body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    // Card Title
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = result.title;
    // Save Text
    const saveText = document.createElement('p');
    saveText.classList.add('clickable');
    if (page === 'results') {
      saveText.textContent = 'Add To Favorites';
      saveText.setAttribute('onclick', `saveFavorites('${result.url}')`)
    } else {
      saveText.textContent = 'Remove Favorite';
      saveText.setAttribute('onclick', `removeFavorites('${result.url}')`)
    }
    // Card Text
    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = result.explanation;
    // Footer Container
    const footer = document.createElement('small');
    footer.classList.add('text-muted');
    // Date
    const date = document.createElement('strong');
    date.textContent = result.date;
    // Copyright
    const copyright = document.createElement('span');
    copyright.textContent = result.copyright ? ` ${result.copyright}` : '';
    // Append
    footer.append(date, copyright);
    cardBody.append(cardTitle, saveText, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.append(card)
  });
}

function updateDOM(page, ascDesc, str) {
  // Get Favorites From LocalStorage
  if (localStorage.getItem('nasaFavorites')) {
    favorites = JSON.parse(localStorage.getItem('nasaFavorites'));
  }
  imagesContainer.textContent = '';
  createDOMNodes(page, ascDesc, str);
  showContent(page);
}

// Get 10 img From Nasa Api
async function getNasaPictures() {
  // Show Loader
  loader.classList.remove('hidden');
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    console.log(resultsArray);
    updateDOM('results');
  } catch (error) {
    // Catch Error Here
  }
}

// Add result To Favorite
function saveFavorites(itemUrl) {
  // Loop through Results Array to select Favorite
  resultsArray.forEach((item) => {
    if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
      favorites[itemUrl] = item;
      saveConfermed.hidden = false; // Show That Item Was Added
      setTimeout(() => {
        saveConfermed.hidden = true;
      }, 2000);
      // Set Favorites To LocalStorage
      localStorage.setItem('nasaFavorites', JSON.stringify(favorites))
    }
  })
}

// Remove Item from Favorite
function removeFavorites(itemUrl) {
  if (favorites[itemUrl]) {
    delete favorites[itemUrl];
    // Set Favorites in LocalStorage
    localStorage.setItem('nasaFavorites', JSON.stringify(favorites))
    updateDOM('favorites');
  };
}

// Sort Items
btnUp.addEventListener('click', () => {
  if (!resultsNav.classList.contains('hidden')) {
    updateDOM('results', 'asc')
  } else {
    updateDOM('favorites', 'asc')
  }
})
btnDown.addEventListener('click', () => {
  if (!resultsNav.classList.contains('hidden')) {
    updateDOM('results', 'desc')
  } else {
    updateDOM('favorites', 'desc')
  }
})

// Search Items 
searchInput.addEventListener('input', (e) => {
  const str = e.target.value.toLowerCase()
  if (!resultsNav.classList.contains('hidden')) {
    return updateDOM('results', null, str)
  } else {
    return updateDOM('favorites', null, str)
  }
})

// On Load

// getNasaPictures();