jQuery(document).ready(function($) {
//Set Testimonials script
    var slider = jQuery(this).find('.fw-testimonials-list');
    if (slider.length) {
        var slider_id = slider.attr('id');
        var auto = slider.data('auto') ? slider.data('auto') : false;
        var duration = slider.data('duration') ? slider.data('duration') : 400;
        $("#" + slider_id).carouFredSel({
            swipe: {
                onTouch: true
            },
            next: "#" + slider_id + "-next",
            prev: "#" + slider_id + "-prev",
            pagination: false,
            responsive: true,
            infinite: true,
            items: {
                width: 551,
                visible:
                {
                    min: 1,
                    max: 3
                }
            },
            auto: auto,
            scroll: {
                items: 1,
                fx: "directscroll",
                easing: "swing",
                duration: duration
            }
        });
    }
});