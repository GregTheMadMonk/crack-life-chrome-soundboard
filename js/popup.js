chrome.runtime.sendMessage({ type: 'get_mute' });
chrome.runtime.sendMessage({ type: 'get_volume' });

var priv = new Audio("../sound/doyou.wav");
priv.play();

var no;
no = new Audio("../sound/no.wav");

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
};

function menuItemHollow()
{
	var hollow_sound = new Audio("../sound/buttonrollover.wav");
	hollow_sound.volume = Math.sqrt(document.getElementById("volume").value); // sound efect is not loud enough 
										 // we need a higher volume from 0 to 1 -> sqrt(x) >= x when 0<=x<=1
	hollow_sound.play();
};

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

function volSliderChanged()
{
	no.currentTime = 0;
	no.play();
	document.getElementById("volume").value = document.getElementById("volume_slider").value / 100;
	volChanged();
};

function volChanged()
{
	no.currentTime = 0;
	no.play();
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
		document.getElementById("volume_slider").value = request.name * 100;
		priv.volume = document.getElementById("volume").value;
		no.volume = document.getElementById("volume").value;
	}
});


document.getElementById("cl_icon").onclick = menuItemHollow;
document.getElementById("lmao_me").onclick = menuItemHollow;

document.getElementById("l1").onclick = l1;
document.getElementById("l1").onmouseover = menuItemHollow;
document.getElementById("l2").onclick = l2;
document.getElementById("l2").onmouseover = menuItemHollow;
document.getElementById("mute").onclick = mute;
document.getElementById("mute").onmouseover = menuItemHollow;
document.getElementById("volume_slider").onchange = volSliderChanged;
document.getElementById("volume_slider").oninput = volSliderChanged;
document.getElementById("volume_slider").onmouseover = menuItemHollow;
document.getElementById("volume").onchange = volChanged;


