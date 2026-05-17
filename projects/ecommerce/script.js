const products = [
    { id: 1, name: 'MacBook Pro 16"', price: 2499, image: '💻', description: 'Powerful laptop for professionals', category: 'Electronics', rating: 4.8 },
    { id: 2, name: 'iPhone 15 Pro', price: 999, image: '📱', description: 'Latest smartphone with advanced features', category: 'Electronics', rating: 4.9 },
    { id: 3, name: 'Sony WH-1000XM5', price: 399, image: '🎧', description: 'Premium noise-cancelling headphones', category: 'Audio', rating: 4.7 },
    { id: 4, name: 'Nintendo Switch OLED', price: 349, image: '🎮', description: 'Versatile gaming console', category: 'Gaming', rating: 4.6 },
    { id: 5, name: 'iPad Pro 12.9"', price: 1099, image: '📱', description: 'Professional tablet for creators', category: 'Tablets', rating: 4.8 },
    { id: 6, name: 'Apple Watch Ultra', price: 799, image: '⌚', description: 'Advanced fitness tracking watch', category: 'Wearables', rating: 4.7 },
    { id: 7, name: 'AirPods Pro', price: 249, image: '🎵', description: 'Premium wireless earbuds', category: 'Audio', rating: 4.8 },
    { id: 8, name: 'GoPro Hero 12', price: 499, image: '📹', description: '4K action camera', category: 'Cameras', rating: 4.7 }
];

const customerNames = ['Alex', 'Jordan', 'Sam', 'Casey', 'Morgan', 'Riley', 'Taylor', 'Cameron'];
const activities = [
    'just viewed the MacBook Pro',
    'added iPhone 15 to cart',
    'purchased AirPods Pro',
    'left a 5-star review',
    'just viewed the iPad Pro',
    'purchased Nintendo Switch',
    'added GoPro Hero to wishlist',
    'left a 4-star review'
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let orderCount = parseInt(localStorage.getItem('orderCount')) || 245;

function generateRandomActivity() {
    const name = customerNames[Math.floor(Math.random() * customerNames.length)];
    const activity = activities[Math.floor(Math.random() * activities.length)];
    return `${name} ${activity}`;
}

function updateActivityFeed() {
    const feed = document.getElementById('activity-feed');
    const newActivity = generateRandomActivity();
    const activityEl = document.createElement('div');
    activityEl.className = 'activity-item';
    activityEl.textContent = newActivity;
    feed.insertBefore(activityEl, feed.firstChild);
    if (feed.children.length > 10) {
        feed.removeChild(feed.lastChild);
    }
}

// Generate new activity every 5-10 seconds
setInterval(updateActivityFeed, Math.random() * 5000 + 5000);
    const list = document.getElementById('product-list');
    list.innerHTML = products.map(p => `
        <div class="product">
            <div style="font-size: 3rem; margin-bottom: 1rem;">${p.image}</div>
            <h3>${p.name}</h3>
            <p style="font-size: 0.9rem; color: #666; margin: 0.5rem 0;">${p.description}</p>
            <p>$${p.price.toLocaleString()}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join('');
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
    showNotification(`${product.name} added to cart!`);
    saveCart();
}

function updateCart() {
    const cartBtn = document.getElementById('cart');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBtn.textContent = `Cart: ${totalItems} item${totalItems !== 1 ? 's' : ''}`;
}

function renderCart() {
    const items = document.getElementById('cart-items');
    if (cart.length === 0) {
        items.innerHTML = '<p>Your cart is empty</p>';
        return;
    }
    items.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div>
                <strong>${item.name}</strong><br>
                $${item.price} x ${item.quantity} = $${(item.price * item.quantity).toLocaleString()}
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        </div>
    `).join('');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    renderCart();
    saveCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function showNotification(message) {
    // Simple notification
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

document.getElementById('cart').addEventListener('click', () => {
    const cartSection = document.getElementById('cart-section');
    const overlay = document.getElementById('overlay');
    cartSection.style.display = 'block';
    overlay.style.display = 'block';
    renderCart();
});

document.getElementById('close-cart').addEventListener('click', () => {
    document.getElementById('cart-section').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
});

document.getElementById('overlay').addEventListener('click', () => {
    document.getElementById('cart-section').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
});

document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const checkoutBtn = event.target;
    checkoutBtn.disabled = true;
    checkoutBtn.textContent = 'Processing... 🔄';
    checkoutBtn.style.opacity = '0.7';

    // Simulate backend processing
    setTimeout(() => {
        checkoutBtn.textContent = 'Verifying Payment... 💳';
    }, 1000);

    setTimeout(() => {
        checkoutBtn.textContent = 'Processing Order... 📦';
    }, 2000);

    setTimeout(() => {
        const orderNum = 'ORD-' + Date.now();
        orderCount++;
        localStorage.setItem('orderCount', orderCount);
        
        showNotification(`✅ Order ${orderNum} confirmed! Total: $${total.toLocaleString()}`);
        
        // Track order in activity
        const feed = document.getElementById('activity-feed');
        const activityEl = document.createElement('div');
        activityEl.className = 'activity-item';
        activityEl.textContent = `📦 Order ${orderNum} placed - $${total.toLocaleString()}`;
        feed.insertBefore(activityEl, feed.firstChild);

        cart = [];
        updateCart();
        saveCart();
        document.getElementById('cart-section').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
        
        checkoutBtn.disabled = false;
        checkoutBtn.textContent = 'Proceed to Checkout 💳';
        checkoutBtn.style.opacity = '1';
    }, 3500);
});

renderProducts();
updateCart();