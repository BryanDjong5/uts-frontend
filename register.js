function registerPage(){
$("#app").innerHTML=authShell("Buat akun","Daftar gratis untuk reservasi meja lebih cepat.",
field("nama","Nama lengkap","text","Rina Pratama","name")+
field("un","Username","text","rina_pratama","username")+
field("em","Email","email","nama@email.com","email")+
pwField("pw","Kata sandi","Minimal 8 karakter","new-password")+
pwField("pw2","Konfirmasi kata sandi","Ulangi kata sandi","new-password")+
'<button class="btn" id="go">Daftar</button>',
'Sudah punya akun? <a href="login.html">Masuk</a>',"Bergabung, lalu pilih meja favoritmu.");
eyes();
$("#go").onclick=function(){
var v={nama:$("#nama").value.trim(),un:$("#un").value.trim(),em:$("#em").value.trim(),pw:$("#pw").value,pw2:$("#pw2").value};
var all=users(),bad=false;
function chk(id,cond,t){setErr(id,cond?t:"");if(cond)bad=true}
chk("nama",!v.nama,"Nama wajib diisi.");
chk("un",!/^[a-zA-Z0-9_]{4,}$/.test(v.un),"Username minimal 4 karakter: huruf, angka, atau garis bawah.");
if(!bad||!$("#m-un").textContent)chk("un",all.some(function(u){return u.username.toLowerCase()===v.un.toLowerCase()}),"Username sudah dipakai.");
chk("em",!/^\S+@\S+\.\S+$/.test(v.em),"Format email belum benar.");
if(!$("#m-em").textContent)chk("em",all.some(function(u){return u.email.toLowerCase()===v.em.toLowerCase()}),"Email sudah terdaftar.");
chk("pw",v.pw.length<8,"Kata sandi minimal 8 karakter.");
chk("pw2",v.pw2!==v.pw||!v.pw2,"Konfirmasi harus sama dengan kata sandi.");
if(bad)return;
all.push({nama:v.nama,username:v.un,email:v.em,password:v.pw,hp:"",foto:"",booking:[]});
sset("ds_users",all);sset("ds_flash","Akun berhasil dibuat. Silakan masuk.");location.href="login.html"}}


registerPage();