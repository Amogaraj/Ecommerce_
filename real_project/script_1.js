// --- MENU LOGIC ---
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        menuBtn.classList.toggle("open"); // <-- Added this line to trigger the 'X' animation
    });
}

// --- HERO SLIDER LOGIC ---
const track = document.getElementById('hero-track');
const slides = document.querySelectorAll('.hero-slide');
let currentIndex = 0;

// FIX: Only run this if the track and slides actually exist on the current page!
if (track && slides.length > 0) {
    // Clone first slide for seamless loop
    const firstClone = slides[0].cloneNode(true);
    track.appendChild(firstClone);

    function moveSlider() {
        currentIndex++;
        
        track.style.transition = "transform 1s cubic-bezier(0.7, 0, 0.3, 1)";
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // If we reach the clone, jump back to start instantly
        if (currentIndex >= slides.length) {
            setTimeout(() => {
                track.style.transition = "none";
                currentIndex = 0;
                track.style.transform = `translateX(0)`;
            }, 1000); // Matches the 1s transition
        }
    }

    // Slide every 5 seconds
    setInterval(moveSlider, 5000);
}


// --- STATS COUNTER LOGIC ---
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.count-item');
    
    const runCounter = (el) => {
        const target = +el.getAttribute('data-target');
        const suffix = el.getAttribute('data-suffix');
        const speed = 50; 
        const increment = target / speed;
        
        let current = 0;

        const update = () => {
            current += increment;
            
            // Logic to format the number correctly during the animation
            let displayValue;
            if (target >= 10000) {
                // If it's the 10K item, show it as (current/1000)
                displayValue = Math.ceil(current / 1000);
            } else {
                displayValue = Math.ceil(current);
            }

            if (current < target) {
                el.innerText = displayValue + suffix;
                setTimeout(update, 30);
            } else {
                // Final state
                if (target >= 10000) {
                    el.innerText = (target / 1000) + suffix;
                } else {
                    el.innerText = target + suffix;
                }
            }
        };
        update();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.8 }); // The counter triggers when 80% of the section is visible

    counters.forEach(c => observer.observe(c));
});




document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. Remove 'active' class from all buttons and add to the clicked one
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // 2. Filter logic
            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === cardCategory) {
                    card.style.display = 'block';
                    // Optional: Add a small fade-in delay for a smoother look
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });
});








// Add this to script_1.js OR at the bottom of product.html
document.addEventListener('DOMContentLoaded', () => {
    // Select all "Quick View" buttons
    const quickViewBtns = document.querySelectorAll('.secondary-btn');

    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // 1. Find the specific product card that was clicked
            const card = e.target.closest('.product-card');
            
            // 2. Grab the specific data from that card
            const productTitle = card.querySelector('.product-title').innerText;
            const productPrice = card.querySelector('.price-badge').innerText;
            const productImg = card.querySelector('img').src;
            const productDesc = card.querySelector('.product-desc').innerText;

            // 3. Package it into a neat object
            const productData = {
                title: productTitle,
                price: productPrice,
                image: productImg,
                description: productDesc
            };

            // 4. Save it to localStorage
            localStorage.setItem('MyBrand_QuickView', JSON.stringify(productData));

            // 5. Redirect the user to the Quick View page
            window.location.href = 'quickview.html';
        });
    });
});






document.addEventListener('DOMContentLoaded', () => {
    
    // --- DIRECT ADD TO CART FROM GRID ---
    // Select all the black "Add to Cart" buttons
    const addToCartBtns = document.querySelectorAll('.primary-btn');

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // 1. Find the specific product card that was clicked
            const card = e.target.closest('.product-card');
            
            // 2. Grab the specific data from that card
            const title = card.querySelector('.product-title').innerText;
            const price = card.querySelector('.price-badge').innerText;
            const image = card.querySelector('img').src;

            // 3. Package it into a neat cart item object
            const cartItem = {
                id: Date.now(), // Gives it a unique timestamp ID
                title: title,
                price: price,
                image: image,
                size: 'Default', // Since they skip the quick view, we give a default size
                quantity: 1
            };

            // 4. Look in the browser memory for an existing cart. 
            // If it doesn't exist yet, create a blank list: []
            let cart = JSON.parse(localStorage.getItem('MyBrandCart')) || [];
            
            // 5. Push the new item into the cart list
            cart.push(cartItem);
            
            // 6. Save the updated list back into browser memory
            localStorage.setItem('MyBrandCart', JSON.stringify(cart));

            // 7. Redirect the user straight to the cart page
            window.location.href = 'cart.html';
        });
    });

});