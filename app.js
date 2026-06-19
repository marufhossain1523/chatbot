const API =
    localStorage.getItem("api_url") ||
    "https://smooth-cheating-refund.ngrok-free.dev";

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

    // 🔥 special case: if user types "yes"
    const payloadMessage = msg.toLowerCase() === "yes"
        ? "yes"
        : msg;

    try {
        const res = await fetch(API + "/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: payloadMessage
            })
        });

        const data = await res.json();

        messages.innerHTML += `<div class="ai">${escapeHTML(data.answer)}</div>`;
        messages.scrollTop = messages.scrollHeight;

    } catch (err) {
        messages.innerHTML += `<div class="ai error">Error: ${escapeHTML(err.message)}</div>`;
    }
}

// press Enter to send
document.getElementById("message").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

function saveApi() {
    const url = document.getElementById("apiUrl").value.trim();
    if (!url) return;

    localStorage.setItem("api_url", url);
    alert("Connected!");
}
