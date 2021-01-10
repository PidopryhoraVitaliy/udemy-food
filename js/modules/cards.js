import {getResource} from '../services/services';

function cards() {

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
	
	/*getResource('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({img, altimg, title, descr, price}) => {
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		});*/
	axios.get('http://localhost:3000/menu')
		.then(data => {
			data.data.forEach(({img, altimg, title, descr, price}) => {
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		});

}

//module.exports = cards;
export default cards;