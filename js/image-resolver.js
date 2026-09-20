/**
 * BROFFLES Image Resolver
 * 
 * Automatically maps menu items and gallery items to expected image filenames
 * in the /photos folder. Handles:
 * - Exact casing from the photos folder
 * - Spaces / Gaps: "Death By Chocolate.jpeg", "Honey&Butter Maplesyrup.jpeg"
 * - Hyphens: death-by-chocolate.jpeg
 * - Bubble waffle prefixes: "bubble Death By Chocolate.jpeg", "bubble Biscoff Special.jpeg"
 * - Alternate extensions: .jpeg, .jpg, .png, .webp
 * Seamlessly falls back to bespoke SVG placeholders if an image is not yet provided.
 */

const ImageResolver = {
  photosDir: 'photos/',
  placeholdersDir: 'assets/placeholders/',

  // Category to default placeholder map
  categoryPlaceholders: {
    'classic': 'assets/placeholders/default-waffle.svg',
    'chocolate': 'assets/placeholders/chocolate-waffle.svg',
    'cheese-cream': 'assets/placeholders/cheese-cream.svg',
    'red-velvet': 'assets/placeholders/red-velvet.svg',
    'bubble-waffle': 'assets/placeholders/bubble-waffle.svg',
    'mini-pancakes': 'assets/placeholders/mini-pancakes.svg',
    'add-ons': 'assets/placeholders/addons.svg'
  },

  /**
   * Normalizes a string to a clean slug:
   * e.g., "Death By Chocolate" -> "death-by-chocolate"
   * e.g., "Honey & Butter / Maple Syrup" -> "honey-butter-maple-syrup"
   */
  slugify(text, replaceAmpWith = 'and') {
    if (!text) return '';
    let s = text.toLowerCase().trim();
    if (replaceAmpWith) {
      s = s.replace(/&/g, ` ${replaceAmpWith} `);
    } else {
      s = s.replace(/&/g, ' ');
    }
    s = s.replace(/[\/\\*'"()]/g, ' ');
    s = s.replace(/[^a-z0-9]+/g, '-');
    s = s.replace(/^-+|-+$/g, '');
    return s;
  },

  /**
   * Generates candidate filenames in order of preference.
   * Matches the real user photo files directly!
   */
  getCandidateFilenames(item) {
    const rawName = item.name.trim();
    const cleanNoSpecial = rawName.replace(/[\/\\*'"()]/g, ' ').replace(/\s+/g, ' ').trim();
    const candidates = new Set();
    const extensions = ['jpeg', 'jpg', 'png', 'webp'];

    // 1. Specific known file overrides for items with unique upload formatting
    if (rawName.includes('Honey & Butter')) {
      candidates.add('Honey&Butter Maplesyrup.jpeg');
      candidates.add('Honey&Butter Maplesyrup.jpg');
      candidates.add('honey-butter-maple-syrup.jpeg');
    }

    if (item.category === 'bubble-waffle') {
      if (rawName === 'Death By Chocolate') {
        candidates.add('bubble Death By Chocolate.jpeg');
        candidates.add('bubble-death-by-chocolate.jpeg');
      }
      if (rawName === 'Biscoff Special') {
        candidates.add('bubble Biscoff Special.jpeg');
        candidates.add('bubble-biscoff-special.jpeg');
      }
    }

    if (rawName.includes('Choco Special - Milk')) {
      candidates.add('Choco Special - Milk White Dark.jpeg');
      candidates.add('Choco Special - Milk White Dark.jpg');
    }

    if (rawName === 'Cookies & Cream Special') {
      candidates.add('Cookies & Cream Special.jpeg');
      candidates.add('Cookies & Cream Specia.jpeg');
    }

    // 2. Exact raw name variations
    for (const ext of extensions) {
      candidates.add(`${cleanNoSpecial}.${ext}`);
      candidates.add(`${rawName}.${ext}`);
    }

    // 3. Hyphenated variations
    const slugAnd = this.slugify(rawName, 'and');
    const slugNoAnd = this.slugify(rawName, '');
    const spacesAnd = slugAnd.replace(/-/g, ' ');
    const spacesNoAnd = slugNoAnd.replace(/-/g, ' ');
    const underAnd = slugAnd.replace(/-/g, '_');

    const patterns = [
      cleanNoSpecial,
      slugAnd,
      spacesAnd,
      slugNoAnd,
      spacesNoAnd,
      underAnd
    ];

    if (item.category === 'bubble-waffle') {
      patterns.unshift(`bubble ${cleanNoSpecial}`);
      patterns.unshift(`bubble-${slugAnd}`);
    }

    for (const p of patterns) {
      for (const ext of extensions) {
        candidates.add(`${p}.${ext}`);
        candidates.add(`${encodeURIComponent(p)}.${ext}`);
      }
    }

    return Array.from(candidates);
  },

  /**
   * Primary path to attempt loading first
   */
  getPrimaryPath(item) {
    if (item.image) return encodeURI(item.image);
    const candidates = this.getCandidateFilenames(item);
    return `${this.photosDir}${encodeURI(candidates[0])}`;
  },

  /**
   * Returns the best SVG vector placeholder based on item category and tags
   */
  getPlaceholder(item) {
    if (item.placeholder) return item.placeholder;

    if (item.category === 'bubble-waffle') {
      return this.categoryPlaceholders['bubble-waffle'];
    }
    if (item.category === 'cheese-cream') {
      return this.categoryPlaceholders['cheese-cream'];
    }
    if (item.category === 'red-velvet' || (item.tags && item.tags.includes('Red Velvet'))) {
      return this.categoryPlaceholders['red-velvet'];
    }
    if (item.category === 'mini-pancakes') {
      return this.categoryPlaceholders['mini-pancakes'];
    }
    if (item.category === 'add-ons') {
      return this.categoryPlaceholders['add-ons'];
    }
    if (item.tags && item.tags.includes('Chocolate')) {
      return this.categoryPlaceholders['chocolate'];
    }

    return this.categoryPlaceholders['classic'];
  },

  /**
   * Robust error handler on <img> tags
   * Recursively tries alternative candidate filenames before falling back to SVG placeholder.
   */
  handleImageError(imgEl, itemId) {
    const item = window.BrofflesMenuData ? window.BrofflesMenuData.find(i => i.id === itemId) : null;
    if (!item) {
      this.applyFallback(imgEl);
      return;
    }

    const currentAttempt = parseInt(imgEl.getAttribute('data-attempt') || '0', 10);
    const candidates = this.getCandidateFilenames(item);

    if (currentAttempt < candidates.length) {
      imgEl.setAttribute('data-attempt', (currentAttempt + 1).toString());
      imgEl.src = `${this.photosDir}${encodeURI(candidates[currentAttempt])}`;
    } else {
      this.applyFallback(imgEl, item);
    }
  },

  applyFallback(imgEl, item) {
    imgEl.onerror = null; // Prevent infinite loop
    const fallbackSrc = item ? this.getPlaceholder(item) : 'assets/placeholders/default-waffle.svg';
    imgEl.src = fallbackSrc;
    imgEl.classList.add('is-placeholder');
    const card = imgEl.closest('.menu-card, .signature-card, .gallery-item');
    if (card) {
      card.classList.add('has-placeholder-image');
    }
  }
};

window.ImageResolver = ImageResolver;
