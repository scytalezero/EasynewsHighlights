// ==UserScript==
// @name        Easynews Messages Links
// @namespace   ligature.me
// @description Re-writes the links to Global5.
// @include     https://*.easynews.com/edit/messages.phtml*
// @version     1
// ==/UserScript==

var $;

// Add jQuery
(function(){
  if ( (typeof unsafeWindow.jQuery == 'undefined') ) {
    unsafeWindow.console.log("Sideloading jQuery");
    var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
        GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
    GM_JQ.type = 'text/javascript';
    GM_JQ.async = true;
    GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
  } else {
    unsafeWindow.console.log("Using existing jQuery");
  }
  GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
  if (typeof unsafeWindow.jQuery == 'undefined') {
    window.setTimeout(GM_wait, 100);
  } else {
    //$ = unsafeWindow.jQuery.noConflict(true);
    //letsJQuery();
    unsafeWindow.jQuery(function() { $=unsafeWindow.jQuery; letsJQuery(); });
  }
}

function letsJQuery() {
  //alert(jQuery);
  $link = $("pre > a");
  url = $link.attr("href");
  url = "https://members.easynews.com/global5/index.html" + url.substring(url.indexOf("?"));
  $link.attr("href", url).css("border", "2px solid green");
}
