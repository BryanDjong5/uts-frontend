var mem={};
function sget(k,d){try{var v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return k in mem?mem[k]:d}}
function sset(k,v){mem[k]=v;try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function users(){return sget("ds_users",[])}
function seed(){return[
{id:1,resto:"Dapur Senja — Cabang Kemang",tgl:"12 Okt 2026, 19:00",tamu:4,status:"akan"},
{id:2,resto:"Dapur Senja — Cabang Senayan",tgl:"28 Sep 2026, 12:30",tamu:2,status:"selesai"},
{id:3,resto:"Dapur Senja — Cabang Kemang",tgl:"03 Sep 2026, 20:00",tamu:6,status:"selesai"},
{id:4,resto:"Dapur Senja — Cabang PIK",tgl:"15 Agu 2026, 18:30",tamu:3,status:"batal"}]}
function saveUser(u){var a=users().map(function(x){return x.username===u.username?u:x});sset("ds_users",a)}
function me(){var n=sget("ds_session",null);return n?users().find(function(u){return u.username===n}):null}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
var $=function(s){return document.querySelector(s)};

function authShell(title,sub,body,alt,heroTitle){
return '<div class="auth"><section class="hero"><div class="brand"><img class="logo" src="images/logo.png" alt="Dapur Senja"></div>'+
'<div><h1>'+heroTitle+'</h1><p>Masakan Restaurant Nusantara, meja yang hangat, dan reservasi yang tidak ribet.</p></div>'+
'<div class="chip"><b>Buka setiap hari</b><span>11.00–22.00 · Kemang · Senayan · PIK</span></div></section>'+
'<section class="formside"><div class="form"><h2>'+title+'</h2><p class="sub">'+sub+'</p>'+body+'<p class="alt">'+alt+'</p></div></section></div>'}
function pwField(id,label,ph,ac){return '<div class="field"><label for="'+id+'">'+label+'</label><div class="pw"><input class="inp" id="'+id+'" type="password" placeholder="'+ph+'" autocomplete="'+ac+'"><button type="button" data-eye="'+id+'">Lihat</button></div><div class="msg" id="m-'+id+'"></div></div>'}
function field(id,label,type,ph,ac){return '<div class="field"><label for="'+id+'">'+label+'</label><input class="inp" id="'+id+'" type="'+type+'" placeholder="'+ph+'" autocomplete="'+ac+'"><div class="msg" id="m-'+id+'"></div></div>'}
function setErr(id,t){var i=$("#"+id),m=$("#m-"+id);if(i)i.classList.toggle("bad",!!t);if(m)m.textContent=t||""}
function eyes(){document.querySelectorAll("[data-eye]").forEach(function(b){b.onclick=function(){var i=$("#"+b.dataset.eye);var s=i.type==="password";i.type=s?"text":"password";b.textContent=s?"Sembunyikan":"Lihat"}})}