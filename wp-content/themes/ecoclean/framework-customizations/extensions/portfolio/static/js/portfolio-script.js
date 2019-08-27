"use strict";
jQuery(document).ready(function ( $ ) {
	$('#Container').mixItUp();
	$('.wrapp-categories-portfolio .categories-item a').on('click', function (e) {
		e.preventDefault();
	});
});