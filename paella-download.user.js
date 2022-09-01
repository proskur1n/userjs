// ==UserScript==
// @name        paella-download
// @namespace   proskur1n
// @match       *://oc-presentation.ltcc.tuwien.ac.at/paella/ui/watch.html
// @grant       none
// @version     1.0
// @author      Andrey Proskurin
// @description Show a little download button in the TU-Wien video player.
// ==/UserScript==

function showDownloadButton(mutationList, observer) {
	const source = document.querySelector("video>source");
	const zoom = document.querySelector("div.videoZoomToolbar.buttonPlugin");
	if (!source || !zoom) {
		return false;
	}

	const button = document.createElement("button");
	button.classList.add("buttonPlugin", "right");
	button.style.marginRight = 0;
	button.innerText = "💾";
	button.title = "Save video";
	zoom.parentElement.insertBefore(button, zoom);

	button.addEventListener("click", e => {
		const a = document.createElement("a");
		a.setAttribute("href", source.src);
		a.setAttribute("download", "");
		a.click();
	});

	if (observer) {
		observer.disconnect();
	}
	return true;
}

if (!showDownloadButton()) {
	const container = document.getElementById("playerContainer");
	const observer = new MutationObserver(showDownloadButton);
	observer.observe(container, { childList: true, subtree: true });
}
