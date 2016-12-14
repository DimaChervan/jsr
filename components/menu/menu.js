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
		 * render - converts template into html
		 *
		 */
		render () {

			/**
			 * getMenuItems - get html string of
			 *
			 * @param  {Object} items Array of items
			 * @returns {string}
			 */
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
		 * removeItem - remove item from menu list
		 *
		 * @param  {number} removedItemIndex
		 */
		removeItem (removedItemIndex) {
			this.data.items = this.data.items.filter((item, index) => {
				return index !== removedItemIndex;
			});

			this.render();
		}



		/**
		 * addItem - add new item into menu list
		 *
		 * @param  {Object} itemData description
		 */
		addItem (itemData) {
			this.data.items.push(itemData);

			this.render();
		}


		/**
		 * _onPickClick - actions during click on menu item
		 *
		 * @param  {Object} item description
		 */
		_onPickClick(item) {
			let index = this._getItemIndex(item);
			let data = this.data.items[index];
			this.onPick(
				Object.assign({}, data, {index})
			);
		}


		/**
		 * _onRemoveClick - description
		 *
		 * @param  {Object} item description
		 */
		_onRemoveClick(item) {
			this.removeItem(
				this._getItemIndex(item)
			);
		}

		/**
		 * _getItemIndex - get index by menu item
		 *
		 * @param  {Object} item
		 * @returns {number}
		 */
		_getItemIndex(item) {
			return parseInt(item.parentNode.dataset.index, 10);
		}


		/**
		 * _initEvents - initialize component events
		 *
		 */
		_initEvents() {
			this.el.addEventListener('click', this._onClick.bind(this));
		}


		/**
		 * _onClick - actions during click on component
		 *
		 * @param  {Object} event
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
