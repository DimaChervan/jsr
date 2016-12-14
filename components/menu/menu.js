(function() {
	'use strict';

	/**
	 * @class Menu
	 * Компонента "Меню"
	 */
	class Menu {

		/**
		 * @constructor
		 * @param  {Object} opts
		 */
		constructor({el, data, onPick}) {
			this.el = el;
			this.data = data;
			this.onPick = onPick;

			this.render();
			this._initEvents();
		}

		/**
		 * Преобразование данных компоненты в верстку!
		 */
		render () {
			function getMenuItems (items) {
				return items.map((item, index) => {
					return `<li class="pure-menu-item" data-index="${index}">
										<a class="pure-menu-link" href="${item.href}" data-action="pick">
											${item.anchor}
										</a>
										<details>${item.details}</details>
										<i class="close" data-action="remove"></i>
									</li>`;
				}).join('');
			}

			this.el.innerHTML = `
					<div class="menu pure-menu custom-restricted-width">
						<span class="menu__title pure-menu-heading">
							${this.data.title}
						</span>
						<ul class="menu__list pure-menu-list">
							${getMenuItems(this.data.items)}
						</ul>
					</div>
			`;
		}

		/**
		 * Удаляем пункт меню из данных
		 * @param  {number} removedItemIndex
		 */
		removeItem (removedItemIndex) {
			this.data.items = this.data.items.filter((item, index) => {
				return index !== removedItemIndex;
			});

			this.render();
		}


		/**
		 * Добавляем пункт меню из данных
		 * @param  {Object} itemData
		 */
		addItem (itemData) {
			this.data.items.push(itemData);

			this.render();
		}

		/**
		* Выбор элемента меню
		* @param  {HTMLElement} item
		*/
		_onPickClick(item) {
			let index = this._getItemIndex(item);
			let data = this.data.items[index];
			this.onPick(
				Object.assign({}, data, {index})
			);
		}

		/**
		* Удаления элемента меню
		* @param  {HTMLElement} item
		* @private
		*/
		_onRemoveClick(item) {
			this.removeItem(
				this._getItemIndex(item)
			);
		}

		_getItemIndex(item) {
			return parseInt(item.parentNode.dataset.index, 10);
		}

		/**
		* Развешиваем события
		*/
		_initEvents() {
			this.el.addEventListener('click', this._onClick.bind(this));
		}

		/**
		* Клик в любую область меню
		* @param {MouseEvent} event
		* @private
		*/
		_onClick (event) {
			let item = event.target;

			switch (item.dataset.action) {
				case 'remove':
					this._onRemoveClick(item);
					break;

				case 'pick':
					event.preventDefault();
					this._onPickClick(item);
					break;
			}
		}

	}

	// Export
	window.Menu = Menu;

})(window);
