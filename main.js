(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-19",headers:{authorization:"87054df0-c254-457a-b792-2fab7c029207","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},n=function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t)},r=function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then(t)},o=function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then(t)};function c(e){var t=e.target,n=t.closest(".card"),c=n.querySelector(".card__like-counter"),a=n.dataset.cardId;t.classList.contains("card__like-button_is-active")?o(a).then((function(e){t.classList.remove("card__like-button_is-active"),c.textContent=e.likes.length>0?e.likes.length:"",0===e.likes.length&&c.classList.remove("card__like-counter_is-active")})).catch((function(e){return console.log(e)})):r(a).then((function(e){t.classList.add("card__like-button_is-active"),c.textContent=e.likes.length,c.classList.add("card__like-counter_is-active")})).catch((function(e){return console.log(e)}))}function a(e,t,n,r,o){return function(e,t,n,r,o,c){var a=e.querySelector(".card").cloneNode(!0);a.dataset.cardId=t._id;var i=a.querySelector(".card__image"),u=a.querySelector(".card__title"),l=a.querySelector(".card__like-button"),s=a.querySelector(".card__delete-button"),d=a.querySelector(".card__like-counter");return i.src=t.link,i.alt=t.name,u.textContent=t.name,d.textContent=t.likes.length>0?t.likes.length:"",t.likes.length>0&&d.classList.add("card__like-counter_is-active"),t.likes.some((function(e){return e._id===c}))&&l.classList.add("card__like-button_is-active"),i.addEventListener("click",(function(){return n(t)})),l.addEventListener("click",r),t.owner._id===c?s.addEventListener("click",(function(e){return o(e,t._id,a)})):s.style.display="none",a}(document.getElementById("card-template").content,e,t,n,r,o)}function i(e){e.target.classList.contains("popup")&&l(e.target)}function u(e){e&&e.classList.contains("popup")&&(e.classList.add("popup_is-animated"),setTimeout((function(){e.classList.add("popup_is-opened")}),10),document.addEventListener("keydown",s),e.addEventListener("click",i))}function l(e){e&&e.classList.contains("popup_is-opened")&&(e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",s),e.removeEventListener("click",i),e.addEventListener("transitionend",(function(){e.classList.contains("popup_is-opened")||e.classList.remove("popup_is-animated")}),{once:!0}))}function s(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&l(t)}}function d(e,t){var n=e.closest(t.formSelector).querySelector(".".concat(e.name,"-input-error"));n&&(n.textContent="",n.classList.remove(t.errorClass),e.classList.remove(t.inputErrorClass))}function p(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.disabled=!1):(t.classList.add(n.inactiveButtonClass),t.disabled=!0)}function f(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(e){return d(e,t)})),r.classList.add(t.inactiveButtonClass),r.disabled=!0}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var m=document.querySelector(".places__list"),y=document.querySelector(".profile__edit-button"),v=document.querySelector(".popup_type_edit"),h=v.querySelector(".popup__close"),S=document.querySelector(".profile__add-button"),b=document.querySelector(".popup_type_new-card"),g=b.querySelector(".popup__close"),L=document.querySelector(".popup_type_image"),q=L.querySelector(".popup__close"),E=v.querySelector(".popup__form"),k=v.querySelector(".popup__input_type_name"),C=v.querySelector(".popup__input_type_description"),x=document.querySelector(".profile__title"),T=document.querySelector(".profile__description"),A=document.querySelector(".profile__image"),B=b.querySelector(".popup__form"),U=b.querySelector(".popup__input_type_card-name"),w=b.querySelector(".popup__input_type_url"),I={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},j=document.querySelector(".popup_type_confirm"),O=j.querySelector(".popup__button_confirm"),D=L.querySelector(".popup__image"),P=L.querySelector(".popup__caption"),M=function(e){var t=e.buttonElement,n=e.loadingText;t.textContent=n};function N(e){D.src=e.link,D.alt=e.name,P.textContent=e.name,u(L)}function J(e,t,r){u(j),O.onclick=function(){M({buttonElement:O,loadingText:"Удаление..."}),n(t).then((function(){r.remove(),l(j)})).catch((function(e){return console.log(e)})).finally((function(){M({buttonElement:O,loadingText:"Да"})}))}}Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t)]).then((function(e){var t,n,r,o,i,u,l,s,d=(u=2,function(e){if(Array.isArray(e))return e}(i=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(i,u)||function(e,t){if(e){if("string"==typeof e)return _(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_(e,t):void 0}}(i,u)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),p=d[0],f=d[1];n=(t=p).name,r=t.about,o=t.avatar,x.textContent=n,T.textContent=r,A.style.backgroundImage="url(".concat(o,")"),l=f,s=p._id,l.forEach((function(e){return m.appendChild(function(e,t){return a(e,N,c,J,t)}(e,s))}))})).catch((function(e){return console.log(e)})),y.addEventListener("click",(function(){k.value=x.textContent,C.value=T.textContent,u(v),f(E,I)})),h.addEventListener("click",(function(){return l(v)})),E.addEventListener("submit",(function(n){n.preventDefault();var r,o,c=E.querySelector(I.submitButtonSelector);M({buttonElement:c,loadingText:"Сохранение..."}),(r=k.value,o=C.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:o})}).then(t)).then((function(e){x.textContent=e.name,T.textContent=e.about,l(v)})).catch((function(e){return console.log(e)})).finally((function(){M({buttonElement:c,loadingText:"Сохранить"})}))})),S.addEventListener("click",(function(){u(b),B.reset(),f(B,I)})),g.addEventListener("click",(function(){return l(b)})),B.addEventListener("submit",(function(n){n.preventDefault();var r=B.querySelector(I.submitButtonSelector);M({buttonElement:r,loadingText:"Создание..."});var o,i,u={name:U.value,link:w.value};(o=u.name,i=u.link,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:o,link:i})}).then(t)).then((function(e){var t=e.owner._id;m.prepend(a(e,N,c,J,t)),l(b),B.reset(),f(B,I)})).catch((function(e){return console.log(e)})).finally((function(){M({buttonElement:r,loadingText:"Создать"})}))})),q.addEventListener("click",(function(){return l(L)}));var H=document.querySelector(".popup_type_edit-avatar"),z=H.querySelector(".popup__form"),$=H.querySelector(".popup__input_type_url"),F=H.querySelector(".popup__close");document.querySelector(".profile__image").addEventListener("click",(function(){u(H),z.reset(),f(z,I)})),F.addEventListener("click",(function(){return l(H)})),z.addEventListener("submit",(function(n){n.preventDefault();var r,o=z.querySelector(I.submitButtonSelector);M({buttonElement:o,loadingText:"Сохранение..."}),(r=$.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then(t)).then((function(e){A.style.backgroundImage="url(".concat(e.avatar,")"),l(H)})).catch((function(e){return console.log(e)})).finally((function(){M({buttonElement:o,loadingText:"Сохранить"})}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);n.forEach((function(t){t.addEventListener("input",(function(){!function(e,t){var n="";e.validity.valueMissing?n="Вы пропустили это поле.":e.validity.tooShort?n="Должно быть от ".concat(e.minLength," до ").concat(e.maxLength," символов."):e.validity.patternMismatch?n=e.dataset.errorMessage||"Неверный формат.":e.validity.typeMismatch&&(n="url"===e.type?"Введите адрес сайта.":"Введите корректное значение."),e.validity.valid?d(e,t):function(e,t,n){var r=e.closest(n.formSelector).querySelector(".".concat(e.name,"-input-error"));r&&(r.textContent=t,r.classList.add(n.errorClass),e.classList.add(n.inputErrorClass))}(e,n,t)}(t,e),p(n,r,e)}))})),t.addEventListener("submit",(function(e){return e.preventDefault()})),p(n,r,e)}))}(I)})();