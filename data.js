const P=[
{id:'notebook',n:'Focus Notebook',p:32,c:'stationery',col:'#dbe6ff',d:'A5, 160 ruled pages, lay-flat binding. Holds up in a bag all semester.'},
{id:'planner',n:'Daily Planner Pad',p:28,c:'stationery',col:'#fff1b8',d:'Tear-off pad with a to-do column and a deadline strip at the bottom.'},
{id:'pens',n:'Study Pens (6)',p:24,c:'stationery',col:'#ffd9cc',d:'Six smooth gel pens in blue, black and red. No smudging for lefties.'},
{id:'tote',n:'Campus Tote',p:49,c:'study',col:'#ffe8cc',d:'Heavy canvas tote that fits a 15-inch laptop, a lunchbox and a textbook.'},
{id:'cards',n:'Revision Cards (120)',p:18,c:'study',col:'#e5defc',d:'Colour-edged index cards for flashcards and formula sheets.'},
{id:'bottle',n:'Steel Bottle 750ml',p:55,c:'study',col:'#cdf3ea',d:'Insulated, keeps water cold through a full day on campus.'}];
const K=[
{id:'semester',n:'Semester Starter Kit',price:129,inc:['notebook','planner','pens','cards','tote']},
{id:'exam',n:'Exam Week Kit',price:59,inc:['notebook','pens','cards']}];
K.forEach(k=>{k.c='kits';k.col='#ffd23f';k.sum=k.inc.reduce((a,i)=>a+P.find(x=>x.id===i).p,0);k.p=k.price;k.d='Includes: '+k.inc.map(i=>P.find(x=>x.id===i).n).join(', ')+'. Worth AED '+k.sum+' bought separately.'});
const ALL=[...P,...K],$=s=>document.querySelector(s),aed=n=>'AED '+n;
const find=id=>ALL.find(x=>x.id===id);
const U=(i,w=700)=>`https://images.unsplash.com/photo-${i}?auto=format&fit=crop&q=75&w=${w}`,X=(i,w=700)=>`https://images.pexels.com/photos/${i}/pexels-photo-${i}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
const IMG={notebook:U('1611079830811-865ff4428d17'),planner:X(6340707),pens:X(8441842),tote:U('1561715276-a2d087060f1d'),cards:X(7888645),bottle:U('1544003484-3cd181d17917'),semester:X(5445613),exam:X(7973203)};
