const products = [
  // Mobile Phones
  { id: 1, name: "iPhone 14", price: 64999, quantity: 1, category: "Mobile Phones", icon: "📱" },
  { id: 2, name: "Samsung Galaxy S23", price: 74999, quantity: 1, category: "Mobile Phones", icon: "📱" },
  { id: 3, name: "OnePlus Nord CE", price: 24999, quantity: 1, category: "Mobile Phones", icon: "📱" },

  // Laptops
  { id: 4, name: "HP Pavilion", price: 58999, quantity: 1, category: "Laptops", icon: "💻" },
  { id: 5, name: "Dell Inspiron", price: 52999, quantity: 1, category: "Laptops", icon: "💻" },
  { id: 6, name: "MacBook Air M1", price: 79999, quantity: 1, category: "Laptops", icon: "💻" },

  // Headphones
  { id: 7, name: "boAt Rockerz 450", price: 1499, quantity: 1, category: "Headphones", icon: "🎧" },
  { id: 8, name: "JBL Tune 510BT", price: 2999, quantity: 1, category: "Headphones", icon: "🎧" },
  { id: 9, name: "Sony WH-CH520", price: 4499, quantity: 1, category: "Headphones", icon: "🎧" },

  // Clothes
  { id: 10, name: "Men's Cotton Shirt", price: 799, quantity: 1, category: "Clothes", icon: "👕" },
  { id: 11, name: "Women's Kurti", price: 999, quantity: 1, category: "Clothes", icon: "👗" },
  { id: 12, name: "Denim Jeans", price: 1499, quantity: 1, category: "Clothes", icon: "👖" }
];

let cart = [];
let appliedCoupon = "";

const productsContainer = document.getElementById("productsContainer");
const cartList = document.getElementById("cartList");
const emptyCart = document.getElementById("emptyCart");

const subTotalEl = document.getElementById("subTotal");
const discountTotalEl = document.getElementById("discountTotal");
const finalTotalEl = document.getElementById("finalTotal");

const couponInput = document.getElementById("couponInput");
const applyCouponBtn = document.getElementById("applyCouponBtn");
const couponMsg = document.getElementById("couponMsg");

const cartCount = document.getElementById("cartCount");

function money(n) {
  return "₹" + n.toLocaleString("en-IN");
}

function findItem(id) {
  return cart.find(i => i.id === id);
}

function timeDiscountPercent() {
  const h = new Date().getHours();
  return (h >= 18 && h <= 21) ? 5 : 0;
}

function addToCart(id) {
  const item = findItem(id);
  if (item) item.quantity++;
  else cart.push({ ...products.find(p => p.id === id) });

  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  renderCart();
}

function changeQty(id, change) {
  const item = findItem(id);
  if (!item) return;

  item.quantity += change;
  if (item.quantity <= 0) removeFromCart(id);
  else renderCart();
}

// Discounts
function itemDiscount(item) {
  let d = 0;

  // Bulk: qty >= 3 => 10% off item total
  if (item.quantity >= 3) d += item.price * item.quantity * 0.10;

  // Laptops: 5% off always
  if (item.category === "Laptops") d += item.price * item.quantity * 0.05;

  // HEAD5: 5% off Headphones
  if (appliedCoupon === "HEAD5" && item.category === "Headphones") {
    d += item.price * item.quantity * 0.05;
  }

  return d;
}

function applyCoupon() {
  let code = couponInput.value.trim().toUpperCase().replaceAll(" ", "");

  if (code === "") {
    appliedCoupon = "";
    couponMsg.textContent = "Coupon removed.";
    renderCart();
    return;
  }

  const allowed = ["SAVE10", "HEAD5"];

  if (!allowed.includes(code)) {
    appliedCoupon = "";
    couponMsg.textContent = "Invalid coupon!";
    renderCart();
    return;
  }

  appliedCoupon = code;
  couponMsg.textContent = "Coupon Applied: " + appliedCoupon;
  renderCart();
}

function totals() {
  let subtotal = 0;
  let discount = 0;

  cart.forEach(item => {
    subtotal += item.price * item.quantity;
    discount += itemDiscount(item);
  });

  // SAVE10 => 10% off cart
  if (appliedCoupon === "SAVE10") discount += subtotal * 0.10;

  // Time discount
  const t = timeDiscountPercent();
  if (t > 0) discount += subtotal * (t / 100);

  let finalTotal = subtotal - discount;
  if (finalTotal < 0) finalTotal = 0;

  return { subtotal, discount, finalTotal };
}

// Render Products (with sections)
function renderProducts() {
  productsContainer.innerHTML = "";

  const categories = ["Mobile Phones", "Laptops", "Headphones", "Clothes"];

  categories.forEach(cat => {
    const title = document.createElement("div");
    title.className = "section-title";
    title.innerHTML = `<h3>${cat}</h3><span>${products.filter(p => p.category === cat).length} items</span>`;

    const grid = document.createElement("div");
    grid.className = "grid";

    products
      .filter(p => p.category === cat)
      .forEach(p => {
        const div = document.createElement("div");
        div.className = "product";

        div.innerHTML = `
          <div class="icon">${p.icon}</div>
          <h4>${p.name}</h4>
          <p>${p.category}</p>
          <div class="price">${money(p.price)}</div>
          <button onclick="addToCart(${p.id})">Add to Cart</button>
        `;

        grid.appendChild(div);
      });

    productsContainer.appendChild(title);
    productsContainer.appendChild(grid);
  });
}

// Render Cart
function renderCart() {
  cartList.innerHTML = "";

  emptyCart.style.display = cart.length === 0 ? "block" : "none";

  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "cart-item";

    const itemTotal = item.price * item.quantity;
    const disc = itemDiscount(item);

    div.innerHTML = `
      <div>
        <h4>${item.icon} ${item.name}</h4>
        <p>${item.category} • ${money(item.price)} each</p>
        <p>Item Total: ${money(itemTotal)}</p>
        <p>Discount: -${money(disc)}</p>
      </div>

      <div class="qty">
        <button onclick="changeQty(${item.id}, -1)">-</button>
        <b>${item.quantity}</b>
        <button onclick="changeQty(${item.id}, 1)">+</button>
        <button class="remove" onclick="removeFromCart(${item.id})">X</button>
      </div>
    `;

    cartList.appendChild(div);
  });

  // Update totals
  const t = totals();
  subTotalEl.textContent = money(t.subtotal);
  discountTotalEl.textContent = "-" + money(t.discount);
  finalTotalEl.textContent = money(t.finalTotal);

  // Update cart count
  const count = cart.reduce((sum, i) => sum + i.quantity, 0);
  cartCount.textContent = count;
}

applyCouponBtn.addEventListener("click", applyCoupon);

// Start
renderProducts();
renderCart();
