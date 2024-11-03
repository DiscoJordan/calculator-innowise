import './style/style.css';
import { initializeTheme } from './modules/theme.js';
import { addEventListeners } from './modules/eventListeners.js';

const themeImage = document.getElementById('themeImage');
initializeTheme();
addEventListeners(themeImage);