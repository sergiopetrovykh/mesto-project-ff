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

const addCardForm = addCardPopup.querySelector(".popup__form");
const cardNameInput = addCardPopup.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkInput = addCardPopup.querySelector(".popup__input_type_url");

// Создание карточки
function createCardElement(cardData) {
  return createCard(
    cardData,
    handleImageClick,
    handleLikeClick,
    handleDeleteClick
  );
}

// Отображение карточек на странице
function renderCards(cards) {
  cards.forEach((cardData) =>
    cardList.appendChild(createCardElement(cardData))
  );
}

// Обработчик открытия попапа редактирования профиля
function handleProfileEdit() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profilePopup);
}

// Обработчик закрытия попапа
function handleCloseButton(popup) {
  closeModal(popup);
}

// Обработка формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profilePopup);
}

// Обработчик клика по изображению карточки
function handleImageClick(data) {
  const popupImage = viewImagePopup.querySelector(".popup__image");
  const popupCaption = viewImagePopup.querySelector(".popup__caption");
  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupCaption.textContent = data.name;
  openModal(viewImagePopup);
}

// Обработчик лайка карточки
function handleLikeClick(evt) {
  evt.target.classList.toggle("card__like-button_active");
}

// Обработчик удаления карточки
function handleDeleteClick(evt) {
  evt.target.closest(".card").remove();
}

// Обработка формы добавления карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  cardList.prepend(createCardElement(cardData));
  closeModal(addCardPopup);
  addCardForm.reset();
}

// Инициализация при загрузке страницы
renderCards(initialCards);

// Открытие попапа редактирования профиля
profileEditButton.addEventListener("click", handleProfileEdit);

// Закрытие попапа редактирования профиля
profileCloseButton.addEventListener("click", () =>
  handleCloseButton(profilePopup)
);

// Обработка формы редактирования профиля
profileForm.addEventListener("submit", handleProfileFormSubmit);

// Открытие попапа добавления карточки
addCardButton.addEventListener("click", () => openModal(addCardPopup));

// Закрытие попапа добавления карточки
addCardCloseButton.addEventListener("click", () =>
  handleCloseButton(addCardPopup)
);

// Добавление обработчика формы добавления карточки
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// Закрытие попапа просмотра изображения
viewImageCloseButton.addEventListener("click", () =>
  closeModal(viewImagePopup)
);
