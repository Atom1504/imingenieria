<?php
require_once 'config.php';
// Para subida de archivos, verificamos si viene $_FILES
if (!isset($_FILES['file'])) {
    http_response_code(400);
    echo json_encode(["error" => "No se envió ningún archivo"]);
    exit;
}

$file = $_FILES['file'];

// Validaciones básicas
if ($file['error'] !== UPLOAD_ERR_OK) {
    http_response_code(500);
    echo json_encode(["error" => "Error al subir el archivo"]);
    exit;
}

$allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm'];
if (!in_array($file['type'], $allowedTypes)) {
    http_response_code(400);
    echo json_encode(["error" => "Tipo de archivo no permitido"]);
    exit;
}

// Crear nombre único
$ext = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = uniqid('media_') . '.' . $ext;
$uploadDir = '../uploads/';

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$targetPath = $uploadDir . $filename;

if (move_uploaded_file($file['tmp_name'], $targetPath)) {
    // La URL pública asumiendo que el hosting apunta al root y la carpeta es uploads
    $publicUrl = '/uploads/' . $filename;
    echo json_encode(["message" => "Archivo subido exitosamente", "url" => $publicUrl]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Error al guardar el archivo en el servidor"]);
}
?>
