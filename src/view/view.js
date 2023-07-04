import onChange from 'on-change';
import * as yup from 'yup';

const state = {
  rssForm: {
    valid: null,
    errors: [],
  },
};

const schema = yup.object().shape({
  url: yup.string().url('Введите корректный URL').required('URL обязателен'),
});

schema
  .validate({ url: 'некорректный_url' })
  .then(() => {
    console.log('Валидация успешна');
  })
  .catch((error) => {
    console.log(error.message);
  });

schema
  .validate({ url: 'https://example.com' })
  .then(() => {
    console.log('Валидация успешна');
  })
  .catch((error) => {
    console.log(error.message);
  });

const watchedState = onChange(state, (path, value, previousValue) => {
  alert('value changed!');
  console.log(path);
  // => 'ui.value'
  console.log(value);
  // => 'other value'
  console.log(previousValue);
  // => 'hello'
});
