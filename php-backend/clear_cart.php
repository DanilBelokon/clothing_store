<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$host = 'localhost';
$db   = 'fashion_store';
$user = 'postgres';
$pass = 'Dabelokon03';
$port = '5432';

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$db;", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);

    if (!isset($_GET['user_id']) || empty($_GET['user_id'])) {
        echo json_encode(['success' => false, 'error' => 'Не указан user_id']);
        exit;
    }

    $user_id = $_GET['user_id'];

    $stmt = $pdo->prepare("DELETE FROM cart_items WHERE user_id = :user_id");
    $stmt->execute(['user_id' => $user_id]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Ошибка БД: ' . $e->getMessage()]);
}
?>
