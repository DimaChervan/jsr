(function() {
	'use strict';

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

			this._init();
		}

		/**
		 * Преобразование данных компоненты в верстку!
		 */
		render () {
			this.el.innerHTML = `
					<form action="/" class="form pure-form pure-form-stacked">
						<div class="pure-g">
							<input name="url" placeholder="url" class="form__input pure-input-1" value="${this._filterEmptyValue(this.data.href)}" />
							<input name="anchor" placeholder="anchor" class="form__input pure-input-1" value="${this._filterEmptyValue(this.data.anchor)}" />
							<textarea name="description" placeholder="description" class="form__area pure-input-1">${this._filterEmptyValue(this.data.details)}</textarea>

							<button type="submit" class="pure-button pure-button-primary pure-input-1">Сохранить</button>
						</div>
					</form>
			`;
		}

		_filterEmptyValue(value) {
			return value || '';
		}

		_getValueByName(name) {
			return this.el.querySelector(`[name="${name}"]`).value;
		}

		_getData() {
			return {
				href: this._getValueByName('url'),
				anchor: this._getValueByName('anchor'),
				details: this._getValueByName('description')
			};
		}

		setData(data) {
			this.data = data;
			this.render();
		}

		/**
		* Развешиваем события
		*/
		_init() {
			this.render();
			this.form = this.el.querySelector('form');
			this._initEvents();
		}

		_initEvents() {
			this.el.addEventListener('submit', this._onSubmit.bind(this));
		}

		/**
		* "Отправка" формы
		*/
		_onSubmit(event) {
			event.preventDefault();

			this._fireSubmit();
			this._clearForm();
		}

		_fireSubmit() {
			this.onSubmit(this._getData());
		}

		_clearForm() {
			this.form.reset();
		}

	}

	// Export
	window.Form = Form;

})(window);