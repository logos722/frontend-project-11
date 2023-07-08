import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import initApp from './view/init.js';
import app from './app.js';

initApp().then(() => {
  app();
});
