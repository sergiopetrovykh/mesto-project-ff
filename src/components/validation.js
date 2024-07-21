// Функция для проверки валидности поля
function checkInputValidity(inputElement, config) {
  let errorMessage = "";

  // Проверяем, если поле пустое и обязательно
  if (inputElement.validity.valueMissing) {
    errorMessage = "Вы пропустили это поле.";
  }
  // Проверяем минимальную длину
  else if (inputElement.validity.tooShort) {
    errorMessage = `Должно быть от ${inputElement.minLength} до ${inputElement.maxLength} символов.`;
  }
  // Проверяем допустимость символов
  else if (inputElement.validity.patternMismatch) {
    errorMessage = inputElement.dataset.errorMessage || "Неверный формат.";
  }
  // Проверяем тип значения (например, URL)
  else if (inputElement.validity.typeMismatch) {
    if (inputElement.type === "url") {
      errorMessage = "Введите адрес сайта.";
    } else {
      errorMessage = "Введите корректное значение.";
    }
  }

  inputElement.validity.valid
    ? hideError(inputElement, config)
    : showError(inputElement, errorMessage, config);
}

// Функция для скрытия сообщения об ошибке
function hideError(inputElement, config) {
  const errorElement = inputElement
    .closest(config.formSelector)
    .querySelector(`.${inputElement.name}-input-error`);

  if (errorElement) {
    errorElement.textContent = "";
    errorElement.classList.remove(config.errorClass);
    inputElement.classList.remove(config.inputErrorClass);
  }
}

// Функция для отображения сообщения об ошибке
function showError(inputElement, errorMessage, config) {
  const errorElement = inputElement
    .closest(config.formSelector)
    .querySelector(`.${inputElement.name}-input-error`);

  if (errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
    inputElement.classList.add(config.inputErrorClass);
  }
}

// Функция для проверки всех полей формы
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

// Функция для включения или отключения кнопки в зависимости от валидности формы
function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

// Функция для включения валидации
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      config.submitButtonSelector
    );

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
      });
    });

    formElement.addEventListener("submit", (event) => event.preventDefault());

    toggleButtonState(inputList, buttonElement, config);
  });
}

// Функция для очистки ошибок валидации
function clearValidation(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => hideError(inputElement, config));

  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
}

export { enableValidation, clearValidation };
