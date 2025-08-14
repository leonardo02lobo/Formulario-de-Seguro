const form = document.getElementById('formulario');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(form); // Usa el formulario directamente
  
  // Verifica que los archivos no excedan el tamaño
  const fotoLicencia = form.querySelector('#fotoLicencia').files[0];
  const fotoSeguro = form.querySelector('#fotoSeguro').files[0];
  
  if (fotoLicencia && fotoLicencia.size > 5 * 1024 * 1024) {
    alert('La foto de licencia excede el tamaño máximo de 5MB');
    return;
  }
  
  if (fotoSeguro && fotoSeguro.size > 5 * 1024 * 1024) {
    alert('La foto del seguro excede el tamaño máximo de 5MB');
    return;
  }

  try {
    const response = await fetch('http://localhost:4000/api/FormData', {
      method: 'POST',
      body: formData
    });

    // Verifica si la respuesta es JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(text || 'Respuesta no válida del servidor');
    }

    const result = await response.json();
    
    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Error en el servidor');
    }
    
    console.log("Respuesta del servidor:", result);
    alert('Formulario enviado correctamente');
    form.reset(); // Limpia el formulario
    
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
    alert(`Error: ${error.message}`);
  }
});