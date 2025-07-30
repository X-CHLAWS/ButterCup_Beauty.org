// Shopping Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function initCart() {
    updateCartCount();
    
    // Cart icon click event
    const cartIcon = document.querySelector('.cart-icon');
    const cartOverlay = document.querySelector('.cart-overlay');
    const closeCart = document.querySelector('.close-cart');
    
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            cartOverlay.classList.add('active');
            renderCartItems();
        });
    }
    
    if (closeCart) {
        closeCart.addEventListener('click', function() {
            cartOverlay.classList.remove('active');
        });
    }
    
    // Add to cart buttons
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            addToCart(productId);
        });
    });
    
    // Clear cart button
    const clearCartBtn = document.querySelector('.clear-cart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }
    
    // Checkout button
    const checkoutBtn = document.querySelector('.checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                showNotification('Your cart is empty', 'error');
                return;
            }
            
            document.querySelector('.cart-overlay').classList.remove('active');
            document.querySelector('.checkout-modal').classList.add('active');
            renderCheckoutItems();
        });
    }
}

function addToCart(productId) {
    // In a real app, you would fetch product details from your database
    // For this demo, we'll use a simple product map
    const products = {
        '1': { name: 'Purifying Tea Tree Face Wash', price: 45, image: 'face-wash.jpg' },
        '2': { name: 'Clarifying Gentle Cleanser', price: 50, image: 'cleanser.jpg' },
        '3': { name: 'T & C Exfoliating Scrubs', price: 45, image: 'scrub.jpg' },
        '4': { name: 'Repair Brightening Serum', price: 30, image: 'serum.jpg' },
        '5': { name: 'Hydrating Rose Toner', price: 30, image: 'toner.jpg' },
        '6': { name: 'Glow Boost Face Moisturizer', price: 40, image: 'moisturizer.jpg' },
        '7': { name: 'Moisturizing Shea Body Butter', price: 40, image: 'body-butter.jpg' },
        '8': { name: 'Radiant Glow Brightening Oil', price: 110, image: 'brightening-oil.jpg' },
        '9': { name: 'Rejuvenate Brightening Lotion', price: 140, image: 'lotion.jpg' },
        '10': { name: 'Soothing Black Soap Shower Gel', price: 70, image: 'shower-gel.jpg' },
        '11': { name: 'Brightening Black Soap Paste', price: 100, image: 'black-soap.jpg' },
        '12': { name: 'Facial Set', price: 240, image: 'facial-set.jpg' },
        '13': { name: 'Glow Body Set', price: 155, image: 'glow-set.jpg' },
        '14': { name: 'Body Repair Set', price: 265, image: 'body-repair.jpg' },
        '15': { name: 'Lighter Set', price: 255, image: 'lighter-set.jpg' }
    };
    
    const product = products[productId];
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${product.name} added to cart`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, newQuantity);
        updateCart();
    }
}

function clearCart() {
    cart = [];
    updateCart();
    showNotification('Cart cleared', 'info');
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
    });
}

function renderCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalContainer = document.querySelector('.cart-total span');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotalContainer.textContent = '¢0.00';
        return;
    }
    
    let itemsHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        itemsHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">${formatCurrency(item.price)}</div>
                    <div class="cart-item-quantity">
                        <button class="decrease-quantity" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-quantity" data-id="${item.id}">+</button>
                    </div>
                    <div class="remove-item" data-id="${item.id}">Remove</div>
                </div>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = itemsHTML;
    cartTotalContainer.textContent = formatCurrency(total);
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const item = cart.find(item => item.id === productId);
            if (item && item.quantity > 1) {
                updateQuantity(productId, item.quantity - 1);
            }
        });
    });
    
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const item = cart.find(item => item.id === productId);
            if (item) {
                updateQuantity(productId, item.quantity + 1);
            }
        });
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            removeFromCart(productId);
        });
    });
}

function renderCheckoutItems() {
    const summaryItemsContainer = document.querySelector('.summary-items');
    const subtotalContainer = document.querySelector('.subtotal');
    const shippingContainer = document.querySelector('.shipping');
    const orderTotalContainer = document.querySelector('.order-total');
    
    if (!summaryItemsContainer) return;
    
    let itemsHTML = '';
    let subtotal = 0;
    const shipping = 20; // Flat rate shipping
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        itemsHTML += `
            <div class="summary-item">
                <span>${item.name} × ${item.quantity}</span>
                <span>${formatCurrency(itemTotal)}</span>
            </div>
        `;
    });
    
    summaryItemsContainer.innerHTML = itemsHTML;
    subtotalContainer.textContent = formatCurrency(subtotal);
    shippingContainer.textContent = formatCurrency(shipping);
    orderTotalContainer.textContent = formatCurrency(subtotal + shipping);
    
    // Initialize checkout steps
    initCheckoutSteps();
}

function initCheckoutSteps() {
    const steps = document.querySelectorAll('.step');
    const forms = {
        '1': document.getElementById('shippingForm'),
        '2': document.getElementById('paymentForm'),
        '3': document.getElementById('confirmationStep')
    };
    
    // Show first step by default
    steps[0].classList.add('active');
    forms['1'].style.display = 'block';
    
    // Next step buttons
    document.querySelectorAll('.next-step').forEach(button => {
        button.addEventListener('click', function() {
            const nextStep = this.getAttribute('data-next');
            const currentStep = document.querySelector('.step.active').getAttribute('data-step');
            
            // Validate form before proceeding
            if (currentStep === '1') {
                if (!validateShippingForm()) return;
            } else if (currentStep === '2') {
                if (!validatePaymentForm()) return;
            }
            
            // Update steps
            steps.forEach(step => {
                step.classList.remove('active');
                if (parseInt(step.getAttribute('data-step')) <= parseInt(nextStep)) {
                    step.classList.add('completed');
                }
            });
            
            document.querySelector(`.step[data-step="${nextStep}"]`).classList.add('active');
            
            // Hide all forms
            Object.values(forms).forEach(form => {
                form.style.display = 'none';
            });
            
            // Show current form
            forms[nextStep].style.display = 'block';
            
            // If final step, complete order
            if (nextStep === '3') {
                completeOrder();
            }
        });
    });
    
    // Previous step buttons
    document.querySelectorAll('.prev-step').forEach(button => {
        button.addEventListener('click', function() {
            const prevStep = this.getAttribute('data-prev');
            
            // Update steps
            steps.forEach(step => {
                step.classList.remove('active');
                if (parseInt(step.getAttribute('data-step')) === parseInt(prevStep)) {
                    step.classList.add('active');
                }
            });
            
            // Hide all forms
            Object.values(forms).forEach(form => {
                form.style.display = 'none';
            });
            
            // Show previous form
            forms[prevStep].style.display = 'block';
        });
    });
    
    // Payment method toggle
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        radio.addEventListener('change', function() {
            document.querySelectorAll('.payment-details').forEach(details => {
                details.style.display = 'none';
            });
            
            document.querySelector(`.${this.value}-details`).style.display = 'block';
        });
    });
    
    // Cancel checkout
    document.querySelector('.cancel-checkout').addEventListener('click', function() {
        document.querySelector('.checkout-modal').classList.remove('active');
    });
    
    // Close checkout
    document.querySelector('.close-checkout').addEventListener('click', function() {
        document.querySelector('.checkout-modal').classList.remove('active');
    });
}

function validateShippingForm() {
    let isValid = true;
    const form = document.getElementById('shippingForm');
    
    form.querySelectorAll('input[required], textarea[required], select[required]').forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('has-error');
            isValid = false;
            
            // Remove error class after animation
            setTimeout(() => {
                field.classList.remove('has-error');
            }, 400);
        }
    });
    
    if (!isValid) {
        showNotification('Please fill all required fields', 'error');
    }
    
    return isValid;
}

function validatePaymentForm() {
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    
    if (paymentMethod === 'mobileMoney') {
        const mobileNetwork = document.getElementById('mobileNetwork').value;
        const mobileNumber = document.getElementById('mobileNumber').value;
        
        if (!mobileNetwork || !mobileNumber) {
            showNotification('Please fill all payment details', 'error');
            return false;
        }
    } else if (paymentMethod === 'card') {
        const cardNumber = document.getElementById('cardNumber').value;
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;
        const cardName = document.getElementById('cardName').value;
        
        if (!cardNumber || !expiryDate || !cvv || !cardName) {
            showNotification('Please fill all card details', 'error');
            return false;
        }
    }
    
    return true;
}

function completeOrder() {
    // In a real app, you would send the order to your server here
    // For this demo, we'll just simulate a successful order
    
    // Generate random order number
    const orderNumber = 'BE' + Math.floor(100000 + Math.random() * 900000);
    document.querySelector('.order-number span').textContent = orderNumber;
    
    // Clear cart after successful order
    setTimeout(() => {
        clearCart();
    }, 3000);
    
    // You would typically redirect to a thank you page or send confirmation email here
}