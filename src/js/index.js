import ListModel from './model.js'
import ListView from './view.js'
import ListController from './controller.js'

import css from '../css/index.css'


$(document).ready( function () {
	$(function () {
	    var model = new ListModel(['PHP', 'JavaScript']),
	        view = new ListView(model, {
	            'list': $('#list'),
	                'addButton': $('#plusBtn'),
	                'delButton': $('#minusBtn')
	        }),
	        controller = new ListController(model, view);

	    view.show();
	});
});