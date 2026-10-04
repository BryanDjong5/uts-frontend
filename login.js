function loginPage(){
var flash=sget("ds_flash",null);sset("ds_flash",null);
$("#app").innerHTML=authShell("LOGIN/MASUK","Selamat datang kembali. Masuk untuk melihat profile dan reservasi anda.",
(flash?'<div class="notice">'+esc(flash)+'</div>':'')+'<div id="top"></div>'+
field("id","Email atau Username","text","nama@email.com","username")+
pwField("pw","Kata Sandi","Masukkan kata sandi","current-password")+
'<button class="btn" id="go">MASUK</button>',
'Belum punya akun? <a href="register.html">Daftar sekarang</a>',"Restaurant andalan Warga Indonesia!");
eyes();
function submit(){
var id=$("#id").value.trim().toLowerCase(),pw=$("#pw").value,ok=true;
setErr("id",id?"":"Isi email atau username.");setErr("pw",pw?"":"Isi kata sandi.");
if(!id||!pw)return;
var u=users().find(function(x){return x.email.toLowerCase()===id||x.username.toLowerCase()===id});
if(!u||u.password!==pw){$("#top").innerHTML='<div class="notice e">Email/username atau kata sandi salah. Periksa lagi lalu coba masuk.</div>';return}
sset("ds_session",u.username);location.href="profile.html"}
$("#go").onclick=submit;
$("#pw").onkeydown=$("#id").onkeydown=function(e){if(e.key==="Enter")submit()}}


loginPage();