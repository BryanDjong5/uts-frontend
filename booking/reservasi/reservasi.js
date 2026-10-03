const tgl_reservasi = document.getElementById("tgl-reservasi");
const jam_reservasi = document.getElementById("jam-reservasi");
const jumlah_org = document.getElementById("jum-pelanggan");
const btn_reservasi = document.getElementById("tombol-reservasi");
const pesan_status = document.getElementById("pesan-status");

function tampilkanPesan(teks, warna) {
  pesan_status.textContent = teks;
  pesan_status.style.color = warna;
}

function validasiTanggal(tgl, jam) {
  return new Date(tgl + "T" + jam) >= new Date();
}

function validasiJam(jam) {
  return jam >= "10:00" && jam < "23:00";
}

btn_reservasi.addEventListener("click", function () {
  const jumlah = Number(jumlah_org.value);
  const tgl = tgl_reservasi.value;
  const jam = jam_reservasi.value;

  if (!tgl || !jam || !jumlah_org.value) {
    tampilkanPesan("Mohon lengkapi semua data reservasi terlebih dahulu.", "red");
    return;
  }

  if (jumlah < 1) {
    tampilkanPesan("Jumlah pelanggan minimal 1 orang.", "red");
    return;
  }

  if (jumlah > 50) {
    tampilkanPesan("Maaf, reservasi sudah penuh! Anda harus melakukan reservasi di hari lain.", "red");
    return;
  }

  if (!validasiTanggal(tgl, jam)) {
    tampilkanPesan("Tanggal dan jam reservasi sudah lewat!", "red");
    return;
  }

  if (!validasiJam(jam)) {
    tampilkanPesan("Maaf, restoran tutup! Restoran buka pukul 10:00 hingga 22:59.", "red");
    return;
  }

  tampilkanPesan("Reservasi berhasil!", "green");
  setTimeout(function () {
    window.location.href = "../booking form/bookingForm.html";
  }, 1000);
});