const API =
"https://smooth-cheating-refund.ngrok-free.dev";

async function sendMessage() {

    const input =
        document.getElementById("message");

    const msg = input.value;

    if(!msg) return;

    const messages =
        document.getElementById("messages");

    messages.innerHTML +=
        `<div class="user">${msg}</div>`;

    input.value = "";

    const res = await fetch(
        API + "/chat",
        {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                message: msg
            })
        }
    );

    const data = await res.json();

    messages.innerHTML +=
        `<div class="ai">${data.answer}</div>`;
}