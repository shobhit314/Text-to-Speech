// Function to extract text from the page
function extractText() {
    let pageText = document.body.innerText; // Extract all visible text
    return pageText;
}

// Send extracted text to the background script
chrome.runtime.sendMessage({ action: "extract_text", text: extractText() });
