
var wikipedia = "http://en.wikipedia.org/wiki/Marketing";

if (window.location.host != "en.wikipedia.org")
{
    if (document.getElementById("content") != null) {
        window.location = wikipedia + '#' + window.location;
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
        rawHtml = rawHtml.replace(/href="\//g, 'href="' + host);
        var $html = $('<div />', { html: rawHtml });
        var htmlContent = $html.find('#content');
        document.getElementById("content").innerHTML = htmlContent.html();
    });
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