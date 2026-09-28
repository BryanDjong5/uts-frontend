const nomorBooking = localStorage.getItem("nomorBooking");
const nama = localStorage.getItem("nama");
const tanggal = localStorage.getItem("tgl_booking");
const jam = localStorage.getItem("jam_booking");
const jumlah_org = localStorage.getItem("jum_orang");
const cetak_booking = document.getElementById("booking-confirm");

const sekarang = new Date();
const waktuBooking = new Date(tanggal + "T" + jam);

if (nomorBooking && nama && tanggal && jam && jumlah_org) {
    cetak_booking.innerHTML = `
        <p>Nomor Booking: ${nomorBooking}</p>
        <p>Nama: ${nama}</p>
        <p>Tanggal: ${tanggal}</p>
        <p>Jam: ${jam}</p>
        <p>Jumlah orang: ${jumlah_org}</p>
        <p>Status Booking: Berhasil</p>
    `;
} else {
    cetak_booking.innerHTML = `
        <p>Data booking tidak di temukan!</p>
    `;
}



