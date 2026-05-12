<?php
/**
 * Script para configurar el usuario admin con el hash correcto.
 * Ejecutar UNA VEZ desde el navegador: http://localhost/imingenieria/public/api/setup.php
 */
require_once 'config.php';

$email = 'admin@imingenieria.com';
$password = 'admin123';
$role = 'admin';

// Generar hash correcto
$hash = password_hash($password, PASSWORD_BCRYPT);

echo "<h2>Setup de usuario admin</h2>";
echo "<p>Email: $email</p>";
echo "<p>Password: $password</p>";
echo "<p>Hash generado: $hash</p>";

try {
    // Verificar si el usuario ya existe
    $stmt = $pdo->prepare("SELECT id, password_hash FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $existing = $stmt->fetch();

    if ($existing) {
        // Actualizar el hash
        $stmt = $pdo->prepare("UPDATE users SET password_hash = ? WHERE email = ?");
        $stmt->execute([$hash, $email]);
        echo "<p style='color:green;font-weight:bold;'>✅ Usuario existente actualizado con hash correcto.</p>";
        echo "<p>Hash anterior: " . $existing['password_hash'] . "</p>";
    } else {
        // Insertar nuevo
        $stmt = $pdo->prepare("INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)");
        $stmt->execute([$email, $hash, $role]);
        echo "<p style='color:green;font-weight:bold;'>✅ Usuario admin creado exitosamente.</p>";
    }

    // Verificar que funciona
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    $verify = password_verify($password, $user['password_hash']);
    echo "<p>Verificación password_verify('$password', hash): " . ($verify ? '✅ CORRECTO' : '❌ FALLO') . "</p>";
    echo "<hr>";
    echo "<p>Ahora puedes cerrar esta página e intentar loguearte.</p>";
    
} catch (\PDOException $e) {
    echo "<p style='color:red;'>❌ Error: " . $e->getMessage() . "</p>";
}
?>
