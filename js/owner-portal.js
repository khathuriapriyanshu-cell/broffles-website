/**
 * BROFFLES — Owner Operations Portal Controller
 * - Security: Password protection with custom password management
 * - Price Manager: Live editing of item prices reflected across the website
 * - Inventory: Live stock toggling (In Stock / Sold Out)
 * - Diagnostics: Photo folder matching diagnostics
 * - Orders Feed: Live custom orders from Waffle Studio
 */

const DEFAULT_PASSWORD = 'broffles123';

document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  initTabs();
  initContactManager();
  initPasswordManagement();
  renderOrdersFeed();
  renderInventoryTable();
  renderPhotoDiagnostics();
  initAnnouncementSettings();

  // Refresh orders feed periodically
  setInterval(renderOrdersFeed, 8000);
});

/* --------------------------------------------------------------------------
   1. AUTHENTICATION & PASSWORD PROTECTION
   -------------------------------------------------------------------------- */
function getStoredPassword() {
  return localStorage.getItem('broffles_owner_password') || DEFAULT_PASSWORD;
}

function checkAuth() {
  const isAuth = sessionStorage.getItem('broffles_owner_auth') === 'true';
  const loginOverlay = document.getElementById('portal-login-overlay');
  const portalMain = document.getElementById('portal-main-content');

  if (isAuth) {
    if (loginOverlay) loginOverlay.style.display = 'none';
    if (portalMain) portalMain.style.display = 'block';
  } else {
    if (loginOverlay) loginOverlay.style.display = 'flex';
    if (portalMain) portalMain.style.display = 'none';
  }

  // Bind login form
  const loginBtn = document.getElementById('btn-login-submit');
  const passInput = document.getElementById('portal-password-input');
  const errorMsg = document.getElementById('login-error-msg');

  if (loginBtn && passInput) {
    const doLogin = () => {
      const entered = passInput.value;
      if (entered === getStoredPassword()) {
        sessionStorage.setItem('broffles_owner_auth', 'true');
        loginOverlay.style.display = 'none';
        portalMain.style.display = 'block';
        if (errorMsg) errorMsg.style.display = 'none';
        passInput.value = '';
      } else {
        if (errorMsg) {
          errorMsg.textContent = '✕ Incorrect password. Please try again.';
          errorMsg.style.display = 'block';
        }
        passInput.classList.add('shake');
        setTimeout(() => passInput.classList.remove('shake'), 500);
      }
    };

    loginBtn.onclick = doLogin;
    passInput.onkeydown = (e) => {
      if (e.key === 'Enter') doLogin();
    };
  }

  // Logout button
  const logoutBtn = document.getElementById('btn-portal-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('broffles_owner_auth');
      window.location.reload();
    });
  }
}

/* --------------------------------------------------------------------------
   2. TAB SWITCHING (Operations vs Security vs Photos)
   -------------------------------------------------------------------------- */
function initTabs() {
  const tabs = document.querySelectorAll('.portal-tab-btn');
  const panels = document.querySelectorAll('.portal-tab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });
}

/* --------------------------------------------------------------------------
   3. PASSWORD MANAGEMENT TAB
   -------------------------------------------------------------------------- */
function initPasswordManagement() {
  const currentInput = document.getElementById('pwd-current');
  const newInput = document.getElementById('pwd-new');
  const confirmInput = document.getElementById('pwd-confirm');
  const saveBtn = document.getElementById('btn-save-password');
  const toast = document.getElementById('pwd-toast');

  if (!saveBtn) return;

  saveBtn.addEventListener('click', () => {
    const currentStored = getStoredPassword();
    const currentVal = currentInput.value;
    const newVal = newInput.value;
    const confirmVal = confirmInput.value;

    if (currentVal !== currentStored) {
      showToast(toast, '✕ Current password is incorrect.', 'error');
      return;
    }
    if (!newVal || newVal.length < 4) {
      showToast(toast, '✕ New password must be at least 4 characters.', 'error');
      return;
    }
    if (newVal !== confirmVal) {
      showToast(toast, '✕ New passwords do not match.', 'error');
      return;
    }

    localStorage.setItem('broffles_owner_password', newVal);
    showToast(toast, '✓ Password successfully updated! Keep it safe.', 'success');
    currentInput.value = '';
    newInput.value = '';
    confirmInput.value = '';
  });
}

function showToast(el, text, type) {
  if (!el) return;
  el.textContent = text;
  el.className = `alert-box ${type}`;
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 4000);
}

/* --------------------------------------------------------------------------
   4. INVENTORY & PRICE MANAGER (Real-Time Price Updates)
   -------------------------------------------------------------------------- */
function getCustomPrices() {
  try {
    return JSON.parse(localStorage.getItem('broffles_custom_prices') || '{}');
  } catch(e) {
    return {};
  }
}

function renderInventoryTable() {
  const tbody = document.getElementById('inventory-table-body');
  if (!tbody || !window.BrofflesMenuData) return;

  const stockMap = JSON.parse(localStorage.getItem('broffles_stock_status') || '{}');
  const customPrices = getCustomPrices();

  tbody.innerHTML = window.BrofflesMenuData.map(item => {
    const isSoldOut = stockMap[item.id] === 'soldout';
    const effectivePrice = customPrices[item.id]?.price ?? item.price;
    const effectiveSecondPrice = customPrices[item.id]?.secondPrice ?? item.secondPrice;

    let priceControlsHtml = '';
    if (item.secondPrice) {
      priceControlsHtml = `
        <div class="price-input-group dual">
          <label>Reg: ₹<input type="number" min="0" value="${effectivePrice}" onchange="savePrice('${item.id}', this.value, null)" /></label>
          <label>Brownie: ₹<input type="number" min="0" value="${effectiveSecondPrice}" onchange="savePrice('${item.id}', null, this.value)" /></label>
        </div>
      `;
    } else {
      priceControlsHtml = `
        <div class="price-input-group single">
          <span>₹</span>
          <input type="number" min="0" value="${effectivePrice}" onchange="savePrice('${item.id}', this.value, null)" />
        </div>
      `;
    }

    return `
      <tr>
        <td><strong>${item.name}</strong></td>
        <td><span class="table-cat-tag">${item.categoryName}</span></td>
        <td>${priceControlsHtml}</td>
        <td>
          <button 
            class="stock-toggle-btn ${isSoldOut ? 'is-soldout' : 'is-instock'}"
            onclick="toggleStock('${item.id}')"
          >
            ${isSoldOut ? '✕ Sold Out' : '✓ In Stock'}
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

window.savePrice = function(itemId, newPrice, newSecondPrice) {
  const customPrices = getCustomPrices();
  if (!customPrices[itemId]) {
    const orig = window.BrofflesMenuData.find(i => i.id === itemId);
    customPrices[itemId] = { price: orig.price, secondPrice: orig.secondPrice };
  }

  if (newPrice !== null && newPrice !== undefined) {
    customPrices[itemId].price = parseInt(newPrice, 10) || 0;
  }
  if (newSecondPrice !== null && newSecondPrice !== undefined) {
    customPrices[itemId].secondPrice = parseInt(newSecondPrice, 10) || 0;
  }

  localStorage.setItem('broffles_custom_prices', JSON.stringify(customPrices));

  const notify = document.getElementById('price-change-toast');
  if (notify) {
    notify.textContent = `✓ Price updated for ${itemId}! Customer website reflects this immediately.`;
    notify.classList.add('is-visible');
    setTimeout(() => notify.classList.remove('is-visible'), 3000);
  }
};

window.resetAllPrices = function() {
  if (confirm('Are you sure you want to reset all prices to original menu defaults?')) {
    localStorage.removeItem('broffles_custom_prices');
    renderInventoryTable();
    alert('All prices have been reset to original defaults.');
  }
};

window.toggleStock = function(itemId) {
  const stockMap = JSON.parse(localStorage.getItem('broffles_stock_status') || '{}');
  if (stockMap[itemId] === 'soldout') {
    delete stockMap[itemId];
  } else {
    stockMap[itemId] = 'soldout';
  }
  localStorage.setItem('broffles_stock_status', JSON.stringify(stockMap));
  renderInventoryTable();
};

/* --------------------------------------------------------------------------
   5. REAL-TIME CUSTOM ORDERS FEED
   -------------------------------------------------------------------------- */
function renderOrdersFeed() {
  const container = document.getElementById('owner-orders-list');
  const countBadge = document.getElementById('owner-order-count');
  if (!container) return;

  let orders = [];
  try {
    orders = JSON.parse(localStorage.getItem('broffles_custom_orders') || '[]');
  } catch(e) {}

  if (countBadge) countBadge.textContent = orders.length;

  if (orders.length === 0) {
    container.innerHTML = `
      <div class="empty-feed-card">
        <p>No recent custom waffle submissions yet.</p>
        <small>When customers build custom waffles in the Waffle Studio, they appear here automatically in real time!</small>
      </div>
    `;
    return;
  }

  container.innerHTML = orders.map((ord, idx) => `
    <div class="order-ticket-card">
      <div class="ticket-header">
        <span class="ticket-id">${ord.id}</span>
        <span class="ticket-time">${ord.timestamp}</span>
        <span class="ticket-amount">₹${ord.total}</span>
      </div>
      <div class="ticket-body">
        <strong>${ord.base}</strong>
        <p>Spreads: ${ord.spreads.join(', ')}</p>
        <p>Ice Cream: ${ord.iceCream}</p>
        <p>Toppings: ${ord.toppings.length > 0 ? ord.toppings.join(', ') : 'None'}</p>
      </div>
      <div class="ticket-actions">
        <button class="btn-ticket-done" onclick="completeOrder(${idx})">✓ Mark Prepared</button>
      </div>
    </div>
  `).join('');
}

window.completeOrder = function(index) {
  try {
    const orders = JSON.parse(localStorage.getItem('broffles_custom_orders') || '[]');
    orders.splice(index, 1);
    localStorage.setItem('broffles_custom_orders', JSON.stringify(orders));
    renderOrdersFeed();
  } catch(e) {}
};

/* --------------------------------------------------------------------------
   6. PHOTO DIAGNOSTICS & DROPZONE
   -------------------------------------------------------------------------- */
function renderPhotoDiagnostics() {
  const grid = document.getElementById('photo-diag-grid');
  if (!grid || !window.BrofflesMenuData) return;

  grid.innerHTML = window.BrofflesMenuData.map(item => {
    const candidates = ImageResolver.getCandidateFilenames(item);
    const primarySlug = candidates[0];

    return `
      <div class="photo-diag-card" id="diag-${item.id}">
        <div class="diag-thumb">
          <img 
            src="photos/${primarySlug}" 
            alt="${item.name}"
            onerror="this.onerror=null; this.src='${ImageResolver.getPlaceholder(item)}'; this.classList.add('diag-placeholder');"
          />
        </div>
        <div class="diag-info">
          <strong>${item.name}</strong>
          <code>photos/${primarySlug}</code>
        </div>
      </div>
    `;
  }).join('');
}

/* --------------------------------------------------------------------------
   7. ANNOUNCEMENT SETTINGS
   -------------------------------------------------------------------------- */
function initAnnouncementSettings() {
  const input = document.getElementById('announcement-input');
  const saveBtn = document.getElementById('save-announcement-btn');
  const preview = document.getElementById('announcement-preview');

  if (!input || !saveBtn) return;

  const current = localStorage.getItem('broffles_announcement') || '🧇 Freshly baked Belgian waffles & chocolate desserts! Dine-in, Takeaway & Zomato delivery in Kumaraswamy Layout.';
  input.value = current;
  if (preview) preview.textContent = current;

  saveBtn.addEventListener('click', () => {
    localStorage.setItem('broffles_announcement', input.value.trim());
    if (preview) preview.textContent = input.value.trim();
    alert('✓ Announcement saved! It is now live on the customer website.');
  });
}

/* --------------------------------------------------------------------------
   8. BUSINESS CONTACT & SOCIAL LINKS MANAGER
   -------------------------------------------------------------------------- */
const DEFAULT_BUSINESS_LINKS = {
  phone: '+91 9739956756',
  address: '1614, 7th Cross Rd, 1st Stage,\nKumaraswamy Layout, Bengaluru,\nKarnataka 560111',
  zomato: 'https://www.zomato.com/bangalore/broffles-kumaraswamy-layout-bangalore',
  instagram: 'https://www.instagram.com/broffles_co/',
  instagramHandle: '@broffles_co',
  mapsLink: 'https://maps.app.goo.gl/tg2BVNZfFQM8AU9P7',
  mapsEmbed: 'https://maps.google.com/maps?q=Broffles,+1614,+7th+Cross+Rd,+1st+Stage,+Kumaraswamy+Layout,+Bengaluru,+Karnataka+560111&t=&z=16&ie=UTF8&iwloc=B&output=embed'
};

function initContactManager() {
  const phoneInput = document.getElementById('contact-phone');
  const addressInput = document.getElementById('contact-address');
  const zomatoInput = document.getElementById('contact-zomato');
  const igInput = document.getElementById('contact-instagram');
  const igHandleInput = document.getElementById('contact-ig-handle');
  const mapsLinkInput = document.getElementById('contact-maps-link');
  const mapsEmbedInput = document.getElementById('contact-maps-embed');
  const saveBtn = document.getElementById('btn-save-contact');
  const resetBtn = document.getElementById('btn-reset-contact');
  const toast = document.getElementById('contact-toast');

  if (!saveBtn) return;

  // Load existing or default values
  let currentData = DEFAULT_BUSINESS_LINKS;
  try {
    const saved = localStorage.getItem('broffles_business_links');
    if (saved) {
      currentData = { ...DEFAULT_BUSINESS_LINKS, ...JSON.parse(saved) };
    }
  } catch(e) {}

  const populateFields = (data) => {
    if (phoneInput) phoneInput.value = data.phone || '';
    if (addressInput) addressInput.value = data.address || '';
    if (zomatoInput) zomatoInput.value = data.zomato || '';
    if (igInput) igInput.value = data.instagram || '';
    if (igHandleInput) igHandleInput.value = data.instagramHandle || '';
    if (mapsLinkInput) mapsLinkInput.value = data.mapsLink || '';
    if (mapsEmbedInput) mapsEmbedInput.value = data.mapsEmbed || '';
  };

  populateFields(currentData);

  const showToast = (msg, isSuccess = true) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.className = `alert-box ${isSuccess ? 'success' : 'error'}`;
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 4000);
  };

  // Save changes
  saveBtn.addEventListener('click', () => {
    const updated = {
      phone: (phoneInput?.value || '').trim(),
      address: (addressInput?.value || '').trim(),
      zomato: (zomatoInput?.value || '').trim(),
      instagram: (igInput?.value || '').trim(),
      instagramHandle: (igHandleInput?.value || '').trim(),
      mapsLink: (mapsLinkInput?.value || '').trim(),
      mapsEmbed: (mapsEmbedInput?.value || '').trim()
    };

    localStorage.setItem('broffles_business_links', JSON.stringify(updated));
    showToast('✓ Contact details, Zomato link & Instagram link updated successfully! Live on website now.', true);
  });

  // Reset to default café links
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Reset all contact and social media links back to original Broffles defaults?')) {
        localStorage.removeItem('broffles_business_links');
        populateFields(DEFAULT_BUSINESS_LINKS);
        showToast('✓ Reset to original Broffles contacts and links.', true);
      }
    });
  }
}

