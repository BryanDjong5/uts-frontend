document.getElementById("tahun").textContent = new Date().getFullYear();

function toggleMenu() {
    const navMenu = document.getElementById("navMenu");
    navMenu.classList.toggle("active");
}
