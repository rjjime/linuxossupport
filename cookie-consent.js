document.addEventListener("DOMContentLoaded", function() {
    const settingsLink = document.getElementById("cookieSettingsLink");
    if (settingsLink) {
      settingsLink.addEventListener("click", function(e) {
        e.preventDefault();
        // Show the cookie modal again
        const cookieModal = document.getElementById("cookieConsentModal");
        if (cookieModal) {
          cookieModal.style.display = "block";
        }
      });
    }
  });  