//в файле modal.js описаны функции для работы с модальными окнами: функция открытия модального окна, функция закрытия модального окна, функция-обработчик события нажатия Esc и функция-обработчик события клика по оверлею;
//файл modal.js. Экспортируем функции openModal и closeModal, принимающие в качестве аргумента DOM-элемент модального окна, с которым нужно произвести действие.

// Объявление функций

// Обработчик клика по оверлею
function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.target);
  }
}

// Функция открытия модального окна (поп-ап). modal: элемент модального окна, который нужно открыть. Этот элемент должен иметь класс popup.
function openModal(modal) {
  // Проверка наличия элемента и класса. Функция сначала проверяет, существует ли переданный элемент modal и имеет ли он класс popup. Это предотвращает ошибочное открытие несуществующего или неправильного элемента
  if (modal && modal.classList.contains("popup")) {
    // Добавляем класс для анимации
    modal.classList.add("popup_is-animated");

    // Делаем небольшую задержку в 10 миллисекунд перед добавлением класса открытия, чтобы анимация сработала
    setTimeout(() => {
      modal.classList.add("popup_is-opened");
    }, 10);
    // Добавление обработчиков событий:
    document.addEventListener(
      "keydown",
      closeModalOnEsc
    ); /* Этот обработчик (closeModalOnEsc) будет закрывать модальное окно при нажатии клавиши Escape. */
    modal.addEventListener(
      "click",
      handleOverlayClick
    ); /* Этот обработчик (handleOverlayClick) будет закрывать модальное окно, если клик произошел по оверлею (фону за модальным окном). */
  }
}

// Функция закрытия модального окна
function closeModal(modal) {
  if (modal && modal.classList.contains("popup_is-opened")) {
    modal.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closeModalOnEsc);
    modal.removeEventListener("click", handleOverlayClick);

    // Ждать завершения анимации перед удалением класса popup_is-animated
    modal.addEventListener(
      "transitionend",
      () => {
        if (!modal.classList.contains("popup_is-opened")) {
          modal.classList.remove("popup_is-animated");
        }
      },
      { once: true }
    );
  }
}
// Аргументы: modal - DOM-элемент модального окна, которое нужно закрыть.
// Проверка: Сначала проверяется, что modal не равен null и содержит класс popup_is-opened.
// Действие: Если проверка пройдена, у элемента modal удаляется класс popup_is-opened, что скрывает модальное окно.
// Событие: Удаляется обработчик события нажатия клавиши Esc, так как окно больше не активно.

// Функция закрытия модального окна при нажатии на Esc
function closeModalOnEsc(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    if (openPopup) {
      closeModal(openPopup);
    }
  }
}

// Назначение: Эта функция обрабатывает событие нажатия клавиши Esc и закрывает открытое модальное окно.
// Аргументы: evt - объект события.
// Проверка: Проверяется, что нажатая клавиша - Escape.
// Действие: Если проверка пройдена, ищется элемент с классом popup_is-opened. Если такой элемент найден, вызывается функция closeModal для его закрытия.

// Экспорт функций, чтобы их можно было использовать в других модулях.
export { openModal, closeModal };
