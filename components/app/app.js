(function () {
 	'use strict';

	//import
	let Menu = window.Menu;
	let Form = window.Form;

	let menu = new Menu({
		el: document.querySelector('.js-menu'),
		data: {
			title: 'Component Application',
			items: [
				{
					href: 'https://vk.com',
					anchor: 'vk.com',
          details: ''
				},
				{
					href: 'https://ok.ru',
					anchor: 'ok.ru',
          details: 'Какой-то странный сайт'
				},
				{
					href: 'https://yahoo.com',
					anchor: 'yahoo.com',
          details: 'Какой-то странный сайт'
				},
				{
					href: 'https://yandex.ru',
					anchor: 'yandex.ru',
          details: 'Какой-то странный сайт'
				}
			]
		},
    onPick (data) {
      console.log(data);
    }
	});

  let form = new Form({
    el: document.querySelector('.js-form'),
    data: {},
    onSubmit (data) {
      menu.addItem(data);
    }
  });

	window.menu = menu;
	window.form = form;
})();
