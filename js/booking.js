// Fungsi untuk mengecek apakah tanggal valid (tidak di masa lalu)
function isValidDate(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    return selectedDate >= today;
}

// Fungsi untuk mengecek apakah waktu valid (minimal 1 jam dari sekarang untuk hari ini)
function isValidTime(date, time) {
    const today = new Date();
    const selectedDateTime = new Date(date + ' ' + time);

    // Jika tanggal hari ini, pastikan waktu minimal 1 jam dari sekarang
    if (selectedDateTime.toDateString() === today.toDateString()) {
        return selectedDateTime.getTime() > today.getTime() + (60 * 60 * 1000);
    }
    return true;
}

// Fungsi untuk menampilkan SweetAlert
function showAlert(title, text, icon) {
    return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonColor: '#1a252f'
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // Set minimum date untuk input tanggal (hari ini)
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;

    // Event listener untuk form reservasi
    const form = document.getElementById('reservationForm');
    const submitButton = document.getElementById('submitReservation');

    // Add sweet alert script
    const sweetAlertScript = document.createElement('script');
    sweetAlertScript.src = 'dist/sweetalert2.all.min.js';
    document.head.appendChild(sweetAlertScript);

    submitButton.addEventListener('click', async function (e) {
        e.preventDefault();

        const roomType = document.getElementById('roomType').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        // Validasi form
        if (!roomType || !date || !time) {
            await showAlert(
                'Peringatan',
                'Semua field harus diisi!',
                'warning'
            );
            return;
        }

        // Validasi tanggal
        if (!isValidDate(date)) {
            await showAlert(
                'Error',
                'Tanggal tidak boleh di masa lalu!',
                'error'
            );
            return;
        }

        // Validasi waktu
        if (!isValidTime(date, time)) {
            await showAlert(
                'Error',
                'Waktu reservasi harus minimal 1 jam dari sekarang untuk reservasi hari ini!',
                'error'
            );
            return;
        }

        // Simulasi proses pemeriksaan ketersediaan
        const loadingCheck = await Swal.fire({
            title: 'Memeriksa Ketersediaan',
            html: 'Mohon tunggu sebentar...',
            timer: 1500,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        if (loadingCheck.dismiss === Swal.DismissReason.timer) {
            // Simpan data reservasi ke localStorage
            const reservationData = {
                roomType: roomType,
                date: date,
                time: time
            };

            localStorage.setItem('reservation', JSON.stringify(reservationData));

            // Tampilkan konfirmasi reservasi
            const result = await Swal.fire({
                title: 'Ruangan Tersedia!',
                html: `
          <p>Detail Reservasi:</p>
          <p><strong>Jenis Ruangan:</strong> ${roomType === 'meetingRoom' ? 'Ruang Meeting' :
                        roomType === 'conferenceRoom' ? 'Ruang Konferensi' :
                            'Ruang Pribadi'}</p>
          <p><strong>Tanggal:</strong> ${new Date(date).toLocaleDateString('id-ID', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</p>
          <p><strong>Waktu:</strong> ${time}</p>
        `,
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#1a252f',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Lanjut ke Pembayaran',
                cancelButtonText: 'Batal'
            });

            if (result.isConfirmed) {
                // Update status reservasi
                const statusDiv = document.getElementById('reservationStatus');
                statusDiv.innerHTML = `
          <p><strong>Status:</strong> Menunggu Pembayaran</p>
          <p><strong>Jenis Ruangan:</strong> ${roomType === 'meetingRoom' ? 'Ruang Meeting' :
                        roomType === 'conferenceRoom' ? 'Ruang Konferensi' :
                            'Ruang Pribadi'}</p>
          <p><strong>Tanggal:</strong> ${date}</p>
          <p><strong>Waktu:</strong> ${time}</p>
        `;

                // Redirect ke halaman pembayaran
                window.location.href = 'payment.html';
            }
        }
    });
});