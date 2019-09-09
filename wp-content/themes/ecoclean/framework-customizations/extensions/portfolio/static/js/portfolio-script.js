// "use strict";
// jQuery(document).ready(function ( $ ) {
// 	$('#Container').mixItUp();
// 	// $('.wrapp-categories-portfolio .categories-item a').on('click', function (e) {
// 	// 	e.preventDefault();
// 	// });

//     var mixer = mixitup(containerEl, {
//     load: {
//         sort: '.category_200'
//     }
//     });

// });



$(function(){
	$('#Container').mixItUp({

     load: {
        filter: '.category_all'
    }

	});
});