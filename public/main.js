const currentUrl = (new URL(window.location.href)).pathname

if (currentUrl === '/'){
	const buttonTop = document.getElementById('scroll-to-bottom');
	const titleBottom = document.getElementsByClassName('content-title');

	buttonTop.addEventListener('click', e => {
	titleBottom[0].scrollIntoView()
	})
}

if (currentUrl === '/contact-us'){
	const submitContact = document.getElementById('save-input');

	submitContact.addEventListener('click', e => {
	e.preventDefault()
	})
} 
