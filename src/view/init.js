import resources from '../language/resources.js';
import i18next from 'i18next';
const initApp = async () => {
  await i18next.init({
    lng: 'ru', // Текущий язык
    debug: true,
    resources: resources,
  });
};

export default initApp;
