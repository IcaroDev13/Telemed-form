// JS utilitário: preenche UTMs via querystring, evita duplo envio e mostra mensagem básica
(function(){
  const form = document.getElementById('leadForm');
  if(!form) return;

  // UTM via querystring
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get('utm_source');
  const utmCampaign = params.get('utm_campaign');
  if(utmSource) form.querySelector('input[name="utm_source"]').value = utmSource;
  if(utmCampaign) form.querySelector('input[name="utm_campaign"]').value = utmCampaign;

  // Evitar duplo envio
  let sending = false;
  form.addEventListener('submit', function(e){
    if(sending) { e.preventDefault(); return; }
    sending = true;
    const btn = form.querySelector('button[type="submit"]');
    if(btn){ btn.disabled = true; btn.textContent = 'Enviando...'; }
  }, false);
})();