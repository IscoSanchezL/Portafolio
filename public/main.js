// Galería: cada tarjeta cambia su captura principal al elegir una miniatura
document.querySelectorAll('[data-gallery]').forEach(card => {
  const main = card.querySelector('.frame.main img');
  const label = card.querySelector('.frame.main .bar span');
  card.querySelectorAll('.thumbs button').forEach(btn => {
    btn.addEventListener('click', () => {
      card.querySelectorAll('.thumbs button').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      main.classList.add('fade');
      const next = new Image();
      next.onload = () => { main.src = btn.dataset.src; main.alt = btn.dataset.alt; label.textContent = btn.dataset.label; main.classList.remove('fade'); };
      next.src = btn.dataset.src;
    });
  });
});

// Aparición suave al hacer scroll
const targets = document.querySelectorAll('.sec-head, .index, .proj, .steps, .pipeline, .form, .prose, .facts');
targets.forEach(t => t.classList.add('rv'));
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .08 });
  targets.forEach(t => io.observe(t));
} else targets.forEach(t => t.classList.add('in'));

// Formulario: envía a admin@iskonex.com; si falla, ofrece el correo directo
const form = document.getElementById('form');
const status = document.getElementById('status');
form.addEventListener('submit', async e => {
  e.preventDefault();
  status.className = 'status';
  if (!form.checkValidity()) { status.textContent = 'Revise nombre, correo y mensaje.'; status.classList.add('err'); form.reportValidity(); return; }
  const btn = form.querySelector('button');
  btn.disabled = true; status.textContent = 'Enviando…';
  const data = Object.fromEntries(new FormData(form));
  try {
    const r = await fetch('https://formsubmit.co/ajax/admin@iskonex.com', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data)
    });
    const j = await r.json();
    if (!r.ok || j.success === 'false') throw new Error();
    form.reset(); status.textContent = 'Mensaje enviado. Le responderemos pronto.'; status.classList.add('ok');
  } catch {
    const body = encodeURIComponent(`${data.mensaje}\n\n— ${data.nombre}${data.empresa ? ' · ' + data.empresa : ''}\n${data.email} ${data.telefono || ''}`);
    status.innerHTML = 'No se pudo enviar desde aquí. <a href="mailto:admin@iskonex.com?subject=Contacto%20desde%20el%20portafolio&body=' + body + '">Escríbanos por correo</a>.';
    status.classList.add('err');
  } finally { btn.disabled = false; }
});
