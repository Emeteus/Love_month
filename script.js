const pages=[...document.querySelectorAll('.page')];
const nextButtons=document.querySelectorAll('.next-btn');
const backBtn=document.getElementById('backBtn');
const restartBtn=document.getElementById('restartBtn');
const progressBar=document.getElementById('progressBar');
const pageCount=document.getElementById('pageCount');
const heartsLayer=document.querySelector('.hearts-layer');
const sparklesLayer=document.querySelector('.sparkles-layer');
let currentPage=0;
function showPage(index){
 currentPage=Math.max(0,Math.min(pages.length-1,index));
 pages.forEach((page,i)=>page.classList.toggle('active',i===currentPage));
 progressBar.style.width=`${((currentPage+1)/pages.length)*100}%`;
 pageCount.textContent=`${currentPage+1} / ${pages.length}`;
 backBtn.disabled=currentPage===0;
 if(currentPage===pages.length-1)startFireworks();
}
nextButtons.forEach(button=>button.addEventListener('click',()=>showPage(currentPage+1)));
backBtn.addEventListener('click',()=>showPage(currentPage-1));
restartBtn.addEventListener('click',()=>showPage(0));
function createHeart(){
 const heart=document.createElement('span');heart.className='heart';
 heart.textContent=['♡','♥','💕','✧'][Math.floor(Math.random()*4)];
 heart.style.left=`${Math.random()*100}%`;heart.style.fontSize=`${14+Math.random()*25}px`;
 heart.style.animationDuration=`${6+Math.random()*7}s`;heartsLayer.appendChild(heart);
 setTimeout(()=>heart.remove(),13000);
}
setInterval(createHeart,650);
for(let i=0;i<28;i++){
 const star=document.createElement('span');star.className='sparkle';star.textContent='✦';
 star.style.left=`${Math.random()*100}%`;star.style.top=`${Math.random()*100}%`;
 star.style.fontSize=`${8+Math.random()*12}px`;star.style.animationDelay=`${Math.random()*2}s`;
 sparklesLayer.appendChild(star);
}
let fireworksStarted=false;
function startFireworks(){
 const canvas=document.getElementById('fireworks');if(fireworksStarted)return;fireworksStarted=true;
 const ctx=canvas.getContext('2d');let w,h,particles=[];
 function resize(){const r=canvas.getBoundingClientRect(),d=window.devicePixelRatio||1;w=r.width;h=r.height;canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0)}
 resize();window.addEventListener('resize',resize);
 function burst(){
  const x=w*(.12+Math.random()*.76),y=h*(.1+Math.random()*.55),hue=320+Math.random()*55;
  for(let i=0;i<58;i++){const a=Math.PI*2*i/58,s=1+Math.random()*3.3;particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:60+Math.random()*25,max:85,hue,size:1.5+Math.random()*2})}
 }
 function animate(){
  ctx.clearRect(0,0,w,h);if(Math.random()<.05)burst();
  particles=particles.filter(p=>p.life>0);
  particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.018;p.vx*=.99;p.life--;ctx.beginPath();ctx.fillStyle=`hsla(${p.hue},95%,68%,${p.life/p.max})`;ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fill()});
  requestAnimationFrame(animate);
 }
 animate();
}
showPage(0);
