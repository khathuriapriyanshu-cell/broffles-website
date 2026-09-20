/**
 * BROFFLES — Floating & Falling Waffles & Chocolate Particles
 * High-performance, lightweight canvas animation with gentle scroll physics.
 * Creates an irresistible, playful dessert atmosphere as visitors explore the site.
 */

class FallingWafflesSystem {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.items = [];
    this.maxItems = 18;
    this.scrollSpeedBonus = 0;
    this.lastScrollY = window.scrollY;
    this.isActive = true;

    // Dessert icons & symbols to float/fall
    this.dessertTypes = [
      { type: 'waffle', char: '🧇', size: 28, weight: 1.2 },
      { type: 'chocolate', char: '🍫', size: 22, weight: 1.4 },
      { type: 'berry', char: '🍓', size: 20, weight: 1.0 },
      { type: 'sparkle', char: '✨', size: 18, weight: 0.8 },
      { type: 'nut', char: '🌰', size: 16, weight: 1.5 },
      { type: 'cookie', char: '🍪', size: 22, weight: 1.3 }
    ];

    this.init();
  }

  init() {
    // Create floating canvas
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'floating-dessert-canvas';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100vw';
    this.canvas.style.height = '100vh';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '90';
    this.canvas.style.opacity = '0.75';
    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d');
    this.resize();

    window.addEventListener('resize', () => this.resize(), { passive: true });
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });

    // Seed initial falling items
    for (let i = 0; i < this.maxItems; i++) {
      this.items.push(this.createItem(true));
    }

    this.animate();
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createItem(randomY = false) {
    const preset = this.dessertTypes[Math.floor(Math.random() * this.dessertTypes.length)];
    return {
      char: preset.char,
      type: preset.type,
      x: Math.random() * this.canvas.width,
      y: randomY ? Math.random() * this.canvas.height : -50,
      size: preset.size * (0.8 + Math.random() * 0.5),
      speedY: (0.6 + Math.random() * 0.9) * preset.weight,
      speedX: (Math.random() - 0.5) * 0.8,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      opacity: 0.4 + Math.random() * 0.45,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.02 + Math.random() * 0.03
    };
  }

  onScroll() {
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - this.lastScrollY;
    this.lastScrollY = currentScrollY;

    // Adds a temporary burst when scrolling
    if (Math.abs(delta) > 2) {
      this.scrollSpeedBonus = Math.min(Math.abs(delta) * 0.1, 4);
    }
  }

  animate() {
    if (!this.ctx || !this.isActive) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Decay scroll speed bonus
    this.scrollSpeedBonus *= 0.92;

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      // Update positions
      item.wobble += item.wobbleSpeed;
      item.x += item.speedX + Math.sin(item.wobble) * 0.6;
      item.y += item.speedY + this.scrollSpeedBonus;
      item.rotation += item.rotationSpeed;

      // Draw item
      this.ctx.save();
      this.ctx.translate(item.x, item.y);
      this.ctx.rotate(item.rotation);
      this.ctx.globalAlpha = item.opacity;
      this.ctx.font = `${item.size}px "Apple Color Emoji", "Segoe UI Emoji", sans-serif`;
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(item.char, 0, 0);
      this.ctx.restore();

      // Recycle if fallen below screen
      if (item.y > this.canvas.height + 60 || item.x < -60 || item.x > this.canvas.width + 60) {
        this.items[i] = this.createItem(false);
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.fallingWaffles = new FallingWafflesSystem();
});
