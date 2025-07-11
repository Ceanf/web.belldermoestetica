document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formulario-contacto');
  const submitButton = document.getElementById('submit-button');

  function mostrarError(id, mensaje) {
    const error = document.getElementById(`error-${id}`);
    if (error) {
      error.textContent = mensaje;
      error.classList.add('visible');
    }
  }

  function limpiarError(id) {
    const error = document.getElementById(`error-${id}`);
    if (error) {
      error.textContent = '';
      error.classList.remove('visible');
    }
  }

  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validarTelefono(telefono) {
    const regex = /^\d{9}$/;
    return regex.test(telefono);
  }

  function validarTextoSoloLetras(texto) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/;
    return regex.test(texto);
  }

  function validarFormulario() {
    const campos = [
      { id: 'nombre', obligatorio: true },
      { id: 'apellido', obligatorio: true },
      { id: 'telefono', obligatorio: true },
      { id: 'email', obligatorio: true },
      { id: 'comentario', obligatorio: true }
    ];

    let completo = true;

    campos.forEach(campo => {
      const input = document.getElementById(campo.id);
      const valor = input.value.trim();

      if (campo.obligatorio && valor === '') {
        input.style.border = '2px solid red';
        mostrarError(campo.id, 'Este campo es obligatorio');
        completo = false;
      } else {
        if (campo.id === 'email' && !validarEmail(valor)) {
          input.style.border = '2px solid red';
          mostrarError(campo.id, 'Ingresa un correo válido');
          completo = false;
        } else if (campo.id === 'telefono' && !validarTelefono(valor)) {
          input.style.border = '2px solid red';
          mostrarError(campo.id, 'Ingresa un teléfono válido de 9 dígitos');
          completo = false;
        } else if ((campo.id === 'nombre' || campo.id === 'apellido')) {
          if (!validarTextoSoloLetras(valor)) {
            input.style.border = '2px solid red';
            mostrarError(campo.id, 'Solo se permiten letras (sin espacios ni símbolos)');
            completo = false;
          } else if (valor.length < 4) {
            input.style.border = '2px solid red';
            mostrarError(campo.id, 'Debe tener al menos 4 letras');
            completo = false;
          } else {
            input.style.border = '2px solid green';
            limpiarError(campo.id);
          }
        } else if (campo.id === 'comentario') {
          if (valor.length < 10) {
            input.style.border = '2px solid red';
            mostrarError(campo.id, 'El comentario debe tener al menos 10 caracteres');
            completo = false;
          } else {
            input.style.border = '2px solid green';
            limpiarError(campo.id);
          }
        } else {
          input.style.border = '2px solid green';
          limpiarError(campo.id);
        }
      }
    });

    // Validar radio buttons
    const motivoSeleccionado = document.querySelector('input[name="motivo"]:checked');
    const radios = document.querySelectorAll('input[name="motivo"]');
    const errorMotivo = document.getElementById('error-motivo');

    if (!motivoSeleccionado) {
      radios.forEach(r => r.parentElement.style.color = 'red');
      errorMotivo.textContent = 'Selecciona un motivo';
      errorMotivo.classList.add('visible');
      completo = false;
    } else {
      radios.forEach(r => r.parentElement.style.color = 'green');
      errorMotivo.textContent = '';
      errorMotivo.classList.remove('visible');
    }

    submitButton.disabled = !completo;
    return completo;
  }

  form.addEventListener('input', validarFormulario);
  form.addEventListener('change', validarFormulario);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    const motivo = document.querySelector('input[name="motivo"]:checked');
    const mensaje = motivo.value === 'consulta'
      ? 'Tu consulta ha sido enviada.'
      : 'Gracias por tu opinión.';

    alert(mensaje);
    form.reset();
    submitButton.disabled = true;

    // Limpiar estilos y errores
    document.querySelectorAll('input, textarea').forEach(el => {
      el.style.border = '1px solid #ccc';
    });
    document.querySelectorAll('.mensaje-error').forEach(e => {
      e.textContent = '';
      e.classList.remove('visible');
    });
    document.querySelectorAll('input[name="motivo"]').forEach(r => {
      r.parentElement.style.color = '';
    });
  });

  // BLOQUEAR ESPACIOS, SÍMBOLOS y mostrar errores dinámicos en nombre y apellido
  ['nombre', 'apellido'].forEach(id => {
    const input = document.getElementById(id);

    input.addEventListener('keydown', (e) => {
      if (e.key === ' ') {
        e.preventDefault();
        mostrarError(id, 'No se permiten símbolos ni espacios');
        input.style.border = '2px solid red';
      }
    });

    input.addEventListener('input', () => {
      const original = input.value;
      const limpio = original.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ]/g, '');

      if (original !== limpio) {
        mostrarError(id, 'No se permiten símbolos ni espacios');
        input.style.border = '2px solid red';
      } else if (limpio.length === 0) {
        mostrarError(id, 'Este campo es obligatorio');
        input.style.border = '2px solid red';
      } else {
        limpiarError(id);
        input.style.border = '2px solid green';
      }

      input.value = limpio;
    });

    input.addEventListener('blur', () => {
      if (input.value.trim() === '') {
        mostrarError(id, 'Este campo es obligatorio');
        input.style.border = '2px solid red';
      }
    });
  });
});
