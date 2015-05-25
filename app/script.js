var enabled = true;

var wikipedia1 = "http://en.wikipedia.org/wiki/Marketing";
var wikipedia2 = "http://en.wikipedia.org/wiki/Canada";


if(enabled)
{
	if (window.location.host != "en.wikipedia.org")
	{
		if (document.getElementById("content") != null) {
			window.location = wikipedia1 + '#' + window.location;
		} else {
			console.error('No id "content" in this html sorry, the extension can\'t turn this page into a wikipedia one.');
		}
	}
	else
	{
		var contentSiteUrl = window.location.hash.substring(1, window.location.hash.length);
		var urlTemp = contentSiteUrl.replace('//', 'MARK');
		var hostIndex = urlTemp.indexOf('/') + 1;
		var host = urlTemp.substr(0, hostIndex).replace('MARK', '//');
		console.log(host);

		doCORSRequest({ method: 'GET', url: contentSiteUrl, data: '' }, function printResult(rawHtml) {
			rawHtml = rawHtml.replace(/href="\//g, 'href="' + wikipedia1 + '#' + host);
			var $html = $('<div />', { html: rawHtml });
			var htmlContent = $html.find('#content');
			document.getElementById("content").innerHTML = htmlContent.html();
		});
	}
}function doCORSRequest(options, printResult) {
    var x = new XMLHttpRequest();
    x.open(options.method, 'https://cors-anywhere.herokuapp.com/' + options.url);
    x.onload = x.onerror = function () {
        printResult(
          options.method + ' ' + options.url + '\n' +
          x.status + ' ' + x.statusText + '\n\n' +
          (x.responseText || '')
        );
    };
    if (/^POST/i.test(options.method)) {
        x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    x.send(options.data);
}

/*
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });*/

