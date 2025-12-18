// DOM Elements
const tripForm = document.getElementById('trip-form');
const destinationSelect = document.getElementById('destination');
const checkInInput = document.getElementById('check-in');
const checkOutInput = document.getElementById('check-out');
const travelersInput = document.getElementById('travelers');
const budgetSelect = document.getElementById('budget');

// Set minimum date for check-in to today
const today = new Date().toISOString().split('T')[0];
checkInInput.min = today;

// Update min date for check-out based on check-in date
checkInInput.addEventListener('change', () => {
    if (checkInInput.value) {
        checkOutInput.min = checkInInput.value;
        if (checkOutInput.value && checkOutInput.value < checkInInput.value) {
            checkOutInput.value = '';
        }
    }
});

// Form submission handler
tripForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = {
        destination: destinationSelect.value,
        checkIn: checkInInput.value,
        checkOut: checkOutInput.value,
        travelers: travelersInput.value,
        interests: Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(el => el.value),
        budget: budgetSelect.value,
        specialRequests: document.getElementById('special-requests').value
    };
    
    // Here you would typically send this data to a server
    console.log('Trip details submitted:', formData);
    
    // Show success message (in a real app, you'd handle the response from the server)
    alert('Thank you for your trip request! We\'ll get back to you shortly with a personalized travel plan.');
    
    // Reset form
    tripForm.reset();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.card, .section-title, .testimonial');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('fade-in');
        }
    });
};

// Initial check on page load
window.addEventListener('load', animateOnScroll);

// Check on scroll
window.addEventListener('scroll', animateOnScroll);

// Initialize date picker with min date
const initializeDatePicker = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Format dates as YYYY-MM-DD
    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };
    
    // Set min date for check-in to today
    checkInInput.min = formatDate(today);
    
    // Set min date for check-out to tomorrow
    checkOutInput.min = formatDate(tomorrow);
};

// Call the function when the page loads
window.addEventListener('load', initializeDatePicker);

// Mobile menu toggle (if you add a mobile menu in the future)
const mobileMenuToggle = () => {
    // This is a placeholder for mobile menu functionality
    // You would implement this when adding a responsive mobile menu
    console.log('Mobile menu toggle clicked');
};

// Add event listener for mobile menu button (if you add one)
const mobileMenuButton = document.querySelector('.mobile-menu-button');
if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', mobileMenuToggle);
}

// Form validation
const validateForm = () => {
    let isValid = true;
    const errors = [];
    
    if (!destinationSelect.value) {
        errors.push('Please select a destination');
        isValid = false;
    }
    
    if (!checkInInput.value) {
        errors.push('Please select a check-in date');
        isValid = false;
    }
    
    if (!checkOutInput.value) {
        errors.push('Please select a check-out date');
        isValid = false;
    } else if (new Date(checkOutInput.value) <= new Date(checkInInput.value)) {
        errors.push('Check-out date must be after check-in date');
        isValid = false;
    }
    
    if (!travelersInput.value || travelersInput.value < 1) {
        errors.push('Please enter a valid number of travelers');
        isValid = false;
    }
    
    return { isValid, errors };
};

// Add input validation on form submission
tripForm.addEventListener('submit', (e) => {
    const { isValid, errors } = validateForm();
    
    if (!isValid) {
        e.preventDefault();
        alert(errors.join('\n'));
    }
});

// Add loading state to form submission
const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const submitButton = tripForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = 'Planning...';
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        alert('Your trip has been planned successfully! We\'ll be in touch with the details.');
        tripForm.reset();
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error planning your trip. Please try again.');
    } finally {
        // Re-enable button and restore text
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }
};

// Add event listener for form submission
tripForm.addEventListener('submit', handleFormSubmit);