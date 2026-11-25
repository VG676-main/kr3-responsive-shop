(function () {
  var modal = document.getElementById("order-modal");
  var openButtons = document.querySelectorAll("[data-open-modal]");
  var closeButtons = document.querySelectorAll("[data-close-modal]");
  var form = document.getElementById("modal-order-form");
  var nav = document.querySelector(".nav");
  var navToggle = document.querySelector(".nav-toggle");

  if (nav && navToggle) {
    navToggle.addEventListener("click", function () {
      var opened = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", opened ? "true" : "false");
    });
  }
  var nav = document.querySelector(".nav");
  var navToggle = document.querySelector(".nav-toggle");

  if (nav && navToggle) {
    navToggle.addEventListener("click", function () {
      var opened = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", opened ? "true" : "false");
    });
  }

  function openModal() {
    if (!modal) return;
    modal.classList.add("modal--open");
    document.body.classList.add("modal-open");
    var firstInput = modal.querySelector("input, textarea, select");
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("modal--open");
    document.body.classList.remove("modal-open");
  }

  openButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });
  });

  closeButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      closeModal();
    });
  });

  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  function showError(input, message) {
    input.classList.add("form__input--error");
    var error = input.parentElement.querySelector(".form__error");
    if (error) {
      error.textContent = message;
      error.classList.add("form__error--visible");
    }
  }

  function clearError(input) {
    input.classList.remove("form__input--error");
    var error = input.parentElement.querySelector(".form__error");
    if (error) {
      error.textContent = "";
      error.classList.remove("form__error--visible");
    }
  }

  function validateForm(currentForm) {
    var valid = true;
    var name = currentForm.querySelector("[name='name']");
    var phone = currentForm.querySelector("[name='phone']");
    var message = currentForm.querySelector("[name='message']");

    [name, phone, message].forEach(function (field) {
      if (field) clearError(field);
    });

    if (name && name.value.trim().length < 2) {
      showError(name, "Укажите имя (минимум 2 символа)");
      valid = false;
    }

    if (phone) {
      var digits = phone.value.replace(/\D/g, "");
      if (digits.length < 10) {
        showError(phone, "Введите телефон полностью");
        valid = false;
      }
    }

    if (message && message.hasAttribute("required") && message.value.trim().length < 5) {
      showError(message, "Напишите коротко, что нужно");
      valid = false;
    }

    return valid;
  }

  function bindForm(currentForm) {
    if (!currentForm) return;

    currentForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validateForm(currentForm)) return;

      var success = currentForm.querySelector(".form__success");
      if (success) success.classList.add("form__success--visible");
      currentForm.reset();
    });
  }

  bindForm(form);
  bindForm(document.getElementById("order-form"));
  bindForm(document.getElementById("contacts-form"));
})();
