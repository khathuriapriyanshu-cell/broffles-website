/**
 * BROFFLES — Interactive Web Application
 * Handles Menu Rendering, Real-time Filter & Search, Lightbox,
 * Navigation micro-interactions, Image Fallbacks, Stock status, and Owner Custom Prices.
 */

document.addEventListener('DOMContentLoaded', () => {
  initAnnouncementBar();
  initNavbar();
  initBusinessLinks();
  renderSignatureWaffles();
  initMenuSystem();
  initSpecialtySwappers();
  renderGallery();
  initLightbox();
  initScrollEffects();
});

/* --------------------------------------------------------------------------
   0. ANNOUNCEMENT TICKER
   -------------------------------------------------------------------------- */
function initAnnouncementBar() {
  const tickerEl = document.getElementById('announcement-ticker-text');
  if (tickerEl) {
    const text = localStorage.getItem('broffles_announcement') || '🧇 Freshly baked Belgian waffles & chocolate desserts! Dine-in, Takeaway & Zomato delivery in Kumaraswamy Layout.';
    tickerEl.textContent = text;
  }
}

function getOwnerCustomPrices() {
  try {
    return JSON.parse(localStorage.getItem('broffles_custom_prices') || '{}');
  } catch(e) {
    return {};
  }
}

/* --------------------------------------------------------------------------
   1. NAVBAR & MOBILE DRAWER
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-link');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile drawer toggle
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      toggleBtn.classList.toggle('is-open', isOpen);
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when clicking link
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        toggleBtn.classList.remove('is-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   2. SIGNATURE WAFFLES SECTION (Reads Owner Custom Prices)
   -------------------------------------------------------------------------- */
function renderSignatureWaffles() {
  const container = document.getElementById('signature-grid');
  if (!container || !window.BrofflesSignatures) return;

  const customPrices = getOwnerCustomPrices();

  const html = window.BrofflesSignatures.map(item => {
    const primaryImg = ImageResolver.getPrimaryPath(item);
    const tagClass = getBadgeClass(item.tags[0] || 'Classic');
    const effectivePrice = customPrices[item.id]?.price ?? item.price;

    return `
      <article class="signature-card" data-id="${item.id}">
        <div class="sig-image-holder">
          <img 
            class="sig-image" 
            src="${primaryImg}" 
            alt="${escapeHtml(item.name)}" 
            loading="lazy"
            onerror="ImageResolver.handleImageError(this, '${item.id}')"
          />
          <span class="sig-badge-pill">${escapeHtml(item.badgeText || 'Signature')}</span>
        </div>
        <div class="sig-body">
          <h3 class="sig-title">${escapeHtml(item.name)}</h3>
          <p class="sig-desc">${escapeHtml(item.description)}</p>
          <div class="sig-footer">
            <span class="sig-price">₹${effectivePrice}</span>
            <span class="badge-pill ${tagClass}">${escapeHtml(item.tags[0] || 'Signature')}</span>
          </div>
        </div>
      </article>
    `;
  }).join('');

  container.innerHTML = html;
}

/* --------------------------------------------------------------------------
   3. MENU SYSTEM (CATEGORIES, SEARCH & RENDER WITH OWNER PRICES & STOCK)
   -------------------------------------------------------------------------- */
let activeCategory = 'all';
let searchQuery = '';

function initMenuSystem() {
  renderCategoryButtons();
  renderMenuItems();

  const searchInput = document.getElementById('menu-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderMenuItems();
    });
  }
}

function renderCategoryButtons() {
  const nav = document.getElementById('menu-categories-nav');
  if (!nav || !window.BrofflesCategories) return;

  const html = window.BrofflesCategories.map(cat => {
    const isActive = cat.id === activeCategory ? 'active' : '';
    return `
      <button 
        type="button" 
        class="category-tab-btn ${isActive}" 
        data-category="${cat.id}"
      >
        ${escapeHtml(cat.name)} (${cat.count})
      </button>
    `;
  }).join('');

  nav.innerHTML = html;

  nav.querySelectorAll('.category-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      nav.querySelectorAll('.category-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category');
      renderMenuItems();
    });
  });
}

function renderMenuItems() {
  const container = document.getElementById('menu-grid');
  if (!container || !window.BrofflesMenuData) return;

  let stockMap = {};
  try {
    stockMap = JSON.parse(localStorage.getItem('broffles_stock_status') || '{}');
  } catch(e) {}

  const customPrices = getOwnerCustomPrices();

  // Filter items (Add-ons are strictly kept in the dedicated Add-ons Showcase section)
  const filtered = window.BrofflesMenuData.filter(item => {
    if (item.category === 'add-ons') return false;
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery) ||
      (item.description && item.description.toLowerCase().includes(searchQuery)) ||
      (item.tags && item.tags.some(t => t.toLowerCase().includes(searchQuery)));
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <p style="font-size: 1.2rem; font-weight: 700; color: var(--cocoa-800); margin-bottom: 8px;">No delicious waffles found</p>
        <p style="color: var(--cocoa-500);">Try searching for "Chocolate", "Biscoff", "Oreo", or select another category above.</p>
      </div>
    `;
    return;
  }

  const html = filtered.map(item => {
    const isSoldOut = stockMap[item.id] === 'soldout';
    const primaryImg = ImageResolver.getPrimaryPath(item);
    const primaryTag = item.tags && item.tags.length > 0 ? item.tags[0] : 'Special';
    const badgeClass = getBadgeClass(primaryTag);

    const effectivePrice = customPrices[item.id]?.price ?? item.price;
    const effectiveSecondPrice = customPrices[item.id]?.secondPrice ?? item.secondPrice;

    // Dual price format for Mini Pancakes or single price
    let priceHtml = '';
    if (item.secondPrice) {
      priceHtml = `
        <div class="dual-price-box">
          <span class="dual-price-item">Regular: <strong>₹${effectivePrice}</strong></span>
          <span class="dual-price-item">${item.secondPriceLabel || 'Brownie'}: <strong>₹${effectiveSecondPrice}</strong></span>
        </div>
      `;
    } else {
      priceHtml = `<span class="card-price">₹${effectivePrice}</span>`;
    }

    // Customization notes if any
    let customHtml = '';
    if (item.customizations && item.customizations.length > 0) {
      customHtml = `
        <div class="card-customizations">
          ${item.customizations.map(c => `<span class="card-cust-tag">${escapeHtml(c)}</span>`).join('')}
        </div>
      `;
    }

    return `
      <article class="menu-card ${isSoldOut ? 'is-soldout-card' : ''}" data-id="${item.id}" data-category="${item.category}">
        <div class="card-thumb-wrap">
          <img 
            class="card-img" 
            src="${primaryImg}" 
            alt="${escapeHtml(item.name)}" 
            loading="lazy"
            onerror="ImageResolver.handleImageError(this, '${item.id}')"
          />
          <span class="card-tag-badge badge-pill ${badgeClass}">${escapeHtml(primaryTag)}</span>
          ${isSoldOut ? '<span style="position: absolute; bottom: 10px; left: 10px; background: rgba(211, 47, 47, 0.9); color: #fff; font-size: 0.75rem; font-weight: 800; padding: 4px 10px; border-radius: 9999px;">Baking Tomorrow</span>' : ''}
        </div>
        <div class="card-body">
          <div class="card-header-row">
            <h3 class="card-title">${escapeHtml(item.name)}</h3>
            <div class="card-price-block">${priceHtml}</div>
          </div>
          ${item.description ? `<p class="card-desc">${escapeHtml(item.description)}</p>` : ''}
          ${customHtml}
        </div>
      </article>
    `;
  }).join('');

  container.innerHTML = html;
}

/* --------------------------------------------------------------------------
   4. GALLERY & LIGHTBOX
   -------------------------------------------------------------------------- */
function renderGallery() {
  const container = document.getElementById('gallery-grid');
  if (!container || !window.BrofflesGalleryData) return;

  const html = window.BrofflesGalleryData.map((item, index) => {
    const src = ImageResolver.photosDir + encodeURI(item.filename);
    return `
      <div class="gallery-item" data-index="${index}">
        <img 
          class="gallery-img" 
          src="${src}" 
          alt="${escapeHtml(item.title)}" 
          loading="lazy"
          onerror="this.onerror=null; this.src='${item.placeholder}'; this.classList.add('is-placeholder');"
        />
        <div class="gallery-overlay">
          <span class="gallery-caption-cat">${escapeHtml(item.category)}</span>
          <h4 class="gallery-caption-title">${escapeHtml(item.title)}</h4>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = html;
}

function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalTitle = document.getElementById('lightbox-title');
  const modalDesc = document.getElementById('lightbox-desc');
  const closeBtn = document.getElementById('lightbox-close');

  if (!modal) return;

  document.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;

    const index = parseInt(item.getAttribute('data-index'), 10);
    const data = window.BrofflesGalleryData[index];
    if (!data) return;

    const clickedImg = item.querySelector('img');
    modalImg.src = clickedImg ? clickedImg.src : (ImageResolver.photosDir + data.filename);
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.caption;
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  });

  const closeModal = () => {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   5. UTILITIES
   -------------------------------------------------------------------------- */
function getBadgeClass(tag) {
  const t = (tag || '').toLowerCase();
  if (t.includes('chocolate')) return 'badge-chocolate';
  if (t.includes('nutella')) return 'badge-nutella';
  if (t.includes('biscoff')) return 'badge-biscoff';
  if (t.includes('red velvet')) return 'badge-red-velvet';
  if (t.includes('bubble')) return 'badge-bubble';
  return 'badge-classic';
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function initScrollEffects() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   6. INTERACTIVE SPECIALTIES PHOTO SWAPPER
   -------------------------------------------------------------------------- */
function initSpecialtySwappers() {
  const itemRows = document.querySelectorAll('.feature-item-row[data-photo]');
  
  itemRows.forEach(row => {
    const swapPhoto = () => {
      const photoSrc = row.getAttribute('data-photo');
      if (!photoSrc) return;

      // Find the visual frame within this feature showcase
      const section = row.closest('.feature-showcase');
      if (!section) return;

      const img = section.querySelector('.feature-visual-img');
      if (!img) return;

      // Update active row visual indicator
      section.querySelectorAll('.feature-item-row').forEach(r => r.classList.remove('is-active'));
      row.classList.add('is-active');

      // Smooth swap
      if (img.src.indexOf(encodeURI(photoSrc)) === -1 && !img.src.endsWith(photoSrc)) {
        img.style.opacity = '0.3';
        img.style.transform = 'scale(0.97)';
        
        setTimeout(() => {
          img.src = encodeURI(photoSrc);
          const itemName = row.querySelector('.feature-item-name')?.textContent || 'Broffles Specialty';
          img.alt = itemName;
          img.style.opacity = '1';
          img.style.transform = 'scale(1)';
        }, 150);
      }
    };

    row.addEventListener('click', swapPhoto);
    row.addEventListener('mouseenter', swapPhoto);
  });
}

/* --------------------------------------------------------------------------
   7. DYNAMIC BUSINESS CONTACT & SOCIAL LINKS (Controlled by Owner Portal)
   -------------------------------------------------------------------------- */
function initBusinessLinks() {
  try {
    const saved = localStorage.getItem('broffles_business_links');
    if (!saved) return;

    const data = JSON.parse(saved);

    // 1. Phone number
    if (data.phone) {
      document.querySelectorAll('[data-contact="phone-link"]').forEach(el => {
        el.setAttribute('href', `tel:${data.phone.replace(/[^0-9+]/g, '')}`);
      });
      document.querySelectorAll('[data-contact="phone-text"]').forEach(el => {
        el.textContent = data.phone;
      });
    }

    // 2. Address
    if (data.address) {
      document.querySelectorAll('[data-contact="address-text"]').forEach(el => {
        el.innerHTML = data.address.replace(/\n/g, '<br>');
      });
    }

    // 3. Zomato Link
    if (data.zomato) {
      document.querySelectorAll('[data-contact="zomato-link"]').forEach(el => {
        el.setAttribute('href', data.zomato);
      });
    }

    // 4. Instagram Link & Handle
    if (data.instagram) {
      document.querySelectorAll('[data-contact="instagram-link"]').forEach(el => {
        el.setAttribute('href', data.instagram);
      });
    }
    if (data.instagramHandle) {
      document.querySelectorAll('[data-contact="instagram-handle"]').forEach(el => {
        el.textContent = data.instagramHandle;
      });
    }

    // 5. Maps Link & Iframe
    if (data.mapsLink) {
      document.querySelectorAll('[data-contact="maps-link"]').forEach(el => {
        el.setAttribute('href', data.mapsLink);
      });
    }
    if (data.mapsEmbed) {
      const iframe = document.getElementById('google-maps-iframe');
      if (iframe) {
        iframe.src = data.mapsEmbed;
      }
    }
  } catch(e) {
    console.warn('Could not load custom business links:', e);
  }
}

