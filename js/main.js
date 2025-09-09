document.addEventListener('DOMContentLoaded', () => {

    // --- Stripe Payment Logic ---
    // This part remains the same. Remember to replace with your actual publishable key.
    // It requires a backend to function fully.
    const stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY_HERE');
    const buyButtons = document.querySelectorAll('.buy-button');

    buyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.productId;
            console.log(`Initiating purchase for product: ${productId}`);
            // This function call needs a backend to work.
            // createCheckoutSession(productId); 
            alert('This is a demo. Backend for Stripe checkout is required.');
        });
    });

    // NOTE: The createCheckoutSession function is omitted here for brevity,
    // but it would be the same as in the previous response, making a fetch
    // call to your backend server.


    // --- NEW: Product Filtering Logic ---
    const filterContainer = document.getElementById('product-filters');
    if (filterContainer) {
        const filterButtons = filterContainer.querySelectorAll('.filter-btn');
        const productCards = document.querySelectorAll('#products-grid .product-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const selectedFilter = e.target.dataset.filter;

                // Update active button style
                filterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');

                // Show/hide product cards
                productCards.forEach(card => {
                    const cardCategory = card.dataset.category;
                    if (selectedFilter === 'all' || selectedFilter === cardCategory) {
                        card.style.display = 'flex'; // Use flex to match CSS
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

});
