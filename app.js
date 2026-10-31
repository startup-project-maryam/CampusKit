let cart=[];try{cart=JSON.parse(localStorage.getItem('ck-bag')||'[]')}catch(e){}
const thumb=(p,t)=>`<div class="thumb" style="background:${p.col}"><img src="${IMG[p.id]}" alt="${p.n}" loading="lazy">${p.sum?`<span class="sale">Save AED ${p.sum-p.p}</span>`:''}${t?`<span class="tag">${aed(p.p)}</span>`:''}</div>`;
const sd=p=>p.sum?'Worth AED '+p.sum+' bought separately.':p.d.split(/(?<=\.) /)[0];
function grid(f='all'){$('#grid').innerHTML=ALL.filter(p=>f==='all'||p.c===f).map(p=>`<article class="pc"><button class="card" data-open="${p.id}" aria-label="${p.n}, details">${thumb(p)}</button><h3>${p.n}</h3><p class="pr">${aed(p.p)}</p><p>${sd(p)}</p><button class="add" data-add="${p.id}" aria-label="Add ${p.n} to bag">Add to bag</button></article>`).join('')}
function kits(){$('#kitList').innerHTML=K.map(k=>`<div class="kit"><div class="kit-img"><img src="${IMG[k.id]}" alt="${k.n}" loading="lazy"></div><h3>${k.n}</h3><ul>${k.inc.map(i=>`<li>${find(i).n}</li>`).join('')}</ul><p class="price"><s>${aed(k.sum)}</s>${aed(k.p)}</p><button class="btn" data-add="${k.id}">Add kit to bag</button></div>`).join('')}
function save(){try{localStorage.setItem('ck-bag',JSON.stringify(cart))}catch(e){}draw()}
function totals(){const sub=cart.reduce((a,l)=>a+find(l.id).p*l.q,0),ship=!sub?0:sub>=120?0:15;return{sub,ship,tot:sub+ship}}
function draw(){const t=totals(),n=cart.reduce((a,l)=>a+l.q,0);$('#bagCount').textContent=n;$('#bagCount').hidden=!n;
$('#lines').innerHTML=cart.length?cart.map(l=>{const p=find(l.id);return`<div class="line"><b>${p.n}</b><span>${aed(p.p*l.q)}</span><div class="qty"><button data-q="${l.id}" data-d="-1" aria-label="One less">−</button><span>${l.q}</span><button data-q="${l.id}" data-d="1" aria-label="One more">+</button></div><button class="rm" data-rm="${l.id}">Remove</button></div>`}).join(''):'<p>Your bag is empty.</p>';
$('#totals').innerHTML=`<div><span>Items</span><span>${aed(t.sub)}</span></div><div><span>Delivery</span><span>${t.ship?aed(t.ship):'Free'}</span></div>${t.sub&&t.sub<120?`<p class="note">Add AED ${120-t.sub} more for free delivery.</p>`:''}<div class="big"><span>Total</span><span>${aed(t.tot)}</span></div>`;
$('#checkoutBtn').disabled=!cart.length}
function bag(o){$('#drawer').classList.toggle('open',o);$('#scrim').classList.toggle('show',o)}
function add(id){const l=cart.find(x=>x.id===id);l?l.q++:cart.push({id,q:1});save();bag(true)}
function open(id){const p=find(id);$('#dlgBody').innerHTML=`<div class="detail">${thumb(p)}<div><h2>${p.n}</h2><p class="p">${aed(p.p)}</p><p>${p.d}</p><button class="btn" data-add="${p.id}">Add to bag</button></div></div>`;$('#dlg').showModal()}
document.addEventListener('click',e=>{const t=e.target.closest('button');if(!t)return;
if(t.dataset.add){if($('#dlg').open)$('#dlg').close();add(t.dataset.add)}
else if(t.dataset.open)open(t.dataset.open);
else if(t.dataset.f){document.querySelectorAll('.filters button').forEach(b=>b.classList.toggle('on',b===t));grid(t.dataset.f)}
else if(t.dataset.q){const l=cart.find(x=>x.id===t.dataset.q);l.q+=+t.dataset.d;if(l.q<1)cart=cart.filter(x=>x!==l);save()}
else if(t.dataset.rm){cart=cart.filter(x=>x.id!==t.dataset.rm);save()}
else if(t.id==='dlgClose'||t.id==='doneBtn')$('#dlg').close()});
$('#bagBtn').onclick=()=>bag(true);$('#closeBag').onclick=()=>bag(false);$('#scrim').onclick=()=>bag(false);$('#checkoutBtn').onclick=()=>{location.href='checkout.html'};
document.addEventListener('keydown',e=>{if(e.key==='Escape')bag(false)});
grid();kits();draw();
const nav=$('#nav'),bg=$('#burger'),menu=o=>{nav.classList.toggle('open',o);bg.classList.toggle('on',o);bg.setAttribute('aria-expanded',o)};
bg.onclick=()=>menu(!nav.classList.contains('open'));nav.onclick=e=>{if(e.target.closest('a'))menu(false)};
document.addEventListener('keydown',e=>{if(e.key==='Escape')menu(false)});
matchMedia('(min-width:821px)').onchange=e=>{if(e.matches)menu(false)};
