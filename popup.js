
//popup.js

//listen for DOM loaded event and trigger Flow to bookmark URL
document.addEventListener('DOMContentLoaded', function() {
	triggerFlowRequest();
});

//display Flow bookmark request status
function showFlowResponse(results) {
	 document.getElementById('popupStatusTxt').textContent = results;
}

//send Flow initiation request to content script
function triggerFlowRequest(){
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "initiateFlow" }, function (response) {
            showFlowResponse(response);
        });
    });
}
