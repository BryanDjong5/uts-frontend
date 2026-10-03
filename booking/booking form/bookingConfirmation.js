const nomorBooking = localStorage.getItem("nomorBooking");
const nama = localStorage.getItem("nama");
const tanggal = localStorage.getItem("tgl_booking");
const jam = localStorage.getItem("jam_booking");
const jumlah_org = localStorage.getItem("jum_orang");
const acara = localStorage.getItem("acara");
const cetak_booking = document.getElementById("booking-confirm");
const pesan = document.getElementById("pesan");
const tombol_edit = document.querySelector("#edit");
const akhir_booking = document.querySelector("#confirmAkhir");

function tampilkanData(status) {
    cetak_booking.innerHTML = `
        <h1>Booking Confirmation</h1>
        <p>Nomor Booking: ${nomorBooking}</p>
        <p>Nama: ${nama}</p>
        <p>Tanggal: ${tanggal}</p>
        <p>Jam: ${jam}</p>
        <p>Jumlah orang: ${jumlah_org}</p>
        <p>Acara: ${acara}</p>
        <p>Status Booking: ${status}</p>
    `;
}

if (nomorBooking && nama && tanggal && jam && jumlah_org) {
    tampilkanData("Menunggu Konfirmasi");
} else {
    cetak_booking.innerHTML = `<p>Data booking tidak ditemukan!</p>`;
    akhir_booking.disabled = true;
}

tombol_edit.addEventListener("click", function () {
    window.location.href = "../booking form/bookingForm.html";
});

function konfirmasiBooking() {
    const jumOrang = Number(jumlah_org);

    cetak_booking.classList.remove("berhasil", "gagal");

    if (jumOrang > 50) {
        tampilkanData("Gagal");
        cetak_booking.classList.add("gagal");
        pesan.textContent = "Maaf, booking sudah penuh melebihi 50 orang!";
        pesan.style.color = "red";
        return false;
    } else {
        tampilkanData("Berhasil");
        cetak_booking.classList.add("berhasil");
        pesan.textContent = "Pemesanan berhasil!";
        pesan.style.color = "green";
        window.location.href="/promo/promotions.html";
        return true;
    }
}

akhir_booking.addEventListener("click", konfirmasiBooking);


