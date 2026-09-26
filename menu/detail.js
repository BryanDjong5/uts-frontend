const detailWrapper = document.getElementById('detail-wrapper');
const urlParams = new URLSearchParams(window.location.search);
const menuId = parseInt(urlParams.get('id'));

const menuItem = menuData.find(item => item.id === menuId);

if (menuItem) {
    const ingredientsList = menuItem.ingredients.map(ing => `<li>${ing}</li>`).join('');
    
    detailWrapper.innerHTML = `
        <div class="detail-container">
            <img src="${menuItem.image}" alt="${menuItem.name}" class="detail-img">
            <div class="detail-info">
                <h1>${menuItem.name}</h1>
                <p class="detail-price">${menuItem.price}</p>
                <p class="rating">⭐ ${menuItem.rating}</p>
                <p class="detail-desc">${menuItem.desc}</p>
                <div class="ingredients">
                    <h3>Ingredients:</h3>
                    <ul>
                        ${ingredientsList}
                    </ul>
                </div>
                <a href="menu.html" class="back-btn">Kembali ke Menu</a>
            </div>
        </div>
    `;
} else {
    detailWrapper.innerHTML = `
        <div class="detail-container" style="display: block; text-align: center;">
            <h1>Menu tidak ditemukan</h1>
            <a href="menu.html" class="back-btn" style="margin-top: 1rem;">Kembali ke Menu</a>
        </div>
    `;
}