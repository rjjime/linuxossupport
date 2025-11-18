// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const form = document.getElementById('consultationForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .process-step, .support-card').forEach(element => {
        observer.observe(element);
    });
});


function selectPack(packType) {
    // You can customize this function to handle the pack selection
    const pack = packType === '20hour' ? '20-Hour' : '40-Hour';
    window.location.href = `#contact?pack=${packType}`;
}


/*
// Initialize EmailJS with API Key
emailjs.init("z8Mpl-RexmK6SSogd"); // Replace with your actual EmailJS User ID/API key

// Handler for Consultation Form Submission
document.getElementById("consultationForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Validate form fields (optional, but recommended)
    const companyName = document.getElementById("companyName").value;
    const contactName = document.getElementById("contactName").value;
    const email = document.getElementById("email").value;
    const serviceType = document.getElementById("service").value;
    const message = document.getElementById("message").value;

    if (!companyName || !contactName || !email || !serviceType || !message) {
        alert("Please fill in all required fields.");
        return;
    }

    // Send email using EmailJS
    emailjs.send(
        "service_7039b2d", // Replace with your EmailJS Service ID
        "contact_form", // Replace with your EmailJS Template ID
        {
            company_name: companyName,
            from_name: contactName,
            from_email: email,
            service_type: serviceType,
            message: message,
        },
        "z8Mpl-RexmK6SSogd" // Replace with your actual EmailJS API key
    ).then(
        function () {
            alert("Consultation request sent successfully!");
            document.getElementById("consultationForm").reset(); // Reset the form
        },
        function (error) {
            console.error("Error sending consultation request:", error);
            alert("Failed to send the consultation request. Please try again later.");
        }
    );
});         */







// Initialize EmailJS with API Key
emailjs.init("z8Mpl-RexmK6SSogd"); // Replace with your actual EmailJS API key

// Handler for Consultation Form Submission
document.getElementById("consultationForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    
    // Send form data using EmailJS
    emailjs.sendForm(
        "service_7039b2d", // Replace with your EmailJS Service ID
        "contact_form", // Replace with your EmailJS Template ID
        this, // Current form element
        "z8Mpl-RexmK6SSogd" // Replace with your actual EmailJS API key
    ).then(
        function () {
            alert("Consultation request sent successfully!");
            document.getElementById("consultationForm").reset(); // Reset the form
        },
        function (error) {
            console.error("Error sending consultation request:", error);
            alert("Failed to send the consultation request. Please try again later.");
        }
    );
});

// Handler for Contact Form Submission
document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const company = document.getElementById("company").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value;

    // Validate form fields (optional, but recommended)
    if (!company || !name || !email || !service || !message) {
        alert("Please fill in all required fields.");
        return;
    }

    // Send email using EmailJS
    emailjs.send(
        "service_7039b2d", // Replace with your EmailJS Service ID
        "contact_form", // Replace with your EmailJS Template ID
        {
            company_name: company,
            from_name: name,
            from_email: email,
            service_type: service,
            message: message,
        },
        "z8Mpl-RexmK6SSogd" // Replace with your actual EmailJS API key
    ).then(
        function () {
            alert("Message sent successfully!");
            document.getElementById("contact-form").reset(); // Reset the form
        },
        function (error) {
            console.error("Error sending message:", error);
            alert("Failed to send your message. Please try again later.");
        }
    );
});


// Enhanced Cookie Consent Handler
function initCookieConsent() {
  const modal = new bootstrap.Modal(document.getElementById('cookieConsentModal'), { backdrop: 'static', keyboard: false });
  const acceptAllBtn = document.getElementById('acceptAllCookies');
  const rejectAllBtn = document.getElementById('rejectAllCookies');
  const saveCustomBtn = document.getElementById('saveCustomCookies');
  const manageLink = document.getElementById('manageCookiesLink');
  const checkboxes = {
    analytics: document.getElementById('analyticsCookies'),
    marketing: document.getElementById('marketingCookies'),
    functional: document.getElementById('functionalCookies')
  };

  // Detect EU (basic heuristic; for production, use a geo-IP service)
  const isEU = navigator.language.includes('de') || navigator.language.includes('fr') || window.location.hostname.includes('eu'); // Customize as needed

  // Load saved preferences
  const savedConsent = JSON.parse(localStorage.getItem('cookieConsent')) || null;
  if (!savedConsent) {
    modal.show(); // Show intrusive popup on first visit
  } else {
    applyPreferences(savedConsent);
  }

  // Accept All
  acceptAllBtn.addEventListener('click', () => {
    const consent = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
      timestamp: new Date().toISOString(),
      ip: 'logged-via-server', // In production, fetch from server
      region: isEU ? 'EU' : 'Non-EU'
    };
    saveConsent(consent);
    modal.hide();
  });

  // Reject All
  rejectAllBtn.addEventListener('click', () => {
    const consent = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
      timestamp: new Date().toISOString(),
      ip: 'logged-via-server',
      region: isEU ? 'EU' : 'Non-EU'
    };
    saveConsent(consent);
    modal.hide();
  });

  // Save Custom
  saveCustomBtn.addEventListener('click', () => {
    const consent = {
      essential: true,
      analytics: checkboxes.analytics.checked,
      marketing: checkboxes.marketing.checked,
      functional: checkboxes.functional.checked,
      timestamp: new Date().toISOString(),
      ip: 'logged-via-server',
      region: isEU ? 'EU' : 'Non-EU'
    };
    saveConsent(consent);
    modal.hide();
  });

  // Manage Cookies Link (footer)
  manageLink.addEventListener('click', (e) => {
    e.preventDefault();
    const prefs = JSON.parse(localStorage.getItem('cookieConsent')) || { analytics: false, marketing: false, functional: false };
    checkboxes.analytics.checked = prefs.analytics;
    checkboxes.marketing.checked = prefs.marketing;
    checkboxes.functional.checked = prefs.functional;
    modal.show();
  });

  // Manage Cookies Link (body text in privacy.html)
  const manageBodyLink = document.getElementById('manageCookiesBodyLink');
  if (manageBodyLink) {
    manageBodyLink.addEventListener('click', (e) => {
      e.preventDefault();
      const prefs = JSON.parse(localStorage.getItem('cookieConsent')) || { analytics: false, marketing: false, functional: false };
      checkboxes.analytics.checked = prefs.analytics;
      checkboxes.marketing.checked = prefs.marketing;
      checkboxes.functional.checked = prefs.functional;
      modal.show();
    });
  }

  // Save and Apply
  function saveConsent(consent) {
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    applyPreferences(consent);
  }

  // Apply Preferences (Block/Enable Scripts)
  function applyPreferences(consent) {
    // Block non-essential until consent
    if (!consent.analytics) {
      // Disable Google Analytics, etc. (e.g., remove scripts or set flags)
      console.log('Analytics disabled');
    } else {
      // Load analytics script
      console.log('Analytics enabled');
    }
    if (!consent.marketing) {
      // Disable marketing pixels
      console.log('Marketing disabled');
    } else {
      console.log('Marketing enabled');
    }
    if (!consent.functional) {
      // Disable functional features
      console.log('Functional disabled');
    } else {
      console.log('Functional enabled');
    }
  }
}

// Initialize on DOM load (will be called after footer loads in index.html/privacy.html)
