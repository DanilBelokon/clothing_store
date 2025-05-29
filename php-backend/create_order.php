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

    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data || !isset($data['formData'], $data['cartItems'], $data['paymentType'])) {
        echo json_encode(['error' => 'Некорректные данные']);
        exit;
    }

    $formData = $data['formData'];
    $cartItems = $data['cartItems'];
    $paymentType = $data['paymentType'];
    $total = 0;

    // Вставка заказа
    $stmt = $pdo->prepare("
        INSERT INTO orders (user_id, customer_name, phone, email, address, comment, total, payment_method)
        VALUES (:user_id, :name, :phone, :email, :address, :comment, :total, :payment_method)
        RETURNING id
    ");

    foreach ($cartItems as $item) {
        $price = floatval(preg_replace('/[^\d.]/', '', $item['price']));
        $quantity = $item['quantity'] ?? 1;
        $total += $price * $quantity;
    }

    $stmt->execute([
        ':user_id'=> $formData['userId'],
        ':name' => $formData['name'],
        ':phone' => $formData['phone'],
        ':email' => $formData['email'] ?? '',
        ':address' => $formData['address'],
        ':comment' => $formData['comment'] ?? '',
        ':total' => $total,
        ':payment_method' => $paymentType
    ]);

    $orderId = $stmt->fetchColumn();

    // Вставка товаров заказа
    $itemStmt = $pdo->prepare("
        INSERT INTO order_items (order_id, item_id, title, size, price, quantity)
        VALUES (:order_id, :item_id, :title, :size, :price, :quantity)
    ");

    foreach ($cartItems as $item) {
        $price = floatval(preg_replace('/[^\d.]/', '', $item['price']));
        $itemStmt->execute([
            ':order_id' => $orderId,
            ':item_id' => $item['item_id'],
            ':title' => $item['title'],
            ':size' => $item['size'] ?? '',
            ':price' => $price,
            ':quantity' => $item['quantity'] ?? 1,
        ]);
    }

    echo json_encode(['success' => true, 'orderId' => $orderId]);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Ошибка сервера: ' . $e->getMessage()]);
}
