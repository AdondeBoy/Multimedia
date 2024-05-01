document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el mapa y establecer su punto de vista en tus coordenadas y zoom
    // var map = L.map('map').setView([39.616775, 2.95], 9); // Coordenadas de Mallorca
    var map = L.map('map').setView([39.59393, 2.67895], 20); // Coordenadas de Carlos
    // Añadir una capa de mapa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
   });