function modal() {

    const modalWindow = document.querySelector('div.modal');
	let timerOfModalWindowId = setTimeout(showModalWindow, 1200000);

	function showModalWindow() {
		modalWindow.classList.remove('hide');
		modalWindow.classList.add('show');
		document.body.style.overflow = 'hidden';
		clearTimeout(timerOfModalWindowId);
	}
	
	function hideModalWindow() {
		modalWindow.classList.remove('show');
		modalWindow.classList.add('hide');
		document.body.style.overflow = '';
	}

	document.querySelectorAll('[data-modal-open]').forEach((elem) => {
		elem.addEventListener('click', showModalWindow);
	});

	/*document.querySelectorAll('[data-modal-close].modal__close').forEach((elem) => {
		elem.addEventListener('click', hideModalWindow);
	});*/
	
	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
			hideModalWindow();
		}
	});
	
	modalWindow.addEventListener('click', (e) => {
		//console.log(e.target);
		if (e.target === modalWindow || e.target.getAttribute('data-modal-close') == '') {
			hideModalWindow();
		}
	});
	
	function showModalWindowByScroll() {
		/*console.log(`------------------------------------------`);
		console.log(`pageYOffset: ${window.pageYOffset}`);
		console.log(`clientHeight: ${document.documentElement.clientHeight}`);
		console.log(`scrollHeight: ${document.documentElement.scrollHeight}`);*/
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			showModalWindow();
			window.removeEventListener('scroll', showModalWindowByScroll);
		}
	}
	
	window.addEventListener('scroll', showModalWindowByScroll);

}

module.exports = modal;