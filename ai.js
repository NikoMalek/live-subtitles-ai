import { pipeline } from '@huggingface/transformers';

let transcriber;

export async function loadModel(modelName) {
    transcriber = await pipeline('automatic-speech-recognition', `Xenoba/whisper-${modelName}`);
    console.log(`Model ${modelName} loaded successfully.`);
}

export async function transcribeAudio(audio) {
    const result = await transcriber(audio);
    return result.text;
}
