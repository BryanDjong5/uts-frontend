const penjelasan_reservasi = document.getElementById("penjelasan-reservasi");
const tgl_reservasi = document.getElementById("tgl-reservasi");
const jam_reservasi = document.getElementById("jam-reservasi");
const jumlah_org = document.getElementById("jum-pelanggan");
const btn_booking = document.getElementById("tombol-booking");
const pesan_status = document.getElementById("pesan-status");


btn_booking.addEventListener("click", function () {
  const jumlah = Number(jumlah_org.value);
  const jam = jam_reservasi.value;

  function waktu_reservasi(jam){

    if(jam >= "23:00" || jam <= "09.59"){
      pesan_status.textContent = "Maaf, restoran telah tutup! Restoran buka dari pkl.10:00 hingga 22:59!";
      return false;
    }
  return true;
}


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

  if(!waktu_reservasi(jam)){
    return;
  }

  pesan_status.textContent = "Reservasi berhasil!";
  window.location.href= "booking form/bookingForm.html";
  pesan_status.style.color = "green";

  waktu_reservasi(jam);
});