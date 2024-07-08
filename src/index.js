//в файле index.js описана инициализация приложения и основная логика страницы: поиск DOM-элементов на странице и навешивание на них обработчиков событий; обработчики отправки форм, функция-обработчик события открытия модального окна для редактирования профиля; функция открытия модального окна изображения карточки. Также в index.js находится код, который отвечает за отображение шести карточек при открытии страницы.

//В файле index.js должны остаться:
//объявления и инициализация глобальных констант и переменных с DOM-элементами страницы,
//обработчики событий (при открытии и закрытии попапов; при отправке форм; обработчик, открывающий попап при клике по изображению карточки);
//вызовы других функций, подключённых из созданных модулей, которым нужно будет передавать объявленные здесь переменные и обработчики.

// Импорт стилей
import "./pages/index.css";

// Импорт данных и функций для работы с карточками и модальными окнами
import { initialCards } from "./components/cards.js";
import { createCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";

// Объявления и инициализация глобальных переменных с DOM-элементами страницы
const cardList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_edit");
const profileCloseButton = profilePopup.querySelector(".popup__close");
const addCardButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardCloseButton = addCardPopup.querySelector(".popup__close");
const viewImagePopup = document.querySelector(".popup_type_image");
const viewImageCloseButton = viewImagePopup.querySelector(".popup__close");
const profileForm = profilePopup.querySelector(".popup__form");
const nameInput = profilePopup.querySelector(".popup__input_type_name");
const jobInput = profilePopup.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Создание карточки
function createCardElement(cardData) {
  const cardElement = createCard(
    cardData,
    handleImageClick,
    handleLikeClick,
    handleDeleteClick
  );
  return cardElement;
}

// Отображение карточек на странице
function renderCards(cards) {
  cards.forEach((cardData) => {
    const cardElement = createCardElement(cardData);
    cardList.appendChild(cardElement);
  });
}

// Обработчики событий

// Открытие попапа редактирования профиля
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profilePopup);
});

// Закрытие попапа редактирования профиля
profileCloseButton.addEventListener("click", () => closeModal(profilePopup));

// Обработка формы редактирования профиля
profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profilePopup);
});

// Открытие попапа добавления карточки
addCardButton.addEventListener("click", () => openModal(addCardPopup));
addCardCloseButton.addEventListener("click", () => closeModal(addCardPopup));

// Отображение изображения карточки в попапе при клике
function handleImageClick(data) {
  const popupImage = viewImagePopup.querySelector(".popup__image");
  const popupCaption = viewImagePopup.querySelector(".popup__caption");
  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupCaption.textContent = data.name;
  openModal(viewImagePopup);
}

// Обработчик лайка (передаем как колбэк в createCard)
function handleLikeClick(evt) {
  evt.target.classList.toggle("card__like-button_active");
}

// Обработчик удаления карточки (передаем как колбэк в createCard)
function handleDeleteClick(evt) {
  evt.target.closest(".card").remove();
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  renderCards(initialCards);
});

// Закрытие попапа просмотра изображения
viewImageCloseButton.addEventListener("click", () =>
  closeModal(viewImagePopup)
);
