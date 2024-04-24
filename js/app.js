document.addEventListener('DOMContentLoaded', function () {
    // Selecciona el elemento <section> dentro de <main>
    var section = document.querySelector('main section#portfolio');

    // Define los datos estáticos en un arreglo de objetos
    var lugares = [
        {
            nombre: "Catedral de Palma",
            descripcion: "También conocida como La Seu",
            imagen: "assets/img/portfolio/1.jpg"
        },
        {
            nombre: "Parroquia de San Bartomeu",
            descripcion: "Parroquia de estilo neogótico y modernista",
            imagen: "assets/img/portfolio/2.jpg"
        },
        {
            nombre: "Talaiots",
            descripcion: "Piedras",
            imagen: "assets/img/portfolio/3.jpg"
        },
        {
            nombre: "Edificio",
            descripcion: "Emblema de la arquitectura modernista",
            imagen: "assets/img/portfolio/4.jpeg"
        },
        {
            nombre: "Castell de l'Almudaina",
            descripcion: "Residencia oficial de verano del rey",
            imagen: "assets/img/portfolio/5.jpg"
        },
        {
            nombre: "Castell de Bellver",
            descripcion: "Actual Museo de Historia de Palma",
            imagen: "assets/img/portfolio/6.jpg"
        }
    ];

    // Itera sobre los datos y genera el HTML dinámico
    lugares.forEach(function (lugar) {
        var itemHTML = `
            <div class="col-lg-4 col-sm-6 mb-4">
                <div class="portfolio-item">
                    <a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal">
                        <div class="portfolio-hover">
                            <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                        </div>
                        <img class="img-fluid" src="${lugar.imagen}" alt="..." />
                    </a>
                    <div class="portfolio-caption">
                        <div class="portfolio-caption-heading">${lugar.nombre}</div>
                        <div class="portfolio-caption-subheading text-muted">${lugar.descripcion}</div>
                    </div>
                </div>
            </div>
        `;

        // Agrega el HTML generado al contenido de la sección
        section.innerHTML += itemHTML;
    });
});
