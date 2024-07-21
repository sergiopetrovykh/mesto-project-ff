// Функция для проверки валидности поля
function checkInputValidity(inputElement, config) {
  let errorMessage = ""; // Переменная для хранения сообщения об ошибке

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

  // Проверяем, является ли поле валидным
  inputElement.validity.valid
    ? hideError(inputElement, config) // Если поле валидно, скрываем ошибку
    : showError(inputElement, errorMessage, config); // Если поле не валидно, показываем ошибку
}

// Функция для скрытия сообщения об ошибке
function hideError(inputElement, config) {
  // Находим элемент ошибки, связанный с полем ввода
  const errorElement = inputElement
    .closest(config.formSelector) // Ищем ближайший родительский элемент формы
    .querySelector(`.${inputElement.name}-input-error`); // Ищем элемент ошибки по имени поля

  if (errorElement) {
    errorElement.textContent = ""; // Очищаем текст ошибки
    errorElement.classList.remove(config.errorClass); // Убираем класс для отображения ошибки
    inputElement.classList.remove(config.inputErrorClass); // Убираем класс для ошибки поля ввода
  }
}

// Функция для отображения сообщения об ошибке
function showError(inputElement, errorMessage, config) {
  // Находим элемент ошибки, связанный с полем ввода
  const errorElement = inputElement
    .closest(config.formSelector) // Ищем ближайший родительский элемент формы
    .querySelector(`.${inputElement.name}-input-error`); // Ищем элемент ошибки по имени поля

  if (errorElement) {
    errorElement.textContent = errorMessage; // Устанавливаем текст ошибки
    errorElement.classList.add(config.errorClass); // Добавляем класс для отображения ошибки
    inputElement.classList.add(config.inputErrorClass); // Добавляем класс для ошибки поля ввода
  }
}

// Функция для проверки всех полей формы
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid); // Проверяем, есть ли невалидные поля
}

// Функция для включения или отключения кнопки в зависимости от валидности формы
function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    // Если есть невалидные поля
    buttonElement.classList.add(config.inactiveButtonClass); // Добавляем класс для неактивной кнопки
    buttonElement.disabled = true; // Отключаем кнопку
  } else {
    // Если все поля валидны
    buttonElement.classList.remove(config.inactiveButtonClass); // Убираем класс для неактивной кнопки
    buttonElement.disabled = false; // Включаем кнопку
  }
}

// Функция для включения валидации
function enableValidation(config) {
  // Находим все формы на странице, соответствующие конфигурации
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    // Находим все поля ввода и кнопку отправки в текущей форме
    const inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      config.submitButtonSelector
    );

    // Добавляем обработчик события для каждого поля ввода
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(inputElement, config); // Проверяем валидность поля
        toggleButtonState(inputList, buttonElement, config); // Управляем состоянием кнопки
      });
    });

    // Добавляем обработчик события для отправки формы
    formElement.addEventListener("submit", (event) => event.preventDefault()); // Отменяем стандартное поведение отправки формы

    // Устанавливаем начальное состояние кнопки отправки
    toggleButtonState(inputList, buttonElement, config);
  });
}

// Функция для очистки ошибок валидации
function clearValidation(formElement, config) {
  // Находим все поля ввода и кнопку отправки в текущей форме
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  // Скрываем все сообщения об ошибках для полей ввода
  inputList.forEach((inputElement) => hideError(inputElement, config));

  // Устанавливаем кнопку отправки в неактивное состояние
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
}

// Экспортируем функции для использования в других модулях
export { enableValidation, clearValidation };
