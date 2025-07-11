document.getElementById('formulario-reseña').addEventListener('submit', function(e) {
  e.preventDefault();

  const form = this;
  const nombre = form.nombre.value.trim();
  const correo = form.correo.value.trim();
  const comentario = form.comentario.value.trim();
  const divMensaje = document.getElementById('mensaje-respuesta');

  // === VALIDACIONES ===

  if (!nombre || !correo || !comentario) {
    mostrarMensaje("❌ Todos los campos son obligatorios.", false);
    return;
  }

  if (!/^[^\d]{3,}$/.test(nombre)) {
    mostrarMensaje("❌ El nombre debe tener al menos 3 letras y no contener números.", false);
    return;
  }

  if (/[^\w\sáéíóúüñÁÉÍÓÚÜÑ]/i.test(nombre)) {
    mostrarMensaje("❌ El nombre no debe contener caracteres especiales.", false);
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    mostrarMensaje("❌ Correo electrónico no válido.", false);
    return;
  }

  if (comentario.length < 10) {
    mostrarMensaje("❌ El comentario debe tener al menos 10 caracteres.", false);
    return;
  }

  if (/[\'^£$%&*()}{@#~?><,|=_+¬-]/.test(comentario)) {
    mostrarMensaje("❌ El comentario no debe contener caracteres especiales.", false);
    return;
  }

  // === Si todo está bien ===
  mostrarMensaje("✅ Tu reseña se envió con éxito.", true);
  form.reset(); // Limpiar formulario

  setTimeout(() => {
    divMensaje.innerText = '';
    divMensaje.className = 'mensaje-oculto';
  }, 5000);
});

// === Función para mostrar mensajes ===
function mostrarMensaje(texto, exito) {
  const divMensaje = document.getElementById('mensaje-respuesta');
  divMensaje.innerText = texto;
  divMensaje.className = exito ? 'mensaje-exito' : 'mensaje-error';
}
