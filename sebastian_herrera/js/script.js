'use strict';
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

// Menú hamburguesa
const burger = $('#burger'), menu = $('#menu');
const closeMenu = () => { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); };
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(open));
});
$$('a', menu).forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

// Efecto de escritura en el hero
const roles = ['Frontend', 'Fullstack Junior', 'en formación constante'];
const typed = $('#typed');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
let r = 0, c = 0, del = false;
function type() {
  const word = roles[r];
  typed.textContent = word.slice(0, c);
  if (!del && c === word.length) { del = true; return setTimeout(type, 1600); }
  if (del && c === 0) { del = false; r = (r + 1) % roles.length; }
  c += del ? -1 : 1;
  setTimeout(type, del ? 40 : 90);
}
reduce ? (typed.textContent = roles[0]) : type();

// Barras de progreso animadas al entrar en pantalla
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    $$('li[data-level]', en.target).forEach(li => { $('i', li).style.width = li.dataset.level + '%'; });
    io.unobserve(en.target);
  });
}, { threshold: .35 });
$$('.skill-group').forEach(g => io.observe(g));

// Resaltar enlace activo del menú
const links = $$('.menu a');
const spy = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) links.forEach(a => a.classList.toggle('active', a.hash === '#' + en.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
$$('main section').forEach(s => spy.observe(s));

// Cards: mostrar/ocultar características
$$('.toggle').forEach(btn => btn.addEventListener('click', () => {
  const panel = document.getElementById(btn.getAttribute('aria-controls'));
  const open = panel.hidden;
  panel.hidden = !open;
  btn.setAttribute('aria-expanded', String(open));
  btn.textContent = open ? 'Ocultar características' : 'Ver características';
}));

// Formulario con validación en tiempo real
const form = $('#form'), status = $('#status');
const rules = {
  nombre: v => v.trim().length < 3 ? 'Escribe tu nombre (mínimo 3 caracteres).' : '',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Escribe un correo válido, por ejemplo nombre@correo.com.',
  mensaje: v => v.trim().length < 10 ? 'El mensaje debe tener al menos 10 caracteres.' : ''
};
function check(input) {
  const msg = rules[input.name](input.value);
  const field = input.closest('.field');
  $('.error', field).textContent = msg;
  field.classList.toggle('invalid', !!msg);
  field.classList.toggle('valid', !msg);
  return !msg;
}
$$('input, textarea', form).forEach(el => {
  el.addEventListener('input', () => { check(el); status.textContent = ''; });
  el.addEventListener('blur', () => check(el));
});
$('#mensaje').addEventListener('input', e => { $('#count').textContent = `${e.target.value.length} / 500`; });

form.addEventListener('submit', e => {
  e.preventDefault();
  const fields = $$('input, textarea', form);
  const ok = fields.map(check).every(Boolean);
  if (!ok) { fields.find(f => f.closest('.field').classList.contains('invalid')).focus(); return; }
  const d = Object.fromEntries(new FormData(form));
  const body = encodeURIComponent(`${d.mensaje}\n\n— ${d.nombre} (${d.email})`);
  // Cambia el correo por el tuyo
  location.href = `mailto:tu.correo@ejemplo.com?subject=${encodeURIComponent('Contacto desde tu portafolio')}&body=${body}`;
  status.textContent = `¡Gracias, ${d.nombre.split(' ')[0]}! Se abrió tu app de correo para enviar el mensaje.`;
  form.reset();
  $$('.field', form).forEach(f => f.classList.remove('valid'));
  $('#count').textContent = '0 / 500';
});

$('#year').textContent = new Date().getFullYear();
