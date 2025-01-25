document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Collect form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Here you would typically send the form data to a backend service
        // For now, we'll just show a success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset the form
        contactForm.reset();
    });
});