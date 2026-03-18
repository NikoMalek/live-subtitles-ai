import { loadModel, transcribeAudio } from "./ai.js";

let audioContext;
let processor;
let source;

let audioBuffer = [];

async function startAudioProcessing(modelName) {

  const stream = await navigator.mediaDevices.getDisplayMedia({
    audio: true,
    video: true
  });

  audioContext = new AudioContext();

  source = audioContext.createMediaStreamSource(stream);

  processor = audioContext.createScriptProcessor(4096, 1, 1);

  source.connect(processor);
  processor.connect(audioContext.destination);

  processor.onaudioprocess = async (event) => {

    const input = event.inputBuffer.getChannelData(0);

    // acumular audio
    audioBuffer.push(...input);

    // cada ~3 segundos
    if (audioBuffer.length > 16000 * 3) {

      const chunk = new Float32Array(audioBuffer);
      audioBuffer = [];

      try {
        const text = await transcribeAudio(chunk);
        updateSubtitle(text);
      } catch (err) {
        console.error("Transcription error:", err);
      }

    }
  };

}

chrome.runtime.onMessage.addListener(async (message) => {

  if (message.action === "startCapture") {

    const model = message.model || "tiny";

    await loadModel(model);

    await startAudioProcessing(model);
  }

});

let subtitle = document.createElement("div");

subtitle.style.position = "fixed";
subtitle.style.bottom = "10%";
subtitle.style.left = "50%";
subtitle.style.transform = "translateX(-50%)";
subtitle.style.background = "rgba(0,0,0,0.7)";
subtitle.style.color = "white";
subtitle.style.padding = "10px";
subtitle.style.fontSize = "20px";
subtitle.style.zIndex = "999999";

document.body.appendChild(subtitle);

function updateSubtitle(text) {
  subtitle.innerText = text;
}