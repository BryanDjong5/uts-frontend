const nama = document.getElementById("nama");
const no_telp = document.getElementById("noTelp");
const email = document.getElementById("email");
const tombol_booking = document.getElementById("#tombol_booking");
const hasil_validasi = document.getElementById("#hasilValidasi");

function sistemBooking() {

    if (!nama.value || !no_telp.value || !email.value) {

        hasil_validasi.innerHTML = "<p>Mohon lengkapi semua data pemesan.</p>";
        hasil_validasi.style.color = "red";
        return false;
    }

    return true;
}

tombol_booking.addEventListener("submit", function(e) {

    e.preventDefault();

    if (!sistemBooking()) {
        return;
    }

    localStorage.setItem("nama", nama.value);
    localStorage.setItem("no_telp", no_telp.value);
    localStorage.setItem("email", email.value);

    window.location.href = "../booking form/bookingConfirmation.html";
});

