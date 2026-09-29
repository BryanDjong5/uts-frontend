const menuContainer = document.getElementById('menu-container');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search-input');
const sortInput = document.getElementById('sort-input');
const orderBar = document.getElementById('order-bar');
const orderCount = document.getElementById('order-count');
const checkoutBtn = document.getElementById('checkout-btn');
const backToTopBtn = document.getElementById('back-to-top');

let currentCategory = 'all';
let searchQuery = '';
let sortType = 'default';
let totalOrders = localStorage.getItem('restaurantOrders') ? parseInt(localStorage.getItem('restaurantOrders')) : 0;

if(totalOrders > 0) {
    orderCount.textContent = totalOrders;
    orderBar.style.display = 'flex';
}

function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
}

function renderMenu(data) {
    menuContainer.innerHTML = '';
    
    if (data.length === 0) {
        menuContainer.innerHTML = '<div class="empty-state">Maaf, menu yang Anda cari tidak ditemukan.</div>';
        return;
    }

    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('menu-card');
        
        const badgeHTML = item.rating >= 4.8 ? '<span class="recommended-badge">🔥 Top Rating</span>' : '';
        
        card.innerHTML = `
            ${badgeHTML}
            <a href="detail.html?id=${item.id}" style="text-decoration: none; color: inherit; display: block;">
                <img src="${item.image}" alt="${item.name}">
                <div class="menu-info">
                    <h3>${item.name}</h3>
                    <p class="price">${formatRupiah(item.price)}</p>
                    <p class="rating">⭐ ${item.rating}</p>
            </a>
                    <div class="card-footer">
                        <span>${item.category.replace('-', ' ')}</span>
                        <button class="order-btn" data-name="${item.name}">+ Pesan</button>
                    </div>
                </div>
        `;
        menuContainer.appendChild(card);
    });

    attachOrderEvent();
}

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function attachOrderEvent() {
    const orderButtons = document.querySelectorAll('.order-btn');
    orderButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            totalOrders++;
            localStorage.setItem('restaurantOrders', totalOrders);
            orderCount.textContent = totalOrders;
            orderBar.style.display = 'flex';
            const itemName = button.getAttribute('data-name');
            alert(`Berhasil menambahkan "${itemName}" ke pesanan!`);
        });
    });
}

checkoutBtn.addEventListener('click', () => {
    alert(`Terima kasih! Total ada ${totalOrders} item yang akan diproses.`);
    totalOrders = 0;
    localStorage.removeItem('restaurantOrders');
    orderBar.style.display = 'none';
});

function processData() {
    let filteredData = menuData;

    if (currentCategory !== 'all') {
        filteredData = filteredData.filter(item => item.category === currentCategory);
    }
    if (searchQuery !== '') {
        filteredData = filteredData.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (sortType === 'lowest') {
        filteredData.sort((a, b) => a.price - b.price);
    } else if (sortType === 'highest') {
        filteredData.sort((a, b) => b.price - a.price);
    } else {
        filteredData.sort((a, b) => a.id - b.id);
    }
    renderMenu(filteredData);
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        e.target.classList.add('active');
        currentCategory = e.target.dataset.category;
        processData();
    });
});

searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    processData();
});

sortInput.addEventListener('change', (e) => {
    sortType = e.target.value;
    processData();
});

renderMenu(menuData);