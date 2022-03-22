

// NASA API
const count = 10;
const apiKey = 'DEMO_KEY';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = []

// Get 10 img From Nasa Api
async function getNasaPictures() {
  try {
    const response = await fetch(apiUrl)
    resultsArray = await response.json()
    console.log(resultsArray); 
  } catch (error) {
    // Catch Error Here
  }
}

// On Load
getNasaPictures()