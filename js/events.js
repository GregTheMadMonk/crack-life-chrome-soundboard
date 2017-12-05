/*var audio = new Audio();
audio.src="refresh.wav"
audio.play();*/

var daud;
daud = new Audio("../sound/dload.wav");

function sleep(ms) {
ms += new Date().getTime();
while (new Date() < ms){}
} 

chrome.tabs.onActiveChanged.addListener(
	function (tabId, selectInfo) {
		(new Audio("../sound/no.wav")).play();
	}
);

chrome.tabs.onUpdated.addListener(
function ( tabId, changeInfo, tab )
{
	if ( changeInfo.status === "loading" )
    {
		(new Audio("../sound/refresh.wav")).play();
    }
	
	
	if ( changeInfo.status === "complete" )
    {
		sleep(250);
		(new Audio("../sound/loaded.wav")).play();
    }
}
);

chrome.downloads.onChanged.addListener(
	function (downloadItem) {
		daud.currentTime = 0;

		if (downloadItem.state == undefined)
		{
			if (daud.paused) { daud.play(); }
		}

		if (downloadItem.state.current === "interrupted") 
		{		
			daud.pause();
		
			(new Audio("../sound/cancelled.wav")).play();
		}
	}
);
