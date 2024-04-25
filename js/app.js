document.addEventListener('DOMContentLoaded', function () {
    // Define los datos estáticos en un arreglo de objetos
    let lugares = [
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
    
    let edificiosJSON = lugares;
    crearSeccionPortfolio(edificiosJSON);
    crearSeccionTeam();
});

function crearSeccionPortfolio (edificiosJSON) {
    // Crea el elemento <section> de clase 'page-section', 'bg-light'
    let nuevaSection = document.createElement('section');
    nuevaSection.classList.add('page-section', 'bg-light');
    nuevaSection.id = 'portfolio';

    // Crea el elemento <div> de clase "container"
    let divContainer = document.createElement('div');
    divContainer.classList.add('container');

    // Crea el elemento <div> de clase "text-center"
    let divTextCenter = document.createElement('div');
    divTextCenter.classList.add('text-center');

    // Crea los elementos <h2> y <h3>
    let h2 = document.createElement('h2');
    h2.classList.add('section-heading', 'text-uppercase');
    h2.textContent = 'Conoce los lugares más emblemáticos de la isla';

    let h3 = document.createElement('h3');
    h3.classList.add('section-subheading', 'text-muted');
    h3.textContent = 'Aprende sobre los atractivos culturales de la isla';

    // Añade los elementos <h2> y <h3> al <div> "text-center"
    divTextCenter.appendChild(h2);
    divTextCenter.appendChild(h3);

    // Añade el <div> "text-center" al <div> "container"
    divContainer.appendChild(divTextCenter);

    // Añade el <div> "container" al <section>
    nuevaSection.appendChild(divContainer);

    // Añade el <section> al <main>
    let main = document.getElementById('main');
    main.appendChild(nuevaSection);
    
    // Crea elemento div de clase row
    // Crea el elemento <div> de clase "container"
    let divRowPortfolio = document.createElement('div');
    divRowPortfolio.classList.add('row');
    // añadir al container
    divContainer.appendChild(divRowPortfolio);

    
    // Itera sobre los datos y genera el HTML dinámico
    let i = 1;
    edificiosJSON.forEach(function (edificio) {
        let itemHTML = `
            <div class="col-lg-4 col-sm-6 mb-4">
                <div class="portfolio-item">
                    <a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal${i}">
                        <div class="portfolio-hover">
                            <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                        </div>
                        <img class="img-fluid" src="${edificio.imagen}" alt="..." />
                    </a>
                    <div class="portfolio-caption">
                        <div class="portfolio-caption-heading">${edificio.nombre}</div>
                        <div class="portfolio-caption-subheading text-muted">${edificio.descripcion}</div>
                    </div>
                </div>
            </div>
        `;

        // Agrega el HTML generado al contenido de la sección
        divRowPortfolio.innerHTML += itemHTML;
        i++;
    });

    // crear pop-ups del portfolio
    generarPopUpsInicio(edificiosJSON);
}

function crearSeccionTeam () {
    // Crea el elemento <section>
    let nuevaSection = document.createElement('section');
    nuevaSection.classList.add('page-section', 'bg-light');
    nuevaSection.id = 'team';

    // Crea el elemento <div> con clase "container"
    let divContainer = document.createElement('div');
    divContainer.classList.add('container');

    // Crea el elemento <div> con clase "text-center"
    let divTextCenter = document.createElement('div');
    divTextCenter.classList.add('text-center');

    // Crea los elementos <h2> y <h3>
    let h2 = document.createElement('h2');
    h2.classList.add('section-heading', 'text-uppercase');
    h2.textContent = 'Nuestro Equipo';

    let h3 = document.createElement('h3');
    h3.classList.add('section-subheading', 'text-muted');
    h3.textContent = 'Trabajando por el interés cultural de Mallorca.';

    // Añade los elementos <h2> y <h3> al <div> "text-center"
    divTextCenter.appendChild(h2);
    divTextCenter.appendChild(h3);

    // Crea el elemento <div> con clase "row"
    let divRow = document.createElement('div');
    divRow.classList.add('row');

    // Define los datos de los miembros del equipo en un arreglo de objetos
    let equipo = [
        {
            nombre: "Eduardo Osuna",
            rol: "Diseñador Jefe",
            imagen: "assets/img/team/1.jpg"
        },
        {
            nombre: "Santiago Rattenbach",
            rol: "Desarrollador Jefe",
            imagen: "assets/img/team/3.jpg"
        },
        {
            nombre: "Jorge",
            rol: "Director de Marketing",
            imagen: "assets/img/team/2.jpg"
        }
    ];

    // Itera sobre los datos del equipo y genera el HTML dinámico
    equipo.forEach(function (miembro) {
        let miembroHTML = `
            <div class="col-lg-4">
                <div class="team-member">
                    <img class="mx-auto rounded-circle" src="${miembro.imagen}" alt="..." />
                    <h4>${miembro.nombre}</h4>
                    <p class="text-muted">${miembro.rol}</p>
                    <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="${miembro.nombre} Twitter Profile"><i class="fab fa-twitter"></i></a>
                    <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="${miembro.nombre} Facebook Profile"><i class="fab fa-facebook-f"></i></a>
                    <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="${miembro.nombre} LinkedIn Profile"><i class="fab fa-linkedin-in"></i></a>
                </div>
            </div>
        `;
        // Agrega el HTML generado al contenido de la sección
        divRow.innerHTML += miembroHTML;
    });

    // Crea el elemento <div> con clase "row" para el texto adicional
    let divRowTexto = document.createElement('div');
    divRowTexto.classList.add('row');

    // Crea el elemento <div> con clase "col-lg-8 mx-auto text-center"
    let divTexto = document.createElement('div');
    divTexto.classList.add('col-lg-8', 'mx-auto', 'text-center');

    // Crea el elemento <p> con clase "large text-muted"
    let pTexto = document.createElement('p');
    pTexto.classList.add('large', 'text-muted');
    pTexto.textContent = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eaque, laboriosam veritatis, quos non quis ad perspiciatis, totam corporis ea, alias ut unde.';

    // Añade el elemento <p> al <div> "col-lg-8 mx-auto text-center"
    divTexto.appendChild(pTexto);

    // Añade el <div> "col-lg-8 mx-auto text-center" al <div> "row" para el texto adicional
    divRowTexto.appendChild(divTexto);

    // Añade <divs> al <div> "container"
    divContainer.appendChild(divTextCenter);
    divContainer.appendChild(divRow);
    divContainer.appendChild(divRowTexto);

    // Añade el <div> "container" al <section>
    nuevaSection.appendChild(divContainer);

    // Añade el <section> al <main>
    let main = document.getElementById('main');
    main.appendChild(nuevaSection);
}

function generarPopUpsInicio(edificiosJSON) {
    // obtener <div> contenedor de los pop-ups
    let popUpContainer = document.getElementById('portfolio-modals');

    let i = 1;
    edificiosJSON.forEach(function(edificio) {
        generarPopUp(popUpContainer, edificio, i);
    });
}

function generarPopUp (popUpsContainer, edificio, i) {
    // crear contenedor <div> del pop-up
    let popUp = document.createElement('div');
    popUp.classList.add('portfolio-modal', 'modal', 'fade');
    popUp.id = "portfolioModal" + i;
    popUp.setAttribute('tabindex', '-1');
    popUp.setAttribute('role', 'dialog');
    popUp.setAttribute('aria-hidden', 'true');
    
    // generar contenido del pop-up
    let popUpContent = generarContenidoPopUp(edificio);
    popUp.appendChild(popUpContent);

    // Agregar el contenedor del pop-up al div contenedor
    popUpsContainer.appendChild(popUp);
}

function generarContenidoPopUp(edificio) {
    // crear contenedor principal
    let container1 = document.createElement('div');
    container1.classList.add('modal-dialog', 'd-flex', 'justify-content-center');

    // crear contenedor modal y engancharlo a container1
    let container2 = document.createElement('div');
    container2.classList.add('modal-content');
    container1.appendChild(container2);

    // generar contenedor icono para cerrar el diálogo
    let closeModal = document.createElement('div');
    closeModal.classList.add('close-modal');
    closeModal.setAttribute('data-bs-dismiss', 'modal');

    let closeImg = document.createElement('img');
    closeImg.setAttribute('src', 'assets/img/close-icon.svg');
    closeImg.setAttribute('alt', 'Close modal');
    closeModal.appendChild(closeImg);
    container2.appendChild(closeModal);

    // crear contenedor de a información y engancharlo a container2
    let container3 = document.createElement('div');
    container3.classList.add('container');
    container2.appendChild(container3);

    // crear contenedor fila y engancharlo a contenedor 3
    let container4 = document.createElement('div');
    container4.classList.add('row', 'justify-content-center');
    container3.appendChild(container4);

    // crear contenedor columna y engancharlo a contenedor fila
    let container5 = document.createElement('div');
    container5.classList.add('col-lg-8');
    container4.appendChild(container5);

    // crear contenedor modal-body y engancharlo a contenedor columna
    let modalBody = generarModalBodyContent(edificio);
    container5.appendChild(modalBody);

    return container1;
}

function generarModalBodyContent(edificio) {
    let modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');

    // añadir título
    let titulo = document.createElement('h2');
    titulo.classList.add('text-uppercase');
    titulo.textContent = edificio.nombre;
    modalBody.appendChild(titulo);

    // añadir subtítulo con nombre alternativo si lo tiene
    if (edificio?.alternateName !== undefined) {
        // existe un nombre alternativo
        let subtitulo = document.createElement('p');
        subtitulo.classList.add('item-intro', 'text-muted', 'mb-0');
        subtitulo.textContent = "También conocida como " + edificio.alternateName + ".";
        modalBody.appendChild(subtitulo);
    }

    return modalBody;
}