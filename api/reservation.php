<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $query = "INSERT INTO reservations (room_id, reservation_date, start_time, total_price, status) 
                  VALUES (?, ?, ?, ?, 'pending')";
        
        $stmt = $db->prepare($query);
        
        $stmt->execute([
            $data->room_id,
            $data->date,
            $data->time,
            $data->total_price
        ]);

        echo json_encode(["message" => "Reservasi berhasil dibuat.", "id" => $db->lastInsertId()]);
    } catch(PDOException $e) {
        echo json_encode(["message" => "Error: " . $e->getMessage()]);
    }
}
?>