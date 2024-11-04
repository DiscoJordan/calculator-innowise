import './style/style.css';
import { initializeTheme } from './modules/theme.js';
import { addEventListeners } from './modules/eventListeners.js';
localStorage.setItem('theme', 'dark');
const themeImage = document.getElementById('themeImage');

initializeTheme();
addEventListeners(themeImage);