document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formulario');
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const domElements = {
    fotoLicencia: document.getElementById('fotoLicencia'),
    fotoSeguro: document.getElementById('fotoSeguro'),
    licenciaPreview: document.getElementById('licencia-preview'),
    seguroPreview: document.getElementById('seguro-preview')
  };

  const validateFileSize = (file, fileType) => {
    if (file && file.size > MAX_FILE_SIZE) {
      alert(`La ${fileType} excede el tamaño máximo de 5MB`);
      return false;
    }
    return true;
  };

  const clearPreviews = () => {
    domElements.licenciaPreview.classList.add('hidden');
    domElements.seguroPreview.classList.add('hidden');
  };

  const validateForm = () => {
    const requiredFields = [
      { id: 'nombres-input', name: 'nombres' },
      { id: 'apellidos-input', name: 'apellidos' },
      { id: 'email-input', name: 'correo electrónico' },
      { id: 'fotoLicencia', name: 'foto de licencia' },
      { id: 'fotoSeguro', name: 'foto del seguro' }
    ];

    for (const field of requiredFields) {
      const element = document.getElementById(field.id);
      if (!element.value && !(element.files && element.files.length > 0)) {
        alert(`Por favor complete el campo: ${field.name}`);
        element.focus();
        return false;
      }
    }

    // Validar formato de email
    const email = document.getElementById('email-input').value;
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Por favor ingrese un correo electrónico válido');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const fotoLicencia = domElements.fotoLicencia.files[0];
    const fotoSeguro = domElements.fotoSeguro.files[0];

    if (!validateFileSize(fotoLicencia, 'foto de licencia')) return;
    if (!validateFileSize(fotoSeguro, 'foto del seguro')) return;

    try {
      const formData = new FormData(form);
      const response = await fetch('https://geico-conpany.onrender.com/api/FormData', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Error HTTP: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Error en el procesamiento del formulario');
      }

      console.log("Respuesta exitosa del servidor:", result);

      form.reset();
      clearPreviews();
      alert(currentLang === 'es' ? 'Formulario enviado con éxito' : 'Form submitted successfully');

    } catch (error) {
      console.error("Error en el envío del formulario:", error);
      alert(`Error: ${error.message || 'Ocurrió un error al enviar el formulario'}`);
    }
  };

  form.addEventListener('submit', handleSubmit);
  form.addEventListener('reset', clearPreviews);
});