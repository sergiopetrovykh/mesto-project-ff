// Конфигурация для взаимодействия с сервером
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-19", // Основной URL для API
  headers: {
    authorization: "87054df0-c254-457a-b792-2fab7c029207", // Токен авторизации
    "Content-Type": "application/json", // Тип содержимого в запросах
  },
};

// Функция для проверки ответа сервера
const checkResponse = (res) => {
  if (res.ok) {
    return res.json(); // Возвращаем JSON, если ответ успешен
  }
  return Promise.reject(`Ошибка: ${res.status}`); // Возвращаем ошибку, если запрос неуспешен
};

// Функция для получения начальных карточек
const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers, // Используем заголовки из конфигурации
  }).then(checkResponse);
};

// Функция для получения информации о пользователе
const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers, // Используем заголовки из конфигурации
  }).then(checkResponse);
};

// Функция для обновления информации о пользователе
const updateUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH", // Используем метод PATCH для частичного обновления данных
    headers: config.headers, // Используем заголовки из конфигурации
    body: JSON.stringify({
      name: name, // Новое имя пользователя
      about: about, // Новое описание пользователя
    }),
  }).then(checkResponse);
};

// Функция для добавления новой карточки
const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST", // Используем метод POST для создания новой карточки
    headers: config.headers, // Используем заголовки из конфигурации
    body: JSON.stringify({
      name: name, // Имя новой карточки
      link: link, // Ссылка на изображение карточки
    }),
  }).then(checkResponse);
};

// Функция для удаления карточки
const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE", // Используем метод DELETE для удаления карточки
    headers: config.headers, // Используем заголовки из конфигурации
  }).then(checkResponse);
};

// Функция для обновления аватара пользователя
const updateAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH", // Используем метод PATCH для частичного обновления данных
    headers: config.headers, // Используем заголовки из конфигурации
    body: JSON.stringify({
      avatar: avatarUrl, // Новый URL аватара пользователя
    }),
  }).then(checkResponse);
};

// Функция для лайка карточки
const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT", // Используем метод PUT для добавления лайка
    headers: config.headers, // Используем заголовки из конфигурации
  }).then(checkResponse);
};

// Функция для снятия лайка с карточки
const unlikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE", // Используем метод DELETE для снятия лайка
    headers: config.headers, // Используем заголовки из конфигурации
  }).then(checkResponse);
};

export {
  getInitialCards,
  getUserInfo,
  updateUserInfo,
  addNewCard,
  deleteCard,
  updateAvatar,
  likeCard,
  unlikeCard,
};
