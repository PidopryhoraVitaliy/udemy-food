function slider() {

	// temp
    function getZero(num) {
		if (num < 0) {
			return `00`;
		}
        if (num >= 0 && num < 10) {
            return `0${num}`;
        }
        return num;
    }


	let		sliderIndex		= 1,
			offset			= 0;
	const	slides			= document.querySelectorAll('.offer__slide'),
			slider			= document.querySelector('.offer__slider'),
			sliderPrev		= document.querySelector('.offer__slider-prev'),
			sliderNext		= document.querySelector('.offer__slider-next'),
			sliderCurrent	= document.querySelector('#current'),
			sliderTotal		= document.querySelector('#total'),
			sliderWrapper	= document.querySelector('.offer__slider-wrapper'),
			sliderField		= document.querySelector('.offer__slider-inner'),
			width			= window.getComputedStyle(sliderWrapper).width;

	sliderTotal.textContent = getZero(slides.length);
	updateCurrentSliderValue();

	sliderField.style.width = 100* slides.length + '%';
	sliderField.style.display = 'flex';
	sliderField.style.transition = '0.5s all';
	sliderWrapper.style.overflow = 'hidden';
	slides.forEach(slide => {
		slide.style.width = width;
	});
	
	slider.style.position = 'relative';

	const	indicators = document.createElement('ol'),
			dots = [];
	indicators.classList.add('carousel-indicators');
	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.classList.add('dot');
		dot.setAttribute('data-slide-to', i + 1);
		indicators.append(dot);
		dots.push(dot);
	}
	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');
			sliderIndex = slideTo;
			offset = getNumberFromString(width) * (slideTo-1);
			sliderField.style.transform = `translateX(-${offset}px)`;
			updateCurrentSliderValue();
			updateDotsStyle();
		});
	});

	updateDotsStyle();

	function updateDotsStyle() {
		dots.forEach(dot => dot.style.opacity = '.5');
		dots[sliderIndex - 1].style.opacity = 1;
	}

	function updateCurrentSliderValue() {
		sliderCurrent.textContent = getZero(sliderIndex);
	}

	function getNumberFromString(str) {
		return +str.replace(/\D/g, '');
	}

	sliderNext.addEventListener('click', () => {

		if (offset == getNumberFromString(width) * (slides.length-1)) {
			offset = 0;
		} else {
			offset += getNumberFromString(width);
		}
		
		sliderField.style.transform = `translateX(-${offset}px)`;
		
		if (sliderIndex == slides.length) {
			sliderIndex = 1;
		} else {
			sliderIndex++;
		}
		
		updateCurrentSliderValue();
		updateDotsStyle();

	});

	sliderPrev.addEventListener('click', () => {

		if (offset == 0) {
			offset = getNumberFromString(width) * (slides.length-1);
		} else {
			offset -= getNumberFromString(width);
		}

		sliderField.style.transform = `translateX(-${offset}px)`;

		if (sliderIndex == 1) {
			sliderIndex = slides.length;
		} else {
			sliderIndex--;
		}
		
		updateCurrentSliderValue();
		updateDotsStyle();

	});


}

module.exports = slider;