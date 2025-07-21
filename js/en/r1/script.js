/* **************************************************

Name: script.js

Description: Common Settings

Copyright 2025 Hitachi, Ltd.

***************************************************** */
(function ($) {
    'use strict';

    jQuery(document).ready(function ($) { 
        //Scroll to top
        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 20) {
                $('#myBtn').show();
            } else {
                $('#myBtn').hide();
            }
        });
        window.topFunction = function() {
            $('html, body').animate({ scrollTop: 0 }, 'fast');
        };
        // Tabs
        $('.tab-menu a').on('click', function(e) {
            e.preventDefault();
            $(this).parents('.tabs').find('.tab-menu a').removeClass('active');
            $(this).parents('.tabs').find('.tab-item').removeClass('active');
            $(this).addClass('active');
            var tabId = $(this).attr('data').replace('tab-', 'item-');
            $(this).parents('.tabs').find('.tab-item[data="' + tabId + '"]').addClass('active');
        });
        //Slider
        var $slider = $('.slider');
        var $counter = $('.custom-counter');
        $slider.on('init reInit afterChange', updateCounter);
        $slider.slick({
            slidesToShow: 4,
            slidesToScroll: 4,
            arrows: true,
            dots: false,
            adaptiveHeight: false,
            prevArrow: $('.custom-prev'),
            nextArrow: $('.custom-next'),
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                },
                {
                    breakpoint: 768.98,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }
            ]
        });
        function updateCounter(event, slick, currentSlide) {
            var currentIndex = Math.floor((currentSlide ? currentSlide : 0) / slick.options.slidesToScroll) + 1;
            var totalPages = Math.ceil(slick.slideCount / slick.options.slidesToScroll);
            $counter.text(currentIndex + '/' + totalPages);
        }
        $slider.trigger('init', [$slider.slick('getSlick')]);
        //Fix equal height
        function equalizeSlideHeights() {
            let maxHeight = 0;
            $('.articles.slider .slick-slide .article-inner').css('height', 'auto').each(function () {
                let h = $(this).outerHeight();
                if (h > maxHeight) maxHeight = h;
            });
            $('.articles.slider .slick-slide .article-inner').height(maxHeight);
        }
        $('.articles.slider').on('setPosition', function () {
            equalizeSlideHeights();
        });
        //Back to top
        $(document).on('click', '#back-to-top', function (e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 700);
        });
        
        
    });
    
})(jQuery);
