(function($){
    /*------------------------------------------*/

    /*             Expansion Module             */

    /*------------------------------------------*/

    $(document).ready(function() {

        if ($('#ProductCategory').length) {
            // indicate we have JS on
            $("#ProductCategory").addClass("jsOn");

            $('.slide-menu').slideMenu({
                itemClass: 'item',
                imageSlideClass: 'img-slides',
                infoClass: 'info'
            });
        }

    });
	
    /*------------------------------------------*/

    /*            T+             */

    /*------------------------------------------*/
	
    function removeNoJS() {
        $('html').removeClass('no-js');
    }

    function toggleHomeNavMenu() {
        var menu = $('#MidNav .nav-menu');
        if (!menu.length) {
            return;
        }

        $(window).on('resize', function(e){
            init();
            collapse();
        });
        init();

        function init() {
            if (_checkRWD(995)) {
                return;
            }

            menu.navMenu({
                maxCharacter: [140, 60, 60],
                childMaxCharacter: [120, 120, 120],
                itemMinimizeHeight: 120,
                itemExpandDefaultHeight: 593,
                btnExpandClass: ['nav-menu-info'],
                itemClick: function(e) {
                    if (_checkRWD(995)) {
                        e.stopImmediatePropagation();
                    }
                },
                itemClicked: function(e, data) {
                    // tracking for all expand item
                    if (typeof dcsMultiTrack === 'function') {
                        dcsMultiTrack(
                            'WT.dl', '21',
                            'WT.ti', 'Anchor:' + data.name
                        );
                    }
                },
                beforeExpand: function(e) {
                    $('li[data-name=' + e.name + ']').find('.nav-menu-content').hide();
                },
                afterExpand: function(e) {
                    $('li[data-name=' + e.name + ']').find('.nav-menu-content').fadeIn();
                },
                afterInit: function(itemsArray) {
                    if (window.location.hash) {
                        var itemHash = window.location.hash.slice(1),
                            i = $.inArray(itemHash, itemsArray);

                        if (i > -1) {
                            menu.navMenu('expand', i);
                        }
                    }
                }
            });
        }

        function collapse() {
            var expandedMenuItem = menu.find('> .expand');
            if (expandedMenuItem.length && _checkRWD(995)) {
                menu.navMenu('collapse');
            }
        }
    }

    function toggleHomeHoverMenuViewMode() {
        var viewModeButton = $('#MidNav .bnt-view-mode-toggle');
        if (!viewModeButton.length) {
            return;
        }

        $.each(viewModeButton, function(){
            var viewModeButton = $(this);
            var hoverMenu = viewModeButton.parent('li').find('.hover-menu2');

            viewModeButton.on('click', function(e){
                e.preventDefault();
                viewModeButton.toggleClass('toggled');
                hoverMenu.toggleClass('hover-menu2-fancy hover-menu2-simple');
            });
        });
    }

    function toggleHomeHoverMenu2Menu() {
        var hoverMenu = $('#MidNav .hover-menu2');
        if (!hoverMenu.length) {
            return;
        }

        var runtime = {
            cssTransition: !ua('ie8') && !ua('ie9')
        };

        var item = hoverMenu.find('.item-menu');
        item.hover(hoverIn, hoverOut);

        item.on('focus', 'a', function(e){
            var item = $(e.delegateTarget);
            item.addClass('hover');

            var caption = item.find('.caption');
            var captionHeader = caption.find('.caption-header');
            var captionBody = caption.find('.caption-body');
            var bg = caption.find('.bg');
            caption.removeAttr('style');
            captionHeader.removeAttr('style');
            captionBody.removeAttr('style');
            bg.removeAttr('style');
        });
        item.on('keydown', 'a', function(e){
            var link = $(e.currentTarget);
            var item = $(e.delegateTarget);

            if (e.keyCode == 9) {
                if (e.shiftKey) {
                    if (link.is(item.find('a:first'))) {
                        item.removeClass('hover');
                    }
                }
                else {
                    if (link.is(item.find('a:last'))) {
                        item.removeClass('hover');
                    }
                }
            }
        });

        function hoverIn(e) {
            var item = $(this);
            var hoverMenu = item.closest('.hover-menu2-fancy');
            if (!hoverMenu.length) {
                return;
            }
            if (runtime.cssTransition) {
                item.addClass('hover');
                return;
            }

            var caption = item.find('.caption');
            var captionHeader = caption.find('.caption-header');
            var captionBody = caption.find('.caption-body');
            var bg = caption.find('.bg');

            var animate = {
                caption: {
                    height: '100%'
                },
                captionHeader: {
                    borderTopColor: 'transparent',
                    borderBottomColor: '#ffffff',
                    marginBottom: '5px'
                },
                captionBody: {
                    maxHeight: '100%'
                },
                bg: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    borderTopLeftRadius: '5px',
                    borderTopRightRadius: '5px'
                }
            };
            if ($('html').hasClass('ie8')) {
                animate = {
                    caption: {
                        height: '100%'
                    },
                    captionHeader: {
                        borderBottomWidth: '1px',
                        marginBottom: '5px'
                    },
                    captionBody: {
                        maxHeight: '100%'
                    }
                }
            }

            item.addClass('hover-in');
            caption.stop().animate(animate.caption);
            captionHeader.stop().animate(animate.captionHeader, function(){
                captionBody.stop().animate(animate.captionBody, function(){
                    item.addClass('hover');
                    item.removeClass('hover-in');
                });
            });

            bg.stop().animate(animate.bg);
        }

        function hoverOut(e) {
            var item = $(this);
            var hoverMenu = item.closest('.hover-menu2-fancy');
            if (!hoverMenu.length) {
                return;
            }

            item.removeClass('hover hover-in');
            if (runtime.cssTransition) {
                return;
            }

            var caption = item.find('.caption');
            var captionHeader = caption.find('.caption-header');
            var captionBody = caption.find('.caption-body');
            var bg = caption.find('.bg');

            var animate = {
                caption: {
                    height: '60px'
                },
                captionHeader: {
                    borderTopColor: '#ffffff',
                    borderBottomColor: 'transparent',
                    marginBottom: 0
                },
                bg: {
                    backgroundColor: 'transparent',
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0
                }
            };
            if ($('html').hasClass('ie8')) {
                animate = {
                    caption: {
                        height: '60px'
                    },
                    captionHeader: {
                        borderBottomWidth: 0,
                        marginBottom: 0
                    }
                }
            }

            captionBody.css({
                maxHeight: 0
            });

            caption.stop().animate(animate.caption, function(){
                caption.removeAttr('style');
            });
            captionHeader.stop().animate(animate.captionHeader, function(){
                captionHeader.removeAttr('style');
            });
            captionBody.stop().animate(animate.captionBody, function(){
                captionBody.removeAttr('style');
            });

            bg.stop().animate(animate.bg, function(){
                bg.removeAttr('style');
            });
        }
    }

    function toggleHomeHoverMenu2Link() {
        var hoverMenu = $('#MidNav .hover-menu2-fancy');
        if (!hoverMenu.length) {
            return;
        }

        var runtime = {
            cssTransition: !ua('ie8') && !ua('ie9'),
        };

        var item = hoverMenu.find('.item-link');
        item.hover(hoverIn, hoverOut);
        item.on('focus', hoverIn);
        item.on('blur', hoverOut);

        function hoverIn(e) {
            var item = $(this);
            var hoverMenu = item.closest('.hover-menu2-fancy');
            if (!hoverMenu.length) {
                return;
            }

            if (runtime.cssTransition) {
                item.addClass('hover');
                return;
            }

            var img = item.find('.thumbnail img');
            var animate = {
                img: {
                    opacity: 0.5
                }
            };

            img.stop().animate(animate.img, function(){
                item.addClass('hover');
            });
        }

        function hoverOut(e) {
            var item = $(this);
            var hoverMenu = item.closest('.hover-menu2-fancy');
            if (!hoverMenu.length) {
                return;
            }

            item.removeClass('hover');
            if (runtime.cssTransition) {
                return;
            }

            var img = item.find('.thumbnail img');
            var animate = {
                img: {
                    opacity: 1
                }
            };

            img.stop().animate(animate.img, function(){
                img.removeAttr('style');
            });
        }
    }

    function toggleHomeCarousel2() {
        var carousel = $('#HomeCarousel2 .owl-carousel');
        if (!carousel.length) {
            return;
        }

        carousel.on('initialized.owl.navigation', function(e){
            var nav = carousel.find('.owl-nav');
            var navPlayStop = $('<div class="owl-play-stop"></div>');
            navPlayStop.on('click', function(){
                if (navPlayStop.hasClass('stopped')) {
                    navPlayStop.removeClass('stopped');
                    carousel.trigger('play.autoplay.owl');
                }
                else {
                    navPlayStop.addClass('stopped');
                    carousel.trigger('stop.autoplay.owl');
                }
            });
            navPlayStop.insertAfter(nav.find('.owl-prev'));
        });
        carousel.owlCarousel({
            loop: true,
            margin: 15,
            nav: true,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            responsive:{
                0:{
                    items: 1
                },
                400:{
                    items: 2
                },				
                580:{
                    items: 3
                },
                768:{
                    items: 4
                },
                995: {
                    items: 4
                }
            }
        });
    }

    function toggleHomeNewReleasesEmbed() {
        var news = $('#HomeNewsReleases #NewsReleaseEmbed > dl');
        if (!news.length) {
            return;
        }

        news.newsReleasesEmbed({
            loadItem: news.data('count'),
            countryFilter: news.data('country'),
            jsonDataUrl: '/json/news-releases.json',
            itemTemplate: '<dt>{0}</dt><dd><ul class="LinkListStyle1"><li><a target="_parent" href="{2}"><strong class="Date">{0}</strong>{1}</a></li></ul></dd>',
            emptyTemplate: 'No news at the moment.'
        });
    }

   /* function toggleProductsServicesHoverMenu2Link() {
        var menu = $('#ProductServices .hover-menu2-plus');
        if (!menu.length) {
            return;
        }

        var runtime = {
            cssTransition: !ua('ie8') && !ua('ie9'),
            ios: ua('ios')
        }; */

        var item = menu.find('.item-link');
        item.hover(hoverIn, hoverOut);
        item.on('focus', hoverIn);
        item.on('blur', hoverOut);

        function hoverIn(e) {
            if (runtime.ios) {
                return;
            }

            var item = $(this);

            if (runtime.cssTransition) {
                item.addClass('hover');
                return;
            }

            var img = item.find('.thumbnail img');
            var animate = {
                img: {
                    opacity: 0.5
                }
            };

            img.stop().animate(animate.img, function(){
                item.addClass('hover');
            });
        }

        function hoverOut(e) {
            if (runtime.ios) {
                return;
            }

            var item = $(this);

            item.removeClass('hover');
            if (runtime.cssTransition) {
                return;
            }

            var img = item.find('.thumbnail img');
            var animate = {
                img: {
                    opacity: 1
                }
            };

            img.stop().animate(animate.img, function(){
                img.removeAttr('style');
            });
        }
    }

   /* function toggleProductsServicesAccordion() {
        var menu = $('#ProductServices .hover-menu2-plus');
        if (!menu.length) {
            return;
        }
        menu.addClass('accordion');

        var thumbnail = menu.find('.item:not(.item-link) .thumbnail');
        thumbnail.on('click', function(e){
            var thumbnail = $(this);
            var item = thumbnail.closest('.item');
            var captionHeader = item.find('.caption-header');
            captionHeader.trigger('click');
        }); */

        var captionHeader = menu.find('.item:not(.item-link) .caption-header');
        captionHeader.on('click', function(e){
            if (!_checkRWD(400)) {
                return;
            }

            var captionHeader = $(this);
            var item = captionHeader.closest('.item');
            var activeItem = menu.find('.item.active');

            if (item.hasClass('active')) {
                close(item);
            }
            else {
                var scrollTo = item.offset().top;

                if (activeItem.length) {
                    if (scrollTo > activeItem.offset().top) {
                        scrollTo -= activeItem.find('.caption-body').height();
                    }
                    close(activeItem);
                }

                $('body, html').animate({
                    scrollTop: scrollTo
                }, 300);

                open(item);
            }

            function open(item) {
                item.addClass('active');

                var captionBody = item.find('.caption-body');
                captionBody.slideDown(300);
            }

            function close(item) {
                item.removeClass('active');

                var captionBody = item.find('.caption-body');
                captionBody.slideUp(300, function(e){
                    captionBody.removeAttr('style');
                });
            }
        });

        var captionBody = menu.find('.caption-body');
    }

    function toggleProductSlider() {
        var slider = $('.ProductSlider .owl-carousel');
        if (!slider.length) {
            return;
        }

        slider.imagesLoaded()
        .done(function() {
            slider.on('initialized.owl.navigation', function (e) {
                refreshDotsPosition();
                refreshNavPosition();
                addPlayStopButton(e.item.count);
            });
            slider.owlCarousel({
                items: 1,
                loop: true,
                nav: true,
                //animateOut: 'fadeOut',
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: true
            });
            slider.on('refreshed.owl.carousel', function (e) {
                refreshDotsPosition();
                refreshNavPosition();
            });
        });

        function refreshDotsPosition() {
            var dots = slider.find('.owl-dots');
            var thumbnail = slider.find('.owl-item:not(.cloned) .SlideThumbnail');

            dots.css({top: thumbnail.height() - dots.height()});
        }

        function refreshNavPosition() {
            var nav = slider.find('.owl-prev, .owl-next');
            var thumbnail = slider.find('.owl-item:not(.cloned) .SlideThumbnail');

            nav.css({top: thumbnail.height()/2});
        }

        function addPlayStopButton(count) {
            if (count <= 1) {
                return;
            }

            var playStop = $('<div class="owl-play-stop">&#9612;&#9612; Pause</div>');
            playStop.on('click', function(e){
                if (playStop.hasClass('stopped')) {
                    playStop.removeClass('stopped');
                    playStop.html('&#9612;&#9612; Pause');
                    slider.trigger('play.autoplay.owl');
                }
                else {
                    playStop.addClass('stopped');
                    playStop.html('&#9654; Play');
                    slider.trigger('stop.autoplay.owl');
                }
            });
            playStop.insertAfter(slider);
        }
    }

    function toggleProductTabs() {
        var tabs = $('.ProductTabs');
        if (!tabs.length) {
            return;
        }

        var nav = tabs.find('> .tabs-nav');
        var content = tabs.find('> .tabs-content');
        var tab = content.find('> .tab');

        nav.on('click', 'a', function(e){
            e.preventDefault();

            var link = $(this);
            var tabId = link.attr('href').substr(1);

            show(tabId, {updateUrl: true});
        });

        content.on('click', '> .tab > .tab-header > h2', function(e){
            if (!_checkRWD(995)) {
                return;
            }

            var h2 = $(this);
            var tab = h2.closest('.tab');
            var tabId = tab.data('id');

            show(tabId, {updateUrl: true});
        });

        tab.each(function(){
            var tab = $(this);
            tab.attr('data-id', tab.attr('id'));
            tab.removeAttr('id');
        });

        init();
        function init(){
            var id = window.location.hash.substr(1);
            if (id) {
                show(id);
            }
        };

        function show(id, options) {
            options = $.extend({
                updateUrl: false
            }, options);

            var tab = content.find('> [data-id=' + id + ']');
            var link = nav.find('> li > a[href="#' + id + '"]');
            var li = link.parent();

            if (li.hasClass('active')) {
                return;
            }

            if (_checkRWD(995)) {
                var tabBody = tab.find('> .tab-body');
                tabBody.slideDown(300, function(e){
                    tabBody.removeAttr('style');
                });

                var activeTab = tab.siblings('.active');
                var activeTabBody = activeTab.find('> .tab-body');
                activeTabBody.css({display: 'block'});
                activeTabBody.slideUp(300, function(e){
                    activeTabBody.removeAttr('style');
                });
            }
            else {
                tab.hide();
                tab.fadeIn(300, function(){
                    tab.removeAttr('style');
                });
            }

            activate(li);
            activate(tab);

            if (options.updateUrl) {
                window.location.hash = '#' + id;
            }
        }

        function activate(el) {
            el.addClass('active').siblings(el.prop('tagName')).removeClass('active');
        }
    }

    function toggleProductMilestoneTabs() {
        var tabs = $('.ProductMilestonesTabs');
        if (!tabs.length) {
            return;
        }

        var nav = tabs.find('> .tabs-nav');
        var content = tabs.find('> .tabs-content');
        var tab = content.find('> .tab');

        nav.on('click', 'a', function(e){
            e.preventDefault();

            var link = $(this);
            var tabId = link.attr('href').substr(1);
            show(tabId);
        });

        function show(id) {
            var tab = content.find('#' + id);
            var link = nav.find('[href="#' + id + '"]');
            var li = link.parent();

            if (li.hasClass('active')) {
                return;
            }


            tab.hide();
            tab.fadeIn(300, function(){
                tab.removeAttr('style');
            });

            activate(li);
            activate(tab);
        }

        function activate(el) {
            el.addClass('active').siblings(el.prop('tagName')).removeClass('active');
        }
    }

    function toggleProductNavAccordion() {
        var accordion = $('#ProductNav #accordian');
        if (!accordion.length) {
            return;
        }

        new tabpanel(accordion.attr('id'));
    };

    function togglePressNewsReleases() {
        var news = $('#PressNewsReleases #NewsRelease > dl');
        if (!news.length) {
            return;
        }

        var countriesNav = $('#NewsCountriesNav');
        var loadPreviousButton = $('#NewsLoadPrevious');
        var loadMoreButton = $('#NewsLoadMore');

        news.newsReleases({
            itemInView: 25,
            loadItem: 25,
            inputDateFormat: 'M dd, yy',   // using jquery UI datepicker format
            outputDateFormat: 'M dd, yy',
            jsonDataUrl: '/json/news-releases.json',
            yearsSelector: '.NewsYearsNav',
            yearActiveClass: 'active',
            loadPreviousId: loadPreviousButton.attr('id'),
            loadMoreId: loadMoreButton.attr('id'),
            itemTemplate: '<dt>{0}</dt><dd><ul class="LinkListStyle1"><li><a target="_parent" href="{2}"><strong class="Date">{0}</strong><p class="Title">{1}</p></a></li></ul></dd>',
            emptyTemplate: 'No news at the moment.',
            afterInit: function() {
                var country = window.location.hash.substr(1);
                if (country) {
                    activeCountry.text(country);

                    news.newsReleases('countryFilter', {
                        countryFilter: country
                    });
                    activate(countriesNav.find('[data-country=' + country + ']').parent());
                }
            }
        });

        countriesNav.on('click', '[data-country]', function(e){
            var link = $(this);

            countriesNav.removeClass('toggled');
            activeCountry.text(link.data('country'));

            news.newsReleases('countryFilter', {
                countryFilter: link.data('country')
            });
            activate(link.parent());
        });

        loadPreviousButton.on('click', function(e) {
            e.preventDefault();

            news.newsReleases('LoadPrevious');
        });

        loadMoreButton.on('click', function(e) {
            e.preventDefault();

            news.newsReleases('loadMore');
        });

        var activeCountry = $('#NewsActiveCountry');
        var countriesNavToggle = $('#NewsCountriesNavToggle');
        countriesNavToggle.on('click', function(e){
            e.preventDefault();

            countriesNav.toggleClass('toggled');
        });

        var newsYearsNav = $('#NewsYearsNav');
        var newsYearsNav2 = $('#NewsYearsNav2');
        newsYearsNav.scroll(function(e){
            newsYearsNav2.prop({
                scrollTop: newsYearsNav.scrollTop(),
                scrollLeft: newsYearsNav.scrollLeft()
            });
        });
        newsYearsNav2.scroll(function(e){
            newsYearsNav.prop({
                scrollTop: newsYearsNav2.scrollTop(),
                scrollLeft: newsYearsNav2.scrollLeft()
            });
        });

        function activate(el) {
            el.addClass('active').siblings(el.prop('tagName')).removeClass('active');
        }
    }

    function decorateIE8() {
        if (!$('html').hasClass('ie8')) {
            return;
        }

        var whiteRadiusTL = '<div class="ie8-br ie8-br-white ie8-br-tl"></div>';
        var whiteRadiusTR = '<div class="ie8-br ie8-br-white ie8-br-tr"></div>';
        var whiteRadiusBL = '<div class="ie8-br ie8-br-white ie8-br-bl"></div>';
        var whiteRadiusBR = '<div class="ie8-br ie8-br-white ie8-br-br"></div>';
        var whiteRadius= whiteRadiusTL + whiteRadiusTR + whiteRadiusBL + whiteRadiusBR;

        var greyRadiusTL = '<div class="ie8-br ie8-br-grey ie8-br-tl"></div>';
        var greyRadiusTR = '<div class="ie8-br ie8-br-grey ie8-br-tr"></div>';
        var greyRadiusBL = '<div class="ie8-br ie8-br-grey ie8-br-bl"></div>';
        var greyRadiusBR = '<div class="ie8-br ie8-br-grey ie8-br-br"></div>';
        var greyRadius= greyRadiusTL + greyRadiusTR + greyRadiusBL + greyRadiusBR;

        $('.hover-menu2 .item .thumbnail').append(whiteRadius);
        $('.hover-menu2 .item .caption .bg').append(whiteRadiusBL + whiteRadiusBR);

        $('#MidNav .nav-menu .bg-switch').append(greyRadius);
        $('#MidNav .nav-menu .item').append(greyRadius);

    }

    removeNoJS();
    $(document).ready(function(){
        toggleHomeNavMenu();
        toggleHomeHoverMenuViewMode();
        toggleHomeHoverMenu2Menu();
        toggleHomeHoverMenu2Link();
        toggleHomeCarousel2();
        toggleHomeNewReleasesEmbed();
        /*toggleProductsServicesHoverMenu2Link();*/
        /*toggleProductsServicesAccordion();*/
        toggleProductSlider();
        toggleProductTabs();
        toggleProductMilestoneTabs();
        toggleProductNavAccordion();
        togglePressNewsReleases();

        decorateIE8();
    });
	

})(jQuery);