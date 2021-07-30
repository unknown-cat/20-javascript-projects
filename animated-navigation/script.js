const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overlay');
const navItems = document.querySelectorAll('[id*="nav-"]')

//Control Navigation Animation
function navAnimation(direction1, direction2) {
	navItems.forEach((item, idx) => {
		item.classList.replace(
			`slide-${ direction1 }-${ idx + 1 }`,
			`slide-${ direction2 }-${ idx + 1 }`)
	});
}

function toggleNav() {
	//Toggle: Menu Bars Open/Close
	menuBars.classList.toggle('change')
	//Toggle: Menu Active
	overlay.classList.toggle('overlay-active');
	if (overlay.classList.contains('overlay-active')) {
		//Animate In - Overlay
		overlay.classList.replace('overlay-slide-left', 'overlay-slide-right')
		//Animate In - Nav Items
		navAnimation('out', 'in')
	} else {
		//Animate Out - Overlay
		overlay.classList.replace('overlay-slide-right', 'overlay-slide-left')
		//Animate Out - Nav Items
		navAnimation('in', 'out')
	}
}

// Event Listeners
menuBars.addEventListener('click', toggleNav)
navItems.forEach(item => item.addEventListener('click', toggleNav));

