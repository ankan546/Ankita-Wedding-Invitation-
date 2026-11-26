// Personalized details for Ankita Ghosh & Malay Maity.
const WEDDING = {
  weddingDate: '2027-01-26T19:00:00+05:30',
  venueMap: 'https://www.google.com/maps/search/?api=1&query=Pingla+Ghosh+Cable+Network%2C+Pingla%2C+Paschim+Medinipur%2C+West+Bengal'
};

document.querySelectorAll('[data-map]').forEach(el => { const key=el.dataset.map; if(WEDDING[key]) el.href=WEDDING[key]; });
const intro=document.getElementById('introScreen'), main=document.getElementById('mainContent');
function enter(){intro.classList.add('intro-exit');setTimeout(()=>{intro.style.display='none';main.classList.remove('hidden');window.scrollTo(0,0);},450);}
document.getElementById('beginButton').addEventListener('click',()=>{enter();playMusic();});
document.getElementById('skipButton').addEventListener('click',enter);

const audio=document.getElementById('weddingMusic'), musicToggle=document.getElementById('musicToggle');let playing=false;
async function playMusic(){try{await audio.play();playing=true;musicToggle.innerHTML='♫ <span>গান চালু</span>';}catch(e){playing=false;musicToggle.innerHTML='♫ <span>গান বন্ধ</span>';}}
musicToggle.addEventListener('click',()=>{if(playing){audio.pause();playing=false;musicToggle.innerHTML='♫ <span>গান বন্ধ</span>';}else playMusic();});

// Countdown to the wedding evening (26 January 2027, 7 PM IST).
const target=new Date(WEDDING.weddingDate).getTime();
function tick(){let diff=Math.max(0,target-Date.now());const values={days:Math.floor(diff/86400000),hours:Math.floor(diff%86400000/3600000),minutes:Math.floor(diff%3600000/60000),seconds:Math.floor(diff%60000/1000)};Object.entries(values).forEach(([id,v])=>document.getElementById(id).textContent=String(v).padStart(id==='days'?3:2,'0'));}
tick();setInterval(tick,1000);

// Scratch-card date reveal.
const canvas=document.getElementById('scratchCanvas'),ctx=canvas.getContext('2d');let scratching=false;
function setupScratch(){const size=500;canvas.width=size;canvas.height=size;ctx.fillStyle='#9a3038';ctx.fillRect(0,0,size,size);ctx.fillStyle='#d9bd82';ctx.textAlign='center';ctx.font='26px Georgia';ctx.fillText('✧  SCRATCH HERE  ✧',250,235);ctx.font='60px Georgia';ctx.fillText('♥',250,315);}
setupScratch();function scratch(e){if(!scratching)return;const r=canvas.getBoundingClientRect(),x=(e.clientX-r.left)*canvas.width/r.width,y=(e.clientY-r.top)*canvas.height/r.height;ctx.globalCompositeOperation='destination-out';ctx.beginPath();ctx.arc(x,y,34,0,Math.PI*2);ctx.fill();}
canvas.addEventListener('pointerdown',e=>{scratching=true;canvas.setPointerCapture(e.pointerId);scratch(e)});canvas.addEventListener('pointermove',scratch);canvas.addEventListener('pointerup',()=>scratching=false);canvas.addEventListener('pointercancel',()=>scratching=false);
