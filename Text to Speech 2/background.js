function speakTextInChunks(text) {
    const chunkSize = 3000; // Max characters per chunk (stay under the limit)
    let chunks = [];

    // Split text into smaller chunks
    for (let i = 0; i < text.length; i += chunkSize) {
        chunks.push(text.substring(i, i + chunkSize));
    }

    // Speak each chunk sequentially
    function speakNextChunk(index) {
        if (index < chunks.length) {
            chrome.tts.speak(chunks[index], {
                rate: 1.0,
                pitch: 1.0,
                volume: 1.0,
                lang: "en-US",
                onEvent: (event) => {
                    if (event.type === "end") {
                        speakNextChunk(index + 1); // Speak the next chunk
                    }
                }
            });
        }
    }

    speakNextChunk(0); // Start speaking
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "extract_text") {
        console.log("Extracted text:", message.text);
        speakTextInChunks(message.text); // Speak in chunks
    } else if (message.action === "stop_speech") {
        chrome.tts.stop();
    }
});
