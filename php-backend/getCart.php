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

    $user_id = $_GET['user_id'];

    $stmt = $pdo->prepare("SELECT cart_items.id, item_id, size, quantity, items.title, items.img, items.price 
                           FROM cart_items 
                           JOIN items ON cart_items.item_id = items.id 
                           WHERE user_id = :user_id");
    $stmt->execute(['user_id' => $user_id]);
    $cart = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($cart);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Ошибка: ' . $e->getMessage()]);
}
