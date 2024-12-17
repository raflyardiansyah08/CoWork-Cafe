<?php
// api/member.php
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
        if (empty($data->name) || empty($data->email) || empty($data->phone) || empty($data->membership_type)) {
            throw new Exception("Semua field harus diisi!");
        }
        
        // Generate member ID
        $member_id = 'MEM' . date('Ym') . rand(1000, 9999);
        
        // Insert member baru
        $query = "INSERT INTO members 
                  (membership_id, name, email, phone, membership_type, joined_date, status) 
                  VALUES (?, ?, ?, ?, ?, CURDATE(), 'active')";
        
        $stmt = $db->prepare($query);
        
        $stmt->execute([
            $member_id,
            $data->name,
            $data->email,
            $data->phone,
            $data->membership_type
        ]);
        
        // Ambil harga membership
        $prices = [
            'silver' => 500000,
            'gold' => 1000000,
            'platinum' => 2000000
        ];
        
        $price = $prices[$data->membership_type];
        
        echo json_encode([
            "status" => "success",
            "message" => "Pendaftaran berhasil!",
            "member_id" => $member_id,
            "price" => $price
        ]);
        
    } catch(Exception $e) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
}

// GET untuk mengecek status membership
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $member_id = isset($_GET['member_id']) ? $_GET['member_id'] : '';
        
        if (empty($member_id)) {
            throw new Exception("Member ID diperlukan!");
        }
        
        $query = "SELECT * FROM members WHERE membership_id = ?";
        $stmt = $db->prepare($query);
        $stmt->execute([$member_id]);
        
        $member = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($member) {
            echo json_encode([
                "status" => "success",
                "data" => $member
            ]);
        } else {
            throw new Exception("Member tidak ditemukan!");
        }
        
    } catch(Exception $e) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
}
?>