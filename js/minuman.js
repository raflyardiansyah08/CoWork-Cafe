// Data menu makanan
const menuItems = [
  {
    id: 1,
    nama: 'Es Jeruk',
    kategori: 'minuman-es jeruk',
    harga: 'Rp 15.000',
    deskripsi: 'Es jeruk dengan es batu',
    gambar: 'https://i.pinimg.com/736x/e8/6c/aa/e86caa1c3ea9c0eaa515485fd81b24a4.jpg',
  },
  {
    id: 2,
    nama: 'Es Teh Manis',
    kategori: 'minuman',
    harga: 'Rp 8.000',
    deskripsi: 'Teh manis dengan es batu',
    gambar: 'https://i.pinimg.com/736x/91/1f/22/911f22752088c421c5d35c60bd60896c.jpg',
  },
  {
    id: 3,
    nama: 'Es Coklat',
    kategori: 'minuman',
    harga: 'Rp 15.000',
    deskripsi: 'Es coklat manis dengan saus vanilla',
    gambar: 'https://i.pinimg.com/736x/1f/c8/72/1fc872840630055919672fce03723af9.jpg',
  },
  {
    id: 4,
    nama: 'Kopi',
    kategori: 'minuman',
    harga: 'Rp 15.000',
    deskripsi: 'Cita rasa pahit yang di hasilkan kopi',
    gambar: 'https://i.pinimg.com/736x/26/eb/c7/26ebc7f8313496df49bdb210d89b63e1.jpg',
  },
  {
    id: 5,
    nama: 'Matcha latte',
    kategori: 'minuman',
    harga: 'Rp 25.000',
    deskripsi: 'Matcha dengan campuran susu vanila dengan es batu',
    gambar: 'https://i.pinimg.com/736x/cb/66/da/cb66da85f610e51e4d2a37da459b6afa.jpg',
  },
];

// Fungsi untuk menampilkan menu
function tampilkanMenu(items) {
  const menuContainer = document.getElementById('menuContainer');
  menuContainer.innerHTML = '';

  items.forEach((item) => {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item';
    menuItem.innerHTML = `
            <img src="${item.gambar}" alt="${item.nama}">
            <div class="menu-info">
                <h3>${item.nama}</h3>
                <p>${item.kategori}</p>
                <p>${item.deskripsi}</p>
                <p class="harga">${item.harga}</p>
            </div>
        `;
    menuContainer.appendChild(menuItem);
  });
}

// Fungsi untuk filter menu
function filterMenu(kategori) {
  if (kategori === 'minuman') {
    tampilkanMenu(menuItems);
  } else {
    const filteredItems = menuItems.filter((item) => item.kategori === kategori);
    tampilkanMenu(filteredItems);
  }
}

// Tampilkan semua menu saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  tampilkanMenu(menuItems);
});
