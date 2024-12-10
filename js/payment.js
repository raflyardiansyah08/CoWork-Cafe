document.addEventListener('DOMContentLoaded', function () {
  // Mengambil data reservasi dari localStorage
  const reservation = JSON.parse(localStorage.getItem('reservation'));

  if (reservation) {
    // Tampilkan detail reservasi
    const detailsDiv = document.getElementById('reservationDetails');
    detailsDiv.innerHTML = `
          <p><strong>Jenis Ruangan:</strong> ${reservation.roomType === 'meetingRoom' ? 'Ruang Meeting' : reservation.roomType === 'conferenceRoom' ? 'Ruang Konferensi' : 'Ruang Pribadi'}</p>
          <p><strong>Tanggal:</strong> ${reservation.date}</p>
          <p><strong>Waktu:</strong> ${reservation.time}</p>
      `;
  }

  // Event untuk tombol Bayar Sekarang
  document.getElementById('payNow').addEventListener('click', function () {
    const paymentMethod = document.getElementById('paymentMethod').value;

    if (paymentMethod) {
      alert(`Pembayaran berhasil menggunakan metode ${paymentMethod}.`);
      localStorage.removeItem('reservation'); // Hapus data reservasi setelah pembayaran
      window.location.href = '../index.html'; // Kembali ke halaman utama
    } else {
      alert('Pilih metode pembayaran terlebih dahulu.');
    }
  });
});
