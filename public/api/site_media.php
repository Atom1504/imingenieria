<?php
require_once 'config.php';
session_start();

$method = $_SERVER['REQUEST_METHOD'];

// Handle POST spoofing si es necesario, aunque aquí solo usaremos GET y POST nativamente
$data = null;
if (in_array($method, ['POST', 'PUT', 'DELETE'])) {
    $data = json_decode(file_get_contents("php://input"), true);
    if ($method === 'POST' && isset($data['_method'])) {
        $method = strtoupper($data['_method']);
    }
}

function requireAuth() {
    if (!isset($_SESSION['user_id'])) {
        http_response_code(401);
        echo json_encode(["error" => "No autorizado. Inicie sesión."]);
        exit;
    }
}

switch ($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT media_id, url FROM site_media");
        $results = $stmt->fetchAll();
        $media = [];
        foreach ($results as $row) {
            $media[$row['media_id']] = $row['url'];
        }
        echo json_encode($media);
        break;

    case 'POST':
        requireAuth();
        if (!isset($data['media_id']) || !isset($data['url'])) {
            http_response_code(400);
            echo json_encode(["error" => "Faltan parámetros media_id o url"]);
            exit;
        }
        
        $media_id = $data['media_id'];
        $url = $data['url'];
        
        $stmt = $pdo->prepare("
            INSERT INTO site_media (media_id, url) 
            VALUES (?, ?) 
            ON DUPLICATE KEY UPDATE url = VALUES(url)
        ");
        $stmt->execute([$media_id, $url]);
        
        echo json_encode(["message" => "Medio guardado correctamente", "media_id" => $media_id, "url" => $url]);
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        break;
}
?>
