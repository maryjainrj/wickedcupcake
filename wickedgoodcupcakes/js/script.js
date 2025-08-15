document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#cart-badge').textContent = localStorage.getItem('cartCount') || 0;
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const toastLive = document.querySelector('#liveToast');
    if (toastLive) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive);
        addToCartButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                let cartCount = localStorage.getItem('cartCount') || 0;
                cartCount = parseInt(cartCount) + 1;
                localStorage.setItem('cartCount', cartCount);
                document.querySelector('#cart-badge').textContent = cartCount;
                toastBootstrap.show();
            });
        });
    }
    const checkoutBtn = document.querySelector('#checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            alert('Proceeding to secure checkout! (Simulation)');
        });
    }
    const newsletterForm = document.querySelector('#newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', event => {
            if (!newsletterForm.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                alert('Subscribed to newsletter! (Simulation)');
            }
            newsletterForm.classList.add('was-validated');
        }, false);
    }
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
});
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("customCupcakeForm");
    const cartBadge = document.getElementById("cart-badge");

    let cart = [];

    form?.addEventListener("submit", function (e) {
        e.preventDefault();

        const selectedOptions = Array.from(document.getElementById("flavorSelect").selectedOptions);
        if (selectedOptions.length === 0) {
            alert("Please select at least one flavor.");
            return;
        }

        const selectedFlavors = selectedOptions.map(option => option.value);
        const cupcakePack = {
            id: Date.now(),
            type: "Custom Pack",
            flavors: selectedFlavors
        };

        cart.push(cupcakePack);
        cartBadge.textContent = cart.length;

        alert(`Added to cart: ${selectedFlavors.join(", ")}`);
    });
});
const flavorSelect = document.getElementById("flavorSelect");
const flavorImage = document.getElementById("flavorImage");
const flavorImageContainer = document.getElementById("flavorImageContainer");

// Map flavors to image paths
const flavorImages = {
  "Chocolate": "images/flavors/chocolate.jpg",
  "Vanilla": "images/flavors/vanilla.jpg",
  "Red Velvet": "images/flavors/red-velvet.jpg",
  "Lemon": "images/flavors/lemon.jpg",
  "Peanut Butter": "images/flavors/peanut-butter.jpg",
  "Salted Caramel": "images/flavors/salted-caramel.jpg"
};

// Show image for the first selected flavor
flavorSelect.addEventListener("change", () => {
  const selected = Array.from(flavorSelect.selectedOptions);
  if (selected.length > 0) {
    const firstFlavor = selected[0].value;
    flavorImage.src = flavorImages[firstFlavor];
    flavorImage.alt = `${firstFlavor} cupcake`;
    flavorImage.classList.remove("d-none");
  } else {
    flavorImage.classList.add("d-none");
  }
});

// Handle custom cupcake form submission
document.getElementById("customCupcakeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const selectedFlavors = Array.from(flavorSelect.selectedOptions).map(opt => opt.value);
  if (selectedFlavors.length === 0) {
    alert("Please select at least one flavor.");
    return;
  }

  const customPack = {
    product: `Custom Cupcake Pack (${selectedFlavors.join(", ")})`,
    price: selectedFlavors.length * 4.99 // Example pricing
  };

  cart.push(customPack);
  updateCartBadge();
  showToast(`${customPack.product} has been added to your cart!`);

  // Button feedback
  const submitBtn = this.querySelector("button[type='submit']");
  const originalHTML = submitBtn.innerHTML;
  const originalClasses = submitBtn.className;

  submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Added!';
  submitBtn.classList.remove('btn-success');
  submitBtn.classList.add('btn-added');
  submitBtn.disabled = true;
  submitBtn.classList.add('pulse-animation');

  setTimeout(() => {
    submitBtn.innerHTML = originalHTML;
    submitBtn.className = originalClasses;
    submitBtn.disabled = false;
    submitBtn.classList.remove('pulse-animation');
  }, 2000);
});
