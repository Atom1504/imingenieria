<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$data = null;

if (in_array($method, ['POST', 'PUT', 'DELETE'])) {
    $data = json_decode(file_get_contents("php://input"), true);
    if ($method === 'POST' && isset($data['_method'])) {
        $method = strtoupper($data['_method']);
    }
}

switch ($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM projects ORDER BY created_at DESC");
        $projects = $stmt->fetchAll();
        echo json_encode($projects);
        break;

    case 'POST':
        if(!isset($data['title']) || !isset($data['cat']) || !isset($data['place']) || !isset($data['client']) || !isset($data['img'])) {
            http_response_code(400);
            echo json_encode(["error" => "Faltan campos"]);
            exit;
        }
        $stmt = $pdo->prepare("INSERT INTO projects (title, cat, place, client, img) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$data['title'], $data['cat'], $data['place'], $data['client'], $data['img']]);
        echo json_encode(["message" => "Proyecto creado", "id" => $pdo->lastInsertId()]);
        break;

    case 'PUT':
        if(!isset($data['id'])) {
            http_response_code(400);
            echo json_encode(["error" => "ID requerido"]);
            exit;
        }
        $stmt = $pdo->prepare("UPDATE projects SET title=?, cat=?, place=?, client=?, img=? WHERE id=?");
        $stmt->execute([$data['title'], $data['cat'], $data['place'], $data['client'], $data['img'], $data['id']]);
        echo json_encode(["message" => "Proyecto actualizado"]);
        break;

    case 'DELETE':
        if(!isset($data['id'])) {
            http_response_code(400);
            echo json_encode(["error" => "ID requerido"]);
            exit;
        }
        $stmt = $pdo->prepare("DELETE FROM projects WHERE id=?");
        $stmt->execute([$data['id']]);
        echo json_encode(["message" => "Proyecto eliminado"]);
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        break;
}
?>
