// script.js
document.addEventListener('DOMContentLoaded', () => {
  const colorBox = document.getElementById('color-box');
  const changeBtn = document.getElementById('change-color-btn');
  const colorCode = document.getElementById('color-code');

  // Génère une couleur hex aléatoire, toujours 6 caractères
  function getRandomColor() {
    const hex = Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
    return `#${hex}`;
  }

  // Applique une couleur à la box + met à jour l'affichage du code couleur
  function applyColor(hex) {
    colorBox.style.backgroundColor = hex;
    colorCode.textContent = hex.toLowerCase();
    // Ajuste la couleur du texte du code selon contraste (optionnel simple)
    const rgb = hexToRgb(hex);
    if (rgb) {
      const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
      colorCode.style.color = brightness > 180 ? '#0b1220' : '#ffffff';
    }
  }

  // Convert hex -> {r,g,b}
  function hexToRgb(hex) {
    const m = hex.replace('#','');
    if (m.length !== 6) return null;
    return {
      r: parseInt(m.slice(0,2), 16),
      g: parseInt(m.slice(2,4), 16),
      b: parseInt(m.slice(4,6), 16)
    };
  }

  // Au clic, génère et applique une couleur aléatoire
  changeBtn.addEventListener('click', () => {
    const next = getRandomColor();
    // petite animation : scale
    colorBox.style.transform = 'scale(0.995)';
    applyColor(next);
    // remettre après transition pour effet
    setTimeout(() => { colorBox.style.transform = ''; }, 160);
  });

  // Initialisation : applique une couleur par défaut (ou random)
  applyColor(getRandomColor());
});
