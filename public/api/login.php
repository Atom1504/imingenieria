<?php
require_once 'config.php';
session_start();

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['email']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(["error" => "Email y contraseña requeridos"]);
    exit;
}

$email = $data['email'];
$password = $data['password'];

// Verificar si la tabla de usuarios está vacía, y si es así, crear un usuario admin por defecto
$stmtCount = $pdo->query("SELECT COUNT(*) FROM users");
if ($stmtCount->fetchColumn() == 0) {
    $defaultEmail = 'admin@imingenieria.com';
    $defaultPass = password_hash('admin123', PASSWORD_DEFAULT);
    $pdo->prepare("INSERT INTO users (email, password_hash, role) VALUES (?, ?, 'admin')")->execute([$defaultEmail, $defaultPass]);
}

$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if ($user && password_verify($password, $user['password_hash'])) {
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['role'] = $user['role'];
    
    echo json_encode([
        "message" => "Login exitoso",
        "user" => [
            "email" => $user['email'],
            "role" => $user['role']
        ]
    ]);
} else {
    http_response_code(401);
    echo json_encode(["error" => "Credenciales incorrectas"]);
}
?>
