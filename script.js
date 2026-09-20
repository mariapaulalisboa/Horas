const CITIES = [
  ["São Paulo, Brasil","America/Sao_Paulo","br"],
  ["Rio de Janeiro, Brasil","America/Sao_Paulo","br"],
  ["Goiânia, Brasil","America/Sao_Paulo","br"],
  ["Brasília, Brasil","America/Sao_Paulo","br"],
  ["Belo Horizonte, Brasil","America/Sao_Paulo","br"],
  ["Curitiba, Brasil","America/Sao_Paulo","br"],
  ["Porto Alegre, Brasil","America/Sao_Paulo","br"],
  ["Salvador, Brasil","America/Bahia","br"],
  ["Fortaleza, Brasil","America/Fortaleza","br"],
  ["Recife, Brasil","America/Recife","br"],
  ["Manaus, Brasil","America/Manaus","br"],
  ["Belém, Brasil","America/Belem","br"],
  ["Rio Branco, Brasil","America/Rio_Branco","br"],
  ["Cuiabá, Brasil","America/Cuiaba","br"],
  ["Florianópolis, Brasil","America/Sao_Paulo","br"],
  ["Natal, Brasil","America/Fortaleza","br"],
  ["Lisboa, Portugal","Europe/Lisbon","pt"],
  ["Porto, Portugal","Europe/Lisbon","pt"],
  ["Madri, Espanha","Europe/Madrid","es"],
  ["Barcelona, Espanha","Europe/Madrid","es"],
  ["Paris, França","Europe/Paris","fr"],
  ["Londres, Reino Unido","Europe/London","gb"],
  ["Dublin, Irlanda","Europe/Dublin","ie"],
  ["Berlim, Alemanha","Europe/Berlin","de"],
  ["Roma, Itália","Europe/Rome","it"],
  ["Amsterdã, Holanda","Europe/Amsterdam","nl"],
  ["Zurique, Suíça","Europe/Zurich","ch"],
  ["Estocolmo, Suécia","Europe/Stockholm","se"],
  ["Oslo, Noruega","Europe/Oslo","no"],
  ["Copenhague, Dinamarca","Europe/Copenhagen","dk"],
  ["Atenas, Grécia","Europe/Athens","gr"],
  ["Moscou, Rússia","Europe/Moscow","ru"],
  ["Istambul, Turquia","Europe/Istanbul","tr"],
  ["Nova York, EUA","America/New_York","us"],
  ["Miami, EUA","America/New_York","us"],
  ["Los Angeles, EUA","America/Los_Angeles","us"],
  ["Chicago, EUA","America/Chicago","us"],
  ["Toronto, Canadá","America/Toronto","ca"],
  ["Vancouver, Canadá","America/Vancouver","ca"],
  ["Cidade do México, México","America/Mexico_City","mx"],
  ["Bogotá, Colômbia","America/Bogota","co"],
  ["Lima, Peru","America/Lima","pe"],
  ["Santiago, Chile","America/Santiago","cl"],
  ["Buenos Aires, Argentina","America/Argentina/Buenos_Aires","ar"],
  ["Montevidéu, Uruguai","America/Montevideo","uy"],
  ["Assunção, Paraguai","America/Asuncion","py"],
  ["La Paz, Bolívia","America/La_Paz","bo"],
  ["Caracas, Venezuela","America/Caracas","ve"],
  ["Dubai, Emirados Árabes","Asia/Dubai","ae"],
  ["Doha, Catar","Asia/Qatar","qa"],
  ["Tel Aviv, Israel","Asia/Jerusalem","il"],
  ["Nova Deli, Índia","Asia/Kolkata","in"],
  ["Bangkok, Tailândia","Asia/Bangkok","th"],
  ["Singapura","Asia/Singapore","sg"],
  ["Hong Kong","Asia/Hong_Kong","hk"],
  ["Xangai, China","Asia/Shanghai","cn"],
  ["Pequim, China","Asia/Shanghai","cn"],
  ["Tóquio, Japão","Asia/Tokyo","jp"],
  ["Seul, Coreia do Sul","Asia/Seoul","kr"],
  ["Jacarta, Indonésia","Asia/Jakarta","id"],
  ["Manila, Filipinas","Asia/Manila","ph"],
  ["Sydney, Austrália","Australia/Sydney","au"],
  ["Melbourne, Austrália","Australia/Melbourne","au"],
  ["Perth, Austrália","Australia/Perth","au"],
  ["Auckland, Nova Zelândia","Pacific/Auckland","nz"],
  ["Joanesburgo, África do Sul","Africa/Johannesburg","za"],
  ["Cairo, Egito","Africa/Cairo","eg"],
  ["Lagos, Nigéria","Africa/Lagos","ng"],
  ["Nairóbi, Quênia","Africa/Nairobi","ke"],
  ["Casablanca, Marrocos","Africa/Casablanca","ma"],
  ["Honolulu, Havaí","Pacific/Honolulu","us"],
  ["Reiquiavique, Islândia","Atlantic/Reykjavik","is"]
];

const listEl = document.getElementById('cityList');
CITIES.forEach(([name]) => {
  const opt = document.createElement('option');
  opt.value = name;
  listEl.appendChild(opt);
});

function findCity(name){
  return CITIES.find(c => c[0].toLowerCase() === name.trim().toLowerCase()) || null;
}
function formatClock(tz, date){
  return new Intl.DateTimeFormat('pt-BR', { timeZone: tz, hour:'2-digit', minute:'2-digit' }).format(date);
}

const userCityInput = document.getElementById('userCity');
const destCityInput = document.getElementById('destCity');

// valores iniciais: tenta detectar o fuso do navegador, senão usa padrão
const browserTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
const browserMatch = CITIES.find(c => c[1] === browserTZ);
userCityInput.value = browserMatch ? browserMatch[0] : "Goiânia, Brasil";
destCityInput.value = "Madri, Espanha";

function updateRow(rowEl, flagEl, labelEl, timeEl, city){
  if(!city){
    flagEl.innerHTML = "";
    labelEl.textContent = "—";
    timeEl.textContent = "--:--";
    rowEl.dataset.time = "";
    return;
  }
  const [name, tz, countryCode] = city;
  const now = new Date();
  flagEl.innerHTML = `<span class="fi fi-${countryCode}"></span>`;
  labelEl.textContent = name.split(',')[0];
  const t = formatClock(tz, now);
  timeEl.textContent = t;
  rowEl.dataset.time = t;
}

function tick(){
  const userCity = findCity(userCityInput.value);
  const destCity = findCity(destCityInput.value);
  const now = new Date();

  document.getElementById('userPlace').textContent = userCityInput.value || "—";
  document.getElementById('userNowTime').textContent = userCity ? formatClock(userCity[1], now) : "--:--";

  updateRow(document.getElementById('rowA'), document.getElementById('flagA'), document.getElementById('labelA'), document.getElementById('timeA'), userCity);
  updateRow(document.getElementById('rowB'), document.getElementById('flagB'), document.getElementById('labelB'), document.getElementById('timeB'), destCity);
}

userCityInput.addEventListener('input', tick);
destCityInput.addEventListener('input', tick);

document.querySelectorAll('.copy-row').forEach(btn => {
  btn.addEventListener('click', () => {
    const t = btn.dataset.time;
    if(!t) return;
    navigator.clipboard.writeText(t);
    btn.classList.add('copied');
    setTimeout(() => btn.classList.remove('copied'), 1200);
  });
});

tick();
setInterval(tick, 1000);

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
