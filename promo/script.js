function openTab(tabId) {
    var tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(function(tab) {
        tab.style.display = 'none';
    });
    document.getElementById(tabId).style.display = 'block';
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