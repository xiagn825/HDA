chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	chrome.tabs.getSelected(null, function(tab){
		sendResponse({"tabUrl": tab.url});
	});
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	chrome.tabs.executeScript({
		file: "lib/jquery-1.9.1.min.js"
	});
	
	chrome.tabs.executeScript({
		file: "data/data.js"
	});
	
	chrome.tabs.executeScript({
		file: "cmn/CmnUtil.js"
	});
	
	chrome.tabs.executeScript({
		file: "contentScript.js"
	});
});