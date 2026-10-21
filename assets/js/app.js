
function themeForG(g){return {'Animation':'animation','Horror':'horror','Romance':'bollywood','Sci-Fi':'hollywood','Thriller':'hollywood','Action':'south','Comedy':'comedy','Drama':'cinema'}[g]||'cinema'}
function poster(m){if(m.poster)return `<img class="posterimg" src="${m.poster}" alt="${m.title} poster" loading="lazy">`;const ini=m.title.split(/[^A-Za-z0-9]+/).filter(Boolean).map(w=>w[0]).join('').slice(0,3).toUpperCase()||'F';return `<div class="poster themed th-${themeForG(m.genre)}"><span class="pwater">${ini}</span><span class="ptitle">${m.title}</span><span class="pmeta">${m.genre}</span><span class="pyear">${m.year}</span></div>`}
function card(m){return `<article class="card"><a href="movie/${m.slug}">${poster(m)}<div class="info"><h3>${m.title} (${m.year})</h3><p class="meta">⭐ ${m.rating} • ${m.genre} • ${m.language}</p><p><span class="badge">480p</span><span class="badge">720p</span><span class="badge">1080p</span></p></div></a></article>`}
function render(id,list){const el=document.getElementById(id);if(el)el.innerHTML=list.map(card).join('')}
document.addEventListener('DOMContentLoaded',()=>{
 render('trending',[...MOVIES].sort((a,b)=>b.rating-a.rating).slice(0,10));
 render('latest',[...MOVIES].sort((a,b)=>b.year-a.year||b.id-a.id).slice(0,12));
 render('allMovies',MOVIES);
 const recent=JSON.parse(localStorage.getItem('ff_recent')||'[]').map(id=>MOVIES.find(m=>m.id==id)).filter(Boolean);
 if(recent.length)render('recent',recent);else{const s=document.getElementById('recentSec');if(s)s.style.display='none'}
 const q=document.getElementById('searchInput'),sg=document.getElementById('suggest');
 if(q){q.addEventListener('input',()=>{const v=q.value.toLowerCase();if(!v){sg.style.display='none';return}const hits=MOVIES.filter(m=>m.title.toLowerCase().includes(v)).slice(0,6);sg.innerHTML=hits.map(m=>`<a href="movie/${m.slug}">${m.title} (${m.year}) — ${m.genre}</a>`).join('')||'<a>No match found</a>';sg.style.display='block'})}
 document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-filter]').forEach(x=>x.classList.remove('on'));b.classList.add('on');const f=b.dataset.filter;render('allMovies',f=='All'?MOVIES:MOVIES.filter(m=>m.genre==f||m.language==f))});
});
function openModal(){document.getElementById('infoModal').classList.add('open')}
function closeModal(){document.getElementById('infoModal').classList.remove('open')}
