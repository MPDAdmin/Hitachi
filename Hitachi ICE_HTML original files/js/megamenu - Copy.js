var mm='<dl id="MegaMenu">';
mm += '<dt class="MMGlobalNaviStyle"><a href="index.html">Air Compressor</a></dt>';
mm += '<dd class="MMSet">';
mm += '<div class="MMColumnArea">';
mm += '<div class="MMGrid1 MMFirstItem">';
mm += '<p class="MMBannerLinkStyle"><a href="osp.html"><img src="images/osp.jpg" width="230" height="100" alt="Hitachi in Singapore"><strong><span>Oil Flooded Screw Compressor</span></strong></a></p>';
mm += '</div><!--/MMGrid1-->';
mm += '<div class="MMGrid1">';
mm += '<p class="MMBannerLinkStyle"><a href="dsp.html"><img src="images/dsp.jpg" width="230" height="100" alt="Hitachi in Singapore"><strong><span>Oil Free Screw Compressor</span></strong></a></p>';
mm += '</div><!--/MMGrid1-->';
mm += '<div class="MMGrid1">';
mm += '<p class="MMBannerLinkStyle"><a href="pc.html"><img src="images/pc.jpg" width="230" height="100" alt="Hitachi in Singapore"><strong><span>Piston Compressor</span></strong></a></p>';
mm += '</div><!--/MMGrid1-->';
mm += '<div class="MMGrid1">';
mm += '<p class="MMBannerLinkStyle"><a href="scroll.html"><img src="images/scroll.jpg" width="230" height="100" alt="Hitachi in Singapore"><strong><span>Scroll Compressor</span></strong></a></p>';
mm += '</div><!--/MMGrid1-->';
mm += '<div class="MMGrid1">';
mm += '<p class="MMBannerLinkStyle"><a href="auxiliaries.html"><img src="images/auxiliaries.jpg" width="230" height="100" alt="Hitachi in Singapore"><strong><span>Auxiliaries</span></strong></a></p>';
mm += '</div><!--/MMGrid1-->';
mm += '</div><!--/MMColumnArea-->';
mm += '</dd><!--/MMSet-->';
mm += '<dt class="MMGlobalNaviStyle"><a href="profile.html">About Us</a></dt>';
mm += '<dd class="MMSet">';
mm += '<div class="MMColumnArea">';
mm += '<div class="MMGrid1 MMFirstItem">';
mm += '<p class="MMBannerLinkStyle"><a href="profile.html"><strong><span>Company Profile</span></strong></a></p>';
mm += '</div><!--/MMGrid1-->';
mm += '<div class="MMGrid1">';
mm += '<p class="MMBannerLinkStyle"><a href="history.html"><strong><span>Hitachi Compressor History</span></strong></a></p>';
mm += '</div><!--/MMGrid1-->';
mm += '</div><!--/MMColumnArea-->';
mm += '</dd><!--/MMSet-->';
mm += '<dt class="MMGlobalNaviStyle"><a href="https://www.hitachi.asia/ice/news/index.html" target="_blank">News</a></dt>';
mm += '<dt class="MMGlobalNaviStyle"><a href="contact.html">Contact Information</a></dt>';
mm += '</dl>';

$("#GlobalNaviTop").after(mm).find("li").each(function(i) {
	if($(this).hasClass("Current")) {
		var $this = $(".MMGlobalNaviStyle").eq(i);
		$this.addClass("Current");
		if($(this).find("strong")[0]) {
			$this.find("a").html("<strong>" + $this.text() + "</strong>");
		} else if($(this).find("em")[0]) {
			$this.find("a").html("<em>" + $this.text() + "</em>");
		}
	}
}).parent().remove();
