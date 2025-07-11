
AOS.init();

const texto = "Bell Dermoestética";
const h1 = document.getElementById("titulo-animado");
let i = 0;


function escribir() {
  if (i < texto.length) {
    h1.textContent += texto.charAt(i);
    i++;
    setTimeout(escribir, 100);
  }
}

escribir();

document.querySelectorAll(".cta-button").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.style.animation = "clickEffect 0.3s";
    btn.addEventListener("animationend", () => {
      btn.style.animation = "";
    });
  });
});

/*chat bot */
function toggleChat() {
  const chat = document.getElementById("chat-window");
  chat.style.display = chat.style.display === "flex" ? "none" : "flex";
}

function sendPrompt() {
  const input = document.getElementById("userPrompt");
  const prompt = input.value.trim();
  if (!prompt) return;

  const messages = document.getElementById("chat-messages");
  const userMsg = document.createElement("div");
  userMsg.textContent = "Tú: " + prompt;
  messages.appendChild(userMsg);
  input.value = "";

  fetch("backend.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: prompt })
  })
    .then(res => {
  return res.json(); // ⚠️ ya no importa si hay error, el JSON lo tiene
})
.then(data => {
  const botMsg = document.createElement("div");
  botMsg.textContent = "Bell IA: " + data.response;
  messages.appendChild(botMsg);
  messages.scrollTop = messages.scrollHeight;
})
.catch(err => {
  const errorMsg = document.createElement("div");
  errorMsg.textContent = "❌ Error JS: " + err.message;
  messages.appendChild(errorMsg);
  console.error("Error detallado:", err);
});


}
