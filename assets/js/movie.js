
document.addEventListener('DOMContentLoaded',()=>{
 const id=new URLSearchParams(location.search).get('id')||1;const m=MOVIES.find(x=>x.id==id)||MOVIES[0];
 document.title=`${m.title} (${m.year}) — ${m.genre} Movie Info, Cast & Formats | FilmFly`;
 const c=document.querySelector('link[rel=canonical]');if(c)c.href=`https://filmfly.github.io/movie.html?id=${m.id}`;
 let r=JSON.parse(localStorage.getItem('ff_recent')||'[]');r=[m.id,...r.filter(x=>x!=m.id)].slice(0,6);localStorage.setItem('ff_recent',JSON.stringify(r));
 document.getElementById('detail').innerHTML=`
 <div>${poster(m)}</div><div><p class="meta"><a href="index.html">Home</a> › <a href="movies.html">Movies</a> › ${m.genre}</p>
 <h1 style="font-size:36px">${m.title} (${m.year})</h1><p class="meta">⭐ ${m.rating}/10 • ${m.duration} • ${m.language} • ${m.genre}</p>
 <p style="margin:14px 0">${m.synopsis}</p>
 <p><a class="btn gold" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=${encodeURIComponent(m.title+' '+m.year+' official trailer')}">▶ Watch Trailer</a>
 <button class="btn ghost" onclick="addWatch(${m.id})">+ Add to Watchlist</button></p>
 <div class="ad">ADVERTISEMENT — YOUR AD CODE HERE</div>
 <h2 class="sec">Movie Information</h2><table><tr><th>Title</th><td>${m.title}</td></tr><tr><th>Release Year</th><td>${m.year}</td></tr><tr><th>Genre</th><td>${m.genre}</td></tr><tr><th>Language</th><td>${m.language}</td></tr><tr><th>Duration</th><td>${m.duration}</td></tr><tr><th>Rating</th><td>${m.rating}/10</td></tr></table></div>`;
 document.getElementById('formats').innerHTML=['480p|350 MB|SD','720p|850 MB|HD','1080p|1.8 GB|Full HD','4K|5.2 GB|Ultra HD'].map(f=>{const[q,s,r]=f.split('|');return `<tr><td><b>${q}</b></td><td>${r}</td><td>${s}</td><td>${m.language} Audio</td><td><button class="btn" onclick="openModal()">Check ${q}</button></td></tr>`}).join('');
 render('related',MOVIES.filter(x=>x.genre==m.genre&&x.id!=m.id).concat(MOVIES.filter(x=>x.genre!=m.genre)).slice(0,6));
 const ld=document.createElement('script');ld.type='application/ld+json';ld.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Movie",name:m.title,datePublished:String(m.year),genre:m.genre,inLanguage:m.language,aggregateRating:{"@type":"AggregateRating",ratingValue:m.rating,ratingCount:120}});document.head.appendChild(ld);
});
function addWatch(id){let w=JSON.parse(localStorage.getItem('ff_watch')||'[]');if(!w.includes(id))w.push(id);localStorage.setItem('ff_watch',JSON.stringify(w));alert('Added to your watchlist on this device.')}
