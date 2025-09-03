document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('telemed-form');
  form.addEventListener('submit', (e) => {
    if(!form.checkValidity()){
      e.preventDefault();
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  });
});