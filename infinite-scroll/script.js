const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

//Unsplash API
const count = 10;
const apiKey = 'h-dKN3vNa2XZX7ER0sGRAb24rOBoqfHijCq4YpsGHlE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${ apiKey }&count=${ count }`

//Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
	//Run function for each object in photosArray
	photosArray.forEach(photo => {
		// Create <a> to link Unsplash
		const item = document.createElement('a');
		item.setAttribute('href', photo.links.html);
		item.setAttribute('target', '_blank');
		// Create <img> to display photo
		const img = document.createElement('img');
		img.setAttribute('src', photo.urls.regular);
		img.setAttribute('alt', photo.alt_description);
		img.setAttribute('title', photo.alt_description);
		// Put <img> inside <a>, then put both inside imageContainer Element
		item.appendChild(img)
		imageContainer.appendChild(item)
	});
}

// Get photos from Unsplash API
async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhotos()
	} catch (error) {
		console.log(error)
	}
}

//On Load
getPhotos()