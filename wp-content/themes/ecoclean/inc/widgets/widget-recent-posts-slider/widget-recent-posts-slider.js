(function ($) {
    "use strict";
    jQuery(window).on( "load", function () {
        var $carousel = jQuery('.owl-widget-single');
        var autoplay = $carousel.data('autoplay') ? $carousel.data('autoplay') : false;
        var autoplaytimeout = $carousel.data('autoplaytimeout') ? $carousel.data('autoplaytimeout') : 3000;

        /* owl carousel */
        $('.owl-widget-single').owlCarousel({
            autoplay: autoplay,
            autoplaytimeout: autoplaytimeout,
            dots: true,
            loop: true,
            margin: 0,
            items: 1,
            nav: false,
            navText: [
                "<i class='posts-slider__icon rt-icon icon-chevron-thin-left'></i>",
                "<i class='posts-slider__icon rt-icon icon-chevron-thin-right'></i>"
            ],
            responsiveClass: true,
            responsiveBaseElement: ".widget_recent_entries_slider",
        });

    });

})(jQuery);