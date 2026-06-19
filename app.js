const API = "https://smooth-cheating-refund.ngrok-free.dev";

function escapeHTML(str) {
    return str.replace(/[&<>"']/g, m => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    }[m]));
}

async function sendMessage() {
    const input = document.getElementById("message");
    const messages = document.getElementById("messages");

    const msg = input.value.trim();
    if (!msg) return;

    // show user message
    messages.innerHTML += `<div class="user">${escapeHTML(msg)}</div>`;
    input.value = "";
    messages.scrollTop = messages.scrollHeight;

    try {
        const res = await fetch(API + "/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: msg
            })
        });

        if (!res.ok) {
            throw new Error("Server error: " + res.status);
        }

        const data = await res.json();

        // show AI reply
        messages.innerHTML += `<div class="ai">${escapeHTML(data.answer)}</div>`;
        messages.scrollTop = messages.scrollHeight;

    } catch (err) {
        messages.innerHTML += `<div class="ai error">Error: ${escapeHTML(err.message)}</div>`;
        messages.scrollTop = messages.scrollHeight;
    }
}

// optional: press Enter to send
document.getElementById("message").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

// save API URL (optional settings feature)
function saveApi() {
    const url = document.getElementById("apiUrl").value.trim();
    if (!url) return;

    localStorage.setItem("api_url", url);
    alert("API saved!");
}
