<?php
// Conexión a la base de datos
$host = "localhost";
$usuario = "root";
$contrasena = "";
$basedatos = "bell_dermoestetica";

$conn = new mysqli($host, $usuario, $contrasena, $basedatos);

if ($conn->connect_error) {
  die("Error de conexión: " . $conn->connect_error);
}

// Capturar datos del formulario
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$telefono = $_POST['telefono'];
$email = $_POST['email'];
$motivo = $_POST['motivo'];
$comentario = $_POST['comentario'];

// Insertar en la base de datos
$sql = "INSERT INTO mensajes (nombre, apellido, telefono, email, motivo, comentario)
        VALUES (?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssss", $nombre, $apellido, $telefono, $email, $motivo, $comentario);

// Si se guarda en la BD correctamente
if ($stmt->execute()) {
    // Enviar correo
    $destinatario = "ceanchavz18@gmail.com"; // ⚠️ CAMBIA esto al correo real
    $asunto = "Nuevo mensaje desde el formulario de contacto";
    $mensaje = "
    Has recibido un nuevo mensaje desde el formulario de Bell Dermoestética:

    Nombre: $nombre $apellido
    Teléfono: $telefono
    Email: $email
    Motivo: $motivo

    Comentario:
    $comentario
    ";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($destinatario, $asunto, $mensaje, $headers)) {
        echo "<script>alert('Tu mensaje ha sido enviado y registrado exitosamente.'); window.location.href='contacto.html';</script>";
    } else {
        echo "<script>alert('Se guardó en la base de datos, pero no se pudo enviar el correo.'); window.location.href='contacto.html';</script>";
    }

} else {
    echo "<script>alert('Error al guardar el mensaje.'); window.history.back();</script>";
}

$stmt->close();
$conn->close();
?>
