const works=[
 ['p13','Bamboo Hill Hall','Brand identity'],['g4','Grid Coffee · 品牌活动','Internship work'],['p24','包装设计','Packaging'],['p50','传统意象 · 视觉设计','Visual design'],['p9','Bamboo Hill Hall · 视觉系统','Brand identity'],['g15','Grid Coffee · 云南产地季','Internship work'],['p34','鱼你湘莲','Packaging'],['p43','婚姻观念 · 信息设计','Visual storytelling'],['p18','Digital Ocean World','Brand identity'],['g18','Grid Coffee · 活动物料','Internship work'],['p62','AI 视觉探索','AI exploration'],['p56','City Farm','AI-assisted design'],['g10','Grid Coffee · 品牌物料','Internship work'],['p60','色彩与生成','AI exploration']
];
const gallery=document.querySelector('#gallery'),viewer=document.querySelector('#viewer');
works.forEach(([id,name,kind],i)=>{const b=document.createElement('button');b.className='tile';b.setAttribute('aria-label','查看 '+name);const im=document.createElement('img');im.src=`assets/${id}.jpg`;im.alt=name;im.loading=i<3?'eager':'lazy';const cap=document.createElement('span');cap.className='caption';cap.textContent=`${name} / ${kind}`;b.append(im,cap);b.onclick=()=>{viewer.querySelector('img').src=im.src;viewer.querySelector('img').alt=name;viewer.querySelector('p').textContent=cap.textContent;viewer.showModal()};gallery.append(b)});
viewer.querySelector('button').onclick=()=>viewer.close();viewer.addEventListener('click',e=>{if(e.target===viewer)viewer.close()});
const hero=document.querySelector('.hero'),layer=document.querySelector('.trail'),reduce=matchMedia('(prefers-reduced-motion: reduce)');let n=0,lastX=-1000,lastY=-1000,lastTime=0;
function spawn(x,y){if(reduce.matches)return;const img=new Image();img.src=`assets/${works[n++%works.length][0]}.jpg`;img.style.left=x+'px';img.style.top=y+'px';layer.append(img);const angle=(n%5-2)*1.5;const anim=img.animate([{opacity:0,transform:`translate(-50%,-45%) rotate(${angle}deg) scale(.8)`},{opacity:1,transform:`translate(-50%,-50%) rotate(${angle}deg) scale(1)`,offset:.15},{opacity:1,transform:`translate(-50%,-55%) rotate(${angle}deg) scale(1)`,offset:.55},{opacity:0,transform:`translate(-50%,-70%) rotate(${angle}deg) scale(.94)`}],{duration:1500,easing:'cubic-bezier(.2,.65,.3,1)'});anim.onfinish=()=>img.remove();}
hero.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;const r=hero.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;if(Math.hypot(x-lastX,y-lastY)>85&&performance.now()-lastTime>90){spawn(x,y);lastX=x;lastY=y;lastTime=performance.now()}});
hero.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'){const r=hero.getBoundingClientRect();spawn(e.clientX-r.left,e.clientY-r.top)}});

// Preserve each artwork's proportions while packing it into a shared grid.
function layoutWorks(){gallery.querySelectorAll('.tile').forEach(tile=>{const img=tile.querySelector('img');if(!img.naturalWidth)return;const caption=tile.querySelector('.caption');const height=tile.clientWidth*img.naturalHeight/img.naturalWidth+caption.offsetHeight;tile.style.gridRowEnd=`span ${Math.ceil((height+8)/12)}`;});}
gallery.querySelectorAll('img').forEach(img=>img.addEventListener('load',layoutWorks));
new ResizeObserver(layoutWorks).observe(gallery);
layoutWorks();


