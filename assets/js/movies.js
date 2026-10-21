// Full-catalogue browse: search + category/type filters + pagination over CATALOG (catalog.js).
// Every card links to that title's own static detail page: movie/<slug>
const PER = 48;
let filtered = CATALOG, page = 1, activeFilter = 'All';

function hue(t){let h=0;for(let i=0;i<t.length;i++)h=(h*31+t.charCodeAt(i))%360;return h}
function initials(t){return t.split(/[^A-Za-z0-9]+/).filter(Boolean).map(w=>w[0]).join('').slice(0,3).toUpperCase()||'F'}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')}
function themeFor(c,ty){if(ty==='Web Series')return 'series';return {'Bollywood':'bollywood','South Indian':'south','Hollywood':'hollywood','Punjabi':'punjabi','Animation':'animation'}[c]||'cinema'}
function card(e){const art=e.p?`<img class="posterimg" src="${e.p}" alt="${esc(e.t)} poster" loading="lazy">`:`<div class="poster themed th-${themeFor(e.c,e.ty)}"><span class="pwater">${initials(e.t)}</span><span class="ptitle">${esc(e.t)}</span><span class="pmeta">${esc(e.c)}</span><span class="pyear">${e.y||esc(e.ty)}</span></div>`;return `<article class="card"><a href="movie/${e.s}">${art}<div class="info"><h3>${esc(e.t)} (${e.y||'—'})</h3><p class="meta">${esc(e.c)} • ${esc(e.ty)} • ${esc(e.l.join(', '))}</p><p><span class="badge">${esc(e.q)}</span><span class="badge">${e.y||''}</span></p></div></a></article>`}

function apply(){
  const q=(document.getElementById('catalogSearch').value||'').toLowerCase().trim();
  filtered = CATALOG.filter(e=>{
    const okF = activeFilter=='All' || e.c==activeFilter || e.ty==activeFilter || e.l.includes(activeFilter);
    const okQ = !q || e.t.toLowerCase().includes(q);
    return okF && okQ;
  });
  page = 1; draw();
}
function draw(){
  const pages = Math.max(1, Math.ceil(filtered.length/PER));
  if(page>pages) page = pages;
  const chunk = filtered.slice((page-1)*PER, page*PER);
  document.getElementById('allMovies').innerHTML = chunk.map(card).join('') || '<p class="meta">No titles match — try a different search.</p>';
  document.getElementById('count').textContent = `${filtered.length.toLocaleString()} titles — page ${page} of ${pages.toLocaleString()}`;
  document.getElementById('prevBtn').disabled = page<=1;
  document.getElementById('nextBtn').disabled = page>=pages;
  window.scrollTo({top:0, behavior:'smooth'});
}
document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('catalogSearch').addEventListener('input', apply);
  document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{
    document.querySelectorAll('[data-filter]').forEach(x=>x.classList.remove('on'));
    b.classList.add('on'); activeFilter=b.dataset.filter; apply();
  });
  document.getElementById('prevBtn').onclick=()=>{if(page>1){page--;draw()}};
  document.getElementById('nextBtn').onclick=()=>{page++;draw()};
  // header search box filters the catalogue too
  const hs=document.getElementById('searchInput');
  if(hs) hs.addEventListener('input',()=>{document.getElementById('catalogSearch').value=hs.value;apply()});
  draw();
});
function openModal(){document.getElementById('infoModal').classList.add('open')}
function closeModal(){document.getElementById('infoModal').classList.remove('open')}
