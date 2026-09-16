// frase rotativa do header
const words = ["viaja", "trabalha remoto", "tem família em outro país", "namora à distância", "faz reuniões com outros fusos"];
let i = 0;
const rotEl = document.getElementById("rotating-word");
setInterval(() => {
  rotEl.classList.add("fade-out");
  setTimeout(() => {
    i = (i + 1) % words.length;
    rotEl.textContent = words[i];
    rotEl.classList.remove("fade-out");
  }, 300);
}, 2500);
