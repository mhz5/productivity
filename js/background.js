chrome.browserAction.onClicked.addListener(function() {
    chrome.windows.create(
      {url: "../popup.html?", type: "panel", height: 600, width: 800});
});