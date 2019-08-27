(function($){
    "use strict";

    var $allVideos = jQuery(".post__media_wide .container iframe, .post__media iframe, .post__media object, .post__media embed");

    function ecoclean_get_all_videos() {
        $allVideos.each(function () {
            jQuery(this).attr('data-aspectratio', this.height / this.width).removeAttr('height').removeAttr('width');
        });
    }

    function ecoclean_resize_all_videos() {
        $allVideos.each(function () {
            var $el = jQuery(this);
            var newWidth = jQuery(this).parent().width();
            $el.width(newWidth).height((newWidth * $el.attr('data-aspectratio')).toFixed());
        });
    }

    jQuery(document).ready(function($) {
        var screenRes = $(window).width(),
            screenHeight = $(window).height(),
            innerScreenRes = window.innerWidth, // Screen size width minus scrollbar width
            html = $('html');
        var $ = jQuery;


        // Animate Things (some online tools for responsive test has 760px)
        jQuery.fn.isOnScreen = function(){
            var win = $(window);
            var viewport = {
                top : win.scrollTop(),
                left : win.scrollLeft()
            };
            viewport.right = viewport.left + win.width();
            viewport.bottom = viewport.top + win.height();

            var bounds = this.offset();
            bounds.right = bounds.left + this.outerWidth();
            bounds.bottom = bounds.top + this.outerHeight();
            return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
        };

        if( screenRes > 760){
            jQuery(".fw-animated-element").each(function () {
                var animationElement = $(this),
                    delayAnimation = parseInt(animationElement.data('animation-delay')) / 1000,
                    typeAnimation = animationElement.data('animation-type');

                if(animationElement.isOnScreen()) {
                    if (!animationElement.hasClass("animated")) {
                        animationElement.addClass("animated").addClass(typeAnimation).trigger('animateIn');
                    }
                    animationElement.css({
                        '-webkit-animation-delay': delayAnimation + 's',
                        'animation-delay': delayAnimation + 's'
                    });
                }
                $(window).on('scroll', function () {
                    var top = animationElement.offset().top,
                        bottom = animationElement.outerHeight() + top,
                        scrollTop = $(this).scrollTop(),
                        top = top - screenHeight;

                    if ((scrollTop > top) && (scrollTop < bottom)) {
                        if (!animationElement.hasClass("animated")) {
                            animationElement.addClass("animated").addClass(typeAnimation).trigger('animateIn');
                        }
                        animationElement.css({
                            '-webkit-animation-delay': delayAnimation + 's',
                            'animation-delay': delayAnimation + 's'
                        });
                        // Disable animation fill mode the reason that creates problems,
                        // on hover animation some shortcodes and video full screen in Google Chrome
                        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                        jQuery('.animated').one(animationEnd, function() {
                            $(this).addClass('fill-mode-none');
                        });
                    }
                });
            });
        }

        document.documentElement.className='js';

        //Set Main slider script
        var sliders = jQuery('[class*=main-slider]');
        sliders.bxSlider({
            useCSS: false,
            nextText: 'next',
            prevText: 'prev',
            pager: false,
            auto: false,
            mode: 'fade',
            wrapperClass: 'bx-wrapper-main'
        });

        var sliderControll = jQuery('.bx-controls-direction');

        //hidding menu elements that do not fit in menu width
        window.menuHideExtraElements = function() {
            var wrapperWidth = jQuery('#main-nav').width();
            var summaryWidth = 0;
            var $liElements = jQuery('#main-nav > li');
            $liElements.each(function(index) {
                summaryWidth += jQuery(this).outerWidth(true);
                if(summaryWidth > wrapperWidth) {
                    $liElements.removeClass('md-hidden');
                    var $newLi = jQuery('<li id="more-li"><a><i class="fa fa-bars"></i></a><ul class="sub-menu"></ul></li>');
                    jQuery($liElements[index-1]).before($newLi);
                    var $extraLiElements = $liElements.filter(':gt('+(index-2)+')');
                    $extraLiElements.clone().appendTo($newLi.find('ul'));
                    $extraLiElements.addClass('md-hidden');
                    return false;
                }
            });
        }
        menuHideExtraElements();
        jQuery(window).on('resize', function() {
            jQuery('#more-li').remove();
            menuHideExtraElements();
        });

        //flexslider
        if (jQuery().flexslider) {
            var $introSlider = jQuery(".intro_section .flexslider");
            $introSlider.each(function(index){
                var $currentSlider = jQuery(this);
                $currentSlider.flexslider({
                        animation: "fade",
                        pauseOnHover: true,
                        useCSS: true,
                        controlNav: true,
                        directionNav: false,
                        prevText: "",
                        nextText: "",
                        smoothHeight: false,
                        slideshowSpeed:10000,
                        animationSpeed:600,
                        start: function( slider ) {
                            slider.find('.slide_description').children().css({'visibility': 'hidden'});
                            slider.find('.flex-active-slide .slide_description').children().each(function(index){
                                var self = jQuery(this);
                                var animationClass = !self.data('animation') ? 'fadeInRight' : self.data('animation');
                                setTimeout(function(){
                                    self.addClass("animated "+animationClass);
                                }, index*200);
                            });
                        },
                        after :function( slider ){
                            slider.find('.flex-active-slide .slide_description').children().each(function(index){
                                var self = jQuery(this);
                                var animationClass = !self.data('animation') ? 'fadeInRight' : self.data('animation');
                                setTimeout(function(){
                                    self.addClass("animated "+animationClass);
                                }, index*200);
                            });
                        },
                        end :function( slider ){
                            slider.find('.slide_description').children().each(function() {
                                var self = jQuery(this);
                                var animationClass = !self.data('animation') ? 'fadeInRight' : self.data('animation');
                                self.removeClass('animated ' + animationClass).css({'visibility': 'hidden'});
                            });
                        },

                    })
                    //wrapping nav with container
                    .find('.flex-control-nav')
                    .wrap('<div class="container nav-container"/>')
            }); //intro_section flex slider

            jQuery(".flexslider").each(function(index){
                var $currentSlider = jQuery(this);
                //exit if intro slider already activated
                if ($currentSlider.find('.flex-active-slide').length) {
                    return;
                }
                $currentSlider.flexslider({
                    animation: "fade",
                    useCSS: true,
                    controlNav: true,
                    directionNav: false,
                    prevText: "",
                    nextText: "",
                    smoothHeight: false,
                    slideshowSpeed:5000,
                    animationSpeed:800,
                })
            });

            //video images preview
            jQuery('.embed-placeholder').each(function(){
                jQuery(this).on('click', function(e) {
                    e.preventDefault();
                    var $thisLink = jQuery(this);
                    if ($thisLink.attr('href') == '' || $thisLink.attr('href') == '#') {
                        $thisLink.replaceWith($thisLink.data('iframe').replace(/&amp/g, '&').replace(/$lt;/g, '<').replace(/&gt;/g, '>').replace(/$quot;/g, '"')).trigger('click');
                    } else {
                        $thisLink.replaceWith('<iframe class="embed-responsive-item" src="'+ $thisLink.attr('href') + '?rel=0&autoplay=1'+ '"></iframe>');
                    }
                });
            });
        }

        // Fit video frames to document width
        ecoclean_get_all_videos();
        ecoclean_resize_all_videos();

        // Date Time Picker
        jQuery('[id ^= id-date]').each(function(){
            var datePicker = jQuery(this);
            datePicker.datetimepicker({
                pickDate: datePicker.data('pick-date'),
                pickTime: datePicker.data('pick-time'),
                useSeconds: false,
                language: datePicker.data('language'),
                debug: false,
            });
        });

        //background image cover - set image inside element with this class as a background to cover whole container
        jQuery(".cover-image").each(function(){
            var $element = jQuery(this);
            var $image = $element.find("img").first();
            if (!$image.length) {
                $image = $element.parent().find("img").first();
            }
            if (!$image.length) {
                return;
            }
            var imagePath = $image.attr("src");
            $element.css("background-image", "url(" + imagePath + ")");
            var $imageParent = $image.parent();
            //if image inside link - adding this link
            if ($imageParent.is('a')) {
                $element.prepend($image.parent().clone().html(''));
            }
        });

        // PrettyPhoto
        $("a[data-gal^='prettyPhoto']").prettyPhoto({
            theme: 'dark_square',
            animation_speed:'normal',
            slideshow:3000,
            autoplay_slideshow: false,
            social_tools: false,
            hook: 'data-gal'
        });

        // Navigation in responsive layouts
        var $menu = $('.main-nav > ul'),
            optionsList = '<option value="" selected> = Main Navigation = </option>';

        if( $menu.length ) {
            $menu.find('li').each(function () {
                var $this = $(this),
                    $anchor = $this.children('a'),
                    depth = $this.parents('ul').length - 1,
                    indent = '';

                if (depth) {
                    while (depth > 0) {
                        indent += ' ::: ';
                        depth--;
                    }
                }

                optionsList += '<option value="' + $anchor.attr('href') + '">' + indent + ' ' + $anchor.text() + '</option>';
            }).end().parent().parent().parent().parent().parent().find('.nav-button').append('<select class="mobile-menu">' + optionsList + '</select><div class="mobile-menu-title"><i class="fa fa-bars" aria-hidden="true"></i></div>');
        } else {
            $('.nav-button').append("Please create menu");
        }

        $('.mobile-menu').on('change', function () {
            window.location = $(this).val();
        });

        // Menu search
        $('.header-button__search').on('click', function () {
            $('body').toggleClass('search-box--opened');
            $('.search-box__icon').toggleClass('active');
            $('#search-box__input').toggleClass('fadein');
        });
        $(document).on('mouseup', function (e) {
            var container = $('.header__right');
            if (!container.is(e.target) // if the target of the click isn't the container...
                && container.has(e.target).length === 0) // ... nor a descendant of the container
            {
                $('body').removeClass('search-box--opened');
                $('.search-box__icon').removeClass('active');
                $('#search-box__input').removeClass('fadein');
            }
        });

        // Scroll totop button
        var toTop = $('#to-top');
        $(window).on('scroll', function () {
            if ($(this).scrollTop() > 1) {
                toTop.css({bottom: '11px'});
            } else {
                toTop.css({bottom: '-100px'});
            }
        });
        toTop.on('click', function () {
            $('html, body').animate({scrollTop: '0px'}, 800);
            return false;
        });

        // Post controls
        $('.pctrl-social-btn').on('click', function () {
            $(this).closest('.post-controls').toggleClass('active');
        });

        // Bootstrap select
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
            $('.widget select').selectpicker('mobile');
        }
        else {
            $('.widget select').selectpicker({
                container: 'body',
                width: '100%',
                size: 8
            });
        }

        // Post format video thumbnail hide on click
        $('.post__thumbnail').on('click', function(){
            $(this).hide();
        });

        // Login Popup
        login_popup();

    });

    jQuery(window).on( "load", function () {
        // Sticky Menu
        if (jQuery('body').length > 0) {
            jQuery('.header__primary').clone().addClass('sticky-menu').prependTo('div.site');

            $(window).on('scroll', function () {
                if ($(window).scrollTop() > 400) {
                    // Scroll Down
                    $('.header__primary.sticky-menu').addClass('sticky-menu-open');
                } else {
                    // Scroll Up
                    $('.header__primary.sticky-menu').removeClass('sticky-menu-open');
                }
            });
        }

        //Set preloader script
        $('#loader').fadeOut(); // will first fade out the loading animation
        $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
        $('body').delay(350).css({
            'overflow': 'visible'
        });

        // Sticky Sidebar
        var stickyParentRow = $(".post-container > .row > .col-sm-8"),
            stickySidebar = $(".sidebar-sticky");

        function detachSidebar() {
            if( 992 > $(window).width() ) {
                stickySidebar.trigger("sticky_kit:detach");
            }
        }

        //Placeholder cleaning
        var $ph = $('input[type="search"], input[type="text"], input[type="url"], input[type="number"], input[type="email"], textarea');
        $ph.each(function() {
            var value = $(this).val();
            $(this).on('focus', function() {
                if ($(this).val() === value) {
                    $(this).val('');
                }
            });
            $(this).on('blur', function() {
                if ($(this).val() === '') {
                    $(this).val(value);
                }
            });
        });

        var $carousel = jQuery('.owl-gallery');
        var autoplay = $carousel.data('autoplay') ? $carousel.data('autoplay') : false;
        var autoplaytimeout = $carousel.data('autoplaytimeout') ? $carousel.data('autoplaytimeout') : 3000;

        $('.owl-gallery').owlCarousel({
            autoplay: autoplay,
            autoplaytimeout: autoplaytimeout,
            margin:0,
            items:1,
            loop:true,
            nav:true,
            autoHeight : true,
            navText: [
                "<i class='rt-icon icon-chevron-thin-left'></i>",
                "<i class='rt-icon icon-chevron-thin-right'></i>"
            ],
            responsiveClass:true,
            responsiveBaseElement:".footer",
            responsive:{
                0:{
                    dots:false
                },
                955:{
                    dots:true
                }
            }
        });
    });

    jQuery(window).on('resize', function () {

        // Fit video frames to document width
        ecoclean_resize_all_videos();

    });
    $(window).on('load resize', function() {

        // Fit image size to container size.
        $('.image-fit').each( function () {
            var refH = $(this).height();
            var refW = $(this).width();
            var refRatio = refW/refH;

            var imgH = $(this).children("img").height();
            var imgW = $(this).children("img").width();

            if ( (imgW/imgH) > refRatio ) {
                $(this).addClass("portrait");
                $(this).removeClass("landscape");
            } else {
                $(this).addClass("landscape");
                $(this).removeClass("portrait");
            }
        });
    });

    // hide placeholders on focus
    $(function () {
        $('input,textarea').on('focus', function () {
            $(this).data('placeholder', $(this).attr('placeholder'))
                .attr('placeholder', '');
        }).on('blur', function () {
            $(this).attr('placeholder', $(this).data('placeholder'));
        });
    });

})(jQuery);

function login_popup() {
    // Login popup
    if (jQuery('.login-popup__toggle').length) {
        jQuery('.login-popup__toggle').on('click', function(){
            var loginPopup = jQuery(this).siblings('.login-popup__popup');
            loginPopup.toggleClass('login-popup__popup--opened');
            loginPopup.find('#user_login').attr('placeholder', 'Username');
            loginPopup.find('#user_pass').attr('placeholder', 'Password');
        });
        jQuery('.login-popup__popup #rememberme').after('<span>').after('<span>');
    }
}
