window.alert = function(msg) {
    const overlay = document.createElement('div');
    overlay.className = 'custom-alert-overlay';
    const box = document.createElement('div');
    box.className = 'custom-alert-box';
    const text = document.createElement('p');
    text.innerText = msg;
    const btn = document.createElement('button');
    btn.className = 'custom-alert-btn';
    btn.innerText = 'OK';
    btn.onclick = () => document.body.removeChild(overlay);
    box.appendChild(text);
    box.appendChild(btn);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
};

function openTab(evt, tabId) {
    var tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(function(tab) { tab.style.display = 'none'; });
    var tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(function(btn) { btn.classList.remove('active'); });
    document.getElementById(tabId).style.display = 'block';
    evt.currentTarget.classList.add('active');
}

function bukaModal(imgSrc, title, desc) {
    document.getElementById('modal-img').src = imgSrc;
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-desc').innerText = desc;
    const modal = document.getElementById('food-modal');
    modal.style.display = 'flex';
    modal.classList.remove('show-animasi');
    void modal.offsetWidth; 
    modal.classList.add('show-animasi');
}

function tutupModal() {
    const modal = document.getElementById('food-modal');
    modal.classList.remove('show-animasi');
    modal.style.display = 'none';
}

function toggleFaq(btn) {
    btn.classList.toggle("active");
    var content = btn.nextElementSibling;
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}

function submitVip(evt) {
    evt.preventDefault();
    alert("Pendaftaran berhasil! Silakan cek email Anda dalam 5 menit ke depan untuk mengklaim Barcode Voucher Welcome Diskon 10%.");
    document.getElementById("vipForm").reset();
}

function toggleTag(btn) {
    btn.classList.toggle('selected');
}

let currentRating = 5;

function initStars() {
    const stars = document.querySelectorAll('.star-select');
    if (stars.length === 0) return;
    
    stars.forEach((star, index) => {
        star.addEventListener('mouseover', () => highlightStars(index));
        star.addEventListener('mouseout', () => highlightStars(currentRating - 1));
        star.addEventListener('click', () => {
            currentRating = index + 1;
            highlightStars(currentRating - 1);
        });
    });
    highlightStars(currentRating - 1);
}

function highlightStars(index) {
    const stars = document.querySelectorAll('.star-select');
    stars.forEach((star, i) => {
        if (i <= index) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', initStars);

function submitReview(evt) {
    evt.preventDefault();
    const name = document.getElementById('reviewerName').value;
    const text = document.getElementById('reviewText').value;
    const selectedTags = document.querySelectorAll('.tag-select-btn.selected');
    let tagsHtml = '';
    selectedTags.forEach(function(tag) {
        tagsHtml += `<span class="menu-tag">${tag.innerText}</span>`;
    });
    if (selectedTags.length === 0) {
        tagsHtml = `<span class="menu-tag">Menu Umum</span>`;
    }
    
    let starsHtml = '';
    for(let i = 0; i < 5; i++) {
        if(i < currentRating) starsHtml += '⭐';
    }

    const newReview = document.createElement('div');
    newReview.className = 'review-card';
    newReview.innerHTML = `
        <h3>${name}</h3>
        <p class="stars">${starsHtml}</p>
        <div class="tag-container">
            ${tagsHtml}
        </div>
        <p>"${text}"</p>
    `;

    const reviewList = document.getElementById('review-list');
    reviewList.insertBefore(newReview, reviewList.firstChild);

    alert("Terima kasih atas ulasannya! Ulasan Anda telah ditambahkan.");
    
    document.getElementById("reviewForm").reset();
    selectedTags.forEach(function(tag) {
        tag.classList.remove('selected');
    });
    currentRating = 5;
    highlightStars(4);
}

const countdownElement = document.getElementById("countdown");
if (countdownElement) {
    const targetDate = new Date("Oct 10, 2026 23:59:59").getTime();
    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        if (distance < 0) {
            clearInterval(timer);
            countdownElement.innerHTML = "PROMO TELAH BERAKHIR";
            return;
        }
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        countdownElement.innerHTML = "Waktu Tersisa: " + days + " Hari " + hours + " Jam " + minutes + " Menit " + seconds + " Detik";
    }, 1000);
}