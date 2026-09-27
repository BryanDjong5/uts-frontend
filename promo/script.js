document.addEventListener('DOMContentLoaded', function() {
    const countdownElement = document.getElementById("countdown");
    
    if (countdownElement) {
        const countDownDate = new Date("Oct 31, 2026 23:59:59").getTime();

        const timerInterval = setInterval(function() {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.innerHTML = "⏳ Promo Berakhir Dalam: " + days + " Hari " + hours + " Jam " + minutes + " Menit " + seconds + " Detik ";

            if (distance < 0) {
                clearInterval(timerInterval);
                countdownElement.innerHTML = " PROMO TELAH BERAKHIR ";
                countdownElement.style.color = "red";
            }
        }, 1000);
    }
});