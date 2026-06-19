// Replace this with the live URL printed by your Kaggle notebook
const BACKEND_URL = "https://smooth-cheating-refund.ngrok-free.dev"; 

async function sendMessageToBot(userMessage) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userMessage })
        });
        
        const data = await response.json();
        console.log("Bot response:", data.response);
        // Update your UI with data.response here
    } catch (error) {
        console.error("Error communicating with Kaggle backend:", error);
    }
}
