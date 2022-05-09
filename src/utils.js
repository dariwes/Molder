export function setTheme(color) {
    document.getElementById('light-theme').disabled = color !== 'light';
}