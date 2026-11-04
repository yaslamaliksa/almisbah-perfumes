// Progressive enhancement: the catalogue remains usable without motion.
(()=>{'use strict';
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const progress=document.getElementById('scrollProgress');
const header=document.querySelector('.header');
let ticking=false;
function onScroll(){if(ticking)return;ticking=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?scrollY/max*100:0)+'%';header.classList.toggle('is-scrolled',scrollY>25);ticking=false})}
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll,{passive:true});onScroll();
const observer=!reduce&&'IntersectionObserver'in window?new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}})},{threshold:.08,rootMargin:'0px 0px -30px 0px'}):null;
function reveal(root=document){root.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el,i)=>{if(observer){if(el.classList.contains('product'))el.style.transitionDelay=Math.min(i%4,3)*75+'ms';observer.observe(el)}else el.classList.add('is-visible')})}
window.refreshProductMotion=()=>reveal(document.getElementById('products'));
reveal();
const toggle=document.getElementById('menuToggle'),nav=document.getElementById('siteNav');
function closeMenu(){nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','فتح القائمة')}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';nav.classList.toggle('is-open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'إغلاق القائمة':'فتح القائمة')});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
let toastTimer;window.showToast=msg=>{const toast=document.getElementById('toast');toast.textContent=msg;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2600)};
if(!reduce&&matchMedia('(pointer:fine)').matches){const art=document.querySelector('.hero-art'),bottle=art.querySelector('.bottle');art.addEventListener('pointermove',e=>{const r=art.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;bottle.style.rotate=`${-y*5}deg ${x*8}deg`;art.querySelectorAll('.hero-spark').forEach((s,i)=>s.style.translate=`${x*(i+1)*20}px ${y*(i+1)*20}px`)});art.addEventListener('pointerleave',()=>{bottle.style.rotate='';art.querySelectorAll('.hero-spark').forEach(s=>s.style.translate='')})}
})();
