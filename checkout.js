let cart=[];try{cart=JSON.parse(localStorage.getItem('ck-bag')||'[]').filter(l=>find(l.id))}catch(e){}
const sub=cart.reduce((a,l)=>a+find(l.id).p*l.q,0),ship=!sub?0:sub>=120?0:15,tot=sub+ship;
const lines=cart.map(l=>{const p=find(l.id);return`<div class="sl"><div class="st"><img src="${IMG[p.id]}" alt=""><b>${l.q}</b></div><span>${p.n}</span><span>${aed(p.p*l.q)}</span></div>`}).join('');
const totals=`<div><span>Items</span><span>${aed(sub)}</span></div><div><span>Delivery</span><span>${ship?aed(ship):'Free'}</span></div><div class="big"><span>Total</span><span>${aed(tot)}</span></div>`;
if(!cart.length){$('#coWrap').hidden=true;$('#empty').hidden=false}
$('#sumLines').innerHTML=lines;$('#sumTot').innerHTML=totals;
$('#f').addEventListener('submit',e=>{e.preventDefault();
const n=e.target.n.value.trim().split(' ')[0],no='CK-'+Math.floor(10000+Math.random()*90000);
$('#done').innerHTML=`<h1>Thanks, ${n}</h1><p class="order-no">Order ${no}</p><p>Your demo order is in. No payment was taken and nothing will arrive, but this is what the real flow would look like. A real order would reach you in 1–2 working days.</p><div class="sum">${lines}${totals}</div><a class="btn" href="index.html#shop">Back to the shop</a>`;
try{localStorage.removeItem('ck-bag')}catch(e){}
$('#coWrap').hidden=true;$('#done').hidden=false;scrollTo(0,0)});
