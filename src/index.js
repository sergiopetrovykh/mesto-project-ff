// Импортируем CSS стили и функции из других модулей
import "./pages/index.css";
import { createCard, handleLikeClick } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addNewCard,
  updateAvatar,
  deleteCard,
} from "./components/api.js";

// Объявления и инициализация глобальных переменных с DOM-элементами страницы
const cardList = document.querySelector(".places__list"); // Контейнер для карточек
const profileEditButton = document.querySelector(".profile__edit-button"); // Кнопка редактирования профиля
const profilePopup = document.querySelector(".popup_type_edit"); // Попап для редактирования профиля
const profileCloseButton = profilePopup.querySelector(".popup__close"); // Кнопка закрытия попапа профиля
const addCardButton = document.querySelector(".profile__add-button"); // Кнопка добавления новой карточки
const addCardPopup = document.querySelector(".popup_type_new-card"); // Попап для добавления новой карточки
const addCardCloseButton = addCardPopup.querySelector(".popup__close"); // Кнопка закрытия попапа добавления карточки
const viewImagePopup = document.querySelector(".popup_type_image"); // Попап для просмотра изображения карточки
const viewImageCloseButton = viewImagePopup.querySelector(".popup__close"); // Кнопка закрытия попапа просмотра изображения
const profileForm = profilePopup.querySelector(".popup__form"); // Форма редактирования профиля
const nameInput = profilePopup.querySelector(".popup__input_type_name"); // Поле ввода имени
const jobInput = profilePopup.querySelector(".popup__input_type_description"); // Поле ввода описания
const profileTitle = document.querySelector(".profile__title"); // Заголовок профиля
const profileDescription = document.querySelector(".profile__description"); // Описание профиля
const profileAvatar = document.querySelector(".profile__image"); // Аватар профиля
const addCardForm = addCardPopup.querySelector(".popup__form"); // Форма добавления карточки
const cardNameInput = addCardPopup.querySelector(
  ".popup__input_type_card-name"
); // Поле ввода названия карточки
const cardLinkInput = addCardPopup.querySelector(".popup__input_type_url"); // Поле ввода URL карточки

// Конфигурация для валидации форм
const validationConfig = {
  formSelector: ".popup__form", // Селектор формы
  inputSelector: ".popup__input", // Селектор полей ввода
  submitButtonSelector: ".popup__button", // Селектор кнопки отправки
  inactiveButtonClass: "popup__button_disabled", // Класс для неактивной кнопки
  inputErrorClass: "popup__input_type_error", // Класс для ошибочного ввода
  errorClass: "popup__error_visible", // Класс для отображения ошибки
};

// Статичные элементы попапов
const confirmPopup = document.querySelector(".popup_type_confirm"); // Попап подтверждения удаления
const confirmButton = confirmPopup.querySelector(".popup__button_confirm"); // Кнопка подтверждения в попапе
const popupImage = viewImagePopup.querySelector(".popup__image"); // Изображение в попапе
const popupCaption = viewImagePopup.querySelector(".popup__caption"); // Подпись в попапе

// Функция для отображения состояния загрузки
const renderLoading = ({ buttonElement, loadingText }) => {
  buttonElement.textContent = loadingText; // Устанавливаем текст кнопки в зависимости от состояния загрузки
};

// Функция для открытия попапа редактирования профиля и установки значений полей формы
function handleProfileEdit() {
  nameInput.value = profileTitle.textContent; // Устанавливаем значение поля имени
  jobInput.value = profileDescription.textContent; // Устанавливаем значение поля описания
  openModal(profilePopup); // Открываем попап редактирования профиля
  clearValidation(profileForm, validationConfig); // Очищаем ошибки валидации
}

// Функция для обработки отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Отменяем стандартное поведение формы

  const submitButton = profileForm.querySelector(
    validationConfig.submitButtonSelector
  ); // Находим кнопку отправки формы
  renderLoading({ buttonElement: submitButton, loadingText: "Сохранение..." }); // Показываем состояние загрузки

  const newName = nameInput.value; // Получаем новое имя
  const newAbout = jobInput.value; // Получаем новое описание

  updateUserInfo(newName, newAbout) // Отправляем запрос на обновление информации профиля
    .then((userInfo) => {
      profileTitle.textContent = userInfo.name; // Обновляем заголовок профиля
      profileDescription.textContent = userInfo.about; // Обновляем описание профиля
      closeModal(profilePopup); // Закрываем попап редактирования профиля
    })
    .catch((err) => console.log(err)) // Ловим ошибки
    .finally(() => {
      renderLoading({ buttonElement: submitButton, loadingText: "Сохранить" }); // Возвращаем состояние кнопки после завершения загрузки
    });
}

// Функция для обработки отправки формы добавления новой карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault(); // Отменяем стандартное поведение формы

  const submitButton = addCardForm.querySelector(
    validationConfig.submitButtonSelector
  ); // Находим кнопку отправки формы
  renderLoading({ buttonElement: submitButton, loadingText: "Создание..." }); // Показываем состояние загрузки

  const cardData = {
    name: cardNameInput.value, // Получаем название карточки
    link: cardLinkInput.value, // Получаем URL карточки
  };

  addNewCard(cardData.name, cardData.link) // Отправляем запрос на добавление новой карточки
    .then((newCard) => {
      const userId = newCard.owner._id; // Получаем ID владельца карточки
      cardList.prepend(
        createCard(
          newCard,
          handleImageClick,
          handleLikeClick,
          handleDeleteClick,
          userId
        ) // Передаем необходимые обработчики в createCard
      ); // Добавляем новую карточку в начало списка карточек
      closeModal(addCardPopup); // Закрываем попап добавления карточки
      addCardForm.reset(); // Очищаем поля формы
      clearValidation(addCardForm, validationConfig); // Очищаем ошибки валидации
    })
    .catch((err) => console.log(err)) // Ловим ошибки
    .finally(() => {
      renderLoading({ buttonElement: submitButton, loadingText: "Создать" }); // Возвращаем состояние кнопки после завершения загрузки
    });
}

// Функция для открытия попапа просмотра изображения карточки
function handleImageClick(data) {
  popupImage.src = data.link; // Устанавливаем источник изображения
  popupImage.alt = data.name; // Устанавливаем альтернативный текст
  popupCaption.textContent = data.name; // Устанавливаем подпись изображения

  openModal(viewImagePopup); // Открываем попап просмотра изображения
}

// Обработчик открытия попапа подтверждения удаления
function handleDeleteClick(evt, cardId, cardElement) {
  openModal(confirmPopup); // Открываем попап подтверждения удаления

  confirmButton.onclick = () => {
    renderLoading({ buttonElement: confirmButton, loadingText: "Удаление..." }); // Показываем состояние загрузки

    deleteCard(cardId) // Отправляем запрос на удаление карточки
      .then(() => {
        cardElement.remove(); // Удаляем карточку из DOM
        closeModal(confirmPopup); // Закрываем попап подтверждения удаления
      })
      .catch((err) => console.log(err)) // Ловим ошибки
      .finally(() => {
        renderLoading({ buttonElement: confirmButton, loadingText: "Да" }); // Возвращаем состояние кнопки после завершения загрузки
      });
  };
}

// Функция для создания элемента карточки
function createCardElement(cardData, userId) {
  return createCard(
    cardData,
    handleImageClick,
    handleLikeClick,
    handleDeleteClick,
    userId
  ); // Передаем необходимые обработчики
}

// Функция для рендеринга всех карточек
function renderCards(cards, userId) {
  cards.forEach((cardData) =>
    cardList.appendChild(createCardElement(cardData, userId))
  ); // Добавляем каждую карточку в контейнер
}

// Функция для рендеринга информации о пользователе
function renderUserInfo({ name, about, avatar }) {
  profileTitle.textContent = name; // Обновляем заголовок профиля
  profileDescription.textContent = about; // Обновляем описание профиля
  profileAvatar.style.backgroundImage = `url(${avatar})`; // Обновляем аватар профиля
}

// Функция для открытия попапа редактирования аватара
function handleEditAvatarClick() {
  openModal(avatarPopup); // Открываем попап редактирования аватара
  avatarForm.reset(); // Очищаем поля формы
  clearValidation(avatarForm, validationConfig); // Очищаем ошибки валидации
}

// Функция для обработки отправки формы редактирования аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault(); // Отменяем стандартное поведение формы

  const submitButton = avatarForm.querySelector(
    validationConfig.submitButtonSelector
  ); // Находим кнопку отправки формы
  renderLoading({ buttonElement: submitButton, loadingText: "Сохранение..." }); // Показываем состояние загрузки
  const newAvatar = avatarInput.value; // Получаем новый URL аватара

  updateAvatar(newAvatar) // Отправляем запрос на обновление аватара
    .then((userInfo) => {
      profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`; // Обновляем аватар профиля
      closeModal(avatarPopup); // Закрываем попап редактирования аватара
    })
    .catch((err) => console.log(err)) // Ловим ошибки
    .finally(() => {
      renderLoading({ buttonElement: submitButton, loadingText: "Сохранить" }); // Возвращаем состояние кнопки после завершения загрузки
    });
}

// Получаем информацию о пользователе и начальные карточки с сервера
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, initialCards]) => {
    renderUserInfo(userInfo); // Рендерим информацию о пользователе
    renderCards(initialCards, userInfo._id); // Рендерим начальные карточки
  })
  .catch((err) => console.log(err)); // Ловим ошибки

// Устанавливаем обработчики событий для различных элементов страницы
profileEditButton.addEventListener("click", handleProfileEdit); // Открытие попапа редактирования профиля
profileCloseButton.addEventListener("click", () => closeModal(profilePopup)); // Закрытие попапа редактирования профиля
profileForm.addEventListener("submit", handleProfileFormSubmit); // Обработка отправки формы редактирования профиля

addCardButton.addEventListener("click", () => {
  openModal(addCardPopup); // Открытие попапа добавления карточки
  addCardForm.reset(); // Очищаем поля формы
  clearValidation(addCardForm, validationConfig); // Очищаем ошибки валидации
});

addCardCloseButton.addEventListener("click", () => closeModal(addCardPopup)); // Закрытие попапа добавления карточки
addCardForm.addEventListener("submit", handleAddCardFormSubmit); // Обработка отправки формы добавления карточки

viewImageCloseButton.addEventListener("click", () =>
  closeModal(viewImagePopup)
); // Закрытие попапа просмотра изображения

const avatarPopup = document.querySelector(".popup_type_edit-avatar"); // Попап для редактирования аватара
const avatarForm = avatarPopup.querySelector(".popup__form"); // Форма редактирования аватара
const avatarInput = avatarPopup.querySelector(".popup__input_type_url"); // Поле ввода URL аватара
const avatarCloseButton = avatarPopup.querySelector(".popup__close"); // Кнопка закрытия попапа редактирования аватара

// Добавляем обработчики событий для редактирования аватара
const editAvatarButton = document.querySelector(".profile__image"); // Кнопка редактирования аватара

editAvatarButton.addEventListener("click", handleEditAvatarClick); // Открытие попапа редактирования аватара
avatarCloseButton.addEventListener("click", () => closeModal(avatarPopup)); // Закрытие попапа редактирования аватара
avatarForm.addEventListener("submit", handleAvatarFormSubmit); // Обработка отправки формы редактирования аватара

// Включаем валидацию для всех форм на странице
enableValidation(validationConfig);
