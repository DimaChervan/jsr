(function() {
	'use strict';

	//import
	let tmpl = window.menuTpl;

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
			this.tmpl = tmpl;

			this.onPick = onPick;

			this._clearSelectedIndex();
			this.render();
			this._initEvents();
		}

    /**
		 * render - converts template into html
		 *
		 */
		render () {
			this.el.innerHTML = this.tmpl(this.data);
		}


		/**
		 * removeItem - remove item from menu list
		 *
		 * @param  {number} removedItemIndex
		 */
		removeItem(removedItemIndex) {
			this.data.items = this.data.items.filter((item, index) => {
				return index !== removedItemIndex;
			});

			this.render();
		}

		/**
		 * _clearSelectedIndex
		 */
		_clearSelectedIndex() {
			this.selectedIndex = null;
		}

		/**
		 * changeItems - delegate to add or edit item
		 *
		 * @param  {Object} itemData
		 */
		changeItems(itemData) {
			this[this.selectedIndex === null ? '_addItem' : '_editItem'](itemData);
			this._clearSelectedIndex();
			this.render();
		}

		/**
		 * _addItem - add new item into menu list
		 *
		 * @param  {Object} itemData description
		 */
		_addItem(itemData) {
			this.data.items.push(itemData);
		}

		/**
		 * _editItem - edit item in menu list
		 *
		 * @param  {Object} itemData
		 */
		_editItem(itemData) {
			this.data.items = this.data.items.map((item, index) => {
				if (this.selectedIndex !== index) return item;

				return itemData;
			});
		}

		/**
		 * _onPickClick - actions during click on menu item
		 *
		 * @param  {Object} item description
		 */
		_onPickClick(item) {
			let index = this._getItemIndex(item);
			let data = this.data.items[index];
			this.selectedIndex = index;
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
			let index = this._getItemIndex(item);

			this.removeItem(index);
			this._clearSelectedIndex();
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
