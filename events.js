/*var audio = new Audio();
audio.src="refresh.wav"
audio.play();*/

var daud;
daud = new Audio("dload.wav");

function sleep(ms) {
ms += new Date().getTime();
while (new Date() < ms){}
} 

chrome.tabs.onActiveChanged.addListener(
	function (tabId, selectInfo) {
		(new Audio('no.wav')).play();
	}
);

chrome.tabs.onUpdated.addListener(
function ( tabId, changeInfo, tab )
{
	if ( changeInfo.status === "loading" )
    {
		(new Audio('refresh.wav')).play();
    }
	
	
	if ( changeInfo.status === "complete" )
    {
		sleep(250);
		(new Audio('loaded.wav')).play();
    }
}
);

chrome.browserAction.onClicked.addListener(
	function(tab)
	{
		(new Audio("doyou.wav")).play();
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
		
			(new Audio("muted.wav")).play();
		}
	}
);
