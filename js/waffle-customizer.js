/**
 * BROFFLES — Interactive Waffle Studio (Build Your Own Waffle)
 * Lets customers build, customize, and watch their waffle be assembled in real time
 * with step-by-step baking, pouring, scoop-dropping, and topping animations!
 */

const WaffleCustomizer = {
  state: {
    base: { id: 'classic', name: 'Belgian Classic Crisp', price: 99, color: '#E1B478', border: '#A86B30', texture: 'classic' },
    spreads: [{ id: 'dark-choco', name: 'Dark Chocolate Ganache', price: 30, color: '#2B1207' }],
    iceCream: { id: 'vanilla', name: 'Vanilla Cream Scoop', price: 40, color: '#FFFBE6' },
    toppings: [{ id: 'choco-chips', name: 'Dark & White Choco Chips', price: 30, icon: '🍫' }]
  },

  bases: [
    { id: 'classic', name: 'Belgian Classic Crisp', price: 99, color: '#E1B478', border: '#A86B30', desc: 'Golden, crispy grid baked fresh' },
    { id: 'brownie', name: 'Fudge Brownie Base', price: 129, color: '#3A1C0E', border: '#220D05', desc: 'Dense, chocolatey brownie waffle (+₹30)' },
    { id: 'red-velvet', name: 'Crimson Red Velvet', price: 139, color: '#9E182D', border: '#5C0B18', desc: 'Cocoa-buttermilk ruby waffle (+₹40)' },
    { id: 'bubble', name: 'Egg Bubble Waffle', price: 159, color: '#E6A85C', border: '#B5732A', desc: 'Crisp exterior with fluffy bubbles (+₹60)' }
  ],

  spreadOptions: [
    { id: 'dark-choco', name: 'Dark Cocoa Ganache', price: 30, color: '#240F05' },
    { id: 'milk-choco', name: 'Silky Milk Chocolate', price: 30, color: '#5B3019' },
    { id: 'white-choco', name: 'Belgian White Chocolate', price: 30, color: '#FFF8EB' },
    { id: 'nutella', name: 'Pure Hazelnut Nutella', price: 40, color: '#451D0E' },
    { id: 'biscoff', name: 'Caramelized Lotus Biscoff', price: 40, color: '#C8681E' },
    { id: 'honey-butter', name: 'Golden Honey & Butter', price: 20, color: '#F0AD35' }
  ],

  iceCreamOptions: [
    { id: 'none', name: 'No Ice Cream', price: 0, color: 'transparent' },
    { id: 'vanilla', name: 'Vanilla Cream Scoop', price: 40, color: '#FFFBE6' },
    { id: 'chocolate', name: 'Belgian Dark Choco Scoop', price: 40, color: '#381B0E' },
    { id: 'kulfi', name: 'Desi Kulfi Malai Scoop', price: 40, color: '#F5E4C4' }
  ],

  toppingOptions: [
    { id: 'choco-chips', name: 'Dark & White Choco Chips', price: 30, icon: '🍫' },
    { id: 'gems', name: 'Colorful Gems Loaded', price: 30, icon: '🌈' },
    { id: 'kitkat', name: 'Crunchy Kit Kat Bites', price: 30, icon: '🍫' },
    { id: 'oreo', name: 'Crushed Oreo Cracks', price: 30, icon: '🍪' },
    { id: 'roasted-almonds', name: 'Roasted Almond Slivers', price: 40, icon: '🌰' },
    { id: 'crispy-cashews', name: 'Golden Crispy Cashews', price: 40, icon: '🥜' },
    { 
      id: 'ferrero', 
      name: 'Ferrero Rocher Confectionery', 
      price: 40, 
      icon: `<svg width="24" height="24" viewBox="0 0 36 36" fill="none" style="display:inline-block; vertical-align:middle;"><path d="M7 21 L10 32 L26 32 L29 21 Z" fill="#E5B942" stroke="#B3861B" stroke-width="1.3"/><path d="M10 21 L12 32 M14.5 21 L15.5 32 M18 21 L18 32 M21.5 21 L20.5 32 M26 21 L24 32" stroke="#8C630D" stroke-width="1" stroke-linecap="round"/><circle cx="18" cy="15.5" r="11" fill="#442111" stroke="#250F05" stroke-width="1.2"/><circle cx="13" cy="11.5" r="1.8" fill="#C99455"/><circle cx="22" cy="11" r="1.6" fill="#DEB177"/><circle cx="17.5" cy="16" r="1.8" fill="#C99455"/><circle cx="13" cy="17.5" r="1.5" fill="#DEB177"/><circle cx="22.5" cy="16.5" r="1.7" fill="#C99455"/><circle cx="18" cy="9.5" r="1.4" fill="#E8C58F"/><polygon points="18,5.5 19.2,8.5 22.5,9 20,11 20.8,14.2 18,12.5 15.2,14.2 16,11 13.5,9 16.8,8.5" fill="#FFE57F"/></svg>` 
    },
    { id: 'biscoff-crunch', name: 'Lotus Biscoff Biscuit Crumbs', price: 40, icon: '🥮' }
  ],

  init() {
    this.renderControls();
    this.updateVisualPreview(true);
    this.updatePrice();
    this.bindEvents();
  },

  renderControls() {
    // 1. Bases
    const baseContainer = document.getElementById('custom-base-options');
    if (baseContainer) {
      baseContainer.innerHTML = this.bases.map(b => `
        <div class="customizer-option-card ${b.id === this.state.base.id ? 'is-selected' : ''}" data-type="base" data-id="${b.id}" role="button" tabindex="0">
          <div class="opt-indicator" style="background-color: ${b.color}; border-color: ${b.border}"></div>
          <div class="opt-details">
            <span class="opt-name">${b.name}</span>
            <span class="opt-desc">${b.desc}</span>
            <span class="opt-price">₹${b.price}</span>
          </div>
        </div>
      `).join('');
    }

    // 2. Spreads
    const spreadContainer = document.getElementById('custom-spread-options');
    if (spreadContainer) {
      spreadContainer.innerHTML = this.spreadOptions.map(s => {
        const isSel = this.state.spreads.some(x => x.id === s.id);
        return `
          <div class="customizer-option-card ${isSel ? 'is-selected' : ''}" data-type="spread" data-id="${s.id}" role="button" tabindex="0">
            <div class="opt-indicator" style="background-color: ${s.color};"></div>
            <div class="opt-details">
              <span class="opt-name">${s.name}</span>
              <span class="opt-price">+₹${s.price}</span>
            </div>
          </div>
        `;
      }).join('');
    }

    // 3. Ice Cream
    const iceContainer = document.getElementById('custom-ice-options');
    if (iceContainer) {
      iceContainer.innerHTML = this.iceCreamOptions.map(i => `
        <div class="customizer-option-card ${i.id === this.state.iceCream.id ? 'is-selected' : ''}" data-type="ice" data-id="${i.id}" role="button" tabindex="0">
          <div class="opt-indicator" style="background-color: ${i.color}; border: 1.5px solid #ccc;"></div>
          <div class="opt-details">
            <span class="opt-name">${i.name}</span>
            <span class="opt-price">${i.price > 0 ? '+₹' + i.price : 'Free'}</span>
          </div>
        </div>
      `).join('');
    }

    // 4. Toppings
    const topContainer = document.getElementById('custom-topping-options');
    if (topContainer) {
      topContainer.innerHTML = this.toppingOptions.map(t => {
        const isSel = this.state.toppings.some(x => x.id === t.id);
        return `
          <div class="customizer-option-card ${isSel ? 'is-selected' : ''}" data-type="topping" data-id="${t.id}" role="button" tabindex="0">
            <span style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; flex-shrink: 0; font-size: 1.35rem;">${t.icon}</span>
            <div class="opt-details">
              <span class="opt-name">${t.name}</span>
              <span class="opt-price">+₹${t.price}</span>
            </div>
          </div>
        `;
      }).join('');
    }
  },

  updateSelectedStyles() {
    // 1. Base
    document.querySelectorAll('#custom-base-options .customizer-option-card').forEach(card => {
      const id = card.getAttribute('data-id');
      const isSel = id === this.state.base.id;
      card.classList.toggle('is-selected', isSel);
    });

    // 2. Spreads
    document.querySelectorAll('#custom-spread-options .customizer-option-card').forEach(card => {
      const id = card.getAttribute('data-id');
      const isSel = this.state.spreads.some(s => s.id === id);
      card.classList.toggle('is-selected', isSel);
    });

    // 3. Ice Cream
    document.querySelectorAll('#custom-ice-options .customizer-option-card').forEach(card => {
      const id = card.getAttribute('data-id');
      const isSel = id === this.state.iceCream.id;
      card.classList.toggle('is-selected', isSel);
    });

    // 4. Toppings
    document.querySelectorAll('#custom-topping-options .customizer-option-card').forEach(card => {
      const id = card.getAttribute('data-id');
      const isSel = this.state.toppings.some(t => t.id === id);
      card.classList.toggle('is-selected', isSel);
    });
  },

  bindEvents() {
    // 1. Base selection via container delegation
    const baseContainer = document.getElementById('custom-base-options');
    if (baseContainer) {
      baseContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.customizer-option-card');
        if (!card) return;
        const id = card.getAttribute('data-id');
        const found = this.bases.find(b => b.id === id);
        if (found) {
          this.state.base = found;
          this.updateSelectedStyles();
          this.animateStep('base');
          this.updatePrice();
        }
      });
    }

    // 2. Spreads selection via container delegation
    const spreadContainer = document.getElementById('custom-spread-options');
    if (spreadContainer) {
      spreadContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.customizer-option-card');
        if (!card) return;
        const id = card.getAttribute('data-id');
        const found = this.spreadOptions.find(s => s.id === id);
        if (!found) return;

        const isAlreadySel = this.state.spreads.some(s => s.id === id);
        if (isAlreadySel) {
          // If more than 1 spread is selected, allow deselecting
          if (this.state.spreads.length > 1) {
            this.state.spreads = this.state.spreads.filter(s => s.id !== id);
          }
        } else {
          // Add this spread (allow dual spreads or multiple)
          this.state.spreads.push(found);
        }
        this.updateSelectedStyles();
        this.animateStep('spread');
        this.updatePrice();
      });
    }

    // 3. Ice cream selection via container delegation
    const iceContainer = document.getElementById('custom-ice-options');
    if (iceContainer) {
      iceContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.customizer-option-card');
        if (!card) return;
        const id = card.getAttribute('data-id');
        const found = this.iceCreamOptions.find(i => i.id === id);
        if (!found) return;

        if (this.state.iceCream.id === id && id !== 'none') {
          // Clicking active scoop toggles it off to 'No Ice Cream'
          const noneOpt = this.iceCreamOptions.find(i => i.id === 'none');
          this.state.iceCream = noneOpt || { id: 'none', name: 'No Ice Cream', price: 0, color: 'transparent' };
        } else {
          this.state.iceCream = found;
        }
        this.updateSelectedStyles();
        this.animateStep('iceCream');
        this.updatePrice();
      });
    }

    // 4. Toppings selection via container delegation
    const topContainer = document.getElementById('custom-topping-options');
    if (topContainer) {
      topContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.customizer-option-card');
        if (!card) return;
        const id = card.getAttribute('data-id');
        const found = this.toppingOptions.find(t => t.id === id);
        if (!found) return;

        const isAlreadySel = this.state.toppings.some(t => t.id === id);
        if (isAlreadySel) {
          this.state.toppings = this.state.toppings.filter(t => t.id !== id);
        } else {
          this.state.toppings.push(found);
        }
        this.updateSelectedStyles();
        this.animateStep('topping');
        this.updatePrice();
      });
    }

    // Keyboard support for all containers
    [baseContainer, spreadContainer, iceContainer, topContainer].forEach(container => {
      if (container) {
        container.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const card = e.target.closest('.customizer-option-card');
            if (card) card.click();
          }
        });
      }
    });

    // Replay Full Making Animation Button
    const replayBtn = document.getElementById('btn-replay-animation');
    if (replayBtn) {
      replayBtn.addEventListener('click', () => this.playFullMakingSequence());
    }

    // Save Creation Button (to local feed and notify counter)
    const saveOrderBtn = document.getElementById('btn-save-custom-order');
    if (saveOrderBtn) {
      saveOrderBtn.addEventListener('click', () => this.saveToLocalFeed());
    }
  },

  calculateTotal() {
    let total = this.state.base.price;
    this.state.spreads.forEach(s => total += s.price);
    if (this.state.iceCream.price > 0) total += this.state.iceCream.price;
    this.state.toppings.forEach(t => total += t.price);
    return total;
  },

  updatePrice() {
    const total = this.calculateTotal();
    const priceDisplay = document.getElementById('custom-total-price');
    if (priceDisplay) {
      priceDisplay.textContent = `₹${total}`;
    }

    const cravingBar = document.getElementById('craving-meter-bar');
    const cravingText = document.getElementById('craving-meter-text');
    
    const itemsCount = 1 + this.state.spreads.length + (this.state.iceCream.id !== 'none' ? 1 : 0) + this.state.toppings.length;
    const pct = Math.min(itemsCount * 18, 100);

    if (cravingBar) cravingBar.style.width = `${pct}%`;
    if (cravingText) {
      if (pct < 40) cravingText.textContent = '✨ Cute Sweet Tooth (Light & Crispy)';
      else if (pct < 70) cravingText.textContent = '🍫 Serious Craving Mode (Indulgent!)';
      else cravingText.textContent = '🔥 UNAPOLOGETIC CHOCOLATE MONSTER LEVEL!';
    }
  },

  /**
   * Animates a specific step when the customer changes an option
   */
  animateStep(step) {
    this.updateVisualPreview(false);

    if (step === 'base') {
      const baseEl = document.getElementById('studio-waffle-shape');
      if (baseEl) {
        baseEl.classList.remove('anim-drop-waffle');
        void baseEl.offsetWidth; // trigger reflow
        baseEl.classList.add('anim-drop-waffle');
      }
    } else if (step === 'spread') {
      const drizzleEl = document.getElementById('studio-drizzle-layer');
      if (drizzleEl) {
        drizzleEl.classList.remove('anim-pour-sauce');
        void drizzleEl.offsetWidth;
        drizzleEl.classList.add('anim-pour-sauce');
      }
    } else if (step === 'iceCream') {
      const iceEl = document.getElementById('studio-ice-layer');
      if (iceEl) {
        iceEl.classList.remove('anim-drop-scoop');
        void iceEl.offsetWidth;
        iceEl.classList.add('anim-drop-scoop');
      }
    } else if (step === 'topping') {
      const topEl = document.getElementById('studio-topping-layer');
      if (topEl) {
        topEl.classList.remove('anim-scatter-toppings');
        void topEl.offsetWidth;
        topEl.classList.add('anim-scatter-toppings');
      }
    }
  },

  /**
   * Plays the complete step-by-step creation animation in sequence,
   * giving a full 3 seconds for each item to jump onto the waffle!
   */
  playFullMakingSequence() {
    const titleEl = document.getElementById('studio-preview-title');
    const replayBtn = document.getElementById('btn-replay-animation');
    const origTitle = titleEl ? titleEl.textContent : '';

    const svgDrizzles = document.getElementById('studio-drizzle-layer');
    const svgIceCream = document.getElementById('studio-ice-layer');
    const svgToppings = document.getElementById('studio-topping-layer');

    // Disable button during 12-second sequence to prevent spam
    if (replayBtn) {
      replayBtn.disabled = true;
      if (replayBtn.style) {
        replayBtn.style.opacity = '0.7';
        replayBtn.style.pointerEvents = 'none';
      }
      replayBtn.innerHTML = '<span>⏳ Assembling Your Waffle Live...</span>';
    }

    // 0s: Step 1 - Base Waffle (3 seconds)
    if (titleEl) titleEl.textContent = '🔥 Step 1/4: Griddling Fresh Crispy Waffle... (3s)';
    if (svgDrizzles) svgDrizzles.style.display = 'none';
    if (svgIceCream) svgIceCream.style.display = 'none';
    if (svgToppings) svgToppings.style.display = 'none';
    this.animateStep('base');

    // 3s (3000ms): Step 2 - Molten Chocolate Spreads (3 seconds)
    setTimeout(() => {
      if (titleEl) titleEl.textContent = '🍫 Step 2/4: Pouring Molten Chocolate Fondue... (3s)';
      if (svgDrizzles) svgDrizzles.style.display = '';
      this.animateStep('spread');
    }, 3000);

    // 6s (6000ms): Step 3 - Chilled Ice Cream Scoop (3 seconds)
    setTimeout(() => {
      if (titleEl) titleEl.textContent = '🍨 Step 3/4: Scooping Chilled Ice Cream... (3s)';
      if (svgIceCream && this.state.iceCream.id !== 'none') svgIceCream.style.display = '';
      this.animateStep('iceCream');
    }, 6000);

    // 9s (9000ms): Step 4 - Crunchy Toppings (3 seconds)
    setTimeout(() => {
      if (titleEl) titleEl.textContent = '✨ Step 4/4: Scattering Crunchy Toppings... (3s)';
      if (svgToppings) svgToppings.style.display = '';
      this.animateStep('topping');
    }, 9000);

    // 12s (12000ms): Completion
    setTimeout(() => {
      if (titleEl) titleEl.textContent = `🎉 Freshly Assembled & Ready! (${origTitle})`;
      if (replayBtn) {
        replayBtn.disabled = false;
        replayBtn.style.opacity = '1';
        replayBtn.style.pointerEvents = '';
        replayBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <span>▶ Watch Waffle Being Assembled (Replay)</span>
        `;
      }
    }, 12000);
  },

  updateVisualPreview(initial = false) {
    const svgBase = document.getElementById('studio-waffle-shape');
    const svgDrizzles = document.getElementById('studio-drizzle-layer');
    const svgIceCream = document.getElementById('studio-ice-layer');
    const svgToppings = document.getElementById('studio-topping-layer');
    const titlePreview = document.getElementById('studio-preview-title');

    if (svgBase) {
      svgBase.setAttribute('fill', this.state.base.color);
      svgBase.setAttribute('stroke', this.state.base.border || '#2C1810');
    }

    if (titlePreview) {
      const spreadNames = this.state.spreads.map(s => s.name).join(' & ');
      titlePreview.textContent = `${this.state.base.name} with ${spreadNames}`;
    }

    // Drizzles
    if (svgDrizzles) {
      const primarySpread = this.state.spreads[0] || this.spreadOptions[0];
      const secondSpread = this.state.spreads[1] || primarySpread;
      svgDrizzles.innerHTML = `
        <path class="sauce-stream" d="M70,80 Q120,130 160,100 T240,120 T300,90 T340,130" fill="none" stroke="${primarySpread.color}" stroke-width="8" stroke-linecap="round" />
        <path class="sauce-stream" d="M90,120 Q140,165 190,135 T270,160 T320,185" fill="none" stroke="${secondSpread.color}" stroke-width="6.5" stroke-linecap="round" />
        <path class="sauce-stream" d="M120,160 Q170,205 210,180 T290,210" fill="none" stroke="${primarySpread.color}" stroke-width="5" stroke-linecap="round" />
      `;
    }

    // Ice Cream Scoop
    if (svgIceCream) {
      if (this.state.iceCream.id !== 'none') {
        svgIceCream.style.display = 'block';
        svgIceCream.innerHTML = `
          <g class="scoop-group" transform="translate(200, 140)">
            <ellipse cx="0" cy="22" rx="44" ry="13" fill="rgba(0,0,0,0.22)" />
            <circle cx="0" cy="0" r="38" fill="${this.state.iceCream.color}" stroke="#D1BEA8" stroke-width="1.5" />
            <path d="M-22,-8 Q0,10 22,-8" fill="none" stroke="#A86B30" stroke-width="3" stroke-linecap="round" />
          </g>
        `;
      } else {
        svgIceCream.style.display = 'none';
      }
    }

    // Toppings
    if (svgToppings) {
      let toppingsSvg = '';
      if (this.state.toppings.some(t => t.id === 'gems')) {
        toppingsSvg += `
          <circle cx="140" cy="110" r="6.5" fill="#E82C2C" />
          <circle cx="170" cy="95" r="6.5" fill="#2DA8E8" />
          <circle cx="230" cy="115" r="6.5" fill="#F0B81D" />
          <circle cx="260" cy="100" r="6.5" fill="#36B347" />
          <circle cx="190" cy="190" r="6.5" fill="#C436B3" />
        `;
      }
      if (this.state.toppings.some(t => t.id === 'choco-chips')) {
        toppingsSvg += `
          <circle cx="120" cy="140" r="4.5" fill="#1C0C04" />
          <circle cx="280" cy="150" r="4.5" fill="#1C0C04" />
          <circle cx="210" cy="120" r="4.5" fill="#FFFDF9" />
          <circle cx="160" cy="170" r="4.5" fill="#1C0C04" />
          <circle cx="240" cy="175" r="4.5" fill="#FFFDF9" />
        `;
      }
      if (this.state.toppings.some(t => t.id === 'kitkat')) {
        toppingsSvg += `
          <rect x="110" y="80" width="12" height="42" rx="2" fill="#C42A2A" transform="rotate(25 110 80)" />
          <rect x="250" y="80" width="12" height="42" rx="2" fill="#C42A2A" transform="rotate(-30 250 80)" />
        `;
      }
      if (this.state.toppings.some(t => t.id === 'oreo')) {
        toppingsSvg += `
          <circle cx="150" cy="150" r="13" fill="#1A1513" stroke="#FFF" stroke-width="1.5" />
          <circle cx="250" cy="140" r="11" fill="#1A1513" stroke="#FFF" stroke-width="1.5" />
        `;
      }
      if (this.state.toppings.some(t => t.id === 'ferrero')) {
        toppingsSvg += `
          <g transform="translate(170, 155)">
            <path d="M-9 4 L-6 12 L6 12 L9 4 Z" fill="#E5B942" stroke="#B3861B" stroke-width="1"/>
            <circle cx="0" cy="0" r="10" fill="#442111" stroke="#250F05" stroke-width="1.2"/>
            <circle cx="-3" cy="-3" r="1.6" fill="#C99455"/>
            <circle cx="4" cy="-2" r="1.4" fill="#DEB177"/>
            <circle cx="0" cy="3.5" r="1.5" fill="#C99455"/>
            <polygon points="0,-7 0.8,-5 2.8,-4.5 1.3,-3 1.8,-0.5 0,-1.7 -1.8,-0.5 -1.3,-3 -2.8,-4.5 -0.8,-5" fill="#FFE57F"/>
          </g>
          <g transform="translate(235, 165) scale(0.85)">
            <path d="M-9 4 L-6 12 L6 12 L9 4 Z" fill="#E5B942" stroke="#B3861B" stroke-width="1"/>
            <circle cx="0" cy="0" r="10" fill="#442111" stroke="#250F05" stroke-width="1.2"/>
            <circle cx="-3" cy="-3" r="1.6" fill="#C99455"/>
            <circle cx="4" cy="-2" r="1.4" fill="#DEB177"/>
            <circle cx="0" cy="3.5" r="1.5" fill="#C99455"/>
            <polygon points="0,-7 0.8,-5 2.8,-4.5 1.3,-3 1.8,-0.5 0,-1.7 -1.8,-0.5 -1.3,-3 -2.8,-4.5 -0.8,-5" fill="#FFE57F"/>
          </g>
        `;
      }
      if (this.state.toppings.some(t => t.id === 'biscoff-crunch')) {
        toppingsSvg += `
          <rect x="220" y="160" width="16" height="9" rx="1.5" fill="#C8681E" stroke="#E5944E" stroke-width="1" transform="rotate(-15 220 160)" />
          <circle cx="240" cy="165" r="2.5" fill="#C8681E" />
          <circle cx="215" cy="170" r="2" fill="#C8681E" />
        `;
      }
      svgToppings.innerHTML = toppingsSvg;
    }
  },

  saveToLocalFeed() {
    const order = {
      id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      base: this.state.base.name,
      spreads: this.state.spreads.map(s => s.name),
      iceCream: this.state.iceCream.name,
      toppings: this.state.toppings.map(t => t.name),
      total: this.calculateTotal()
    };

    let existing = [];
    try {
      existing = JSON.parse(localStorage.getItem('broffles_custom_orders') || '[]');
    } catch(e) {}

    existing.unshift(order);
    if (existing.length > 25) existing.pop();
    localStorage.setItem('broffles_custom_orders', JSON.stringify(existing));

    const toast = document.getElementById('customizer-toast');
    if (toast) {
      toast.textContent = `✓ Waffle Created (Order #${order.id})! Saved to Café Queue for ₹${order.total}.`;
      toast.classList.add('is-visible');
      setTimeout(() => toast.classList.remove('is-visible'), 4000);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  WaffleCustomizer.init();
});

window.WaffleCustomizer = WaffleCustomizer;
