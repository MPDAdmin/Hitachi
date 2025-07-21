// Requires jQuery

Tabs = {
  // Changes to the tab with the specified ID.
  GoTo: function (contentId, skipReplace) {
    
    // Change current active tab
    $('.toc li.current').removeClass('current');
    $('.toc li a[href="#' + contentId + '"]').parent().addClass('current');
    
    // Change current active content 
    $('.tabs_container .tabcontent').hide();
    $('.tabs_container .tabcontent').filter('#_' + contentId).show();
  
    // Change the address bar.
    if (!skipReplace) window.location.replace("#" + contentId);
  },

  Init: function () {

    var contentId,
      tabList = [],
      hash = window.location.hash.substring(1); 
      // Hash starts with second character
      // Underscore in "_hash" content ID parameter prevents scroll on load
    
    // Array of tabs  
    $('.tabs_container .toc li a').each(function(){
      tabList.push($(this).attr('href').split('#')[1]);
    });
    
    // If there's a URL hash and it's in the array, activate it
    if ( (window.location.hash) && ($.inArray(hash,tabList) != -1) ) {
      contentId = hash;
    }
    // If the URL hash is not in the array, activate the first tab
    else {
      contentId = $('.toc li a:first').attr('href').split('#')[1];
    }
    
    if (contentId) Tabs.GoTo(contentId, true);
    
    // Attach onclick event to all the anchor links in the table of contents.
    $(".toc li a").click(function(){
      // Get the name of the anchor of the link that was clicked.
      Tabs.GoTo(this.hash.substring(1));
      return false;
    });

	// Attach onclick event to content links pointing to other tabs
    $('.tabs_container .tabcontent a[href*="#"]').each(function(){
		var linkHash = $(this).attr('href').split('#')[1];
		if ($.inArray(linkHash,tabList) != -1) {
	      	$(this).on('click', function(){
				Tabs.GoTo(linkHash, false)
			});
	    }
	});
  }
};

// Hook up the ready event to the tab initialization function
$(document).ready(function () { Tabs.Init(); });

