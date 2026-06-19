// 1. Update this line with your live ngrok URL
const BACKEND_URL = "https://smooth-cheating-refund.ngrok-free.dev"; 

async function sendMessageToBot(userMessage) {
    try {
        // 2. Adjust the endpoint to match whatever route you set up (e.g., /api/chat)
        const response = await fetch(`${BACKEND_URL}/api/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // CRITICAL: This bypasses the ngrok interstitial warning page
                "ngrok-skip-browser-warning": "true" 
            },
            body: JSON.stringify({ message: userMessage })
        });
        
        const data = await response.json();
        console.log("Bot response:", data);
        
        // Handle displaying 'data' in your UI chat bubble here...
        
    } catch (error) {
        console.error("Error communicating with backend:", error);
    }
}
