var editing=false;
function profilePage(){
var u=me();if(!u){location.href="index.html";return}
var ini=u.nama.split(" ").map(function(w){return w[0]}).slice(0,2).join("").toUpperCase();
var stLabel={akan:"Akan datang",selesai:"Selesai",batal:"Dibatalkan"};
var bk=u.booking.length?u.booking.map(function(b){return '<div class="bk"><b>'+esc(b.resto)+'</b><span class="st '+b.status+'">'+stLabel[b.status]+'</span><span>'+esc(b.tgl)+' · '+b.tamu+' tamu</span></div>'}).join(""):'<p class="empty">Belum ada reservasi. Pilih meja pertamamu di Dapur Senja.</p>';
var left=editing?
'<div class="card"><div class="who"><div class="avatar" id="av">'+(u.foto?'<img alt="Foto profil" src="'+u.foto+'">':ini)+'</div><input type="file" id="file" accept="image/*" hidden><button class="linkbtn" id="pick">Ganti foto</button></div>'+
'<div style="margin-top:18px">'+field("nama","Nama","text","","name").replace('class="inp"','class="inp" value="'+esc(u.nama)+'"')+
field("un","Username","text","","username").replace('class="inp"','class="inp" value="'+esc(u.username)+'"')+
field("em","Email","email","","email").replace('class="inp"','class="inp" value="'+esc(u.email)+'"')+
field("hp","Nomor HP","tel","0812-3456-7890","tel").replace('class="inp"','class="inp" value="'+esc(u.hp)+'"')+
'<div class="row"><button class="btn sm" id="save">Simpan perubahan</button><button class="btn ghost sm" id="cancel">Batal</button></div></div></div>':
'<div class="card"><div class="who"><div class="avatar">'+(u.foto?'<img alt="Foto profil" src="'+u.foto+'">':ini)+'</div><h2>'+esc(u.nama)+'</h2><div class="un">@'+esc(u.username)+'</div></div>'+
'<dl><dt>Email</dt><dd>'+esc(u.email)+'</dd><dt>Nomor HP</dt><dd>'+(u.hp?esc(u.hp):'<span style="color:var(--mute)">Belum diisi</span>')+'</dd></dl><button class="btn ghost" id="edit">Edit profil</button></div>';
$("#app").innerHTML='<header class="top"><div class="brand"><span class="dot"></span>Dapur Senja</div><nav class="topnav"><a href="home/home.html">Home</a><a href="menu/menu.html">Menu</a><a href="promo/promotions.html">Promo &amp; Info</a><a href="../booking/reservasi/reservasi.html">Reservation</a></nav><button id="out">Keluar</button></header>'+
'<main class="wrap"><div id="left">'+left+'</div><section class="card"><div class="hd"><h3>Riwayat booking</h3><span style="color:var(--mute);font-size:14px">'+u.booking.length+' reservasi</span></div>'+bk+'</section></main>';
$("#out").onclick=function(){sset("ds_session",null);editing=false;location.href="index.html"};
if(!editing){$("#edit").onclick=function(){editing=true;profilePage()};return}
var foto=u.foto;
$("#pick").onclick=function(){$("#file").click()};
$("#file").onchange=function(e){var f=e.target.files[0];if(!f)return;
if(f.size>2*1024*1024){alert("Ukuran foto maksimal 2 MB.");return}
var r=new FileReader();r.onload=function(){foto=r.result;$("#av").innerHTML='<img alt="Pratinjau foto" src="'+foto+'">'};r.readAsDataURL(f)};
$("#cancel").onclick=function(){editing=false;profilePage()};
$("#save").onclick=function(){
var n=$("#nama").value.trim(),un=$("#un").value.trim(),em=$("#em").value.trim(),hp=$("#hp").value.trim(),bad=false;
setErr("nama",n?"":"Nama wajib diisi.");if(!n)bad=true;
var okUn=/^[a-zA-Z0-9_]{4,}$/.test(un);
var dup=users().some(function(x){return x.username.toLowerCase()===un.toLowerCase()&&x.username!==u.username});
setErr("un",!okUn?"Username minimal 4 karakter: huruf, angka, atau garis bawah.":dup?"Username sudah dipakai.":"");
if(!okUn||dup)bad=true;
var okEm=/^\S+@\S+\.\S+$/.test(em);setErr("em",okEm?"":"Format email belum benar.");if(!okEm)bad=true;
var okHp=!hp||/^[0-9+\-\s]{8,16}$/.test(hp);setErr("hp",okHp?"":"Nomor HP tidak valid.");if(!okHp)bad=true;
if(bad)return;
var old=u.username;
u.nama=n;u.username=un;u.email=em;u.hp=hp;u.foto=foto;
sset("ds_users",users().map(function(x){return x.username===old?u:x}));
sset("ds_session",un);
editing=false;profilePage()}}

profilePage();