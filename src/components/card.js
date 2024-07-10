//в файле card.js описаны функции для работы с карточками: функция создания карточки, функции-обработчики событий удаления и лайка карточки;

// Импорт функции для открытия модального окна
import { openModal } from "./modal.js";

// Обработчик клика по кнопке лайка
function handleLikeClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

// Обработчик клика по кнопке удаления карточки
function handleDeleteClick(evt) {
  evt.target.closest(".card").remove();
}

// Функция для создания элемента карточки
function createCardElement(
  template,
  data,
  handleImageClick,
  handleLikeClick,
  handleDeleteClick
) {
  const cardElement = template.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  cardImage.addEventListener("click", () => handleImageClick(data));
  likeButton.addEventListener("click", handleLikeClick);
  deleteButton.addEventListener("click", handleDeleteClick);

  return cardElement;
}

// Основная функция для создания карточки
function createCard(
  data,
  handleImageClick,
  handleLikeClick,
  handleDeleteClick
) {
  const template = document.getElementById("card-template").content;
  return createCardElement(
    template,
    data,
    handleImageClick,
    handleLikeClick,
    handleDeleteClick
  );
}

export { createCard, handleLikeClick, handleDeleteClick };
