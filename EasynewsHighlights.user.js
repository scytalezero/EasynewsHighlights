// ==UserScript==
// @name           Easynews Highlights
// @version        2.9.5
// @namespace      http://ligature.me
// @description    Highlights THUMB, NFO, PAR, NZB, and filenames in global search links.
// @updateURL      https://github.com/scytalezero/EasynewsHighlights/raw/master/EasynewsHighlights.user.js
// @include        http://members.easynews.com/global4/*
// @include        http://members.easynews.com/global5/*
// @include        https://members.easynews.com/global4/*
// @include        https://members.easynews.com/global5/*
// @include        https://secure.members.easynews.com/global4/*
// @include        https://secure.members.easynews.com/global5/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// ==/UserScript==

var thisElement, regex, original;

$("a[target^='thumb']").css({"color": "DarkGreen", "background-color": "AliceBlue"});
$("a[target^='nfo']").css({"color": "DarkRed", "background-color": "AliceBlue"});
$("a[target^='par']").css({"color": "DarkBlue", "background-color": "AliceBlue"});
$("a[target^='nzb']").css({"color": "DarkSlateBlue", "background-color": "AliceBlue"});
$("a[target^='subj']").each(function() {
var $this = $(this);
regex = new RegExp("<br>","ig");
$this.html($this.html().replace(regex, " "));

original = $this.html();
regex = new RegExp("\\(([^\"/]+) AutoUnRAR\\)","ig");
$this.html($this.html().replace(regex, ") (<font class='filename'>$1</span> AutoUnRAR)"));
if ($this.html() == original) {
  regex = new RegExp("\"(.+)\".+yEnc","ig");
  $this.html($this.html().replace(regex, "\"<font class='filename'>$1</span>\" yEnc"));
}
});
$("font.filename").css({"font-weight": "bold", "background-color": "LightYellow"});
//Have clicking the big thumb toggle the associated checkbox
$("a[target='thumblarge2'] > img").each(function() {
$anchor = $(this).parent();
var thumbid = $anchor.siblings("input")[0].id;
$anchor.attr({"href": "", "target": ""});
$anchor.click(function(event) {
  event.preventDefault();
  if (document.getElementById(thumbid).checked) {
    document.getElementById(thumbid).checked = false;
    $(event.target).parent().parent().parent().css("background-color", "#E5E5E5")
  } else {
    document.getElementById(thumbid).checked = true;
    $(event.target).parent().parent().parent().css("background-color", "Gold")
  }
});
});
