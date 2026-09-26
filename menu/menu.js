const menuContainer = document.getElementById('menu-container');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderMenu(data) {
    menuContainer.innerHTML = '';
    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('menu-card');
        
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-info">
                <h3>${item.name}</h3>
                <p class="price">${item.price}</p>
                <p class="rating">⭐ ${item.rating}</p>
            </div>
        `;
        menuContainer.appendChild(card);
    });
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        e.target.classList.add('active');

        const category = e.target.dataset.category;
        
        if (category === 'all') {
            renderMenu(menuData);
        } else {
            const filteredData = menuData.filter(item => item.category === category);
            renderMenu(filteredData);
        }
    });
});

renderMenu(menuData);