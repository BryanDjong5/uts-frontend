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

const namaBulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

function simpanKeProfil(tgl, jam, jumlah) {
  const user = me(); // dari common.js
  if (!user) return false;

  const kolomTujuan = document.querySelector('input[placeholder*="tujuan" i]');
  const tujuan = kolomTujuan && kolomTujuan.value.trim() ? kolomTujuan.value.trim() : "Reservasi";
  const p = tgl.split("-");

  user.booking = user.booking || [];
  user.booking.unshift({
    id: Date.now(),
    resto: "Dapur Senja \u2014 " + tujuan,
    tgl: Number(p[2]) + " " + namaBulan[Number(p[1]) - 1] + " " + p[0] + ", " + jam,
    tamu: jumlah,
    status: "akan"
  });
  saveUser(user);
  return true;
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

  if (!simpanKeProfil(tgl, jam, jumlah)) {
    sset("ds_flash", "Silakan masuk dulu untuk membuat reservasi.");
    tampilkanPesan("Silakan masuk dulu untuk membuat reservasi.", "red");
    setTimeout(function () {
      window.location.href = "../../index.html";
    }, 1000);
    return;
  }

  tampilkanPesan("Reservasi berhasil!", "green");
  setTimeout(function () {
    window.location.href = "../booking form/bookingForm.html";
  }, 1000);
});