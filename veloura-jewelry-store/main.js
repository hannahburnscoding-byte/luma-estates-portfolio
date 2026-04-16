const menuToggle = document.querySelector("[data-menu-toggle]");
const siteNav = document.querySelector("[data-site-nav]");
const navLinks = document.querySelectorAll(".site-nav a");
const revealItems = document.querySelectorAll("[data-reveal]");
const filterButtons = document.querySelectorAll("[data-filter]");
const productCards = document.querySelectorAll(".product-card");
const cartOpenBtn = document.querySelector("[data-cart-open]");
const cartCloseBtn = document.querySelector("[data-cart-close]");
const cartDrawer = document.querySelector("[data-cart-drawer]");
const backdrop = document.querySelector("[data-backdrop]");
const cartItemsElement = document.querySelector("[data-cart-items]");
const cartCountElement = document.querySelector("[data-cart-count]");
const cartTotalElement = document.querySelector("[data-cart-total]");
const addButtons = document.querySelectorAll(".add-btn");
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");
const chatOpenButtons = document.querySelectorAll("[data-chat-open]");
const chatCloseButton = document.querySelector("[data-chat-close]");
const chatWidget = document.querySelector("[data-chat-widget]");
const chatForm = document.querySelector("[data-chat-form]");
const chatBody = document.querySelector("[data-chat-body]");
const checkoutButtons = document.querySelectorAll(".checkout-btn");
const checkoutForm = document.querySelector("[data-checkout-form]");
const checkoutStatus = document.querySelector("[data-checkout-status]");
const year = document.querySelector("[data-year]");

const cart = [];

window.requestAnimationFrame(() => {
  document.body.classList.remove("is-loading");
});

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav.setAttribute("data-open", String(!expanded));
    menuToggle.setAttribute("aria-label", !expanded ? "Close navigation" : "Open navigation");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (!menuToggle || !siteNav) {
      return;
    }
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    siteNav.setAttribute("data-open", "false");
  });
});

function updateCartUI() {
  if (!cartItemsElement || !cartCountElement || !cartTotalElement) {
    return;
  }

  cartItemsElement.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    total += item.price;
    const itemNode = document.createElement("li");
    itemNode.className = "cart-item";
    itemNode.innerHTML = `<span>${item.name}</span><strong>$${item.price.toLocaleString()}</strong>`;
    cartItemsElement.appendChild(itemNode);
  });

  cartCountElement.textContent = String(cart.length);
  cartTotalElement.textContent = `$${total.toLocaleString()}`;
}

function openCart() {
  if (!cartDrawer || !backdrop) {
    return;
  }
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
  backdrop.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeCart() {
  if (!cartDrawer || !backdrop) {
    return;
  }
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  backdrop.hidden = true;
  document.body.style.overflow = "";
}

if (cartOpenBtn) {
  cartOpenBtn.addEventListener("click", openCart);
}
if (cartCloseBtn) {
  cartCloseBtn.addEventListener("click", closeCart);
}
if (backdrop) {
  backdrop.addEventListener("click", closeCart);
}

checkoutButtons.forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = "checkout.html";
  });
});

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const price = Number(button.getAttribute("data-price"));
    if (!name || Number.isNaN(price)) {
      return;
    }
    cart.push({ name, price });
    updateCartUI();
    openCart();
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.getAttribute("data-filter");
    filterButtons.forEach((node) => node.classList.remove("is-active"));
    button.classList.add("is-active");

    productCards.forEach((card) => {
      const category = card.getAttribute("data-category");
      const shouldShow = selected === "all" || selected === category;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, instance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          instance.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("revealed"));
}

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }
    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "there").trim();
    formStatus.textContent = `Thanks ${name}. Your concierge request has been received.`;
    contactForm.reset();
  });
}

function openChat() {
  if (!chatWidget) {
    return;
  }
  chatWidget.classList.add("open");
  chatWidget.setAttribute("aria-hidden", "false");
}

function closeChat() {
  if (!chatWidget) {
    return;
  }
  chatWidget.classList.remove("open");
  chatWidget.setAttribute("aria-hidden", "true");
}

function createChatMessage(text, role) {
  if (!chatBody) {
    return;
  }
  const message = document.createElement("article");
  message.className = `chat-message ${role}`;
  message.textContent = text;
  chatBody.appendChild(message);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function generateBotReply(input) {
  const value = input.toLowerCase();

  if (value.includes("shipping") || value.includes("delivery") || value.includes("arrive")) {
    return "Standard shipping is 3-5 business days. Signature pieces may take 7-10 days due to final quality checks.";
  }
  if (value.includes("return") || value.includes("exchange")) {
    return "You can return unworn pieces within 14 days. Exchanges and size adjustments are complimentary within 30 days.";
  }
  if (value.includes("size") || value.includes("resize") || value.includes("ring")) {
    return "For ring sizing, we recommend ordering your standard size and requesting a free resize at checkout notes.";
  }
  if (value.includes("diamond") || value.includes("ethic") || value.includes("source")) {
    return "All Veloura diamonds are conflict-free and accompanied by sourcing documentation and certification details.";
  }
  if (value.includes("appointment") || value.includes("custom") || value.includes("concierge")) {
    return "Absolutely. Share your preferred date and style, and our concierge team will schedule a private appointment.";
  }
  return "I can help with shipping, returns, sizing, sourcing, and concierge appointments. Tell me what you need.";
}

chatOpenButtons.forEach((button) => {
  button.addEventListener("click", openChat);
});

if (chatCloseButton) {
  chatCloseButton.addEventListener("click", closeChat);
}

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement) || !chatWidget) {
    return;
  }

  const clickedInsideChat = chatWidget.contains(target);
  const clickedChatOpenButton = target.closest("[data-chat-open]");

  if (!clickedInsideChat && !clickedChatOpenButton) {
    closeChat();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }
  closeCart();
  closeChat();
  if (menuToggle && siteNav) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    siteNav.setAttribute("data-open", "false");
  }
});

if (chatForm) {
  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(chatForm);
    const userInput = String(formData.get("chatInput") || "").trim();
    if (!userInput) {
      return;
    }

    createChatMessage(userInput, "user");
    const reply = generateBotReply(userInput);
    window.setTimeout(() => {
      createChatMessage(reply, "bot");
    }, 380);
    chatForm.reset();
  });
}

if (checkoutForm && checkoutStatus) {
  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!checkoutForm.checkValidity()) {
      checkoutForm.reportValidity();
      return;
    }
    const formData = new FormData(checkoutForm);
    const firstName = String(formData.get("firstName") || "there").trim();
    checkoutStatus.textContent = `Thank you ${firstName}. Your order has been placed and a confirmation email is on the way.`;
    checkoutForm.reset();
  });
}
