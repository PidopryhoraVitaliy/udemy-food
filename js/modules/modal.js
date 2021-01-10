
function showModalWindow(modalSelector, modalTimerId) {
	const modalWindow = document.querySelector(modalSelector);
	modalWindow.classList.remove('hide');
	modalWindow.classList.add('show');
	document.body.style.overflow = 'hidden';
	if (modalTimerId) {
		clearTimeout(modalTimerId);
	}
}

function hideModalWindow(modalSelector) {
	const modalWindow = document.querySelector(modalSelector);
	modalWindow.classList.remove('show');
	modalWindow.classList.add('hide');
	document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {

    const modalWindow = document.querySelector(modalSelector);

	document.querySelectorAll(triggerSelector).forEach(elem => {
		elem.addEventListener('click', () => showModalWindow(modalSelector, modalTimerId));
	});

	/*document.querySelectorAll('[data-modal-close].modal__close').forEach((elem) => {
		elem.addEventListener('click', hideModalWindow);
	});*/
	
	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
			hideModalWindow(modalSelector);
		}
	});
	
	modalWindow.addEventListener('click', (e) => {
		//console.log(e.target);
		if (e.target === modalWindow || e.target.getAttribute('data-modal-close') == '') {
			hideModalWindow(modalSelector);
		}
	});
	
	function showModalWindowByScroll() {
		/*console.log(`------------------------------------------`);
		console.log(`pageYOffset: ${window.pageYOffset}`);
		console.log(`clientHeight: ${document.documentElement.clientHeight}`);
		console.log(`scrollHeight: ${document.documentElement.scrollHeight}`);*/
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			showModalWindow(modalSelector, modalTimerId);
			window.removeEventListener('scroll', showModalWindowByScroll);
		}
	}
	
	window.addEventListener('scroll', showModalWindowByScroll);

}

export default modal;
export {showModalWindow};
export {hideModalWindow};