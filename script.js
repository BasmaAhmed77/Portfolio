(function(){
  var root=document.documentElement;
  try{var t=localStorage.getItem('theme');if(t)root.setAttribute('data-theme',t)}catch(e){}
  document.getElementById('theme').addEventListener('click',function(){
    var dark=root.getAttribute('data-theme')==='dark'||(!root.getAttribute('data-theme')&&matchMedia('(prefers-color-scheme: dark)').matches);
    var next=dark?'light':'dark';root.setAttribute('data-theme',next);
    try{localStorage.setItem('theme',next)}catch(e){}
  });
  var nav=document.getElementById('nav'),menu=document.getElementById('menu');
  menu.addEventListener('click',function(){var o=nav.classList.toggle('open');menu.setAttribute('aria-expanded',o)});
  nav.addEventListener('click',function(e){if(e.target.tagName==='A'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}});

  var btns=document.querySelectorAll('.filters button'),cards=document.querySelectorAll('.project');
  btns.forEach(function(b){b.addEventListener('click',function(){
    btns.forEach(function(x){x.setAttribute('aria-pressed',x===b)});
    var f=b.dataset.f;
    cards.forEach(function(c){c.hidden=!(f==='all'||c.dataset.c.split(' ').indexOf(f)>-1)});
  })});

  var q=document.getElementById('query'),res=document.getElementById('result');
  var text="SELECT focus, stack\nFROM basma\nWHERE role = 'Backend Engineer';";
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function render(s){q.innerHTML=s.replace(/\b(SELECT|FROM|WHERE)\b/g,'<b>$1</b>')}
  if(reduce){render(text);res.classList.add('show')}
  else{
    var i=0;q.innerHTML='<span class="caret"></span>';
    var timer=setInterval(function(){
      i++;render(text.slice(0,i));q.insertAdjacentHTML('beforeend','<span class="caret"></span>');
      if(i>=text.length){clearInterval(timer);setTimeout(function(){res.classList.add('show')},250)}
    },38);
  }
})();
