const bestSellerProducts = [
    {
        id: 1,
        name: "Nasi Goreng Special",
        description: "Automatic drip coffee maker with built-in grinder",
        price: "Rp 15.000",
        rating: 4.8,
        image: "https://i.pinimg.com/736x/da/c3/ba/dac3ba3af4607739bb45f5f1d4f6950f.jpg"
    },
    {
        id: 2,
        name: "Matcha Latte",
        description: "Fitness tracker with heart rate monitor",
        price: "25.000",
        rating: 4.9,
        image: "https://i.pinimg.com/736x/cb/66/da/cb66da85f610e51e4d2a37da459b6afa.jpg"
    },
    {
        id: 3,
        name: "Es Coklat",
        description: "True wireless earbuds with noise cancellation",
        price: "Rp 15.000",
        rating: 4.7,
        image: "https://i.pinimg.com/736x/1f/c8/72/1fc872840630055919672fce03723af9.jpg"
    },
    {
        id: 4,
        name: "Kwetiaw Goreng",
        description: "Smart robot vacuum with mapping technology",
        price: "Rp 8.000",
        rating: 4.6,
        image: "https://i.pinimg.com/736x/0c/0a/de/0c0ade271dfe5a132d23a9ab03933386.jpg"
    }
];

function createStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

function handleProductClick(url, event) {
    // Jika yang diklik adalah tombol beli, jangan navigasi ke halaman detail
    if (!event.target.classList.contains('buy-btn')) {
        window.location.href = "http://127.0.0.1:5500/pages/menu.html";
    }
}

function handleBuyClick(event, productName) {
    event.stopPropagation(); // Menghentikan event click dari bubble ke parent
    alert(`Produk ${productName} ditambahkan ke keranjang!`);
}

function displayBestSellers() {
    const container = document.getElementById('bestsellerContainer');
    
    bestSellerProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.onclick = (e) => handleProductClick("product.http://127.0.0.1:5500/pages/menu.html", e);
        
        productElement.innerHTML = `
            <span class="bestseller-badge">Best Seller</span>
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-meta">
                    <span class="price">${product.price}</span>
                    <span class="rating">${createStarRating(product.rating)}</span>
                </div>
            </div>
        `;
        
        container.appendChild(productElement);
    });
}

document.addEventListener('DOMContentLoaded', displayBestSellers);