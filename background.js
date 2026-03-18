chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (message.action === "startCapture") {

    const model = message.model || "tiny"; // Default to tiny if not provided

    console.log("Starting capture with model:", model);

    chrome.tabCapture.capture(
      { audio: true, video: false },
      (stream) => {

        chrome.tabs.sendMessage(sender.tab.id, {
          action: "startProcessing",
          stream: stream.id,
          model: message.model
        });

      }
    );

  }

});