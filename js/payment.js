// Fungsi untuk memformat tanggal ke format Indonesia
function formatDate(dateString) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
}

// Fungsi untuk mengkonversi jenis ruangan ke bahasa Indonesia
function getRoomTypeInIndonesian(roomType) {
  const roomTypes = {
    meetingRoom: 'Ruang Meeting',
    conferenceRoom: 'Ruang Konferensi',
    privateRoom: 'Ruang Pribadi'
  };
  return roomTypes[roomType] || roomType;
}

// Fungsi untuk mendapatkan label metode pembayaran
function getPaymentMethodLabel(method) {
  const methods = {
    creditCard: 'Kartu Kredit',
    bankTransfer: 'Transfer Bank',
    eWallet: 'E-Wallet'
  };
  return methods[method] || method;
}

document.addEventListener('DOMContentLoaded', function () {
  // Mengambil data reservasi dari localStorage
  const reservation = JSON.parse(localStorage.getItem('reservation'));
  const detailsDiv = document.getElementById('reservationDetails');

  // Cek apakah ada data reservasi
  if (!reservation) {
    Swal.fire({
      title: 'Error!',
      text: 'Tidak ada data reservasi yang ditemukan',
      icon: 'error',
      confirmButtonColor: '#1a252f'
    }).then(() => {
      window.location.href = '../index.html';
    });
    return;
  }

  // Tampilkan detail reservasi
  detailsDiv.innerHTML = `
    <p><strong>Jenis Ruangan:</strong> ${getRoomTypeInIndonesian(reservation.roomType)}</p>
    <p><strong>Tanggal:</strong> ${formatDate(reservation.date)}</p>
    <p><strong>Waktu:</strong> ${reservation.time}</p>
    <p><strong>Total Pembayaran:</strong> Rp ${(Math.random() * 1000000 + 500000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
  `;

  // Event listener untuk tombol pembayaran
  document.getElementById('btn').addEventListener('click', async function () {
    const paymentMethod = document.getElementById('paymentMethod').value;

    if (!paymentMethod) {
      Swal.fire({
        title: 'Peringatan',
        text: 'Silakan pilih metode pembayaran terlebih dahulu',
        icon: 'warning',
        confirmButtonColor: '#1a252f'
      });
      return;
    }

    // Simulasi proses pembayaran
    const loadingResult = await Swal.fire({
      title: 'Memproses Pembayaran',
      html: 'Mohon tunggu sebentar...',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    if (loadingResult.dismiss === Swal.DismissReason.timer) {
      // Pembayaran berhasil
      Swal.fire({
        title: 'Pembayaran Berhasil!',
        html: `
          <p>Terima kasih telah melakukan pembayaran menggunakan ${getPaymentMethodLabel(paymentMethod)}.</p>
          <p>Detail pembayaran telah dikirim ke email Anda.</p>
        `,
        icon: 'success',
        confirmButtonColor: '#1a252f',
        confirmButtonText: 'Selesai'
      }).then((result) => {
        if (result.isConfirmed) {
          // Hapus data reservasi dari localStorage
          localStorage.removeItem('reservation');
          // Redirect ke halaman utama
          window.location.href = '../index.html';
        }
      });
    }
  });

  // member.js
  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registration-form');

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        membership_type: document.getElementById('membership-type').value
      };

      try {
        const response = await fetch('/api/member.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.status === 'success') {
          // Simpan member_id untuk proses pembayaran
          localStorage.setItem('member_id', result.member_id);
          localStorage.setItem('membership_price', result.price);

          Swal.fire({
            title: 'Pendaftaran Berhasil!',
            text: `ID Member Anda: ${result.member_id}`,
            icon: 'success',
            confirmButtonText: 'Lanjut ke Pembayaran'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = 'payment.html';
            }
          });
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error'
        });
      }
    });
  });

  // payment.js
  document.addEventListener('DOMContentLoaded', function () {
    const paymentForm = document.getElementById('payment-form');

    // Tampilkan detail pembayaran
    const reservationId = localStorage.getItem('reservationId');
    const memberId = localStorage.getItem('member_id');
    const amount = localStorage.getItem('membership_price') ||
      localStorage.getItem('reservation_price');

    document.getElementById('payment-details').innerHTML = `
        <p><strong>ID Transaksi:</strong> ${reservationId || memberId}</p>
        <p><strong>Total Pembayaran:</strong> Rp ${parseInt(amount).toLocaleString()}</p>
    `;

    paymentForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const paymentData = {
        reservation_id: reservationId,
        payment_method: document.getElementById('payment-method').value,
        amount: amount
      };

      try {
        const response = await fetch('/api/payment.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(paymentData)
        });

        const result = await response.json();

        if (result.status === 'success') {
          Swal.fire({
            title: 'Pembayaran Berhasil!',
            text: 'Terima kasih atas pembayaran Anda',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              // Bersihkan localStorage
              localStorage.removeItem('reservationId');
              localStorage.removeItem('member_id');
              localStorage.removeItem('membership_price');
              localStorage.removeItem('reservation_price');

              // Redirect ke halaman utama
              window.location.href = 'index.html';
            }
          });
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error'
        });
      }
    });
  });  
});