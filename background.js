chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (message.action === "startCapture") {

    chrome.tabCapture.capture(
      { audio: true, video: false },
      (stream) => {

        console.log("Audio stream captured", stream);

      }
    );

  }

});