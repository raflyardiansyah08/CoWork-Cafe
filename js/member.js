// Status untuk tracking registrasi
let isRegistered = false;

// Fungsi untuk validasi form
function validateForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();

  return {
    isValid: name && email && phone,
    name: name,
    email: email,
    phone: phone
  };
}

// Fungsi untuk menghandle pendaftaran
document.getElementById('register-btn').addEventListener('click', function () {
  const formData = validateForm();

  if (!formData.isValid) {
    // Tampilkan animasi error jika form tidak lengkap
    Swal.fire({
      title: 'Pendaftaran Gagal',
      text: 'Harap lengkapi semua data pendaftaran!',
      icon: 'error',
      confirmButtonColor: '#1a252f',
      confirmButtonText: 'Tutup'
    });
    return;
  }

  // Generate member ID dan tampilkan animasi sukses
  const memberId = 'MEM' + Math.floor(Math.random() * 10000);

  Swal.fire({
    title: 'Pendaftaran Berhasil!',
    html: `
      <p>Selamat ${formData.name}!</p>
      <p>ID Member Anda: <strong>${memberId}</strong></p>
    `,
    icon: 'success',
    confirmButtonColor: '#1a252f',
    showConfirmButton: true,
    confirmButtonText: 'Lanjutkan',
    allowOutsideClick: false
  }).then((result) => {
    if (result.isConfirmed) {
      isRegistered = true;
      document.getElementById('member-id').textContent =
        `Selamat, ${formData.name}! ID Member Anda adalah ${memberId}.`;

      // Enable semua tombol paket setelah registrasi sukses
      enablePackageButtons();
    }
  });
});

// Fungsi untuk mengaktifkan tombol paket
function enablePackageButtons() {
  const packageButtons = document.querySelectorAll('.select-btn');
  packageButtons.forEach(button => {
    button.disabled = false;
    button.style.opacity = '1';
  });
}

// Fungsi untuk menonaktifkan tombol paket
function disablePackageButtons() {
  const packageButtons = document.querySelectorAll('.select-btn');
  packageButtons.forEach(button => {
    button.disabled = true;
    button.style.opacity = '0.5';
  });
}

// Nonaktifkan tombol paket saat halaman dimuat
disablePackageButtons();

// Event listener untuk pemilihan paket
document.querySelectorAll('.select-btn').forEach(button => {
  button.addEventListener('click', function () {
    if (!isRegistered) {
      Swal.fire({
        title: 'Akses Ditolak',
        text: 'Anda harus mendaftar terlebih dahulu sebelum memilih paket!',
        icon: 'warning',
        confirmButtonColor: '#1a252f',
        confirmButtonText: 'Mengerti'
      });
      return;
    }
  });
});

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