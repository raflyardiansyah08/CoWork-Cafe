// Data menu makanan
const menuItems = [
  {
    id: 1,
    nama: 'Nasi Goreng Spesial',
    kategori: 'makanan',
    harga: 'Rp 35.000',
    deskripsi: 'Nasi goreng dengan telur, ayam, dan sayuran',
    gambar: 'https://i.pinimg.com/736x/60/00/20/600020e7db02084601b4f32f4f17bedd.jpg',
  },
  {
    id: 2,
    nama: 'Kwetiaw Goreng',
    kategori: 'makanan',
    harga: 'Rp 20.000',
    deskripsi: 'Kwetiaw Goreng dengan mie yang lebar, udang, dan sayuran',
    gambar: 'https://i.pinimg.com/736x/ba/0b/e4/ba0be4f0e000838ad3761cdd37136783.jpg',
  },
  {
    id: 3,
    nama: 'Pudding Coklat',
    kategori: 'dessert',
    harga: 'Rp 15.000',
    deskripsi: 'Pudding coklat lembut dengan susu vanilla',
    gambar: 'https://i.pinimg.com/736x/fd/48/f2/fd48f2048d577027d70ce232a5c62957.jpg',
  },
  {
    id: 4,
    nama: 'Mie Goreng',
    kategori: 'makanan',
    harga: 'Rp 30.000',
    deskripsi: 'Mie goreng dengan telur dan sayuran',
    gambar: 'https://i.pinimg.com/736x/ca/2b/30/ca2b30aa008d4628b6e36d5264f77adf.jpg',
  },
  {
    id: 5,
    nama: 'Cookies Choco Chip',
    kategori: 'dessert',
    harga: 'Rp 10.000',
    deskripsi: 'Kue kering seperti chocolate chip, oatmeal, yang sering disajikan dalam potongan kecil.',
    gambar: 'https://i.pinimg.com/736x/a2/54/ab/a254ab3176f62d952a39db1c7a2a6a2b.jpg',
  },
  {
    id: 6,
    nama: 'Brownies Coklat',
    kategori: 'dessert',
    harga: 'Rp 20.000',
    deskripsi: 'Kue Coklat padat dan lembut, Dan dalamnya berisi coklat',
    gambar: 'https://i.pinimg.com/736x/d1/71/38/d17138bad419886a76a159111dda46c1.jpg',
  },
  {
    id: 7,
    nama: 'Pasta',
    kategori: 'makanan',
    harga: 'Rp 30.000',
    deskripsi: 'Pasta dengan atasnya berisi daging dan sayuran tipis',
    gambar: 'https://i.pinimg.com/736x/26/53/e8/2653e8eb9eab00d0ecc2fb9a40581795.jpg',
  },
  {
    id: 8,
    nama: 'Tart atau Pie',
    kategori: 'dessert',
    harga: 'Rp 25.000',
    deskripsi: 'Tart buah atau pie dengan isian strawberry',
    gambar: 'https://i.pinimg.com/474x/e3/aa/99/e3aa992d25925b773d1961e02d567734.jpg',
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
  if (kategori === 'makanan') {
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
