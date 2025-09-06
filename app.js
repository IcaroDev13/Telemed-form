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

(function () {
  const form = document.getElementById('leadForm');
  if (!form) return;

  // >>> Ajuste aqui <<<
  const N8N_URL = 'https://cunning-dashing-kite.ngrok-free.app/webhook/lead/landing';

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Enviando...'; }

    try {
      const formData = new FormData(form); // evita preflight e é 100% compatível com n8n
      const res = await fetch(N8N_URL, { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Falha no envio');

      // Sucesso
      alert('Recebemos suas respostas! Em instantes entraremos em contato.');
      form.reset();
    } catch (err) {
      console.error(err);
      alert('Não foi possível enviar agora. Tente novamente em instantes.');
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = 'Quero ver como funciona (Gratuito)'; }
    }
  });
})();

const URL_N8N = "https://cunning-dashing-kite.ngrok-free.app/webhook/lead/landing";
form.addEventListener("submit", async (e)=>{
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  const r = await fetch(URL_N8N, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(data),
    mode: "cors",
  });
  const j = await r.json().catch(()=>({}));
  alert(j?.message || "Enviado!");
});
