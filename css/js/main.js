// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // --- IMPORTANT ---
    // Replace this with your own PUBLISHABLE key from your Stripe Dashboard.
    // This key is safe to be in the frontend code.
    const stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY_HERE');

    const buyButtons = document.querySelectorAll('.buy-button');

    buyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.productId;
            console.log(`Initiating purchase for product: ${productId}`);

            // This is where you would call your backend to create a checkout session
            createCheckoutSession(productId);
        });
    });

    /**
     * This function contacts your BACKEND server.
     * The backend server then securely talks to Stripe to create a payment session.
     * * WHY A BACKEND IS NEEDED:
     * 1. Security: Your Stripe SECRET key must never be exposed in frontend code.
     * 2. Price Control: Your server should define the price, not the client, to prevent tampering.
     * 3. Inventory: Your server can check if the item is in stock before creating a payment.
     */
    const createCheckoutSession = (productId) => {
        // This is a CONCEPTUAL example. You need to build a backend endpoint
        // that accepts a productId and creates a Stripe Checkout session.
        fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId: productId }),
        })
        .then(response => response.json())
        .then(session => {
            // Once your backend sends back the session ID,
            // we redirect the user to Stripe's secure checkout page.
            return stripe.redirectToCheckout({ sessionId: session.id });
        })
        .then(result => {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer.
            if (result.error) {
                alert(result.error.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error setting up the payment. Please try again.');
        });
    };
});
