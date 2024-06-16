// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// Нахожу контейнер (places__list) для карточек и шаблон (card-template)
const cardList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки createCard
// Создает и настраивает элемент карточки на основе переданных данных, а также добавляет обработчик для удаления карточки при клике на кнопку удаления. Затем возвращает созданный элемент, который можно вставить на страницу.
function createCard(data, deleteCallback) {
  const cardElement = cardTemplate.cloneNode(true).querySelector(".card");

  // querySelector для нахождения вложенных элементов
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  // Заполняю данных карточки
  cardImage.alt = data.name;
  cardImage.src = data.link;
  cardTitle.textContent = data.name;

  // Добавляю обработчик клика для удаления карточки
  cardDeleteButton.addEventListener("click", function () {
    deleteCallback(cardElement);
  });

  return cardElement;
}

// Функция для удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// Добавляю все карточки из файла cards.js (const initialCards) на страницу.
// cardData — это объект, содержащий данные каждой карточки - имя (name) и ссылку на картинку(link).
// deleteCard — это функция обратного вызова (колбэк) для удаления карточки.
// Функция createCard создает элемент карточки на основе данных cardData и возвращает этот элемент (DOM-элемент).
// Возвращенный элемент карточки (cardElement) добавляется (append) в контейнер карточек (cardList), который является элементом списка .places__list.
initialCards.forEach(function (cardData) {
  const cardElement = createCard(cardData, deleteCard);
  cardList.append(cardElement);
});