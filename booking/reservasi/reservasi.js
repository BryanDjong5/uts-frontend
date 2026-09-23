const penjelasan_reservasi = document.getElementById("penjelasan-reservasi");
const tgl_reservasi = document.getElementById("tgl-reservasi");
const jam_reservasi = document.getElementById("jam-reservasi");
const jumlah_org = document.getElementById("jum-pelanggan");
const btn_booking = document.getElementById("tombol-booking");
const pesan_status = document.getElementById("pesan-status");

btn_booking.addEventListener("click", function () {
  const jumlah = Number(jumlah_org.value);

  if (!tgl_reservasi.value || !jam_reservasi.value || !jumlah_org.value) {
    pesan_status.textContent = "Mohon lengkapi semua data reservasi terlebih dahulu.";
    pesan_status.style.color = "red";
    return;
  }

  if (jumlah > 50) {
    pesan_status.textContent = "Maaf, reservasi sudah penuh! Anda harus melakukan reservasi di hari lain.";
    pesan_status.style.color = "red";
    return;
  }

  pesan_status.textContent = "Reservasi berhasil!";
  pesan_status.style.color = "green";
});