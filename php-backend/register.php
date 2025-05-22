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

    if (!$data || !isset($data['email'], $data['password'], $data['username'], $data['surname'])) {
        echo json_encode(['error' => 'Некорректные данные']);
        exit;
    }

    $email = $data['email'];
    $username = $data['username'];
    $surname = $data['surname'];
    $password_hash = password_hash($data['password'], PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("INSERT INTO users (email, username, surname, password_hash) VALUES (:email, :username, :surname, :password_hash)");
    $stmt->execute([
        ':email' => $email,
        ':username' => $username,
        ':surname' => $surname,
        ':password_hash' => $password_hash,
    ]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    if ($e->getCode() === '23505') { // duplicate email
        echo json_encode(['error' => 'Email уже используется']);
    } else {
        echo json_encode(['error' => 'Ошибка сервера: ' . $e->getMessage()]);
    }
}
