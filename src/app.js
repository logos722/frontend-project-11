import onChange from 'on-change';

import * as yup from 'yup';
import i18next from 'i18next';

const elements = {
  form: document.querySelector('.rss-form'),
  input: document.querySelector('#url-input'),
  button: document.querySelector('button[type="submit"]'),
  feeds: document.querySelector('.feeds'),
  posts: document.querySelector('.posts'),
  feedback: document.querySelector('.feedback'),
};

const app = () => {
  const initState = {
    language: 'ru',
    rssLoaded: false,
    form: {
      valid: true,
      submitted: false,
    },
    feedback: {
      valid: false,
      message: '',
    },
    uiState: {
      activeModal: '',
      viewedPosts: [],
    },
    posts: [],
    feeds: [],
    urls: [],
  };

  const validateForm = () => {
    yup.setLocale({
      mixed: {
        notOneOf: i18next.t('errors.alreadyExists'),
        required: i18next.t('errors.required'),
      },
      string: {
        url: i18next.t('errors.invalidUrl'),
      },
    });
    const schema = yup.string().url().notOneOf(initState.urls).required();

    const formData = {
      url: elements.input.value.trim(),
    };

    schema
      .validate(formData.url, { abortEarly: false })
      .then(() => {
        // Валидация успешна
        elements.input.classList.remove('is-invalid');
        elements.feedback.textContent = '';
        initState.urls.push(formData.url);
        initState.form.valid = true;
        // Очистка формы и установка фокуса
        elements.form.reset();
        elements.input.focus();
      })
      .catch((error) => {
        // Ошибки валидации
        initState.form.valid = false;
        elements.input.classList.add('is-invalid');
        elements.feedback.textContent = error.message;
      });
  };

  elements.form.addEventListener('submit', async (e) => {
    e.preventDefault();
    validateForm();
  });
};

export default app;
