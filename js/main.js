// Initialize EmailJS
(function () {
  emailjs.init("ELSDKt0w6JSNDCtsY");
})();

// Header scroll effect
const header = document.querySelector(".header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    header.classList.remove("scroll-up");
    return;
  }

  if (currentScroll > lastScroll && !header.classList.contains("scroll-down")) {
    // Scroll down
    header.classList.remove("scroll-up");
    header.classList.add("scroll-down");
  } else if (
    currentScroll < lastScroll &&
    header.classList.contains("scroll-down")
  ) {
    // Scroll up
    header.classList.remove("scroll-down");
    header.classList.add("scroll-up");
  }

  lastScroll = currentScroll;
});

// Form validation and submission
const contactForm = document.getElementById("email-form");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Basic validation
    const formData = new FormData(contactForm);
    let isValid = true;
    const errors = {};

    if (!formData.get("fname").trim()) {
      errors.name = "Por favor, ingresa tu nombre";
      isValid = false;
    }

    if (!formData.get("email").trim()) {
      errors.email = "Por favor, ingresa tu email";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.get("email"))) {
      errors.email = "Por favor, ingresa un email válido";
      isValid = false;
    }

    if (!formData.get("message").trim()) {
      errors.message = "Por favor, ingresa tu mensaje";
      isValid = false;
    }

    // Display errors if any
    if (!isValid) {
      Object.entries(errors).forEach(([field, message]) => {
        const input = contactForm.querySelector(`[name="${field}"]`);
        const errorDiv = document.createElement("div");
        errorDiv.className = "error-message";
        errorDiv.textContent = message;

        // Remove any existing error message
        const existingError = input.parentNode.querySelector(".error-message");
        if (existingError) {
          existingError.remove();
        }

        input.parentNode.appendChild(errorDiv);
      });
      return;
    }

    // Submit form using EmailJS
    try {
      const submitButton = contactForm.querySelector(".submit-btn");
      submitButton.disabled = true;
      submitButton.textContent = "Enviando...";

      await emailjs.sendForm(
        "service_8yyfl95",
        "template_agdne2q",
        contactForm
      );

      // Clear form and show success message
      contactForm.reset();
      alert(
        "¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto."
      );
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde."
      );
    } finally {
      const submitButton = contactForm.querySelector(".submit-btn");
      submitButton.disabled = false;
      submitButton.textContent = "Enviar Mensaje";
    }
  });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add animation on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".animate-on-scroll");

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight * 0.75) {
      element.classList.add("animated");
    }
  });
};

window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);
