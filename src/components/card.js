//в файле card.js описаны функции для работы с карточками: функция создания карточки, функции-обработчики событий удаления и лайка карточки;

// Обработчик клика по кнопке лайка
function handleLikeClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

// Обработчик клика по кнопке удаления карточки
function handleDeleteClick(evt) {
  evt.target.closest(".card").remove();
}

// Функция для создания элемента карточки
/* Эта функция создает и возвращает DOM-элемент карточки с заданными 
данными и прикрепленными обработчиками событий. 
Эта функция абстрагирует процесс создания карточки и добавления обработчиков событий, 
делая код более чистым и удобочитаемым. При вызове функции можно легко создать 
новую карточку с заданными
Функция принимает пять параметров: 
template: шаблон карточки, из которого будет создан новый элемент карточки.
data: объект, содержащий данные для карточки, такие как название и ссылка на изображение.
handleImageClick: функция-обработчик для события клика по изображению.
handleLikeClick: функция-обработчик для события клика по кнопке лайка.
handleDeleteClick: функция-обработчик для события клика по кнопке удаления.
*/
function createCardElement(
  template,
  data,
  handleImageClick,
  handleLikeClick,
  handleDeleteClick
) {
  const cardElement = template
    .querySelector(".card")
    .cloneNode(true); /* Клонирование шаблона карточки */
  // Поиск нужных элементов внутри клонированного элемента:
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  // Заполнение элемента данными:
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name; /* текстовое содержимое заголовка */
  // Добавление обработчиков событий:
  cardImage.addEventListener("click", () =>
    handleImageClick(data)
  ); /* при клике по изображению вызывается функция handleImageClick, которая получает объект data в качестве аргумента. */
  likeButton.addEventListener(
    "click",
    handleLikeClick
  ); /* при клике по кнопке лайка вызывается функция handleLikeClick */
  deleteButton.addEventListener(
    "click",
    handleDeleteClick
  ); /* при клике по кнопке удаления вызывается функция handleDeleteClick */

  /* В конце функция возвращает полностью настроенный 
  и готовый к добавлению на страницу элемент карточки. */
  return cardElement;
}

// Основная функция для создания карточки. Создает и возвращает новую карточку, используя данные и переданные обработчики событий. Функция принимает четыре параметра.
function createCard(
  data,
  handleImageClick,
  handleLikeClick,
  handleDeleteClick
) {
  const template =
    document.getElementById(
      "card-template"
    ).content; /* Получение шаблона карточки template. Функция получает содержимое шаблона карточки, используя метод getElementById для элемента с идентификатором card-template. Содержимое шаблона хранится в свойстве content.*/

  /* Создание новой карточки Функция вызывает createCardElement, передавая ей шаблон, данные и обработчики событий. createCardElement создает новый элемент карточки, настраивает его и возвращает готовый DOM-элемент. */
  return createCardElement(
    template,
    data,
    handleImageClick,
    handleLikeClick,
    handleDeleteClick
  );
}

export { createCard, handleLikeClick, handleDeleteClick };
