let isRegistered = false; // Status apakah user sudah mendaftar atau belum

// Fungsi untuk menghandle pendaftaran
document.getElementById('register-btn').addEventListener('click', function () {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  if (name && email && phone) {
    const memberId = 'MEM' + Math.floor(Math.random() * 10000);
    document.getElementById('member-id').textContent = `Selamat, ${name}! ID Member Anda adalah ${memberId}.`;
    isRegistered = true; // Tandai bahwa user sudah mendaftar
  } else {
    alert('Harap isi semua data untuk mendaftar!');
  }
});

// Fungsi untuk memilih paket
const packageButtons = document.querySelectorAll('.select-btn');
packageButtons.forEach((button) => {
  button.addEventListener('click', function () {
    if (isRegistered) {
      const packageName = this.parentElement.querySelector('h3').textContent;
      document.getElementById('selected-package').textContent = `Anda telah memilih ${packageName}. Terima kasih!`;
    } else {
      alert('Harap mendaftar terlebih dahulu sebelum memilih paket!');
    }
  });
});

function validasi(evt){
  if(document.getElementById('name').value == ""){
    alert("Nama harus diisi");
    evt.preventDefault();
  }
}

document.forms[0].addEventListener(
  "submit", validasi
);

function validasi(evt) {
  if (document.getElementById('email').value == "") {
    alert("Email harus diisi");
    evt.preventDefault();
  }
}

document.forms[0].addEventListener(
  "submit", validasi
);
