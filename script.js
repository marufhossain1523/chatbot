const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

const BACKEND_URL = "https://smooth-cheating-refund.ngrok-free.dev"; 

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const messageText = userInput.value.trim();
    if (!messageText) return;

    // 1. Append User Message to UI
    appendMessage(messageText, 'user-message');
    userInput.value = '';

    try {
        // 2. Fetch from Kaggle backend
        const response = await fetch(`${BACKEND_URL}/api/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true" 
            },
            body: JSON.stringify({ message: messageText })
        });
        
        const data = await response.json();
        
        // 3. Append Bot Response to UI
        appendMessage(data.response, 'bot-message');
        
    } catch (error) {
        console.error(error);
        appendMessage("Error: Could not connect to backend.", 'bot-message');
    }
});

function appendMessage(text, className) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', className);
    messageDiv.innerText = text;
    chatMessages.appendChild(messageDiv);
    
    // Auto-scroll to the bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
