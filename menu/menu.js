const menuContainer = document.getElementById('menu-container');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search-input');
const sortInput = document.getElementById('sort-input');

let currentCategory = 'all';
let searchQuery = '';
let sortType = 'default';

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
        const card = document.createElement('a');
        card.href = `detail.html?id=${item.id}`;
        card.classList.add('menu-card');
        
        card.style.textDecoration = 'none';
        card.style.color = 'inherit';
        card.style.display = 'block';
        
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-info">
                <h3>${item.name}</h3>
                <p class="price">${formatRupiah(item.price)}</p>
                <p class="rating">⭐ ${item.rating}</p>
            </div>
        `;
        menuContainer.appendChild(card);
    });
}

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