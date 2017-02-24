var url = chrome.extension.getURL('inline.js');
var script = document.createElement('script');
script.src=url;
script.async=false;
(document.head || document.documentElement).appendChild(script);
