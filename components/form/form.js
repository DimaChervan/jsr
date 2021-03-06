(function() {
	'use strict';

	let tmpl = window.formTpl;
	/**
	 * @class Form
	 * Компонента "Форма"
	 */
	class Form {

		/**
		 * @constructor
		 * @param  {Object} opts
		 */
		constructor({el, data, onSubmit}) {
			this.el = el;
			this.data = data;
			this.onSubmit = onSubmit;
			this.tmpl = tmpl;

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
		 * _filterEmptyValue - filter empty value
		 *
		 * @param  {string} value
		 * @returns {string}
		 */
		_filterEmptyValue(value) {
			return value || '';
		}

		/**
		 * _getValueByName - return value by element name
		 *
		 * @param  {string} name
		 * @returns {string}
		 */
		_getValueByName(name) {
			return this.el.querySelector(`[name="${name}"]`).value;
		}

		/**
		 * _getData - get form data
		 *
		 * @returns {Object}
		 */
		_getData() {
			return {
				href: this._getValueByName('url'),
				anchor: this._getValueByName('anchor'),
				details: this._getValueByName('description')
			};
		}

		/**
		 * setData - set data into form
		 *
		 * @param  {Object} data description
		 */
		setData(data) {
			this.data = data;
			this.render();
		}

		/**
		 * _initEvents - initialize component events
		 *
		 */
		_initEvents() {
			this.el.addEventListener('submit', this._onSubmit.bind(this));
		}


		/**
		 * _onSubmit - actions on form submit
		 *
		 * @param  {Object} event description
		 */
		_onSubmit(event) {
			event.preventDefault();

			this._fireSubmit();
			this._clearForm();
		}

		/**
		 * _fireSubmit - send data out component
		 *
		 */
		_fireSubmit() {
			this.onSubmit(this._getData());
		}

		/**
		 * _clearForm - reset form data
		 *
		 */
		_clearForm() {
			this.data = {};
			this.render();
		}

	}

	// Export
	window.Form = Form;

})(window);
