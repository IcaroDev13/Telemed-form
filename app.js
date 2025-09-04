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
