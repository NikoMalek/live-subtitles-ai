document.getElementById("start").addEventListener("click", async () => {

  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  chrome.runtime.sendMessage({
    action: "startCapture",
    tabId: tab.id
  });

});