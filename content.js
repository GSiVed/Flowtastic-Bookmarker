// content.js
//listen for initiateFlow request, call Flow http endpoint and set callback to sendResponse
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action === "initiateFlow") {
            initiateFlow(request, sender, sendResponse);
            return true;
        }
    }
);

//send httprequest to trigger Flow
function initiateFlow(request, sender, sendResponse){
	var title = document.getElementsByTagName("title")[0].innerHTML;
	var url = window.location.href;
	var postBody = {"contentTitle":title,"contentUrl":url};
	var flowhttpPostUrl ="https://prod-85.westus.logic.azure.com:443/workflows/416ba943fde34c44933946f60b02c774/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=q7TxyYzt8q_LOGBZvndJkOcFsBqxXSxC3TT1qaR1uQQ";
  
    var settings = {    
            "url": flowhttpPostUrl,  
            "method": "POST",  
            "headers": {  
                "content-type": "application/json",  
                "cache-control": "no-cache"  
            },  
            "dataType": 'json',
            "data":JSON.stringify(postBody),
			"error": function(httpRequest, textStatus, errorThrown) {
                           return sendResponse("Sorry! Error occurred...");
			}
 }  
  
        $.ajax(settings).done(function (response) {  
		   return sendResponse("Flow-tastic! Url bookmarked!");
        });  
	
}