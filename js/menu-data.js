/**
 * BROFFLES Complete Menu Data
 * 
 * 100% faithful to the official Broffles menu.
 * Contains exact prices, dual pricing, bubble waffle descriptions,
 * categorization, custom tags, and signature flags.
 */

const BrofflesMenuData = [
  // ==========================================
  // 1. BROFFLES CLASSIC
  // ==========================================
  {
    id: 'classic-honey-butter-maple',
    category: 'classic',
    categoryName: 'Broffles Classic',
    name: 'Honey & Butter / Maple Syrup',
    price: 99,
    description: 'Freshly griddled golden crisp waffle served with melted golden butter and rich honey or authentic maple syrup.',
    tags: ['Classic'],
    isSignature: false,
    customizations: ['Brownie Base +₹30', 'Ice Cream Special +₹30']
  },
  {
    id: 'classic-coffee-mocha',
    category: 'classic',
    categoryName: 'Broffles Classic',
    name: 'Coffee Mocha',
    price: 119,
    description: 'A rich fusion of aromatic roasted coffee notes and silky smooth chocolate cream over a crisp waffle.',
    tags: ['Chocolate'],
    isSignature: false,
    customizations: ['Brownie Base +₹30', 'Ice Cream Special +₹30']
  },
  {
    id: 'classic-kulfi-malai-special',
    category: 'classic',
    categoryName: 'Broffles Classic',
    name: 'Kulfi Malai Special',
    price: 119,
    description: 'Traditional desi indulgence meets European waffle crunch: creamy, fragrant kulfi malai drizzle with cardamom hints.',
    tags: ['Classic'],
    isSignature: false,
    customizations: ['Brownie Base +₹30', 'Ice Cream Special +₹30']
  },
  {
    id: 'classic-strawberry-special',
    category: 'classic',
    categoryName: 'Broffles Classic',
    name: 'Strawberry Special',
    price: 129,
    description: 'Sweet berry coulis and velvety cream layered over warm, golden-baked waffle grids.',
    tags: ['Classic'],
    isSignature: false,
    customizations: ['Brownie Base +₹30', 'Ice Cream Special +₹30']
  },
  {
    id: 'classic-blueberry-special',
    category: 'classic',
    categoryName: 'Broffles Classic',
    name: 'Blueberry Special',
    price: 129,
    description: 'Tangy and luscious wild blueberry compote smothered over freshly pressed crispy waffle.',
    tags: ['Classic'],
    isSignature: false,
    customizations: ['Brownie Base +₹30', 'Ice Cream Special +₹30']
  },
  {
    id: 'classic-butterscotch-crunchy',
    category: 'classic',
    categoryName: 'Broffles Classic',
    name: 'Butterscotch Crunchy',
    price: 129,
    description: 'Warm butter caramel drizzle with crunchy butterscotch praline nuggets in every bite.',
    tags: ['Classic'],
    isSignature: false,
    customizations: ['Brownie Base +₹30', 'Ice Cream Special +₹30']
  },
  {
    id: 'classic-oreo-loaded-special',
    category: 'classic',
    categoryName: 'Broffles Classic',
    name: 'Oreo Loaded Special',
    price: 139,
    description: 'Crushed Oreo cookies, smooth vanilla cream, and dark cocoa drizzle loaded generously on crispy waffle.',
    tags: ['Chocolate'],
    isSignature: true,
    badgeText: 'Signature Item',
    customizations: ['Brownie Base +₹30', 'Ice Cream Special +₹30']
  },
  {
    id: 'classic-kit-kat-loaded',
    category: 'classic',
    categoryName: 'Broffles Classic',
    name: 'Kit Kat Loaded',
    price: 139,
    description: 'Crunchy wafer finger pieces and molten milk chocolate drenched over a warm Belgian-style waffle.',
    tags: ['Chocolate'],
    isSignature: false,
    customizations: ['Brownie Base +₹30', 'Ice Cream Special +₹30']
  },
  {
    id: 'classic-cookies-cream-special',
    category: 'classic',
    categoryName: 'Broffles Classic',
    name: 'Cookies & Cream Special',
    price: 119,
    description: 'Decadent cookie crumbles harmonized with white cream drizzle for the ultimate comfort treat.',
    tags: ['Chocolate'],
    isSignature: false,
    customizations: ['Brownie Base +₹30', 'Ice Cream Special +₹30']
  },
  {
    id: 'classic-death-by-chocolate',
    category: 'classic',
    categoryName: 'Broffles Classic',
    name: 'Death By Chocolate',
    price: 119,
    description: 'The legendary chocolate overload: molten dark cocoa fudge, chocolate sauce, and chocolate crisps on a warm waffle.',
    tags: ['Chocolate'],
    isSignature: true,
    badgeText: 'Iconic Hero',
    customizations: ['Brownie Base +₹30', 'Ice Cream Special +₹30']
  },
  {
    id: 'classic-white-chocolate',
    category: 'classic',
    categoryName: 'Broffles Classic',
    name: 'White Chocolate',
    price: 119,
    description: 'Silky, buttery melted Belgian white chocolate coating every waffle pocket to perfection.',
    tags: ['Chocolate'],
    isSignature: false,
    customizations: ['Brownie Base +₹30', 'Ice Cream Special +₹30']
  },
  {
    id: 'classic-milk-chocolate',
    category: 'classic',
    categoryName: 'Broffles Classic',
    name: 'Milk Chocolate',
    price: 119,
    description: 'Smooth, creamy milk chocolate fondue spread generously over piping-hot crispy waffle.',
    tags: ['Chocolate'],
    isSignature: false,
    customizations: ['Brownie Base +₹30', 'Ice Cream Special +₹30']
  },
  {
    id: 'classic-dark-milk-choco',
    category: 'classic',
    categoryName: 'Broffles Classic',
    name: 'Dark & Milk Choco',
    price: 149,
    description: 'The dual-chocolate masterclass: velvety milk chocolate balanced with intense dark cocoa ganache.',
    tags: ['Chocolate'],
    isSignature: false,
    customizations: ['Brownie Base +₹30', 'Ice Cream Special +₹30']
  },
  {
    id: 'classic-dark-white-special',
    category: 'classic',
    categoryName: 'Broffles Classic',
    name: 'Dark & White Special',
    price: 149,
    description: 'Yin and yang of chocolate: rich dark chocolate paired with ivory sweet white chocolate swirls.',
    tags: ['Chocolate'],
    isSignature: false,
    customizations: ['Brownie Base +₹30', 'Ice Cream Special +₹30']
  },
  {
    id: 'classic-naked-nutella',
    category: 'classic',
    categoryName: 'Broffles Classic',
    name: 'Naked Nutella',
    price: 129,
    description: 'Pure, unadulterated Italian hazelnut Nutella spread lavishly on our fresh golden crisp waffle.',
    tags: ['Nutella'],
    isSignature: true,
    badgeText: 'Crowd Favorite',
    customizations: ['Brownie Base +₹30', 'Ice Cream Special +₹30']
  },
  {
    id: 'classic-nuts-delight',
    category: 'classic',
    categoryName: 'Broffles Classic',
    name: 'Nuts Delight*',
    price: 139,
    description: 'Toasted cashews, roasted almond flakes, and golden honey chocolate drizzle over crispy waffle.',
    tags: ['Classic'],
    isSignature: false,
    customizations: ['Brownie Base +₹30', 'Ice Cream Special +₹30']
  },
  {
    id: 'classic-biscoff-special',
    category: 'classic',
    categoryName: 'Broffles Classic',
    name: 'Biscoff Special',
    price: 149,
    description: 'Spiced Belgian Lotus Biscoff spread and crushed speculoos cookie crunch over a warm golden waffle.',
    tags: ['Biscoff'],
    isSignature: true,
    badgeText: 'Must Try',
    customizations: ['Brownie Base +₹30', 'Ice Cream Special +₹30']
  },
  {
    id: 'classic-pistachio-special',
    category: 'classic',
    categoryName: 'Broffles Classic',
    name: 'Pistachio Special',
    price: 149,
    description: 'Gourmet roasted pistachio cream with nutty crunch, rich aroma, and delicate sweetness.',
    tags: ['Classic'],
    isSignature: false,
    customizations: ['Brownie Base +₹30', 'Ice Cream Special +₹30']
  },
  {
    id: 'classic-creamy-almond',
    category: 'classic',
    categoryName: 'Broffles Classic',
    name: 'Creamy Almond',
    price: 149,
    description: 'Silky smooth almond butter cream layered with slivered toasted almonds on fresh waffle.',
    tags: ['Classic'],
    isSignature: false,
    customizations: ['Brownie Base +₹30', 'Ice Cream Special +₹30']
  },
  {
    id: 'classic-triple-choco-special',
    category: 'classic',
    categoryName: 'Broffles Classic',
    name: 'Triple Choco Special',
    price: 159,
    description: 'The trinity of chocolate: pure dark, silky milk, and rich white chocolate combined in decadent harmony.',
    tags: ['Chocolate'],
    isSignature: true,
    badgeText: 'Ultimate Indulgence',
    customizations: ['Brownie Base +₹30', 'Ice Cream Special +₹30']
  },
  {
    id: 'classic-ferrero-rocher-special',
    category: 'classic',
    categoryName: 'Broffles Classic',
    name: 'Ferrero Rocher Special*',
    price: 159,
    description: 'Crushed Ferrero Rocher pralines, roasted hazelnut crunch, and molten cocoa spread on freshly griddled waffle.',
    tags: ['Chocolate', 'Nutella'],
    isSignature: true,
    badgeText: 'Chef Special',
    customizations: ['Brownie Base +₹30', 'Ice Cream Special +₹30']
  },

  // ==========================================
  // 2. CHEESE CREAMS
  // ==========================================
  {
    id: 'cheese-strawberry',
    category: 'cheese-cream',
    categoryName: 'Cheese Creams',
    name: 'Strawberry Cheese Cream',
    price: 149,
    description: 'Waffle sandwich filled with velvety cream cheese and sweet strawberry compote.',
    tags: ['Classic'],
    isSignature: false
  },
  {
    id: 'cheese-blueberry',
    category: 'cheese-cream',
    categoryName: 'Cheese Creams',
    name: 'Blueberry Cheese Cream',
    price: 149,
    description: 'Crisp waffle sandwich packed with rich, tangy cream cheese and juicy blueberry swirl.',
    tags: ['Classic'],
    isSignature: false
  },
  {
    id: 'cheese-biscoff',
    category: 'cheese-cream',
    categoryName: 'Cheese Creams',
    name: 'Biscoff Cheese Cream',
    price: 179,
    description: 'Caramelized speculoos Lotus Biscoff spread whipped into thick cheesecake cream between crisp waffle layers.',
    tags: ['Biscoff'],
    isSignature: false
  },
  {
    id: 'cheese-nutella',
    category: 'cheese-cream',
    categoryName: 'Cheese Creams',
    name: 'Nutella Cheese Cream',
    price: 179,
    description: 'The irresistible marriage of sweet hazelnut Nutella and thick, tangy cream cheese filling.',
    tags: ['Nutella'],
    isSignature: false
  },

  // ==========================================
  // 3. BROFFLES RED VELVET
  // ==========================================
  {
    id: 'red-velvet-white-cream',
    category: 'red-velvet',
    categoryName: 'Broffles Red Velvet',
    name: 'White Cream Special',
    price: 149,
    description: 'Signature crimson red velvet waffle topped with sweet vanilla cream and powdered sugar.',
    tags: ['Red Velvet'],
    isSignature: false
  },
  {
    id: 'red-velvet-cookie-cream',
    category: 'red-velvet',
    categoryName: 'Broffles Red Velvet',
    name: 'Cookie & Cream Special',
    price: 149,
    description: 'Ruby red velvet waffle layered with sweet white frosting and crunchy dark cookie crumbs.',
    tags: ['Red Velvet'],
    isSignature: false
  },
  {
    id: 'red-velvet-cheese-cream',
    category: 'red-velvet',
    categoryName: 'Broffles Red Velvet',
    name: 'Red Velvet Cheese Cream',
    price: 169,
    description: 'Warm cocoa-infused red velvet waffle sandwich layered with authentic thick cream cheese frosting.',
    tags: ['Red Velvet'],
    isSignature: false
  },

  // ==========================================
  // 4. BUBBLE WAFFLE SPECIAL
  // ==========================================
  {
    id: 'bubble-death-by-chocolate',
    category: 'bubble-waffle',
    categoryName: 'Bubble Waffle Special',
    name: 'Death By Chocolate',
    price: 249,
    description: 'Bubble waffle filled with melted chocolate, gems and ice creams.',
    tags: ['Bubble Waffle', 'Chocolate'],
    isSignature: false
  },
  {
    id: 'bubble-oreo-punch',
    category: 'bubble-waffle',
    categoryName: 'Bubble Waffle Special',
    name: 'Oreo Punch',
    price: 249,
    description: 'Bubble waffle filled with Oreo cracks, gems and ice creams.',
    tags: ['Bubble Waffle', 'Chocolate'],
    isSignature: false
  },
  {
    id: 'bubble-special-triple',
    category: 'bubble-waffle',
    categoryName: 'Bubble Waffle Special',
    name: 'Special Triple Bubble',
    price: 279,
    description: 'Bubble waffle filled with 3 layers of chocolates and topped by choco chips.',
    tags: ['Bubble Waffle', 'Chocolate'],
    isSignature: false
  },
  {
    id: 'bubble-biscoff-special',
    category: 'bubble-waffle',
    categoryName: 'Bubble Waffle Special',
    name: 'Biscoff Special',
    price: 309,
    description: 'Bubble waffle filled with full of fillings, biscuits & icecreams.',
    tags: ['Bubble Waffle', 'Biscoff'],
    isSignature: false
  },
  {
    id: 'bubble-brownie',
    category: 'bubble-waffle',
    categoryName: 'Bubble Waffle Special',
    name: 'Brownie Bubble',
    price: 309,
    description: 'Bubble waffle filled with melted chocolates, fresh fruits and nuts.',
    tags: ['Bubble Waffle', 'Chocolate'],
    isSignature: false
  },
  {
    id: 'bubble-red-velvet',
    category: 'bubble-waffle',
    categoryName: 'Bubble Waffle Special',
    name: 'Red Velvet Bubble',
    price: 309,
    description: 'Red velvet flavour bubble waffle full of melted chocolates and toppings.',
    tags: ['Bubble Waffle', 'Red Velvet'],
    isSignature: false
  },

  // ==========================================
  // 5. MINI PAN CAKES (Dual Pricing: Regular / Brownie)
  // ==========================================
  {
    id: 'mini-classic',
    category: 'mini-pancakes',
    categoryName: 'Mini Pan Cakes',
    name: 'Classic Mini',
    price: 119,
    secondPrice: 139,
    secondPriceLabel: 'Brownie',
    description: 'Bite-sized, fluffy golden Dutch poffertjes served warm with butter and sweet dessert drizzle.',
    tags: ['Classic'],
    isSignature: false
  },
  {
    id: 'mini-choco-special',
    category: 'mini-pancakes',
    categoryName: 'Mini Pan Cakes',
    name: 'Choco Special - Milk / White / Dark',
    price: 129,
    secondPrice: 149,
    secondPriceLabel: 'Brownie',
    description: 'Tender mini pancakes drenched with your choice of silky milk, ivory white, or deep dark chocolate.',
    tags: ['Chocolate'],
    isSignature: false
  },
  {
    id: 'mini-oreo',
    category: 'mini-pancakes',
    categoryName: 'Mini Pan Cakes',
    name: 'Oreo Mini Pan Cake',
    price: 139,
    secondPrice: 159,
    secondPriceLabel: 'Brownie',
    description: 'Bite-sized mini pancakes smothered with warm chocolate sauce and crushed Oreo biscuits.',
    tags: ['Chocolate'],
    isSignature: false
  },
  {
    id: 'mini-butterscotch',
    category: 'mini-pancakes',
    categoryName: 'Mini Pan Cakes',
    name: 'Butterscotch Special',
    price: 139,
    secondPrice: 159,
    secondPriceLabel: 'Brownie',
    description: 'Warm, fluffy mini pancakes drizzled with golden butterscotch sauce and crunchy caramel bits.',
    tags: ['Classic'],
    isSignature: false
  },
  {
    id: 'mini-cookies-cream',
    category: 'mini-pancakes',
    categoryName: 'Mini Pan Cakes',
    name: 'Cookies & Cream Special',
    price: 139,
    secondPrice: 159,
    secondPriceLabel: 'Brownie',
    description: 'Velvety cream sauce and dark cookie crumbles coated over warm, fluffy mini pancake bites.',
    tags: ['Chocolate'],
    isSignature: false
  },
  {
    id: 'mini-triple-choco',
    category: 'mini-pancakes',
    categoryName: 'Mini Pan Cakes',
    name: 'Triple Chocolate',
    price: 149,
    secondPrice: 169,
    secondPriceLabel: 'Brownie',
    description: 'Three distinct chocolate drizzles poured over warm mini pancake puffs for ultimate decadence.',
    tags: ['Chocolate'],
    isSignature: false
  },
  {
    id: 'mini-biscoff',
    category: 'mini-pancakes',
    categoryName: 'Mini Pan Cakes',
    name: 'Lotus Biscoff Special',
    price: 159,
    secondPrice: 179,
    secondPriceLabel: 'Brownie',
    description: 'Pancake puffs dripping with molten caramelized Lotus Biscoff spread and biscuit crunch.',
    tags: ['Biscoff'],
    isSignature: false
  },
  {
    id: 'mini-red-velvet',
    category: 'mini-pancakes',
    categoryName: 'Mini Pan Cakes',
    name: 'Red Velvet Special',
    price: 169,
    description: 'Crimson cocoa mini pancakes served with creamy sweet drizzle and red velvet crumbs.',
    tags: ['Red Velvet'],
    isSignature: false
  },

  // ==========================================
  // 6. ADD-ONS
  // ==========================================
  {
    id: 'addon-choco-chips',
    category: 'add-ons',
    categoryName: 'Add-ons',
    name: 'Dark & White Choco Chips',
    price: 30,
    description: 'A crunchy blend of real dark and white chocolate chips for extra texture and indulgence.',
    tags: ['Chocolate'],
    isSignature: false
  },
  {
    id: 'addon-gems',
    category: 'add-ons',
    categoryName: 'Add-ons',
    name: 'Gems Loaded',
    price: 30,
    description: 'Crispy, colorful chocolate gems sprinkled generously over your dessert.',
    tags: ['Classic'],
    isSignature: false
  },
  {
    id: 'addon-kitkat',
    category: 'add-ons',
    categoryName: 'Add-ons',
    name: 'Kit Kat Loaded',
    price: 30,
    description: 'Crunchy wafer finger bites covered in smooth chocolate.',
    tags: ['Chocolate'],
    isSignature: false
  },
  {
    id: 'addon-oreo',
    category: 'add-ons',
    categoryName: 'Add-ons',
    name: 'Oreo Loaded',
    price: 30,
    description: 'Extra heap of crunchy, cream-filled Oreo cookie cracks.',
    tags: ['Chocolate'],
    isSignature: false
  },
  {
    id: 'addon-roasted-almonds',
    category: 'add-ons',
    categoryName: 'Add-ons',
    name: 'Roasted Almonds',
    price: 40,
    description: 'Freshly oven-roasted, fragrant almond slivers.',
    tags: ['Classic'],
    isSignature: false
  },
  {
    id: 'addon-crispy-cashews',
    category: 'add-ons',
    categoryName: 'Add-ons',
    name: 'Crispy Cashews',
    price: 40,
    description: 'Golden-toasted crunchy cashew nut pieces.',
    tags: ['Classic'],
    isSignature: false
  },
  {
    id: 'addon-ice-cream',
    category: 'add-ons',
    categoryName: 'Add-ons',
    name: '1 Scoop of Ice-Cream',
    price: 40,
    description: 'A cold, velvety scoop of premium ice cream to contrast warm waffles.',
    tags: ['Classic'],
    isSignature: false
  },
  {
    id: 'addon-biscoff',
    category: 'add-ons',
    categoryName: 'Add-ons',
    name: 'Biscoff Loaded',
    price: 40,
    description: 'Extra Lotus Biscoff spread and crushed speculoos biscuit crumble.',
    tags: ['Biscoff'],
    isSignature: false
  },
  {
    id: 'addon-ferraro-rocher',
    category: 'add-ons',
    categoryName: 'Add-ons',
    name: 'Ferraro Rocher Special',
    price: 40,
    description: 'Crushed hazelnut praline Ferrero Rocher confectionery topping.',
    tags: ['Chocolate'],
    isSignature: false
  }
];

// Categories definition (Add-ons are showcased in dedicated Section 9)
const BrofflesCategories = [
  { id: 'all', name: 'All Waffles', count: BrofflesMenuData.filter(i => i.category !== 'add-ons').length },
  { id: 'classic', name: 'Broffles Classic', count: BrofflesMenuData.filter(i => i.category === 'classic').length },
  { id: 'cheese-cream', name: 'Cheese Creams', count: BrofflesMenuData.filter(i => i.category === 'cheese-cream').length },
  { id: 'red-velvet', name: 'Red Velvet', count: BrofflesMenuData.filter(i => i.category === 'red-velvet').length },
  { id: 'bubble-waffle', name: 'Bubble Waffle', count: BrofflesMenuData.filter(i => i.category === 'bubble-waffle').length },
  { id: 'mini-pancakes', name: 'Mini Pan Cakes', count: BrofflesMenuData.filter(i => i.category === 'mini-pancakes').length }
];

// Signature Waffles for Hero Spotlight Section
const BrofflesSignatures = BrofflesMenuData.filter(i => i.isSignature);

window.BrofflesMenuData = BrofflesMenuData;
window.BrofflesCategories = BrofflesCategories;
window.BrofflesSignatures = BrofflesSignatures;
