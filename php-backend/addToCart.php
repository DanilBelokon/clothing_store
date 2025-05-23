<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Content-Type");

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
    $user_id = $data["user_id"];
    $item_id = $data["item_id"];
    $size = $data["size"];
    $quantity = $data["quantity"];

    // Проверяем, есть ли уже такой товар с этим размером у пользователя
    $stmt = $pdo->prepare("SELECT id FROM cart_items WHERE user_id = :user_id AND item_id = :item_id AND size = :size");
    $stmt->execute([
        'user_id' => $user_id,
        'item_id' => $item_id,
        'size' => $size
    ]);

    if ($stmt->rowCount() > 0) {
        $stmt = $pdo->prepare("UPDATE cart_items SET quantity = quantity + :quantity 
                               WHERE user_id = :user_id AND item_id = :item_id AND size = :size");
        $stmt->execute([
            'quantity' => $quantity,
            'user_id' => $user_id,
            'item_id' => $item_id,
            'size' => $size
        ]);
    } else {
        $stmt = $pdo->prepare("INSERT INTO cart_items (user_id, item_id, size, quantity) 
                               VALUES (:user_id, :item_id, :size, :quantity)");
        $stmt->execute([
            'user_id' => $user_id,
            'item_id' => $item_id,
            'size' => $size,
            'quantity' => $quantity
        ]);
    }

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Ошибка: ' . $e->getMessage()]);
}
