chrome.runtime.sendMessage({ type: 'get_mute' });
chrome.runtime.sendMessage({ type: 'get_volume' });

var priv = new Audio("../sound/doyou.wav");
priv.play();

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

function l1() 
{
	openInNewTab("mailto:yagreg7@gmail.com");
};

function l2() 
{
	openInNewTab("https://github.com/GregTheMadMonk");
};

function mute()
{
	chrome.runtime.sendMessage({ type: 'mute' } );
	chrome.runtime.sendMessage({ type: 'get_volume' });
};

function volChanged()
{
	chrome.runtime.sendMessage({ type: 'vol', name: document.getElementById("volume").value });
	chrome.runtime.sendMessage({ type: 'get_mute' });
	chrome.runtime.sendMessage({ type: 'get_volume' });
};

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
	if (request.type == 'got_mute')
	{
		if (request.name == 't') document.getElementById("mute").checked = true;
		else document.getElementById("mute").checked = false;
	}
	if (request.type = 'got_volume')
	{
		document.getElementById("volume").value = request.name;
		priv.volume = document.getElementById("volume").value;
	}
});

document.getElementById("l1").onclick = l1;
document.getElementById("l2").onclick = l2;
document.getElementById("mute").onclick = mute;
document.getElementById("volume").onchange = volChanged;


