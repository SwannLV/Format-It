
var enabled = false;

function disableBrowserAction(){
    chrome.browserAction.setIcon({path:"img/inactive.png"});
}

function enableBrowserAction(){
    chrome.browserAction.setIcon({path:"img/active.png"});
	
	/*chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
		console.log(response.farewell);
	  });
	});*/


}

function updateState(){
    if(enabled==false){
        enabled=true;
        enableBrowserAction();
    }else{
        enabled=false;
        disableBrowserAction();
    }
}

disableBrowserAction();
chrome.browserAction.onClicked.addListener(updateState);