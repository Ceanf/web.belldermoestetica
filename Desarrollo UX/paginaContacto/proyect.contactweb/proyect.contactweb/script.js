function validarFormulario() {

    // Obtener los valores de los campos
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const comentario = document.getElementById('comentario').value;
    const motivo = document.querySelector('input[name="motivo"]:checked');

    // Verificar si todos los campos están completos
    if (nombre && apellido && telefono && email && comentario && motivo) {
        // Mostrar el GIF (espera 1 segundo antes de mostrarlo)
        setTimeout(function () {
            document.getElementById('gif-container').style.display = 'block';
        }, 1000);

        // Habilitar el botón de enviar
        document.getElementById('submit-button').disabled = false;

    } else {
        // Ocultar el GIF y deshabilitar el botón de enviar
        document.getElementById('gif-container').style.display = 'none';
        document.getElementById('submit-button').disabled = true;
        // Mensaje de alerta si quieres
        // alert('Por favor, completa todos los campos.');
    }
}


// Evento para validar el formulario al escribir en los campos
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', validarFormulario);
});

// Enviar el formulario
function enviarFormulario(event) {
    event.preventDefault(); // Evita recarga

    const motivo = document.querySelector('input[name="motivo"]:checked');

    if (motivo) {
        if (motivo.value === "opinion") {
            alert("Tu opinión fue enviada");
        } else if (motivo.value === "consulta") {
            alert("Tu consulta ha sido enviada");
        }

        // Mostrar el GIF inmediatamente
        document.getElementById('gif-container').style.display = 'block';

        // Esperar 1 segundos, luego ocultar el GIF y reiniciar formulario
        setTimeout(() => {
            document.getElementById('gif-container').style.display = 'none';
            document.querySelector('form').reset(); // Reinicia el formulario
            document.getElementById('submit-button').disabled = true; // Deshabilita el botón hasta que vuelva a validar
        }, 1000);

    } else {
        alert("Por favor selecciona un motivo.");
    }
}
