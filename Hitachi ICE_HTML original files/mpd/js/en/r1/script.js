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
        // Initialize all sliders
        $('.slider').each(function (index, element) {
            var $slider = $(element);
            var $container = $(this); // assuming .articles is the container for each slider
            var $counter = $container.parent().find('.custom-counter');
            var $prev = $container.parent().find('.custom-prev');
            var $next = $container.parent().find('.custom-next');

            // Update counter
            function updateCounter(event, slick, currentSlide) {
                var currentIndex = Math.floor((currentSlide ? currentSlide : 0) / slick.options.slidesToScroll) + 1;
                var totalPages = Math.ceil(slick.slideCount / slick.options.slidesToScroll);
                $counter.text(currentIndex + '/' + totalPages);
            }

            // Equalize heights of slides in this slider
            function equalizeSlideHeights() {
                let maxHeight = 0;
                $slider.find('.slick-slide .article-inner').css('height', 'auto').each(function () {
                    let h = $(this).outerHeight();
                    if (h > maxHeight) maxHeight = h;
                });
                $slider.find('.slick-slide .article-inner').height(maxHeight);
            }

            // Initialize Slick slider
            $slider.on('init reInit afterChange', updateCounter);
            $slider.on('setPosition', function () {
                equalizeSlideHeights();
            });

            $slider.slick({
                slidesToShow: 4,
                slidesToScroll: 4,
                arrows: true,
                dots: false,
                adaptiveHeight: false,
                prevArrow: $prev,
                nextArrow: $next,
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
