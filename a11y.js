// ========================================================
// Accessibility & Inclusive Reading Suite for Satnam Singh
// Features: Dark Mode, E-Reader (Sepia), High Contrast,
//           ADHD Reading Ruler, Paragraph Spotlight, Bionic Reading,
//           Dyslexia Font (Lexend), Text Size, Line Spacing,
//           Magnifier Loupe, and Text-to-Speech Read Aloud.
// ========================================================

(function () {
  const STORAGE_KEY = 'satnam_a11y_prefs_v2';

  const DEFAULTS = {
    theme: 'default',    // 'default' | 'dark' | 'ereader' | 'contrast'
    font: 'default',     // 'default' | 'lexend' | 'sans'
    size: 'md',          // 'sm' | 'md' | 'lg' | 'xl'
    spacing: 'normal',   // 'normal' | 'relaxed' | 'loose'
    ruler: false,
    spotlight: false,
    bionic: false,
    magnifier: false
  };

  let prefs = { ...DEFAULTS };
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      prefs = { ...DEFAULTS, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn('Could not load accessibility preferences', e);
  }

  function savePrefs() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch (e) {}
  }

  // Pre-load Google Font Lexend for Dyslexia/ADHD mode
  if (!document.getElementById('font-lexend-link')) {
    const link = document.createElement('link');
    link.id = 'font-lexend-link';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600&display=swap';
    document.head.appendChild(link);
  }

  // Store original HTML of main for clean Bionic toggle
  let originalMainHTML = null;

  // Cached lines for seamless line-by-line magnifier
  let cachedBlock = null;
  let cachedLines = [];
  let lastScrollY = window.scrollY;

  function initDOM() {
    if (document.getElementById('a11y-trigger')) return;

    // 1. Reading Ruler overlay
    const ruler = document.createElement('div');
    ruler.id = 'a11y-ruler';
    ruler.innerHTML = `
      <div id="a11y-ruler-top"></div>
      <div id="a11y-ruler-bar"></div>
      <div id="a11y-ruler-bottom"></div>
    `;
    document.body.appendChild(ruler);

    // 2. Line Highlight & Magnifier Loupe
    const lineHighlight = document.createElement('div');
    lineHighlight.id = 'a11y-line-highlight';
    lineHighlight.setAttribute('aria-hidden', 'true');
    document.body.appendChild(lineHighlight);

    const magnifier = document.createElement('div');
    magnifier.id = 'a11y-magnifier';
    magnifier.setAttribute('aria-hidden', 'true');
    magnifier.innerHTML = `
      <div class="a11y-mag-badge">🔍 Magnifier · Line Guide</div>
      <div class="a11y-mag-content">Hover over any line to magnify</div>
    `;
    document.body.appendChild(magnifier);

    // 3. Floating Round Button
    const trigger = document.createElement('button');
    trigger.id = 'a11y-trigger';
    trigger.setAttribute('aria-label', 'Open Reading & Accessibility Controls');
    trigger.setAttribute('title', 'Accessibility & Reading Tools (Alt + A)');
    trigger.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="4" r="2"/>
        <path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.49-.24-1.07-.28-1.59-.09l-4.5 1.63c-.57.21-.94.75-.94 1.36V18c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.65l1.6-.58.9 4.95c.13.72.76 1.28 1.5 1.28h.08c.92-.04 1.62-.82 1.58-1.74l-.45-4.95c.78.69 1.78 1.13 2.88 1.19h.4c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"/>
      </svg>
    `;
    document.body.appendChild(trigger);

    // 4. Modal Backdrop & Panel
    const backdrop = document.createElement('div');
    backdrop.id = 'a11y-modal-backdrop';
    document.body.appendChild(backdrop);

    const modal = document.createElement('div');
    modal.id = 'a11y-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-label', 'Accessibility and Reading Settings');
    modal.innerHTML = `
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
    `;
    document.body.appendChild(modal);

    setupEvents();
  }

  function applySettings() {
    const body = document.body;

    // Theme
    body.classList.remove('theme-dark', 'theme-ereader', 'theme-contrast');
    if (prefs.theme === 'dark') body.classList.add('theme-dark');
    else if (prefs.theme === 'ereader') body.classList.add('theme-ereader');
    else if (prefs.theme === 'contrast') body.classList.add('theme-contrast');

    // Font
    body.classList.remove('font-lexend', 'font-sans');
    if (prefs.font === 'lexend') body.classList.add('font-lexend');
    else if (prefs.font === 'sans') body.classList.add('font-sans');

    // Text Size
    body.classList.remove('size-sm', 'size-md', 'size-lg', 'size-xl');
    body.classList.add(`size-${prefs.size}`);

    // Spacing
    body.classList.remove('spacing-normal', 'spacing-relaxed', 'spacing-loose');
    body.classList.add(`spacing-${prefs.spacing}`);

    // Ruler
    if (prefs.ruler) body.classList.add('ruler-active');
    else body.classList.remove('ruler-active');

    // Spotlight
    if (prefs.spotlight) body.classList.add('focus-spotlight');
    else body.classList.remove('focus-spotlight');

    // Magnifier
    if (prefs.magnifier) {
      body.classList.add('magnifier-active');
      const m = document.getElementById('a11y-magnifier');
      if (m) m.style.display = 'block';
    } else {
      body.classList.remove('magnifier-active');
      const m = document.getElementById('a11y-magnifier');
      const lh = document.getElementById('a11y-line-highlight');
      if (m) m.style.display = 'none';
      if (lh) lh.style.display = 'none';
      cachedBlock = null;
      cachedLines = [];
    }

    // Bionic Reading
    applyBionic(prefs.bionic);

    // Update UI controls active states
    updateModalUI();
  }

  function updateModalUI() {
    const modal = document.getElementById('a11y-modal');
    if (!modal) return;

    // Theme buttons
    modal.querySelectorAll('[data-theme]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-theme') === prefs.theme);
    });

    // Font buttons
    modal.querySelectorAll('[data-font]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-font') === prefs.font);
    });

    // Size buttons
    modal.querySelectorAll('[data-size]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-size') === prefs.size);
    });

    // Spacing buttons
    modal.querySelectorAll('[data-spacing]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-spacing') === prefs.spacing);
    });

    // Checkboxes
    const rulerCb = document.getElementById('a11y-toggle-ruler');
    if (rulerCb) rulerCb.checked = prefs.ruler;

    const spotCb = document.getElementById('a11y-toggle-spotlight');
    if (spotCb) spotCb.checked = prefs.spotlight;

    const bionicCb = document.getElementById('a11y-toggle-bionic');
    if (bionicCb) bionicCb.checked = prefs.bionic;

    const magCb = document.getElementById('a11y-toggle-magnifier');
    if (magCb) magCb.checked = prefs.magnifier;
  }

  function applyBionic(enable) {
    const main = document.querySelector('main');
    if (!main) return;

    if (!originalMainHTML) {
      originalMainHTML = main.innerHTML;
    }

    if (!enable) {
      if (main.getAttribute('data-bionic') === 'true') {
        main.innerHTML = originalMainHTML;
        main.removeAttribute('data-bionic');
      }
      return;
    }

    if (main.getAttribute('data-bionic') === 'true') return;

    function processTextNode(node) {
      const text = node.nodeValue;
      if (!text || !text.trim()) return;

      const words = text.split(/(\s+)/);
      const span = document.createElement('span');

      words.forEach(part => {
        if (!part.trim()) {
          span.appendChild(document.createTextNode(part));
          return;
        }

        const match = part.match(/^([a-zA-Z0-9]+)(.*)$/);
        if (match && match[1].length > 1) {
          const word = match[1];
          const rest = match[2];
          const mid = Math.ceil(word.length / 2);

          const b = document.createElement('b');
          b.textContent = word.slice(0, mid);
          span.appendChild(b);
          span.appendChild(document.createTextNode(word.slice(mid) + rest));
        } else {
          span.appendChild(document.createTextNode(part));
        }
      });

      node.parentNode.replaceChild(span, node);
    }

    function walkNodes(element) {
      if (!element || element.nodeType !== 1) return;
      if (['SCRIPT', 'STYLE', 'BUTTON', 'INPUT'].includes(element.tagName)) return;

      Array.from(element.childNodes).forEach(child => {
        if (child.nodeType === 3) {
          processTextNode(child);
        } else if (child.nodeType === 1) {
          walkNodes(child);
        }
      });
    }

    walkNodes(main);
    main.setAttribute('data-bionic', 'true');
  }

  function setupEvents() {
    const trigger = document.getElementById('a11y-trigger');
    const modal = document.getElementById('a11y-modal');
    const backdrop = document.getElementById('a11y-modal-backdrop');
    const closeBtn = document.getElementById('a11y-close-btn');

    function toggleModal(open) {
      const isOpen = open !== undefined ? open : !modal.classList.contains('open');
      modal.classList.toggle('open', isOpen);
      backdrop.classList.toggle('open', isOpen);
      if (isOpen) {
        updateModalUI();
      }
    }

    trigger.addEventListener('click', () => toggleModal());
    closeBtn.addEventListener('click', () => toggleModal(false));
    backdrop.addEventListener('click', () => toggleModal(false));

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        toggleModal(false);
      }
      if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        toggleModal();
      }
    });

    // Theme selector
    modal.querySelectorAll('[data-theme]').forEach(btn => {
      btn.addEventListener('click', () => {
        prefs.theme = btn.getAttribute('data-theme');
        savePrefs();
        applySettings();
      });
    });

    // Font selector
    modal.querySelectorAll('[data-font]').forEach(btn => {
      btn.addEventListener('click', () => {
        prefs.font = btn.getAttribute('data-font');
        savePrefs();
        applySettings();
      });
    });

    // Size selector
    modal.querySelectorAll('[data-size]').forEach(btn => {
      btn.addEventListener('click', () => {
        prefs.size = btn.getAttribute('data-size');
        savePrefs();
        applySettings();
      });
    });

    // Spacing selector
    modal.querySelectorAll('[data-spacing]').forEach(btn => {
      btn.addEventListener('click', () => {
        prefs.spacing = btn.getAttribute('data-spacing');
        savePrefs();
        applySettings();
      });
    });

    // Checkboxes
    document.getElementById('a11y-toggle-ruler').addEventListener('change', (e) => {
      prefs.ruler = e.target.checked;
      savePrefs();
      applySettings();
    });

    document.getElementById('a11y-toggle-spotlight').addEventListener('change', (e) => {
      prefs.spotlight = e.target.checked;
      savePrefs();
      applySettings();
    });

    document.getElementById('a11y-toggle-bionic').addEventListener('change', (e) => {
      prefs.bionic = e.target.checked;
      savePrefs();
      applySettings();
    });

    document.getElementById('a11y-toggle-magnifier').addEventListener('change', (e) => {
      prefs.magnifier = e.target.checked;
      savePrefs();
      applySettings();
    });

    // Reset button
    document.getElementById('a11y-reset-btn').addEventListener('click', () => {
      prefs = { ...DEFAULTS };
      savePrefs();
      applySettings();
    });

    // Seamless Line-by-Line Detection for Magnifier & Line Highlight
    function getLeafTextNodes(root) {
      const nodes = [];
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: (n) => {
          const p = n.parentElement;
          if (!p || ['SCRIPT', 'STYLE'].includes(p.tagName) || p.closest('#a11y-modal, #a11y-trigger, #a11y-magnifier, #a11y-ruler, #a11y-line-highlight, #a11y-modal-backdrop')) {
            return NodeFilter.FILTER_REJECT;
          }
          return n.nodeValue && n.nodeValue.trim().length > 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      });
      let node;
      while ((node = walker.nextNode())) {
        nodes.push(node);
      }
      return nodes;
    }

    function computeLinesForBlock(block) {
      const textNodes = getLeafTextNodes(block);
      if (!textNodes.length) {
        const rawText = block.innerText ? block.innerText.trim() : '';
        if (!rawText) return [];
        const bRect = block.getBoundingClientRect();
        return [{
          top: bRect.top,
          bottom: bRect.bottom,
          left: bRect.left,
          right: bRect.right,
          words: [rawText],
          text: rawText
        }];
      }

      const range = document.createRange();
      const wordEntries = [];

      for (let i = 0; i < textNodes.length; i++) {
        const node = textNodes[i];
        const text = node.nodeValue;
        const regex = /\S+/g;
        let match;
        while ((match = regex.exec(text)) !== null) {
          const word = match[0];
          const start = match.index;
          const end = start + word.length;
          try {
            range.setStart(node, start);
            range.setEnd(node, end);
            const rect = range.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
              wordEntries.push({ word, rect });
            }
          } catch (err) {}
        }
      }

      if (!wordEntries.length) {
        const bRect = block.getBoundingClientRect();
        const rawText = block.innerText ? block.innerText.trim() : '';
        return rawText ? [{
          top: bRect.top,
          bottom: bRect.bottom,
          left: bRect.left,
          right: bRect.right,
          words: [rawText],
          text: rawText
        }] : [];
      }

      wordEntries.sort((a, b) => {
        const midA = (a.rect.top + a.rect.bottom) / 2;
        const midB = (b.rect.top + b.rect.bottom) / 2;
        if (Math.abs(midA - midB) > 7) {
          return midA - midB;
        }
        return a.rect.left - b.rect.left;
      });

      const lines = [];
      for (let i = 0; i < wordEntries.length; i++) {
        const entry = wordEntries[i];
        const rect = entry.rect;
        const wordMid = (rect.top + rect.bottom) / 2;

        let matchedLine = null;
        for (let j = 0; j < lines.length; j++) {
          const l = lines[j];
          const lineMid = (l.top + l.bottom) / 2;
          if (Math.abs(wordMid - lineMid) <= 9 || (rect.top < l.bottom && rect.bottom > l.top)) {
            matchedLine = l;
            break;
          }
        }

        if (matchedLine) {
          matchedLine.words.push(entry.word);
          matchedLine.top = Math.min(matchedLine.top, rect.top);
          matchedLine.bottom = Math.max(matchedLine.bottom, rect.bottom);
          matchedLine.left = Math.min(matchedLine.left, rect.left);
          matchedLine.right = Math.max(matchedLine.right, rect.right);
        } else {
          lines.push({
            top: rect.top,
            bottom: rect.bottom,
            left: rect.left,
            right: rect.right,
            words: [entry.word]
          });
        }
      }

      for (let i = 0; i < lines.length; i++) {
        lines[i].text = lines[i].words.join(' ');
      }

      return lines;
    }

    function getActiveLine(target, clientX, clientY) {
      if (!target || target.closest('#a11y-modal, #a11y-trigger, #a11y-ruler, #a11y-magnifier, #a11y-line-highlight, #a11y-modal-backdrop')) {
        return null;
      }

      const block = target.closest('p, li, h1, h2, h3, h4, dt, dd, nav, header, footer, .tagline, .small') || target;
      if (!block || block === document.body || block === document.documentElement) {
        return null;
      }

      const currentScrollY = window.scrollY;
      if (cachedBlock !== block || Math.abs(currentScrollY - lastScrollY) > 2) {
        cachedBlock = block;
        lastScrollY = currentScrollY;
        cachedLines = computeLinesForBlock(block);
      }

      if (!cachedLines || !cachedLines.length) return null;

      let closest = null;
      let minDistance = Infinity;

      for (let i = 0; i < cachedLines.length; i++) {
        const l = cachedLines[i];
        if (clientY >= l.top && clientY <= l.bottom) {
          closest = l;
          break;
        }
        const mid = (l.top + l.bottom) / 2;
        const dist = Math.abs(clientY - mid);
        if (dist < minDistance) {
          minDistance = dist;
          closest = l;
        }
      }

      if (closest && minDistance <= 38) {
        return closest;
      }
      return null;
    }

    // Reading Ruler tracker
    const rulerTop = document.getElementById('a11y-ruler-top');
    const rulerBar = document.getElementById('a11y-ruler-bar');
    const rulerBottom = document.getElementById('a11y-ruler-bottom');
    const mag = document.getElementById('a11y-magnifier');
    const magContent = mag ? mag.querySelector('.a11y-mag-content') : null;
    const lineHighlight = document.getElementById('a11y-line-highlight');

    window.addEventListener('scroll', () => { cachedBlock = null; }, { passive: true });
    window.addEventListener('resize', () => { cachedBlock = null; }, { passive: true });

    let animFrame = null;
    window.addEventListener('mousemove', (e) => {
      if (!prefs.ruler && !prefs.magnifier) return;

      if (animFrame) cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(() => {
        // 1. Reading Ruler
        if (prefs.ruler && rulerTop && rulerBar && rulerBottom) {
          const y = e.clientY;
          const halfHeight = 22;
          rulerTop.style.height = `${Math.max(0, y - halfHeight)}px`;
          rulerBar.style.top = `${y - halfHeight}px`;
          rulerBottom.style.top = `${y + halfHeight}px`;
        }

        // 2. Magnifier Loupe & Seamless Line Highlight
        if (prefs.magnifier && mag) {
          const target = document.elementFromPoint(e.clientX, e.clientY);
          const line = getActiveLine(target, e.clientX, e.clientY);

          if (line && line.text) {
            if (magContent) {
              magContent.textContent = line.text;
            } else {
              mag.textContent = line.text;
            }
            mag.style.display = 'block';

            if (lineHighlight) {
              lineHighlight.style.display = 'block';
              lineHighlight.style.top = `${line.top - 2}px`;
              lineHighlight.style.left = `${Math.max(6, line.left - 6)}px`;
              lineHighlight.style.width = `${line.right - line.left + 12}px`;
              lineHighlight.style.height = `${line.bottom - line.top + 4}px`;
            }

            const magWidth = mag.offsetWidth || 440;
            const magHeight = mag.offsetHeight || 75;

            let posY = e.clientY - magHeight - 16;
            if (posY < 12) {
              posY = e.clientY + 28;
            }

            let posX = e.clientX - 40;
            if (posX + magWidth > window.innerWidth - 16) {
              posX = window.innerWidth - magWidth - 16;
            }
            if (posX < 16) posX = 16;

            mag.style.left = `${posX}px`;
            mag.style.top = `${posY}px`;
          } else {
            if (lineHighlight) lineHighlight.style.display = 'none';
            if (!target || target.closest('#a11y-modal, #a11y-trigger, #a11y-modal-backdrop')) {
              mag.style.display = 'none';
            }
          }
        }
      });
    });

    // Text to Speech (TTS)
    let speechUtterance = null;
    const playBtn = document.getElementById('a11y-tts-play');
    const stopBtn = document.getElementById('a11y-tts-stop');

    playBtn.addEventListener('click', () => {
      if (!('speechSynthesis' in window)) {
        alert('Text-to-speech is not supported by your browser.');
        return;
      }
      window.speechSynthesis.cancel();

      const mainText = document.querySelector('main') ? document.querySelector('main').innerText : document.body.innerText;
      speechUtterance = new SpeechSynthesisUtterance(mainText);
      speechUtterance.rate = 1.0;
      speechUtterance.pitch = 1.0;

      speechUtterance.onstart = () => {
        playBtn.classList.add('active');
        playBtn.textContent = '🔊 Reading...';
      };
      speechUtterance.onend = () => {
        playBtn.classList.remove('active');
        playBtn.textContent = '🔊 Read Aloud';
      };
      speechUtterance.onerror = () => {
        playBtn.classList.remove('active');
        playBtn.textContent = '🔊 Read Aloud';
      };

      window.speechSynthesis.speak(speechUtterance);
    });

    stopBtn.addEventListener('click', () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      playBtn.classList.remove('active');
      playBtn.textContent = '🔊 Read Aloud';
    });
  }

  // Initialize when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initDOM();
      applySettings();
    });
  } else {
    initDOM();
    applySettings();
  }
})();
