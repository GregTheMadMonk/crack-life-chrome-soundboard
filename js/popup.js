(new Audio("../sound/doyou.wav")).play();

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

function l1() {
	openInNewTab("mailto:yagreg7@gmail.com");
};

function l2() {
	openInNewTab("https://github.com/GregTheMadMonk");
};

document.getElementById("l1").onclick = l1;
document.getElementById("l2").onclick = l2;
