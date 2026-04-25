const chat = document.getElementById("chat");
const typingEl = document.getElementById("typing");
const notif = document.getElementById("notif");

const statusEl = document.getElementById("status");
const nameEl = document.getElementById("name");
const pp = document.getElementById("pp");

const input = document.getElementById("input");

let step = 0;
let answers = [];

// 🕒 JAM
function getTime() {
  const d = new Date();
  return d.getHours() + ":" + String(d.getMinutes()).padStart(2,"0");
}

// 💬 MESSAGE
function addMsg(text, type="bot") {
  const wrap = document.createElement("div");
  wrap.className = "bubble " + type;
  wrap.innerHTML = text + `<div class="time">${getTime()}</div>`;
  chat.appendChild(wrap);

  notif.play().catch(()=>{});
  chat.scrollTop = chat.scrollHeight;
}

// ⌨️ TYPING
function typing(cb, delay=1200) {
  statusEl.innerText = "mengetik...";
  typingEl.innerText = "sedang mengetik...";

  setTimeout(() => {
    typingEl.innerText = "";
    statusEl.innerText = "online";
    cb();
  }, delay + Math.random()*800);
}

// ❌ FAKE DELETE
function fakeDelete(text) {
  typing(()=>{
    const div = document.createElement("div");
    div.className = "bubble bot";
    div.innerText = text;
    chat.appendChild(div);

    setTimeout(()=>{
      div.innerText = "pesan ini telah dihapus";
    },1500);
  },2000);
}

// 📩 SEND
function send(textOverride=null) {
  const text = textOverride || input.value;
  if (!text) return;

  addMsg(text, "user");
  answers.push(text);

  input.value = "";
  input.focus();

  typing(nextStep,1500);
}

// 🔁 FLOW
function nextStep() {
  step++;

  const msgs = [
    "udah 3 tahun sekelas ya",
    "aku cuma pengen nanya sesuatu",
    "menurut kamu aku berubah?",
    "pernah ga risih pas aku ganggu?",
    "aku agak deg-degan nanya ini 😅",
    "kalau aku bilang aku suka kamu?"
  ];

  if (step === 2) {
    fakeDelete("sebenernya aku suka kamu...");
  }

  if (step === 5) {
    setTimeout(revealIdentity, 2000);
  }

  if (step <= msgs.length) {
    addMsg(msgs[step - 1]);

    if (step === 4) {
      showQuick(["pernah", "kadang", "ga"]);
    }

  } else {
    setTimeout(()=> window.location.href="ending.html",1500);
  }
}

// 🎭 REVEAL
function revealIdentity() {
  pp.src = "foto.jpg";

  setTimeout(()=>{
    nameEl.innerText = "Nama Kamu";
  },1000);
}

// ⚡ QUICK REPLY
function showQuick(arr) {
  let div = document.createElement("div");

  arr.forEach(t=>{
    let b = document.createElement("div");
    b.className = "quick";
    b.innerText = t;
    b.onclick = ()=>send(t);
    div.appendChild(b);
  });

  chat.appendChild(div);
}

// ⌨️ ENTER
input.addEventListener("keypress", e=>{
  if(e.key==="Enter") send();
});

// 🚀 OPENING
setTimeout(()=>{
  addMsg("hai...");
  setTimeout(()=>addMsg("aku ga tau harus mulai dari mana"),1000);
  setTimeout(()=>addMsg("tapi aku kepikiran sesuatu"),2200);
},600);