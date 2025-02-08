document.addEventListener("DOMContentLoaded", () => {
  const speakButton = document.getElementById("speakText");
  const stopButton = document.getElementById("stopText");

  // Send message to start speech
  speakButton.addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              function: extractAndSendText
          });
      });
  });

  // Send message to stop speech
  stopButton.addEventListener("click", () => {
      chrome.runtime.sendMessage({ action: "stop_speech" });
  });
});

// Extract text and send it to background.js
function extractAndSendText() {
  let pageText = document.body.innerText;
  chrome.runtime.sendMessage({ action: "extract_text", text: pageText });
}
