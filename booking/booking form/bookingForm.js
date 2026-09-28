const nama = document.getElementById("nama");
const no_telp = document.getElementById("noTelp");
const email = document.getElementById("email");
const tgl_booking = document.getElementById("tglBooking");
const jam_booking = document.getElementById("jamBooking");
const jum_orang = document.getElementById("jumOrang");
const acara = document.getElementById("acara");

const tombol_booking = document.getElementById("tombol_booking");
const hasil_validasi = document.getElementById("hasilValidasi");

function sistemBooking() {

    if (!nama.value || !no_telp.value || !email.value || !tgl_booking.value || !jam_booking.value || !jum_orang.value || !acara.value) {

        hasil_validasi.innerHTML = "<p>Mohon lengkapi semua data booking!</p>";
        hasil_validasi.style.color = "red";

        return false;

    } else if (new Date(tgl_booking.value + "T" + jam_booking.value) < new Date()) {

        hasil_validasi.innerHTML = "<p>Tanggal dan jam booking sudah lewat!</p>";
        hasil_validasi.style.color = "red";

        return false;

    } else {

        return true;
    }
}


tombol_booking.addEventListener("click", function() {

    if (!sistemBooking()) {
        return;
    }

    const nomorBooking = "BK-" +
        new Date().toISOString().slice(0, 10).replace(/-/g, "") +
        "-" +
        Math.floor(1000 + Math.random() * 9000);

    localStorage.setItem("nomorBooking", nomorBooking);
    localStorage.setItem("nama", nama.value);
    localStorage.setItem("no_telp", no_telp.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("tgl_booking", tgl_booking.value);
    localStorage.setItem("jam_booking", jam_booking.value);
    localStorage.setItem("jum_orang", jum_orang.value);
    localStorage.setItem("acara", acara.value);

    window.location.href = "../booking form/bookingConfirmation.html";
});

