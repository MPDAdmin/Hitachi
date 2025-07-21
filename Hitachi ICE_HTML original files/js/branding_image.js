//
// branding_image.js
//
// 2012.02.29
//


//
// Definition
//

// Controller
var
	CONTROL_POS_RIGHT_TOP = 'rt',		// right-top
	CONTROL_POS_LEFT_BOTTOM = 'lb',		// left-bottom
	CONTROL_POS_RIGHT_BOTTOM = 'rb';	// right-bottom

//
// Initialization
//
var
	// Slide image
	slideID = 'BrandingImgStyle1',
	// Controller visible (true:visible^false:hidden)
	showControl = true,
	// Controller position
	controlPos = CONTROL_POS_RIGHT_BOTTOM,
	// Controller image oath
	controlImagePath = '/ice/branding_image/image/',
	// interval(sec)
	interval = 4,
	// duration(sec)
	duration = 1,
	// slideWidth(px)
	slideWidth = 965,
	// slideHeight(px)
	slideHeight = 300,
	// listiimage, text, link, trakingj
	slides = new Array();	


// run
$(function(){

	//
	// Initialization
	//
	
	//
	// Configuration file
	//
	var
		CONTROL_IMAGE_FILE = 'btn_ctl',				//
		CONTROL_IMAGE_FILE_PLAY = 'btn_play',	//
		CONTROL_IMAGE_FILE_STOP = 'btn_stop',	// 
		CONTROL_IMAGE_EXT = '.png',						// 
		CONTROL_IMAGE_WIDTH = 24,							// 
		CONTROL_IMAGE_HEIGHT = 24,						// 
		CONTROL_IMAGE_ACTIVE_SUFFIX = '_cr',	// 
		CONTROL_IMAGE_HOVER_SUFFIX = '_on';		// 

	// 
	var
		CLASS_IMAGE_BOX = 'branding-image',	// 
		CLASS_SLIDE = 'slide',							// 
		CLASS_CONTROLLER = 'controller',		// 
		CLASS_ACTIVE = 'active',						// 
		CLASS_FOCUS = 'focus',							// 
		CLASS_PAUSE = 'pause';							// 
		

	// 
	var
		TEXT_PAUSE = 'stop',	// 
		TEXT_PLAY = 'play';				// 

	// 
	var
		DATA_INDEX = 'index';			// 


	//
	// 
	//
	var
		activeIndex = 0,				// 
		playing = true,					// 
		intervalID;							// 


	//
	// 
	//

	// 
	var $slideID = $('#' + slideID)
		.addClass(CLASS_IMAGE_BOX)
		.width(slideWidth)
		.height(slideHeight);


	//
	// 
	//
	function sendTraking(index) {
		var trackingData = slides[index - 1].traking;
		if ((trackingData != undefined) && (typeof dcsMultiTrack == 'function')) {
			dcsMultiTrack(
				'DCS.dcsuri', trackingData.uri,
				'WT.ti', trackingData.ti,
				'WT.dl', trackingData.dl,
				'WT.BannerID', trackingData.id
			);
		}	
	}


	//
	//
	//
	if (slides.length > 1) {

		// 
		var $controlList = $slideID
			.append(format('<ul class="{0} {1}"></ul>', CLASS_CONTROLLER, controlPos))
			.find('ul:last-child');


	// 

		// 
		function hoverIn() {
			var $this = $(this);
			$controlList.removeClass(CLASS_FOCUS)
			$this.addClass(CLASS_FOCUS);
			// 
			if ($this.data(DATA_INDEX)) {
				stopTimer();
				showPage($this.data(DATA_INDEX), true);
			};
			setImageSrc($this);
		}
		// 
		function hoverOut() {
			var $this = $(this);
			$this.removeClass(CLASS_FOCUS);
			setImageSrc($this);
			if (playing) {
				startTimer();
			}
		}

		// 
		$(format('<li><a href="#"><img src="{0}" alt="{1}" width="{2}" height="{3}" /></a></li>',
							getImageFileName(0), TEXT_PAUSE, CONTROL_IMAGE_WIDTH, CONTROL_IMAGE_HEIGHT))
			.appendTo($controlList)
			.find('a:last-child')
			.data(DATA_INDEX, 0)
			.bind('focusin mouseover', hoverIn)
			.bind('focusout mouseout', hoverOut)
			.click(function(){
				var $this = $(this);
				$this.toggleClass(CLASS_PAUSE);
				playing = !$this.hasClass(CLASS_PAUSE);
				$this.find('img').attr({
					'src':getImageFileName(0, CLASS_FOCUS),
					'alt':playing ? TEXT_PAUSE : TEXT_PLAY
				});
				if (playing) {
					startTimer();
				} else {
					stopTimer();
				}
				return false;
			});

		if (showControl) {
			// 
			$.each(slides, function(index, value) {
				$(format('<li><a href="{0}"><img src="{1}" alt="{2}" width="{3}" height="{4}" /></a></li>',
									value.link, getImageFileName(index + 1), value.text, CONTROL_IMAGE_WIDTH, CONTROL_IMAGE_HEIGHT))
					.appendTo($controlList)
					.find('a:last-child')
					.data(DATA_INDEX, index + 1)
					.bind('focusin mouseover', hoverIn)
					.bind('focusout mouseout', hoverOut)
					.click(function(){
						sendTraking($(this).data(DATA_INDEX));
					})
			});
			// 
			$controlList = $slideID.find('.' + CLASS_CONTROLLER + ' a');
		}
	}

	// 
	function getImageFileName(index, status) {
		var fileName = controlImagePath;
		if (index) {
			fileName += CONTROL_IMAGE_FILE + index;			
		} else {
			if (playing) {
				fileName += CONTROL_IMAGE_FILE_STOP;
			} else {
				fileName += CONTROL_IMAGE_FILE_PLAY;
			}
		}
		switch (status) {
			case CLASS_ACTIVE:
				fileName += CONTROL_IMAGE_ACTIVE_SUFFIX;
				break;
			case CLASS_FOCUS:
				fileName += CONTROL_IMAGE_HOVER_SUFFIX;
				break;
		}
		fileName += CONTROL_IMAGE_EXT;
		return fileName;
	}

	// 
	function setImageSrc($anchorObj) {
		var status = '';
		if ($anchorObj.hasClass(CLASS_FOCUS)) {
			status = CLASS_FOCUS;
		} else if ($anchorObj.hasClass(CLASS_ACTIVE)) {
			status = CLASS_ACTIVE;
		}
		$anchorObj
			.find('img')
			.attr('src', getImageFileName($anchorObj.data(DATA_INDEX), status));
	}

	//
	// 
	//
	var $slideList = $slideID
		.append(format('<div class="{0}"></div>', CLASS_SLIDE))
		.find('div:last-child');
	$.each(slides, function(index, value) {
		$(format('<a href="{0}"><img src="{1}" alt="{2}" width="{3}" height="{4}" /></a>',
							value.link, value.image, value.text, slideWidth, slideHeight))
			.width(slideWidth)
			.height(slideHeight)
			.appendTo($slideList)
			.data(DATA_INDEX, index + 1)
			.click(function(){
				sendTraking($(this).data(DATA_INDEX));
			})
	});
	// 
	$slideList = $slideID.find('.' + CLASS_SLIDE + ' a');


	//
	// 
	//

	// 
	function showPage(index) {
		if (index == activeIndex) return;
		// 
		if (showControl && $controlList) {
			$controlList
				.removeClass(CLASS_ACTIVE)
				.eq(index)
				.addClass(CLASS_ACTIVE);
			$.each($controlList, function(index) {
				if (index) {
					setImageSrc($(this));
				}
			});
		}
		// 
		$slideList
			.eq(activeIndex - 1)
			.stop(true,true)
			.fadeOut(duration * 1000);
		activeIndex = index;
		$slideList
			.eq(index - 1)
			.fadeIn(duration * 1000);
	}


	//
	// 
	//

	// 
	function startTimer() {
		if (playing) {
			clearInterval(intervalID);
			intervalID = setInterval(function(){
				var index = activeIndex + 1;
				if (index > slides.length) {
					index = 1;
			}
				showPage(index);
			}, (interval + duration) * 1000);
		}
	}
	// 
	function stopTimer() {
		clearInterval(intervalID);
	}


	//
	// 
	//

	// 
	showPage(1);
	startTimer();


	//
	//
	//

	//
	//
	//
	//
	//
	function format(fmt, arg) {
		var fn = undefined;
		if ($.isPlainObject(arg)) {
			fn = function(str, part) { return arg[part]; }
		} else {
			var args = arguments;
			fn = function(str, part) { return args[parseInt(part)+1] }
		}
		return fmt.replace(/\{(\w+)\}/g, fn);
	}

})

// eof.
