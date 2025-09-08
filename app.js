(function(){
  const form = document.getElementById('leadForm');
  if(!form) return;
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get('utm_source');
  const utmCampaign = params.get('utm_campaign');
  if(utmSource) form.querySelector('input[name="utm_source"]').value = utmSource;
  if(utmCampaign) form.querySelector('input[name="utm_campaign"]').value = utmCampaign;
  let sending = false;
  form.addEventListener('submit', function(e){
    if(sending){ e.preventDefault(); return; }
    sending = true;
    const btn = form.querySelector('button[type="submit"]');
    if(btn){ btn.disabled = true; btn.textContent = 'Enviando...'; }
  }, false);
})();

// Máscara para telefone no formato (99) 9 9999-9999
document.addEventListener('DOMContentLoaded', function () {
  const telInput = document.getElementById('telefone');
  if (!telInput) return;

  telInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ""); // remove tudo que não for número

    if (value.length > 11) value = value.slice(0, 11); // limita a 11 dígitos

    if (value.length > 0) {
      value = "(" + value;
      if (value.length > 3) {
        value = value.slice(0, 3) + ") " + value.slice(3);
      }
      if (value.length > 10) {
        value = value.slice(0, 10) + " " + value.slice(10);
      }
      if (value.length > 15) {
        value = value.slice(0, 15) + "-" + value.slice(15);
      }
    }

    e.target.value = value;
  });
});

(() => {
  'use strict';

  const form = document.getElementById('leadForm');
  if (!form) return console.error('Form #leadForm não encontrado');

  // Use SEMPRE a Production URL (/webhook/, não /webhook-test/)
  const WEBHOOK_URL = "https://cunning-dashing-kite.ngrok-free.app/webhook-test/github-pages"; // troque aqui

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // evita o POST para o HTML (que causava 405)

    // Coleta os campos do formulário
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());

    // Ajustes úteis
    data.telefone = (data.telefone || '').replace(/\D/g, ''); // só dígitos
    data.lgpd = form.lgpd?.checked === true;                  // booleano

    // UTM via URL (caso a página receba ?utm_source=...)
    const params = new URLSearchParams(location.search);
    if (!data.utm_source && params.get('utm_source')) data.utm_source = params.get('utm_source');
    if (!data.utm_campaign && params.get('utm_campaign')) data.utm_campaign = params.get('utm_campaign');

    try {
      const r = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        mode: 'cors'
      });

      const j = await r.json().catch(() => null);

      if (r.ok) {
        alert(j?.message || 'Enviado com sucesso!');
        form.reset();
      } else {
        alert(j?.message || 'Não foi possível enviar. Tente novamente.');
        console.error('n8n erro', r.status, j);
      }
    } catch (err) {
      alert('Falha de rede. Verifique sua internet ou se o ngrok está ativo.');
      console.error(err);
    }
  });
})();
