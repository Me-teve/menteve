// Wishlist functionality
const wishlistBtn = document.getElementById('wishlist-btn');
const wishlistModal = document.getElementById('wishlist-modal');
const wishlistClose = document.getElementById('wishlist-close');
const wishlistItems = document.getElementById('wishlist-items');
const wishlistCount = document.getElementById('wishlist-count');

let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function updateWishlist() {
    wishlistItems.innerHTML = '';
    wishlist.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <p>${item.name} - $${item.price}
            <button onclick="removeFromWishlist(${index})">Remove</button>
            <button onclick="moveToCart(${index})">Add to Cart</button></p>
        `;
        wishlistItems.appendChild(itemDiv);
    });
    wishlistCount.textContent = wishlist.length;
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

document.querySelectorAll('.product').forEach(product => {
    const addToWishlistBtn = document.createElement('button');
    addToWishlistBtn.textContent = 'Add to Wishlist';
    addToWishlistBtn.className = 'add-to-wishlist';
    addToWishlistBtn.dataset.name = product.querySelector('h3').textContent;
    addToWishlistBtn.dataset.price = product.querySelector('p').textContent.replace('$', '');
    product.appendChild(addToWishlistBtn);
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-wishlist')) {
        const name = e.target.dataset.name;
        const price = parseFloat(e.target.dataset.price);
        if (!wishlist.find(item => item.name === name)) {
            wishlist.push({ name, price });
            updateWishlist();
        }
    }
});

window.removeFromWishlist = (index) => {
    wishlist.splice(index, 1);
    updateWishlist();
};

window.moveToCart = (index) => {
    const item = wishlist[index];
    const existing = cart.find(cartItem => cartItem.name === item.name);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ name: item.name, price: item.price, quantity: 1 });
    }
    wishlist.splice(index, 1);
    updateCart();
    updateWishlist();
};

wishlistBtn.addEventListener('click', () => {
    wishlistModal.style.display = 'block';
    updateWishlist();
});

wishlistClose.addEventListener('click', () => {
    wishlistModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === wishlistModal) {
        wishlistModal.style.display = 'none';
    }
});

// Reviews functionality
let reviews = JSON.parse(localStorage.getItem('reviews')) || {};

document.querySelectorAll('.add-review').forEach(btn => {
    btn.addEventListener('click', () => {
        const product = btn.dataset.product;
        const input = btn.previousElementSibling;
        const reviewText = input.value.trim();
        if (reviewText) {
            if (!reviews[product]) reviews[product] = [];
            reviews[product].push(reviewText);
            localStorage.setItem('reviews', JSON.stringify(reviews));
            updateReviews(product);
            input.value = '';
        }
    });
});

function updateReviews(product) {
    const reviewList = document.getElementById(`reviews-${product.replace(/\s+/g, '-')}`);
    reviewList.innerHTML = '';
    if (reviews[product]) {
        reviews[product].forEach(review => {
            const p = document.createElement('p');
            p.textContent = review;
            reviewList.appendChild(p);
        });
    }
}

// Load reviews on page load
Object.keys(reviews).forEach(updateReviews);

// Contact form functionality
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    // In a real app, send to server; here, just alert
    alert(`Thank you, ${name}! Your message has been sent.`);
    contactForm.reset();
});

// Initialize
updateWishlist();
