import onChange from 'on-change';
import * as yup from 'yup';

//const schema = yup.object().shape({
//  url: yup.string().url('Введите корректный URL').required(),
//});

const errorMessages = {
  network: {
    error: 'Network Problems. Try again.',
  },
};

const validate = async (fields) => {
  try {
    await schema.validate(fields, { abortEarly: false });
    return {};
  } catch (e) {
    const errors = {};
    for (let error of e.inner) {
      errors[error.path] = error;
    }
    return errors;
  }
};

const app = () => {
  const state = {
    rssForm: {
      state: 'filling',
      urls: [],
      data: {
        url: '',
      },
    },
  };

  const createError = (element) => {
    element = element.nextElementSibling;
    const newDiv = document.createElement('p');
    element.classList.add('is-invalid');
    newDiv.classList.add(
      'feedback',
      'm-0',
      'position-absolute',
      'small',
      'text-danger'
    );
    newDiv.textContent = error.errors;
    return element.after(newDiv);
  };

  const validateForm = () => {
    const form = document.querySelector('.rss-form');
    const urlInput = document.getElementById('url-input');
    const feedback = document.querySelector('.feedback');

    const schema = yup.object().shape({
      url: yup.string().required().url().notOneOf(state.rssForm.urls),
    });

    const formData = {
      url: urlInput.value.trim(),
    };

    schema
      .validate(formData, { abortEarly: false })
      .then(() => {
        // Валидация успешна
        urlInput.classList.remove('is-invalid');
        feedback.textContent = '';
        state.rssForm.urls.push(formData.url);
        state.rssForm.state = 'valid';
        // Очистка формы и установка фокуса
        form.reset();
        urlInput.focus();
      })
      .catch((error) => {
        // Ошибки валидации
        state.rssForm.state = 'invalid';
        urlInput.classList.add('is-invalid');
        feedback.textContent = error.errors[0];
      });
  };

  const checkInput = (element, validMessage) => {};

  const form = document.querySelector('form');
  const inputUrl = document.querySelector('.url-input');
  const submitButton = document.querySelector('form > div > div > button');
  const inputs = form.querySelector('.url-input');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    validateForm();
  });
};

export default app;
