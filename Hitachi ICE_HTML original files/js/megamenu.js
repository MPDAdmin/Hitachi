/* **************************************************

Name: sib_megamenu.js

Description: JavaScript for Megamenu

Create: 2018.06.28
Update: 2020.11.24 / 2020.12.23

Copyright 2018 Hitachi, Ltd.

***************************************************** */




;(function($) {




// config


var html = '<dl id="MegaMenu">';
html += '<div style="position: relative;color: black !important;z-index: 9 !important;width: 965px;height: 35px;margin: -20px auto;text-align: right;font-size: 11px;"><a href="https://www.hitachi.com.vn/ice/aircompressor/" target="_blank">Visit Air Compressor Page in Vietnamese</a></div>';
html += '<dt class="MMGlobalNaviStyle Mega"><a href="https://www.hitachi.com.vn/eng/ice/aircompressor/index.html">Air Compressor</a></dt>';
html += '<dd class="MMSet">';
html += '<div class="MM2Container">';
html += '<ul class="MM2ColumnArea">';
html += '<li class="MMGrid1 MMFirstItem"><p class="MMBannerLinkStyle"><a href="https://www.hitachi.com.vn/eng/ice/aircompressor/osp.html"><img src="https://www.hitachi.com.vn/eng/ice/aircompressor/images/osp.jpg" width="230" height="100" alt="Hitachi in Singapore"><strong><span>Oil Flooded Screw Compressor</span></strong></a></p></li>';
html += '<li class="MMGrid1 MMFirstItem"><p class="MMBannerLinkStyle"><a href="https://www.hitachi.com.vn/eng/ice/aircompressor/dsp.html"><img src="https://www.hitachi.com.vn/eng/ice/aircompressor/images/dsp.jpg" width="230" height="100" alt="Hitachi in Singapore"><strong><span>Oil Free Screw Compressor</span></strong></a></p></li>';
html += '<li class="MMGrid1 MMFirstItem"><p class="MMBannerLinkStyle"><a href="https://www.hitachi.com.vn/eng/ice/aircompressor/pc.html"><img src="https://www.hitachi.com.vn/eng/ice/aircompressor/images/pc.jpg" width="230" height="100" alt="Hitachi in Singapore"><strong><span>Piston Compressor</span></strong></a></p></li>';
html += '<li class="MMGrid1 MMFirstItem"><p class="MMBannerLinkStyle"><a href="https://www.hitachi.com.vn/eng/ice/aircompressor/scroll.html"><img src="https://www.hitachi.com.vn/eng/ice/aircompressor/images/scroll.jpg" width="230" height="100" alt="Hitachi in Singapore"><strong><span>Scroll Compressor</span></strong></a></p></li>';
html += '<li class="MMGrid1 MMFirstItem"><p class="MMBannerLinkStyle"><a href="https://www.hitachi.com.vn/eng/ice/aircompressor/auxiliaries.html"><img src="https://www.hitachi.com.vn/eng/ice/aircompressor/images/auxiliaries.jpg" width="230" height="100" alt="Hitachi in Singapore"><strong><span>Auxiliaries</span></strong></a></p></li>';

html += '</ul><!--/MM2ColumnArea-->';
html += '</div><!--/MM2Container-->';
html += '</dd><!--/MMSet-->';

html += '<dt class="MMGlobalNaviStyle  Mega"><a href="https://www.hitachi.com.vn/eng/ice/aircompressor/profile.html">About Us</a></dt>';
html += '<dd class="MMSet">';
html += '<div class="MM2Container">';
html += '<ul class="MM2ColumnArea">';
html += '<li class="MMGrid1 MMFirstItem"><p class="MMBannerLinkStyle"><a href="https://www.hitachi.com.vn/eng/ice/aircompressor/profile.html"><strong><span>Company Profile</span></strong></p></a></li>';
html += '<li class="MMGrid1 MMFirstItem"><p class="MMBannerLinkStyle"><a href="https://www.hitachi.com.vn/eng/ice/aircompressor/history.html"><strong><span>Hitachi Compressor History</span></strong></a></p></li>';
html += '</ul><!--/MM2ColumnArea-->';
html += '</div><!--/MM2Container-->';
html += '</dd><!--/MMSet-->';
html += '<dt class="MMGlobalNaviStyle"><a href="https://www.hitachi.asia/ice/news/index.html">News</a></dt>';
html += '<dt class="MMGlobalNaviStyle"><a href="https://www.hitachi.com.vn/eng/ice/aircompressor/contact.html">Contact Us</a></dt>';
html += '</dl>';


var _megaMenuEnabled = false;




// init


function initMegaMenu() {
	
	$("html").addClass("OptionRWD");
	
	$("#GlobalNaviTop").after(html).find("li").each(function(i) {
		if ($(this).hasClass("Current")) {
			var $this = $(".MMGlobalNaviStyle").eq(i);
			$this.addClass("Current");
			if ($(this).find("strong")[0]) {
				$this.find("a").html("<strong>" + $this.text() + "</strong>");
			} else if ($(this).find("em")[0]) {
				$this.find("a").html("<em>" + $this.text() + "</em>");
			}
		}
	}).parent().remove();
	
	var gn = "";
	$(".MMGlobalNaviStyle").each(function() {
		gn += '<li' + ($(this).hasClass("Current") ? ' class="Current"' : '') + '>' + $(this).html() + '</li>';
	});
	gn = '<ul id="GlobalNaviTopSP">' + gn + '</ul>';
	$("#GlobalNaviTopSP").remove(); // already added by responsive.js - from HTML
	$("#GlobalNaviSP").prepend(gn); // add again - from this file config
	
	if ($("#HorizontalLocalNavi")[0]) {
		var hln = '<ul id="HorizontalLocalNaviSP">';
		hln += $("#HorizontalLocalNavi").html();
		hln += '</ul>';
		$("#GlobalNaviTopSP li.Current").append(hln);
	}
	
	$("#MegaMenu .MMGlobalNaviStyle a strong").parent().addClass("Strong");
	
	$("#SiteIdentity").addClass("WithMMGlobalNaviStyle");
	
	var innerHTML = $("#MegaMenu").html();
	$("#MegaMenu").replaceWith('<div id="MegaMenu">' + innerHTML + '</div>');
	
	var id = 0;
	
	$("#MegaMenu .MMGlobalNaviStyle").each(function() {
		
		var set = $(this).next(".MMSet");
		
		if (set[0]) {
			
			$(this).addClass("MMSetMenu");
			
			set.attr({id: "MMSetMenu" + id});
			id++;
			
			$(this).add(set).wrapAll('<dl class="MMSetArea" />');
			
		} else {
			
			var innerHTML = $(this).html();
			var current = $(this).hasClass("Current") ? " Current" : "";
			$(this).replaceWith('<dl><dt class="MMGlobalNaviStyle' + current + '">' + innerHTML + '</dt></dl>');
			
		}
		
	});
	
	if (id > 0) {
		
		$(window).on("resize", initMegaMenu_PC);
		
		initMegaMenu_PC();
		initMegaMenu_SP();
		
	}
	
}




// PC


function initMegaMenu_PC() {
	
	
	if ($("#MegaMenu .MMGlobalNaviStyle").eq(0).css("float") == "none") {
		
		if (_megaMenuEnabled) {
			
			$("#MegaMenu .MMSetArea").off();
			$("#MegaMenu .MMGlobalNaviStyle a").off();
			$("#MegaMenu .MMSet").find("a:last").off();
			
			_megaMenuEnabled = false;
			
		}
		
		return;
		
	} else if (_megaMenuEnabled) {
		
		return;
		
	}
	
	_megaMenuEnabled = true;
	
	var megaMenuActiveId = "MMSetMenu0";
	var hideTimer;
	
	var hasHolLocNav = !!($("#HorizontalLocalNavi")[0]);
	
	
	// mouse
	
	$("#MegaMenu .MMSetArea").on("mouseenter", function() {
		
		clearTimeout(hideTimer);
		
		var top = hasHolLocNav ? $("#GlobalNavi").height() - $("#HorizontalLocalNavi").height() : $("#GlobalNavi").height();
		var thisId = $(this).children(".MMSet").attr("id");
		var thisH = $("#" + thisId).css({height: "auto"}).height();
		var currentH = (thisId == megaMenuActiveId) ? 0 : $("#" + megaMenuActiveId).height();
		
		$("#" + megaMenuActiveId).hide().css({ height: 0 });
		$("#" + thisId).css({ top: top, height: currentH }).show().stop().animate({ height: thisH }, 300, "easeOutQuart");
		
		$(this).find(".MMGlobalNaviStyle a").addClass("Active");
		
		megaMenuActiveId = thisId;
		
	}).on("mouseleave", function() {
		
		var $this = $(this);
		$this.find(".MMGlobalNaviStyle a").removeClass("Active");
		
		hideTimer = setTimeout(function() {
			hideMenu($this);
		}, 100);
		
	});
	
	function hideMenu($menu) {
		
		$menu.children(".MMSet").stop().animate({height: 0}, 200, "easeOutQuad", function() {
			$(this).hide();
		});
		
	}
	
	
	// tab key
	
	$("#MegaMenu .MMGlobalNaviStyle a").on("focus", function() {
		
		if ($(this).hasClass("Active")) {
			return;
		}
		
		$("#" + megaMenuActiveId).stop();
		
		var top = hasHolLocNav ? $("#GlobalNavi").height() - $("#HorizontalLocalNavi").height() : $("#GlobalNavi").height();
		var thisId = $(this).parents(".MMSetArea").children(".MMSet").attr("id");
		var thisH = $("#" + thisId).css({height: "auto"}).height();
		var currentH = (thisId == megaMenuActiveId) ? 0 : $("#" + megaMenuActiveId).height();
		
		$("#" + megaMenuActiveId).hide().css({height: 0});
		$("#" + thisId).css({top: top, height: currentH}).show().animate({height: thisH}, 300, "easeOutQuart");
		$(this).addClass("Active");
		
		megaMenuActiveId = thisId;
		
	}).on("keydown", function(e) {
		
		if (e.shiftKey && e.keyCode == 9) {
			$(this).removeClass("Active");
			$("#" + megaMenuActiveId).animate({height: 0}, 200, "easeOutQuad", function() {
				$(this).hide();
			});
		}
		
	});
	
	$("#MegaMenu .MMSet").each(function() {
		
		$(this).find("a:last").on("keydown", function(e) {
			
			if (!e.shiftKey && e.keyCode == 9) {
				$(this).parents(".MMSetArea").find(".MMGlobalNaviStyle a").removeClass("Active");
				$("#" + megaMenuActiveId).animate({height: 0}, 200, "easeOutQuad", function() {
					$(this).hide();
				});
			}
			
		});
		
	});
	
	
}




// SP


function initMegaMenu_SP() {
	
	var $pc = $("#MegaMenu dt");
	var $sp = $("#GlobalNaviTopSP > li");
	var action = false;
	
	$pc.each(function(i) {
		
		var $dd = $(this).next("dd");
		
		if ($dd[0]) {
			var html = '<button class="MegaMenuSpBtn"><span>Open</span></button><div class="MegaMenuSP"><ul>' + $dd.find("ul").html() + '</ul></div>';
			$sp.eq(i).addClass("hasMegaMenuSP").append(html);
		}
		
	});
	
	$(".MegaMenuSpBtn").on("click", function() {
		
		if (action) return;
		action = true;
		
		var $menu = $(this).next();
		var menuH = $menu.children().height();
		var navH = $("#UltraGlobalNavi").height();
		
		if ($(this).hasClass("open")) {
			
			$(this).removeClass("open");
			$menu.css({ height: 0 });
			
			navH -= menuH;
			
		} else {
			
			$(this).addClass("open");
			$menu.css({ height: menuH });
			
			navH += menuH;
			
		}
		
		$("#UltraGlobalNavi").animate({ height: navH }, 300);
		$("#HeaderArea").animate({ marginBottom: navH }, 300, function() {
			action = false;
		});
		
	});
	
	$(".BtnOpen a").on("click", function() {
		
		if ($("#HeaderArea").attr("style")) {
			$(".MegaMenuSpBtn.open").removeClass("open");
			$(".MegaMenuSP").css({ height: 0 });
		}
		
		return false;
		
	});
	
}




// on DOM ready

$(function() {
	
	initMegaMenu();
	
});




})(jQuery);