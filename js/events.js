/*var audio = new Audio();
audio.src="refresh.wav"
audio.play();*/

var daud;
daud = new Audio("../sound/dload.wav");

var volume = 1.0;
var tvolume;

function sleep(ms) {
ms += new Date().getTime();
while (new Date() < ms){}
} 

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
	if (request.type == 'vol') 
	{
		if ((volume != 0) || (request.name != 0)) tvolume = volume;
		if (request.name > 1) volume = 1;
		else if (request.name < 0) volume = 0;
			else volume = request.name;
	}
	if (request.type == 'mute')
	{
		if (volume == 0.0) volume = tvolume;
		else {
			tvolume = volume;
			volume = 0.0;	
		}
	}
	if (request.type == 'get_mute')
	{
		var n = 'f';
		if (volume == 0.0) n = 't';
		chrome.runtime.sendMessage({ type: 'got_mute', name: n } );
	}
	if (request.type == 'get_volume')
	{
		chrome.runtime.sendMessage({ type: 'got_volume', name: volume } );
	}
});

chrome.tabs.onActiveChanged.addListener(
	function (tabId, selectInfo) {
		var audio  = new Audio("../sound/no.wav");
		audio.volume = volume;
		audio.play();
	}
);

chrome.tabs.onRemoved.addListener(function(tabid, removed) {
	var audio = new Audio("../sound/muted.wav");
	audio.volume = volume;
	audio.play();
})

chrome.tabs.onUpdated.addListener(
function ( tabId, changeInfo, tab )
{
	if ( changeInfo.status === "loading" )
    {
		var audio = new Audio("../sound/refresh.wav");
		audio.volume = volume;
		audio.play();
    }
	
	
	if ( changeInfo.status === "complete" )
    {
		sleep(250);
		var audio = new Audio("../sound/loaded.wav")
		audio.volume = volume;
		audio.play();
    }
}
);

chrome.downloads.onChanged.addListener(
	function (downloadItem) {
		daud.currentTime = 0;
		daud.volume = volume;

		if (downloadItem.state == undefined)
		{
			if (daud.paused) { daud.play(); }
		}

		if (downloadItem.state.current === "interrupted") 
		{		
			daud.pause();
		
			var audio = new Audio("../sound/cancelled.wav");
			audio.volume = volume;
			audio.play();
		}
	}
);
