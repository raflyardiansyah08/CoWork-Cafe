// Data menu
const menuData = {
    makanan: [
        {
            id: 1,
            nama: "Nasi Goreng Spesial",
            deskripsi: "Nasi goreng dengan telur, ayam, udang, dan sayuran segar",
            harga: 35000,
            gambar: "/api/placeholder/280/200",
            badges: ["recommended"]
        },
        {
            id: 2,
            nama: "Mie Goreng",
            deskripsi: "Mie goreng dengan bumbu special dan telur",
            harga: 30000,
            gambar: "/api/placeholder/280/200",
            badges: ["spicy"]
        },
        {
            id: 3,
            nama: "Ayam Bakar",
            deskripsi: "Ayam bakar dengan bumbu rempah khas",
            harga: 45000,
            gambar: "/api/placeholder/280/200",
            badges: ["recommended"]
        },
        {
            id: 4,
            nama: "Sate Ayam",
            deskripsi: "Sate ayam dengan bumbu kacang special",
            harga: 35000,
            gambar: "/api/placeholder/280/200",
            badges: []
        }
    ],
    minuman: [
        {
            id: 1,
            nama: "Es Teh Manis",
            deskripsi: "Teh manis dingin yang menyegarkan",
            harga: 8000,
            gambar: "/api/placeholder/280/200",
            badges: []
        },
        {
            id: 2,
            nama: "Jus Alpukat",
            deskripsi: "Jus alpukat segar dengan susu",
            harga: 15000,
            gambar: "/api/placeholder/280/200",
            badges: ["recommended"]
        },
        {
            id: 3,
            nama: "Es Kopi Susu",
            deskripsi: "Kopi susu dengan es batu",
            harga: 18000,
            gambar: "/api/placeholder/280/200",
            badges: []
        }
    ]
};

// Format harga ke rupiah
function formatHarga(harga) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(harga);
}

// Membuat badge HTML
function createBadges(badges) {
    return badges.map(badge => `<span class="badge ${badge}">${badge}</span>`).join('');
}

// Render menu item
function createMenuItem(item) {
    return `
        <div class="menu-item">
            <img src="${item.gambar}" alt="${item.nama}">
            <div class="menu-item-content">
                ${createBadges(item.badges)}
                <h3>${item.nama}</h3>
                <p>${item.deskripsi}</p>
                <div class="price">${formatHarga(item.harga)}</div>
            </div>
        </div>
    `;
}

// Render menu section
function renderMenuSection(category) {
    const menuItems = menuData[category];
    const container = document.querySelector(`#${category} .menu-grid`);
    container.innerHTML = menuItems.map(item => createMenuItem(item)).join('');
}

// Switch tabs
function switchTab(event) {
    const category = event.target.closest('.tab-btn').dataset.category;

    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.closest('.tab-btn').classList.add('active');

    // Update active section
    document.querySelectorAll('.menu-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(category).classList.add('active');
}


// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Render initial menu
    renderMenuSection('makanan');
    renderMenuSection('minuman');

    // Add tab click listeners
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', switchTab);
    });

    // Add search listener
    document.getElementById('searchInput').addEventListener('input', searchMenu);
});

// menu tombol

const priceCards = document.querySelectorAll('.tab-btn');
priceCards.forEach(card => {
    card.addEventListener('mouseover', () => {
        if (!card.classList.contains('featured')) {
            card.style.transform = 'translateY(-10px)';
        }
    });

    card.addEventListener('mouseout', () => {
        if (!card.classList.contains('featured')) {
            card.style.transform = 'translateY(0)';
        }
    });
});

const menuToggle = document.querySelector('.tab-btn');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});