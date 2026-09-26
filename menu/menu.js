const menuContainer = document.getElementById('menu-container');

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

renderMenu(menuData);