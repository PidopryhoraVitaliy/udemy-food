import tabs		from './modules/tabs';
import timer	from './modules/timer';
import modal	from './modules/modal';
import cards	from './modules/cards';
import forms	from './modules/forms';
import slider	from './modules/slider';
import calc		from './modules/calc';
import showModalWindow from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {

	const modalTimerId = setTimeout(() => showModalWindow('div.modal', modalTimerId), 300000);

	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	timer('.timer', '2021-01-20');
	modal('[data-modal-open]', 'div.modal', modalTimerId);
	cards();
	forms('form', modalTimerId);
	calc();
	slider({
		conteiner: '.offer__slider',
		slide: '.offer__slide',
		nextArrow: '.offer__slider-next',
		prevArrow: '.offer__slider-prev',
		totalCounter: '#total',
		currentCounter: '#current',
		wrapper: '.offer__slider-wrapper',
		field: '.offer__slider-inner'
	});
	

});



























