const data={
  profile:{url:'/api/basma/profile',json:{name:'Basma Ahmed',role:'Backend .NET Developer',location:'Cairo, Egypt',studying:'Computer Science, Ain Shams University',track:'DEPI Full Stack .NET API',available:true}},
  stack:{url:'/api/basma/stack',json:{language:'C#',frameworks:['ASP.NET Core Web API','ASP.NET Core MVC'],data:['SQL Server','Entity Framework Core','LINQ'],tools:['Git','Visual Studio','SSMS']}},
  contact:{url:'/api/basma/contact',json:{email:'basmaahmedsaid6@gmail.com',whatsapp:'+20 1094205765',replies:'within 24 hours',ready_for:'freelance projects and internships'}}
};
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
function render(v,ind=1){
  const pad='  '.repeat(ind),end='  '.repeat(ind-1);
  if(Array.isArray(v))return '['+v.map(x=>render(x,ind)).join(', ')+']';
  if(v&&typeof v==='object')return '{\n'+Object.entries(v).map(([k,x])=>pad+'<span class="k">"'+k+'"</span>: '+render(x,ind+1)).join(',\n')+'\n'+end+'}';
  if(typeof v==='string')return '<span class="s">"'+esc(v)+'"</span>';
  return '<span class="n">'+v+'</span>';
}
const out=document.getElementById('out'),url=document.getElementById('url');
function show(ep){url.textContent=data[ep].url;out.innerHTML=render(data[ep].json);
  document.querySelectorAll('.tabs button').forEach(b=>b.setAttribute('aria-selected',b.dataset.ep===ep));}
document.querySelectorAll('.tabs button').forEach(b=>b.addEventListener('click',()=>show(b.dataset.ep)));
show('profile');

const nav=document.getElementById('nav'),menu=document.getElementById('menu');
menu.addEventListener('click',()=>{const o=nav.classList.toggle('open');menu.setAttribute('aria-expanded',o)});
nav.addEventListener('click',e=>{if(e.target.tagName==='A'){nav.classList.remove('open');menu.setAttribute('aria-expanded',false)}});

document.getElementById('theme').addEventListener('click',()=>{
  const r=document.documentElement,dark=r.dataset.theme?r.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;
  r.dataset.theme=dark?'light':'dark';
});
const copy=document.getElementById('copy');
copy.addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText('basmaahmedsaid6@gmail.com');copy.textContent='Copied';}
  catch{copy.textContent='basmaahmedsaid6@gmail.com';}
  setTimeout(()=>copy.textContent='Copy email address',2200);
});
document.getElementById('yr').textContent=new Date().getFullYear();
