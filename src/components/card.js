//в файле card.js описаны функции для работы с карточками: функция создания карточки, функции-обработчики событий удаления и лайка карточки;
import { openModal, closeModal } from "./modal.js";
import { deleteCard } from "./api.js";

// Обработчик клика по кнопке лайка
function handleLikeClick(evt) {
  const likeButton = evt.target;
  const cardElement = likeButton.closest(".card");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  likeButton.classList.toggle("card__like-button_is-active");

  let likesCount = parseInt(likeCounter.textContent, 10) || 0;
  if (likeButton.classList.contains("card__like-button_is-active")) {
    likesCount += 1;
  } else {
    likesCount -= 1;
  }

  if (likesCount > 0) {
    likeCounter.textContent = likesCount;
    likeCounter.classList.add("card__like-counter_is-active");
  } else {
    likeCounter.textContent = "";
    likeCounter.classList.remove("card__like-counter_is-active");
  }
}

// Обработчик клика по кнопке удаления карточки
function handleDeleteClick(evt, cardId, cardElement) {
  evt.preventDefault();
  const confirmPopup = document.querySelector(".popup_type_confirm");
  const confirmButton = confirmPopup.querySelector(".popup__button_confirm");

  openModal(confirmPopup);

  confirmButton.onclick = () => {
    deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        closeModal(confirmPopup);
      })
      .catch((err) => console.log(err));
  };
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
  const cardElement = template.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  likeCounter.textContent = data.likes.length > 0 ? data.likes.length : "";
  if (data.likes.length > 0) {
    likeCounter.classList.add("card__like-counter_is-active");
  }

  cardImage.addEventListener("click", () => handleImageClick(data));
  likeButton.addEventListener("click", handleLikeClick);

  if (data.owner._id === userId) {
    deleteButton.addEventListener("click", (evt) =>
      handleDeleteClick(evt, data._id, cardElement)
    );
  } else {
    deleteButton.style.display = "none";
  }

  return cardElement;
}
// Основная функция для создания карточки
function createCard(
  data,
  handleImageClick,
  handleLikeClick,
  handleDeleteClick,
  userId
) {
  const template = document.getElementById("card-template").content;
  return createCardElement(
    template,
    data,
    handleImageClick,
    handleLikeClick,
    handleDeleteClick,
    userId
  );
}

export { createCard, handleLikeClick, handleDeleteClick };
