<?php
// Mostrar errores
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Procesar si se ha enviado por POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $nombre   = htmlspecialchars(trim($_POST["nombre"]));
  $telefono = htmlspecialchars(trim($_POST["telefono"]));
  $email    = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
  $mensaje  = htmlspecialchars(trim($_POST["mensaje"]));

  $destino = "info@oniricview.com";
  $asunto = "📩 Nuevo mensaje desde el formulario de contacto";
  $contenido = "Nombre: $nombre\n";
  $contenido .= "Teléfono: $telefono\n";
  $contenido .= "Email: $email\n\n";
  $contenido .= "Mensaje:\n$mensaje\n";

  $cabeceras = "From: $email\r\n";
  $cabeceras .= "Reply-To: $email\r\n";
  $cabeceras .= "Content-Type: text/plain; charset=UTF-8\r\n";

  $resultado = mail($destino, $asunto, $contenido, $cabeceras);
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Contacto enviado - Oniric View</title>
  <link rel="stylesheet" href="../css/contacto.css" />
  <link rel="icon" href="../images/Mini_logo.png" />
  <style>
    .mensaje-respuesta {
      max-width: 700px;
      margin: 120px auto;
      padding: 2rem;
      border-radius: 12px;
      background: #ffffff10;
      color: white;
      font-family: Arial, sans-serif;
      text-align: center;
      backdrop-filter: blur(10px);
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    }
    .mensaje-respuesta.success {
      border-left: 6px solid #2ecc71;
    }
    .mensaje-respuesta.error {
      border-left: 6px solid #e74c3c;
    }
    body {
      background-color: #000; /* fondo oscuro coherente */
    }
  </style>
</head>
<body>
  <header>
    <div class="header_elements">
      <a href="index.html">
        <img class="logo" src="https://oniricview.s3.eu-north-1.amazonaws.com/imagenes/LogoHorizontalWhite.webp" alt="Oniric logo" />
      </a>
      <a class="menu_item" href="servicios.html">Servicios</a>
      <a class="menu_item" href="contacto.html">Contacto</a>
      <a class="menu_item" href="sobre-nosotros.html">Sobre nosotros</a>
      <a class="menu_item" href="blog.html">Blog</a>
    </div>
  </header>

  <main>
    <div class="mensaje-respuesta <?= isset($resultado) && $resultado ? 'success' : 'error' ?>">
      <?php if (isset($resultado) && $resultado): ?>
        <h2>✅ Tu mensaje fue enviado correctamente.</h2>
        <p>Gracias por contactar con Oniric View. Te responderemos lo antes posible.</p>
      <?php else: ?>
        <h2>❌ Hubo un error al enviar el mensaje.</h2>
        <p>Por favor, revisa la configuración o intenta más tarde.</p>
      <?php endif; ?>
      <br>
      <a href="contacto.html" style="color: #fc9c24; text-decoration: underline;">Volver al formulario</a>
    </div>
  </main>
</body>
</html>
