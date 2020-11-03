document.addEventListener('DOMContentLoaded', () => {

	/////////////////////////////////////////////////////////
	// TABS
	
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabsContent() {
        tabsContent.forEach(item => {
            //item.style.display = 'none';
            item.classList.remove('show', 'fade');
            item.classList.add('hide');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        //tabsContent[i].style.display = 'block';
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabsContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((tab, index) => {
                if (tab == target) {
                    hideTabsContent();
                    showTabContent(index);
                }
            });
        }
    });

	/////////////////////////////////////////////////////////
    // TIMER

    const deadline = '2020-10-27T00:00:00.000+02:00';

    function getTimeRemaining(endtime) {
        const   t = Date.parse(endtime) - Date.parse(new Date()),
                days = Math.floor(t / (1000*60*60*24)),
                hours = Math.floor((t / (1000*60*60)) % 24),
                minutes = Math.floor((t / (1000*60)) % 60),
                seconds = Math.floor((t / 1000) % 60);
        return {
            'total': t, days, hours, minutes, seconds
        };
    }

    function getZero(num) {
		if (num < 0) {
			return `0`;
		}
        if (num >= 0 && num < 10) {
            return `0${num}`;
        }
        return num;
    }

    function setClock(selector, endtime) {
        const   timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }

    }

    setClock('.timer', deadline);
	
	/////////////////////////////////////////////////////////
	// MODAL
	
	const modalWindow = document.querySelector('div.modal');
	let timerOfModalWindowId = setTimeout(showModalWindow, 60000);

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

	/////////////////////////////////////////////////////////
	// MENU
	
	class MenuCard {
		
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			//this.subtitle = subtitle;
			this.descr = descr;
			this.price = price;
			this.transfer = 27;
			this.changToUAH();
			this.parent = document.querySelector(parentSelector);
			this.classes = classes;
		}
		
		changToUAH() {
			this.price = this.price * this.transfer;
		}
		
		getInnerHTML() {
			return 	`<img src=${this.src} alt=${this.alt}>
					<h3 class="menu__item-subtitle">${this.title}</h3>
					<div class="menu__item-descr">${this.descr}</div>
					<div class="menu__item-divider"></div>
					<div class="menu__item-price">
						<div class="menu__item-cost">Цена:</div>
						<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
					</div>`;

		}
		
		render() {
			const div = document.createElement('div');
			
			if (this.classes.length === 0) {
				this.element = 'menu__item';
				div.classList.add(this.element);
			} else {
				this.classes.forEach(className => div.classList.add(className));
			}
			
			div.innerHTML = this.getInnerHTML();
			this.parent.append(div);
		}
		
	}
	
	new MenuCard(
		'img/tabs/vegy.jpg',
		'vegy',
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		9,
		'.menu .container'
	).render();

	new MenuCard(
		'img/tabs/vegy.jpg',
		'vegy',
		'Меню “Премиум”',
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		20,
		'.menu .container',
		'menu__item'
	).render();

	new MenuCard(
		'img/tabs/vegy.jpg',
		'vegy',
		'Меню "Постное"',
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		16,
		'.menu .container',
		'menu__item'
	).render();

	/////////////////////////////////////////////////////////
    // FORMS - 53

	const forms = document.querySelectorAll('form');

	const message = {
		loading: 'img/form/spinner.svg',
		success: 'success!',
		failure: 'failure',
	};

	forms.forEach(item => {
		postData(item);
	});

	function postData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			
			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			form.insertAdjacentElement('afterend', statusMessage);

			const formData = new FormData(form);
			const obj = {};
			for(let [name, value] of formData) {
				obj[name] = value;
			}
			console.log('obj: ', obj);

			fetch('server.php', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(obj)
			})
			.then(data => data.json())
			.then(data => {
				console.log('php: ', data);
				showThanksModal(message.success);
				statusMessage.remove();
			})
			.catch(() => {
				showThanksModal(message.failure);
			})
			.finally(() => {
				form.reset();
			});

		});
	}

	function showThanksModal(message) {
		
		const prevModalDialog = document.querySelector('.modal__dialog');
		prevModalDialog.classList.add('hide');
		showModalWindow();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
			<div class = "modal__content">
				<div data-modal-close class="modal__close">×</div>
				<div class="modal__title">${message}</div>
			</div>
		`;

		document.querySelector('.modal').append(thanksModal);

		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			hideModalWindow();
		}, 3000);

	}

});



























