import { state } from "./state.js";


 export function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  state.themeImage.src =
    currentTheme === 'light'
      ? 'https://i.imgur.com/snp1idS.png'
      : 'https://i.imgur.com/JZfjpM8.png';
}

const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
