//Unsplash API
const count = 10;
const apiKey = 'h-dKN3vNa2XZX7ER0sGRAb24rOBoqfHijCq4YpsGHlE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${ apiKey }&count=${ count }`

// Get photos from Unsplash API
async function getPhotos() {
	try	{
		const response = await fetch(apiUrl)
		const data = await response.json()
		console.log(data)
	} catch (error) {
		console.log(error)
	}
}

//On Load
getPhotos()