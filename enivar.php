<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre   = htmlspecialchars(trim($_POST["nombre"]));
    $telefono = htmlspecialchars(trim($_POST["telefono"]));
    $email    = htmlspecialchars(trim($_POST["email"]));
    $mensaje  = htmlspecialchars(trim($_POST["mensaje"]));

    // Validar campos básicos
    if (empty($nombre) || empty($telefono) || empty($email) || empty($mensaje)) {
        echo "Por favor, completa todos los campos.";
        exit;
    }

    // Dirección de destino
    $destinatario = "samuelrebollolazaro@gmail.com";
    $asunto = "Nuevo mensaje desde Oniric View";

    // Cuerpo del correo
    $cuerpo = "Has recibido un nuevo mensaje de contacto:\n\n";
    $cuerpo .= "Nombre: $nombre\n";
    $cuerpo .= "Teléfono: $telefono\n";
    $cuerpo .= "Correo electrónico: $email\n";
    $cuerpo .= "Mensaje:\n$mensaje\n";

    $cabeceras = "From: $email\r\n";
    $cabeceras .= "Reply-To: $email\r\n";

    if (mail($destinatario, $asunto, $cuerpo, $cabeceras)) {
        echo "✅ Mensaje enviado correctamente.";
    } else {
        echo "❌ Error al enviar el mensaje. Inténtalo más tarde.";
    }
} else {
    echo "Acceso denegado.";
}
