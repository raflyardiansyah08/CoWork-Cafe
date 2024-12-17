<?php
// api/payment.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $data = json_decode(file_get_contents("php://input"));
        
        // Validasi input
        if (empty($data->reservation_id) || empty($data->payment_method) || empty($data->amount)) {
            throw new Exception("Data pembayaran tidak lengkap!");
        }
        
        // Start transaction
        $db->beginTransaction();
        
        // Insert pembayaran
        $query = "INSERT INTO payments 
                  (reservation_id, amount, payment_method, payment_status) 
                  VALUES (?, ?, ?, 'pending')";
        
        $stmt = $db->prepare($query);
        $stmt->execute([
            $data->reservation_id,
            $data->amount,
            $data->payment_method
        ]);
        
        // Update status reservasi
        $query = "UPDATE reservations 
                  SET status = 'confirmed' 
                  WHERE id = ?";
        
        $stmt = $db->prepare($query);
        $stmt->execute([$data->reservation_id]);
        
        // Commit transaction
        $db->commit();
        
        echo json_encode([
            "status" => "success",
            "message" => "Pembayaran berhasil diproses!",
            "payment_id" => $db->lastInsertId()
        ]);
        
    } catch(Exception $e) {
        // Rollback jika ada error
        if ($db->inTransaction()) {
            $db->rollBack();
        }
        
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
}

// GET untuk mengecek status pembayaran
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $payment_id = isset($_GET['payment_id']) ? $_GET['payment_id'] : '';
        
        if (empty($payment_id)) {
            throw new Exception("Payment ID diperlukan!");
        }
        
        $query = "SELECT p.*, r.reservation_date, r.start_time 
                  FROM payments p 
                  JOIN reservations r ON p.reservation_id = r.id 
                  WHERE p.id = ?";
                  
        $stmt = $db->prepare($query);
        $stmt->execute([$payment_id]);
        
        $payment = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($payment) {
            echo json_encode([
                "status" => "success",
                "data" => $payment
            ]);
        } else {
            throw new Exception("Pembayaran tidak ditemukan!");
        }
        
    } catch(Exception $e) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
}
?>