<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true);

switch ($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT id, email, role, created_at FROM users ORDER BY id ASC");
        $users = $stmt->fetchAll();
        echo json_encode($users);
        break;

    case 'POST':
        if(!isset($data['email']) || !isset($data['password']) || !isset($data['role'])) {
            http_response_code(400);
            echo json_encode(["error" => "Faltan campos (email, password, role)"]);
            exit;
        }
        
        $hash = password_hash($data['password'], PASSWORD_BCRYPT);
        try {
            $stmt = $pdo->prepare("INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)");
            $stmt->execute([$data['email'], $hash, $data['role']]);
            echo json_encode(["message" => "Usuario creado", "id" => $pdo->lastInsertId()]);
        } catch (\PDOException $e) {
            http_response_code(400);
            echo json_encode(["error" => "Error al crear usuario. Verifica que el correo no exista ya."]);
        }
        break;

    case 'PUT':
        if(!isset($data['id']) || !isset($data['email']) || !isset($data['role'])) {
            http_response_code(400);
            echo json_encode(["error" => "ID, email y rol requeridos"]);
            exit;
        }
        
        try {
            if (!empty($data['password'])) {
                $hash = password_hash($data['password'], PASSWORD_BCRYPT);
                $stmt = $pdo->prepare("UPDATE users SET email=?, role=?, password_hash=? WHERE id=?");
                $stmt->execute([$data['email'], $data['role'], $hash, $data['id']]);
            } else {
                $stmt = $pdo->prepare("UPDATE users SET email=?, role=? WHERE id=?");
                $stmt->execute([$data['email'], $data['role'], $data['id']]);
            }
            echo json_encode(["message" => "Usuario actualizado"]);
        } catch (\PDOException $e) {
            http_response_code(400);
            echo json_encode(["error" => "Error al actualizar. Verifica que el correo no exista ya."]);
        }
        break;

    case 'DELETE':
        if(!isset($data['id'])) {
            http_response_code(400);
            echo json_encode(["error" => "ID requerido"]);
            exit;
        }
        
        // Medida de seguridad: evitar que se borre el admin principal
        if ($data['id'] == 1) {
            http_response_code(403);
            echo json_encode(["error" => "No se puede eliminar al administrador principal"]);
            exit;
        }
        
        $stmt = $pdo->prepare("DELETE FROM users WHERE id=?");
        $stmt->execute([$data['id']]);
        echo json_encode(["message" => "Usuario eliminado"]);
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        break;
}
?>
