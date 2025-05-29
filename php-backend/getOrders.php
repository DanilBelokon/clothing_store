<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

$host = 'localhost';
$db   = 'fashion_store';
$user = 'postgres';
$pass = 'Dabelokon03';
$port = '5432';

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$db;", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);

    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['user_id']) || empty($data['user_id'])) {
        echo json_encode(['success' => false, 'error' => 'user_id не указан']);
        exit;
    }

    $user_id = $data['user_id'];

    // Получаем заказы пользователя
    $ordersStmt = $pdo->prepare("SELECT * FROM orders WHERE user_id = :user_id ORDER BY created_at DESC");
    $ordersStmt->execute(['user_id' => $user_id]);
    $orders = $ordersStmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($orders as &$order) {
        $itemsStmt = $pdo->prepare("SELECT * FROM order_items WHERE order_id = :order_id");
        $itemsStmt->execute(['order_id' => $order['id']]);
        $order['items'] = $itemsStmt->fetchAll(PDO::FETCH_ASSOC);
    }

    echo json_encode(['success' => true, 'orders' => $orders]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
