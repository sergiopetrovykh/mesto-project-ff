// Импортируем функции для работы с API
import { deleteCard, likeCard, unlikeCard } from "./api.js";

// Обработчик клика по кнопке лайка
function handleLikeClick(evt) {
  const likeButton = evt.target; // Кнопка лайка, по которой кликнули
  const cardElement = likeButton.closest(".card"); // Находим родительский элемент карточки
  const likeCounter = cardElement.querySelector(".card__like-counter"); // Элемент счётчика лайков
  const cardId = cardElement.dataset.cardId; // ID карточки

  if (likeButton.classList.contains("card__like-button_is-active")) {
    // Если лайк уже установлен, снимаем лайк
    unlikeCard(cardId)
      .then((updatedCard) => {
        likeButton.classList.remove("card__like-button_is-active"); // Убираем активный класс с кнопки лайка
        likeCounter.textContent =
          updatedCard.likes.length > 0 ? updatedCard.likes.length : ""; // Обновляем счётчик лайков
        if (updatedCard.likes.length === 0) {
          likeCounter.classList.remove("card__like-counter_is-active"); // Убираем класс активности счётчика
        }
      })
      .catch((err) => console.log(err)); // Ловим ошибки
  } else {
    // Если лайк не установлен, добавляем лайк
    likeCard(cardId)
      .then((updatedCard) => {
        likeButton.classList.add("card__like-button_is-active"); // Добавляем активный класс к кнопке лайка
        likeCounter.textContent = updatedCard.likes.length; // Обновляем счётчик лайков
        likeCounter.classList.add("card__like-counter_is-active"); // Добавляем класс активности счётчика
      })
      .catch((err) => console.log(err)); // Ловим ошибки
  }
}

// Функция для создания элемента карточки
function createCardElement(
  template,
  data,
  handleImageClick,
  handleLikeClick,
  handleDeleteClick,
  userId
) {
  const cardElement = template.querySelector(".card").cloneNode(true); // Клонируем шаблон карточки
  cardElement.dataset.cardId = data._id; // Устанавливаем ID карточки в data-атрибут

  const cardImage = cardElement.querySelector(".card__image"); // Изображение карточки
  const cardTitle = cardElement.querySelector(".card__title"); // Заголовок карточки
  const likeButton = cardElement.querySelector(".card__like-button"); // Кнопка лайка
  const deleteButton = cardElement.querySelector(".card__delete-button"); // Кнопка удаления
  const likeCounter = cardElement.querySelector(".card__like-counter"); // Счётчик лайков

  cardImage.src = data.link; // Устанавливаем URL изображения
  cardImage.alt = data.name; // Устанавливаем текст для альтернативного отображения
  cardTitle.textContent = data.name; // Устанавливаем текст заголовка
  likeCounter.textContent = data.likes.length > 0 ? data.likes.length : ""; // Устанавливаем счётчик лайков
  if (data.likes.length > 0) {
    likeCounter.classList.add("card__like-counter_is-active"); // Добавляем класс активности счётчика, если лайков больше 0
  }

  // Проверяем, лайкнул ли пользователь карточку
  if (data.likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active"); // Добавляем активный класс кнопке лайка, если пользователь лайкнул карточку
  }

  cardImage.addEventListener("click", () => handleImageClick(data)); // Добавляем обработчик клика по изображению
  likeButton.addEventListener("click", handleLikeClick); // Добавляем обработчик клика по кнопке лайка

  if (data.owner._id === userId) {
    // Если пользователь является владельцем карточки
    deleteButton.addEventListener(
      "click",
      (evt) => handleDeleteClick(evt, data._id, cardElement) // Добавляем обработчик клика по кнопке удаления
    );
  } else {
    deleteButton.style.display = "none"; // Скрываем кнопку удаления, чтобы другой пользователь не мог удалить чужие карточки
  }

  return cardElement; // Возвращаем созданный элемент карточки
}

// Основная функция для создания карточки
function createCard(
  data,
  handleImageClick,
  handleLikeClick,
  handleDeleteClick,
  userId
) {
  const template = document.getElementById("card-template").content; // Получаем содержимое шаблона карточки
  return createCardElement(
    template,
    data,
    handleImageClick,
    handleLikeClick,
    handleDeleteClick,
    userId
  ); // Создаём карточку и возвращаем её
}

export { createCard, handleLikeClick }; // Экспортируем функции для использования в других модулях
