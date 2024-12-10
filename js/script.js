document.getElementById('submitReservation').addEventListener('click', function () {
  const roomType = document.getElementById('roomType').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  if (roomType && date && time) {
    // Simpan data di localStorage untuk dipakai di halaman pembayaran
    localStorage.setItem('reservation', JSON.stringify({ roomType, date, time }));
    // Navigasi ke halaman pembayaran
    window.location.href = 'assets/payment.html';
  } else {
    alert('Mohon lengkapi semua kolom sebelum memesan.');
  }
});
