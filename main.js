// main.js
const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch('http://localhost:3000/api/registrar', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (response.ok) {
      alert('✅ ' + result.mensaje);
      form.reset();
    } else {
      alert('❌ Error: ' + result.error);
    }
  } catch (error) {
    console.error('Error de conexión:', error);
    alert('❌ No se pudo conectar al servidor');
  }
});