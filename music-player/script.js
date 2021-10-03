const music = document.querySelector('audio')
const playBtn = document.getElementById('play')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')

// Check if Playing
let isPlaying = false

//Play
const playSong = () => {
	isPlaying = true
	playBtn.classList.replace('fa-play', 'fa-pause')
	playBtn.setAttribute('title', 'Play')
	music.play()
}
//Pause
const pauseSong = () => {
	isPlaying = false
	playBtn.classList.replace('fa-pause', 'fa-play')
	playBtn.setAttribute('title', 'Pause')
	music.pause()
}
//Next
const nextSong = () => {
}
//Prev
const prevSong = () => {
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => isPlaying ? pauseSong() : playSong())