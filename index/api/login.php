<?php
require_once 'config.php';
session_start();

// Log para debugging
error_log("=== LOGIN ATTEMPT ===");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    error_log("LOGIN ERROR: No se recibió JSON válido. Raw input: " . file_get_contents("php://input"));
    http_response_code(400);
    echo json_encode(["error" => "No se recibió JSON válido"]);
    exit;
}

error_log("LOGIN: Datos recibidos - email: " . ($data['email'] ?? 'N/A'));

if (!isset($data['email']) || !isset($data['password'])) {
    error_log("LOGIN ERROR: Faltan campos email o password");
    http_response_code(400);
    echo json_encode(["error" => "Email y contraseña requeridos"]);
    exit;
}

$email = $data['email'];
$password = $data['password'];

try {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if (!$user) {
        error_log("LOGIN ERROR: Usuario no encontrado para email: " . $email);
        http_response_code(401);
        echo json_encode(["error" => "Usuario no encontrado"]);
        exit;
    }

    error_log("LOGIN: Usuario encontrado - id: " . $user['id'] . ", role: " . $user['role']);
    error_log("LOGIN: Hash almacenado: " . $user['password_hash']);
    error_log("LOGIN: password_verify result: " . (password_verify($password, $user['password_hash']) ? 'TRUE' : 'FALSE'));

    if (password_verify($password, $user['password_hash'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['role'] = $user['role'];
        
        error_log("LOGIN OK: Sesión iniciada para " . $email);

        echo json_encode([
            "message" => "Login exitoso",
            "user" => [
                "email" => $user['email'],
                "role" => $user['role']
            ]
        ]);
    } else {
        error_log("LOGIN ERROR: password_verify falló para " . $email);
        http_response_code(401);
        echo json_encode(["error" => "Contraseña incorrecta"]);
    }
} catch (\PDOException $e) {
    error_log("LOGIN DB ERROR: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(["error" => "Error de base de datos: " . $e->getMessage()]);
}
?>
