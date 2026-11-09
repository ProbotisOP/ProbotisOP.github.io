(function(){const f=document.createElement("link").relList;if(f&&f.supports&&f.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))u(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&u(l)}).observe(document,{childList:!0,subtree:!0});function a(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function u(o){if(o.ep)return;o.ep=!0;const c=a(o);fetch(o.href,c)}})();(function(){const L="satnam_a11y_prefs_v2",f={theme:"default",font:"default",size:"md",spacing:"normal",ruler:!1,spotlight:!1,bionic:!1,magnifier:!1};let a={...f};try{const e=localStorage.getItem(L);e&&(a={...f,...JSON.parse(e)})}catch(e){console.warn("Could not load accessibility preferences",e)}function u(){try{localStorage.setItem(L,JSON.stringify(a))}catch{}}if(!document.getElementById("font-lexend-link")){const e=document.createElement("link");e.id="font-lexend-link",e.rel="stylesheet",e.href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600&display=swap",document.head.appendChild(e)}let o=null;function c(){if(document.getElementById("a11y-trigger"))return;const e=document.createElement("div");e.id="a11y-ruler",e.innerHTML=`
      <div id="a11y-ruler-top"></div>
      <div id="a11y-ruler-bar"></div>
      <div id="a11y-ruler-bottom"></div>
    `,document.body.appendChild(e);const n=document.createElement("div");n.id="a11y-magnifier",n.setAttribute("aria-hidden","true"),document.body.appendChild(n);const d=document.createElement("button");d.id="a11y-trigger",d.setAttribute("aria-label","Open Reading & Accessibility Controls"),d.setAttribute("title","Accessibility & Reading Tools (Alt + A)"),d.innerHTML=`
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="4" r="2"/>
        <path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.49-.24-1.07-.28-1.59-.09l-4.5 1.63c-.57.21-.94.75-.94 1.36V18c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.65l1.6-.58.9 4.95c.13.72.76 1.28 1.5 1.28h.08c.92-.04 1.62-.82 1.58-1.74l-.45-4.95c.78.69 1.78 1.13 2.88 1.19h.4c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"/>
      </svg>
    `,document.body.appendChild(d);const y=document.createElement("div");y.id="a11y-modal-backdrop",document.body.appendChild(y);const s=document.createElement("div");s.id="a11y-modal",s.setAttribute("role","dialog"),s.setAttribute("aria-label","Accessibility and Reading Settings"),s.innerHTML=`
      <div class="a11y-header">
        <h3>
          <svg style="width:20px;height:20px;fill:currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z"/>
          </svg>
          Reading & Accessibility
        </h3>
        <button class="a11y-close" id="a11y-close-btn" aria-label="Close modal">&times;</button>
      </div>

      <!-- Theme / Contrast -->
      <div class="a11y-group">
        <span class="a11y-label">Color & Reading Mode</span>
        <div class="a11y-options four-col">
          <button class="a11y-btn" data-theme="default">Paper</button>
          <button class="a11y-btn" data-theme="dark">🌙 Dark</button>
          <button class="a11y-btn" data-theme="ereader">📖 Sepia</button>
          <button class="a11y-btn" data-theme="contrast">⚡ High</button>
        </div>
      </div>

      <!-- ADHD & Focus Features -->
      <div class="a11y-group">
        <span class="a11y-label">ADHD & Focus Helpers</span>
        <label class="a11y-toggle">
          <span>📏 Reading Ruler (Line Guide)</span>
          <input type="checkbox" id="a11y-toggle-ruler">
        </label>
        <label class="a11y-toggle">
          <span>🎯 Paragraph Spotlight (Dims Rest)</span>
          <input type="checkbox" id="a11y-toggle-spotlight">
        </label>
        <label class="a11y-toggle">
          <span>⚡ Bionic Eye-Guidance (Fast Read)</span>
          <input type="checkbox" id="a11y-toggle-bionic">
        </label>
      </div>

      <!-- Typography & Dyslexia -->
      <div class="a11y-group">
        <span class="a11y-label">Font Family</span>
        <div class="a11y-options three-col">
          <button class="a11y-btn" data-font="default">Serif</button>
          <button class="a11y-btn" data-font="lexend">📚 Dyslexia</button>
          <button class="a11y-btn" data-font="sans">Clean Sans</button>
        </div>
      </div>

      <!-- Text Sizing -->
      <div class="a11y-group">
        <span class="a11y-label">Text Size</span>
        <div class="a11y-options four-col">
          <button class="a11y-btn" data-size="sm">A-</button>
          <button class="a11y-btn" data-size="md">Normal</button>
          <button class="a11y-btn" data-size="lg">A+</button>
          <button class="a11y-btn" data-size="xl">A++</button>
        </div>
      </div>

      <!-- Line Spacing -->
      <div class="a11y-group">
        <span class="a11y-label">Line Spacing</span>
        <div class="a11y-options three-col">
          <button class="a11y-btn" data-spacing="normal">Normal</button>
          <button class="a11y-btn" data-spacing="relaxed">Relaxed</button>
          <button class="a11y-btn" data-spacing="loose">Loose</button>
        </div>
      </div>

      <!-- Assistive Tools: Magnifier & Speech -->
      <div class="a11y-group">
        <span class="a11y-label">Assistive Tools</span>
        <label class="a11y-toggle">
          <span>🔍 Screen Magnifier Loupe</span>
          <input type="checkbox" id="a11y-toggle-magnifier">
        </label>
        <div style="display:flex;gap:6px;margin-top:6px;">
          <button class="a11y-btn" id="a11y-tts-play" style="flex:1;">🔊 Read Aloud</button>
          <button class="a11y-btn" id="a11y-tts-stop" style="flex:1;">⏹ Stop</button>
        </div>
      </div>

      <button class="a11y-reset" id="a11y-reset-btn">↺ Reset All to Defaults</button>
    `,document.body.appendChild(s),T()}function l(){const e=document.body;e.classList.remove("theme-dark","theme-ereader","theme-contrast"),a.theme==="dark"?e.classList.add("theme-dark"):a.theme==="ereader"?e.classList.add("theme-ereader"):a.theme==="contrast"&&e.classList.add("theme-contrast"),e.classList.remove("font-lexend","font-sans"),a.font==="lexend"?e.classList.add("font-lexend"):a.font==="sans"&&e.classList.add("font-sans"),e.classList.remove("size-sm","size-md","size-lg","size-xl"),e.classList.add(`size-${a.size}`),e.classList.remove("spacing-normal","spacing-relaxed","spacing-loose"),e.classList.add(`spacing-${a.spacing}`),a.ruler?e.classList.add("ruler-active"):e.classList.remove("ruler-active"),a.spotlight?e.classList.add("focus-spotlight"):e.classList.remove("focus-spotlight"),a.magnifier?e.classList.add("magnifier-active"):e.classList.remove("magnifier-active"),k(a.bionic),S()}function S(){const e=document.getElementById("a11y-modal");if(!e)return;e.querySelectorAll("[data-theme]").forEach(i=>{i.classList.toggle("active",i.getAttribute("data-theme")===a.theme)}),e.querySelectorAll("[data-font]").forEach(i=>{i.classList.toggle("active",i.getAttribute("data-font")===a.font)}),e.querySelectorAll("[data-size]").forEach(i=>{i.classList.toggle("active",i.getAttribute("data-size")===a.size)}),e.querySelectorAll("[data-spacing]").forEach(i=>{i.classList.toggle("active",i.getAttribute("data-spacing")===a.spacing)});const n=document.getElementById("a11y-toggle-ruler");n&&(n.checked=a.ruler);const d=document.getElementById("a11y-toggle-spotlight");d&&(d.checked=a.spotlight);const y=document.getElementById("a11y-toggle-bionic");y&&(y.checked=a.bionic);const s=document.getElementById("a11y-toggle-magnifier");s&&(s.checked=a.magnifier)}function k(e){const n=document.querySelector("main");if(!n)return;if(o||(o=n.innerHTML),!e){n.getAttribute("data-bionic")==="true"&&(n.innerHTML=o,n.removeAttribute("data-bionic"));return}if(n.getAttribute("data-bionic")==="true")return;function d(s){const i=s.nodeValue;if(!i||!i.trim())return;const E=i.split(/(\s+)/),b=document.createElement("span");E.forEach(p=>{if(!p.trim()){b.appendChild(document.createTextNode(p));return}const g=p.match(/^([a-zA-Z0-9]+)(.*)$/);if(g&&g[1].length>1){const r=g[1],x=g[2],t=Math.ceil(r.length/2),m=document.createElement("b");m.textContent=r.slice(0,t),b.appendChild(m),b.appendChild(document.createTextNode(r.slice(t)+x))}else b.appendChild(document.createTextNode(p))}),s.parentNode.replaceChild(b,s)}function y(s){!s||s.nodeType!==1||["SCRIPT","STYLE","BUTTON","INPUT"].includes(s.tagName)||Array.from(s.childNodes).forEach(i=>{i.nodeType===3?d(i):i.nodeType===1&&y(i)})}y(n),n.setAttribute("data-bionic","true")}function T(){const e=document.getElementById("a11y-trigger"),n=document.getElementById("a11y-modal"),d=document.getElementById("a11y-modal-backdrop"),y=document.getElementById("a11y-close-btn");function s(t){const m=t!==void 0?t:!n.classList.contains("open");n.classList.toggle("open",m),d.classList.toggle("open",m),m&&S()}e.addEventListener("click",()=>s()),y.addEventListener("click",()=>s(!1)),d.addEventListener("click",()=>s(!1)),window.addEventListener("keydown",t=>{t.key==="Escape"&&n.classList.contains("open")&&s(!1),t.altKey&&(t.key==="a"||t.key==="A")&&(t.preventDefault(),s())}),n.querySelectorAll("[data-theme]").forEach(t=>{t.addEventListener("click",()=>{a.theme=t.getAttribute("data-theme"),u(),l()})}),n.querySelectorAll("[data-font]").forEach(t=>{t.addEventListener("click",()=>{a.font=t.getAttribute("data-font"),u(),l()})}),n.querySelectorAll("[data-size]").forEach(t=>{t.addEventListener("click",()=>{a.size=t.getAttribute("data-size"),u(),l()})}),n.querySelectorAll("[data-spacing]").forEach(t=>{t.addEventListener("click",()=>{a.spacing=t.getAttribute("data-spacing"),u(),l()})}),document.getElementById("a11y-toggle-ruler").addEventListener("change",t=>{a.ruler=t.target.checked,u(),l()}),document.getElementById("a11y-toggle-spotlight").addEventListener("change",t=>{a.spotlight=t.target.checked,u(),l()}),document.getElementById("a11y-toggle-bionic").addEventListener("change",t=>{a.bionic=t.target.checked,u(),l()}),document.getElementById("a11y-toggle-magnifier").addEventListener("change",t=>{a.magnifier=t.target.checked,u(),l()}),document.getElementById("a11y-reset-btn").addEventListener("click",()=>{a={...f},u(),l()});const i=document.getElementById("a11y-ruler-top"),E=document.getElementById("a11y-ruler-bar"),b=document.getElementById("a11y-ruler-bottom");window.addEventListener("mousemove",t=>{if(!a.ruler)return;const m=t.clientY,v=22;i.style.height=`${Math.max(0,m-v)}px`,E.style.top=`${m-v}px`,b.style.top=`${m+v}px`});const p=document.getElementById("a11y-magnifier");window.addEventListener("mousemove",t=>{if(!a.magnifier)return;const m=Math.min(window.innerWidth-300,t.clientX+24),v=Math.min(window.innerHeight-120,t.clientY+24);p.style.left=`${m}px`,p.style.top=`${v}px`;const h=document.elementFromPoint(t.clientX,t.clientY);if(h&&h!==p&&!p.contains(h)&&h!==e){const A=h.innerText?h.innerText.slice(0,140):"";A&&A.trim().length>1&&(p.textContent=A)}});let g=null;const r=document.getElementById("a11y-tts-play"),x=document.getElementById("a11y-tts-stop");r.addEventListener("click",()=>{if(!("speechSynthesis"in window)){alert("Text-to-speech is not supported by your browser.");return}window.speechSynthesis.cancel();const t=document.querySelector("main")?document.querySelector("main").innerText:document.body.innerText;g=new SpeechSynthesisUtterance(t),g.rate=1,g.pitch=1,g.onstart=()=>{r.classList.add("active"),r.textContent="🔊 Reading..."},g.onend=()=>{r.classList.remove("active"),r.textContent="🔊 Read Aloud"},g.onerror=()=>{r.classList.remove("active"),r.textContent="🔊 Read Aloud"},window.speechSynthesis.speak(g)}),x.addEventListener("click",()=>{"speechSynthesis"in window&&window.speechSynthesis.cancel(),r.classList.remove("active"),r.textContent="🔊 Read Aloud"})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{c(),l()}):(c(),l())})();
