
"use strict";

//owl carousel
if (jQuery().owlCarousel) {

    jQuery('.owl-carousel').each(function() {
        var $carousel = jQuery(this);
        var indent = $carousel.data('indent') ? $carousel.data('indent') : false;
        var show_navigation = $carousel.data('show_navigation') ? $carousel.data('show_navigation'): false;
        var autoplay = $carousel.data('autoplay') ? $carousel.data('autoplay'): false;
        var autoplaytimeout = $carousel.data('autoplaytimeout') ? $carousel.data('autoplaytimeout') : 3000;
        var uniqid = $carousel.data('uniqid') ? $carousel.data('uniqid') : '';
        var slider_class = '.owl-recent-post-carousel',
            unique_slider_class = slider_class + uniqid;


        jQuery(unique_slider_class).owlCarousel({
            mouseDrag: false,
            dotClass: 'owl-dot',
            dotsClass: 'owl-dots',
            dots: false,
            loop: true,
            margin: 0,
            autoplay: autoplay,
            autoplaytimeout: autoplaytimeout,
            nav: show_navigation,
            navText: [
                "<span class='rp-chevron-thin-left'></span>",
                "<span class='rp-chevron-thin-right'></span>"
            ],
            responsiveClass: true,
            responsiveBaseElement: unique_slider_class,
            responsive: {
                0: {
                    items: 2,
                    loop: true
                },
                630: {
                    items: 3,
                    loop: true
                },
                740: {
                    items: 4,
                    loop: true
                },
                970: {
                    items: 5,
                    loop: true
                },
                1440: {
                    items: 7
                }
            }
        });
    });
}