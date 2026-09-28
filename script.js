/* ================= CONTENIDO EDITABLE ================= */
const PRAISES = [
  "Porque tu sonrisa puede cambiarme el día entero.",
  "Porque eres preciosa incluso cuando tú no lo ves.",
  "Porque tu forma de ser me enamoró tanto como tu carita.",
  "Porque me encanta escucharte.",
  "Porque contigo puedo sentirme en casa aunque estemos a kilómetros.",
  "Porque tienes una forma de hacerme feliz que nadie más tiene.",
  "Porque eres mi niña preciosa.",
  "Porque me encanta la mujer que eres.",
  "Porque hasta tus pequeñas locuras forman parte de lo que amo de ti.",
  "Porque simplemente eres tú."
];
const CARDS = ["Tu sonrisa.","Tu voz.","Tu forma de hacerme reír.","Tu mirada.","Tu manera de decirme amor.","Tu carácter.","Tu lado tierno.","Tu forma de ser tú.","Lo preciosa que eres.","Cómo haces que una conversación cualquiera termine siendo un recuerdo."];
// Fotos de la galería: cambia el nombre de archivo (carpeta assets/photos/) o el texto.
const GALLERY = [
  {f:"156271.jpg",alt:"Tú frente al espejo, con lentes y blusa café",cap:"Uno de tantos momentos que guardo contigo."},
  {f:"161037.jpg",alt:"Tú con un vestido rosa de holanes frente al espejo"},
  {f:"171078.jpg",alt:"Tú con un ramo de rosas amarillas",cap:"Otro recuerdo que quiero conservar."},
  {f:"35239.jpg",alt:"Tú con vestido lila junto a un espejo decorado con flores"},
  {f:"157779.jpg",alt:"Tú frente al espejo junto a un oso de peluche gigante",cap:"Mi lugar favorito siempre termina siendo donde estás tú."},
  {f:"35014.jpg",alt:"Tú sentada en una mecedora, con falda blanca"},
  {f:"34812.jpg",alt:"Una jirafa de peluche con la letra M frente a un lago",cap:"Nosotros. ❤️"},
  {f:"34669.jpg",alt:"Tú con una blusa verde frente al espejo"}
];

/* ================= UTILIDADES ================= */
const $ = s => document.querySelector(s);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const wait = ms => new Promise(r => setTimeout(r, ms));
const rnd = (a, b) => a + Math.random() * (b - a);

function fireflies(cv, n = 38) {
  const x = cv.getContext('2d'); let w = 0, h = 0, P = [];
  const rs = () => { w = cv.width = cv.offsetWidth; h = cv.height = cv.offsetHeight; };
  rs(); addEventListener('resize', rs);
  for (let i = 0; i < n; i++) P.push({x: Math.random(), y: Math.random(), r: rnd(.8, 2.2), vx: rnd(-.00006, .00006), vy: -rnd(.00003, .00012), p: rnd(0, 6)});
  (function f(t) {
    if (w && h) {
      x.clearRect(0, 0, w, h);
      for (const p of P) {
        p.x += p.vx; p.y += p.vy; if (p.y < -.02) { p.y = 1.02; p.x = Math.random(); }
        const a = .3 + .35 * Math.sin(t * .0015 + p.p), px = p.x * w, py = p.y * h;
        x.fillStyle = `rgba(246,226,176,${a * .18})`; x.beginPath(); x.arc(px, py, p.r * 4, 0, 7); x.fill();
        x.fillStyle = `rgba(255,236,190,${a})`; x.beginPath(); x.arc(px, py, p.r, 0, 7); x.fill();
      }
    }
    if (!reduce) requestAnimationFrame(f);
  })(0);
}
fireflies($('#fx1')); fireflies($('#fx2'), 45);

function burst(cls, n, cx, cy, spread, fall, t) {
  for (let i = 0; i < n; i++) {
    const e = document.createElement('i'); e.className = cls;
    e.style.left = cx + 'px'; e.style.top = cy + 'px';
    e.style.setProperty('--dx', rnd(-spread, spread) + 'px');
    e.style.setProperty('--dy', rnd(fall * .3, fall) + 'px');
    e.style.setProperty('--r', rnd(-360, 360) + 'deg');
    e.style.setProperty('--t', (t || rnd(2.4, 4)) + 's');
    document.body.append(e); setTimeout(() => e.remove(), 4500);
  }
}
const center = () => { const r = $('#pl').getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height * .35]; };

/* ================= MÚSICA ================= */
const au = $('#au'), mus = $('#mus'); let userPaused = false;
function setMus(on) { mus.classList.toggle('on', on); mus.setAttribute('aria-pressed', on); mus.setAttribute('aria-label', on ? 'Pausar música' : 'Activar música'); }
function playMus() { au.volume = .6; au.play().then(() => setMus(true)).catch(() => setMus(false)); }
mus.onclick = () => { if (au.paused) { userPaused = false; playMus(); } else { userPaused = true; au.pause(); setMus(false); } };
au.addEventListener('error', () => mus.classList.add('none')); // sin music.mp3 el botón se oculta

/* ================= ETAPA 1: PLANTA ================= */
const plant = $('#plant'), msg = $('#msg'), dots = $('#dots'), hint = $('#hint'), intro = $('#intro');
let stage = 0, state = 'grow';
PRAISES.forEach(() => dots.append(document.createElement('i')));

function say(t, cls = '') {
  const p = document.createElement('p'); p.className = 'pr ' + cls; p.textContent = t;
  msg.append(p); requestAnimationFrame(() => requestAnimationFrame(() => p.classList.add('in')));
  return p;
}
function paint() {
  const G = [0, .28, .62, 1], s = plant.style;
  s.setProperty('--g', G[Math.min(stage, 3)]);
  s.setProperty('--b', stage < 5 ? 0 : (.45 + (stage - 5) * .19).toFixed(2));
  s.setProperty('--o', stage < 6 ? 0 : ((stage - 5) / 5).toFixed(2));
  plant.querySelectorAll('.lf').forEach(l => l.classList.toggle('on', +l.dataset.s <= stage));
  [...dots.children].forEach((d, i) => d.classList.toggle('f', i < stage));
  if (stage === PRAISES.length) plant.classList.add('rose');
}
async function step() {
  playMusOnce();
  const [cx, cy] = center(); burst('spark', 9, cx, cy, 90, 70, 1.4);
  hint.classList.add('off');
  msg.innerHTML = ''; say(PRAISES[stage]); stage++; paint();
  if (stage === PRAISES.length) { state = 'busy'; await wait(4200); reveal(); }
}
let started = false;
function playMusOnce() { if (!started) { started = true; if (!userPaused) playMus(); } }

async function reveal() {
  intro.classList.add('dim'); msg.style.opacity = 0; await wait(1400);
  msg.innerHTML = ''; msg.style.opacity = 1;
  say('Bueno... ya sabes algunas de las razones por las que te amo.'); await wait(4200);
  say('Pero todavía me falta enseñarte algo.', 'sub'); await wait(3800);
  say('Para ti, mi amor. 🌹', 'sub'); await wait(2600);
  hint.textContent = 'Ábrela.'; hint.classList.remove('off'); dots.style.opacity = 0;
  $('#pl').setAttribute('aria-label', 'Toca la rosa para abrirla'); state = 'ready';
}
async function openRose() {
  state = 'busy'; hint.classList.add('off'); msg.style.opacity = 0;
  const [cx, cy] = center(); burst('petal', reduce ? 8 : 22, cx, cy, 200, innerHeight * .9);
  await wait(500); $('#pw').classList.add('zoom');
  await wait(900); burst('petal', reduce ? 6 : 26, innerWidth / 2, innerHeight / 2, 260, innerHeight, 3.6);
  $('#veil').classList.add('on');
  await wait(2400);
  $('#main').hidden = false; document.body.classList.remove('locked'); scrollTo(0, 0);
  intro.classList.add('gone'); watch();
  await wait(300); $('#veil').classList.remove('on');
  await wait(1600); intro.hidden = true;
}
$('#pl').onclick = () => { if (state === 'grow') step(); else if (state === 'ready') openRose(); };
paint();
setTimeout(() => hint.classList.remove('off'), 300);

/* ================= ETAPA 2 ================= */
// Carta: párrafos separados por línea en blanco; saltos simples se conservan
const paras = $('#letter-src').textContent.trim().split(/\n\s*\n/);
const letter = $('#letter');
paras.forEach((t, i) => {
  const p = document.createElement('p'); p.innerHTML = t.trim().replace(/\n/g, '<br>');
  if (i === 0) p.className = 'salute'; if (i === paras.length - 1) p.className = 'sign';
  letter.append(p);
});
// Galería
const gal = $('#gal');
GALLERY.forEach(g => {
  const b = document.createElement('button'); b.className = 'rv'; b.setAttribute('aria-label', 'Ampliar foto: ' + g.alt);
  b.innerHTML = `<img loading="lazy" src="assets/photos/${g.f}" alt="${g.alt}">` + (g.cap ? `<span>${g.cap}</span>` : '');
  b.onclick = () => { $('#lbi').src = `assets/photos/${g.f}`; $('#lbi').alt = g.alt; $('#lbc').textContent = g.cap || ''; $('#lb').hidden = false; $('#lbx').focus(); };
  gal.append(b);
});
const closeLb = () => { $('#lb').hidden = true; };
$('#lb').onclick = closeLb; $('#lbx').onclick = closeLb;
addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
// Tarjetas
const cards = $('#cards');
CARDS.forEach(t => {
  const b = document.createElement('button'); b.className = 'rv'; b.textContent = t;
  b.onclick = () => b.classList.toggle('on'); cards.append(b);
});
// Aparición al hacer scroll
function watch() {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), {threshold: .15, rootMargin: '0px 0px -6% 0px'});
  document.querySelectorAll('.rv,.paper p').forEach(el => io.observe(el));
  const fin = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { $('#finale').classList.add('go'); fin.disconnect(); } }), {threshold: .35});
  fin.observe($('#finale'));
}
$('#again').onclick = () => location.reload();
