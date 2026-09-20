# BROFFLES — The Taste of Good Friendship 🧇🍫

A premium, conversion-focused, crave-inducing website for **BROFFLES**, an artisanal waffle & dessert café located in Kumaraswamy Layout, Bengaluru.

Designed with a rich, dark molten chocolate aesthetic (`#120703` to `#2C1810`), warm golden caramel glows (`#D9822B`), 3D pop-out dessert cards, interactive floating waffle elements, an interactive Waffle Customizer Studio, and a built-in Café Owner Operations Portal.

---

## 🌟 What's New in this Version

1. **Decadent Dark Chocolate Theme**:
   - Deep cocoa gradients, ambient caramel light blooms, and molten chocolate drip dividers.
   - Alternating dark cocoa and warm creamy sections for maximum craving and visual depth.

2. **Falling & Floating Waffles Animation**:
   - Gentle floating waffles, chocolate chips, and sweet toppings that drift gracefully as you scroll, with scroll-accelerated bursts.

3. **✨ Interactive Broffles Waffle Studio (Build Your Own Waffle)**:
   - **Live Visual Canvas**: Updates the waffle shape, molten chocolate fondues, ice cream scoop, and crunchy toppings in real time.
   - **Craving Meter Bar**: Automatically reacts from "Sweet Tooth" to "Unapologetic Chocolate Monster".
   - **Live Price Calculator**: Calculates the exact custom total.
   - **Instant WhatsApp Order**: Prepares and sends the full custom waffle recipe directly to `+91 9739956756` via WhatsApp with one tap!

4. **👑 Café Owner Operations Portal (`owner.html`)**:
   - Accessible via the **"Owner Portal"** button in the header/footer.
   - **Live Custom Orders Feed**: View and manage incoming custom waffle combinations built by visitors.
   - **Stock Availability Manager**: 1-click toggle to mark items *In Stock* or *Sold Out* (reflected on the customer menu).
   - **Photo Diagnostics**: View expected filenames for all 51 items and check placeholder status.
   - **Live Announcement Editor**: Change the top announcement marquee in real time.

---

## 📸 How to Add Your Photos

Simply drop your JPEG photos into:
`C:\Users\khath\.gemini\antigravity\scratch\broffles-website\photos\`

The built-in **Smart Image Resolver** automatically maps filenames:
- Lowers case and strips special characters (`*`, `'`, `/`)
- Maps `&` to `and` or checks both forms
- Replaces spaces with hyphens `-`
- Supports `.jpeg`, `.jpg`, `.png`, and `.webp`
- Uses handcrafted SVG placeholders whenever photos are still being taken, preventing broken image icons or disrupted layouts.

### Examples:
- `Death By Chocolate` → `photos/death-by-chocolate.jpeg`
- `Oreo Loaded Special` → `photos/oreo-loaded-special.jpeg`
- `Strawberry Cheese Cream` → `photos/strawberry-cheese-cream.jpeg`
- `Special Triple Bubble` → `photos/special-triple-bubble.jpeg`
- `Classic Mini` → `photos/classic-mini.jpeg`

---

## 🚀 How to Run Locally

### Zero Dependencies:
Double-click `index.html` or open it with any web browser!
To access the Owner Portal, open `owner.html` or click the "Owner Portal" link in the navbar.

### Local Server (Node / Python):
```bash
python -m http.server 3000
```
Then visit `http://localhost:3000/`.
