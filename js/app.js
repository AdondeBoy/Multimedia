document.addEventListener('DOMContentLoaded', inicio());

function inicio() {
    // Define los datos estáticos en un arreglo de objetos
    let lugares = [
        {
            nombre: "Catedral de Palma",
            descripcion: "También conocida como La Seu",
            imagen: "assets/img/portfolio/1.jpg",
            horario: [
                "Lu$10:00 - 13:00",
                "Ma$10:00 - 13:00",
                "Mi$10:00 - 13:00",
                "Ju$10:00 - 13:00",
                "Vi$10:00 - 13:00",
                "Sa$10:00 - 13:00",
                "Do$10:00 - 13:00"
            ]
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

    // poner función en el logo
    let aLogo = document.getElementById('logoMashorca');
    // Al hacer click sobre el logo, se vuelve a la página de inicio
    aLogo.onclick = logoToHome;

    crearSlider();
    crearSeccionPortfolio(edificiosJSON);
    crearSeccionTeam();
}

function crearSeccionPortfolio (edificiosJSON) {
    // obtener el elemento <div> de clase "container"
    let divContainer = document.getElementById('portfolioContainer');

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
    
    // Crea elemento div de clase row
    let divRowPortfolio = document.createElement('div');
    divRowPortfolio.classList.add('row');
    // añadir al container
    divContainer.appendChild(divRowPortfolio);

    
    // Itera sobre los datos y genera el HTML dinámico
    let i = 0;
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

    let i = 0;
    edificiosJSON.forEach(function(edificio) {
        generarPopUp(popUpContainer, edificio, i);
        i++;
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
    let popUpContent = generarContenidoPopUp(edificio, i);
    popUp.appendChild(popUpContent);

    // Agregar el contenedor del pop-up al div contenedor
    popUpsContainer.appendChild(popUp);
}

function generarContenidoPopUp(edificio, i) {
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
    let modalBody = generarModalBodyContent(edificio, null, i);
    container5.appendChild(modalBody);

    return container1;
}

function generarModalBodyContent(edificio, dia, i) {
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

    
    // añadir imagen (supongo que lo cambiaremos por un vídeo o maybe un slider con ambos)
    let imagen = document.createElement('img');
    imagen.classList.add('img-fluid', 'd-block', 'mx-auto');
    imagen.setAttribute('src', edificio.imagen);
    imagen.setAttribute('alt', edificio.nombre);
    modalBody.appendChild(imagen);

    // añadir descripción
    let descripcion = document.createElement('p');
    descripcion.textContent = edificio.descripcion;
    modalBody.appendChild(descripcion);
    
    // añadir clima (por defecto el día actual)
    // if (dia === null) {
        // dia = new Date().getDay();
    // }
    
    
    let listaClima = document.createElement('div');
    listaClima.classList.add('mx-5', 'mb-4', 'listaHorizontal', 'table-responsive');
    modalBody.appendChild(listaClima);
    
    let listaClimaBody = document.createElement('div');
    listaClimaBody.classList.add('d-flex');
    // (implementar con API de weather)
    // Cada 2h
    //   let
    //   obtenerTemperatura(coordenadas, dia, horaActual)
    //   obtenerClima(coordenadas, dia, horaActual)
    // loop
    modalBody.appendChild(listaClima);
    
    // añadir horas de visita y horarios
    let horasVisita = document.createElement('div');
    horasVisita.classList.add('row');

    // INPUT
    let horasVisitaBody = crearCamposVisita(i);
    horasVisita.appendChild(horasVisitaBody);

    // HORARIO
    // Contenedor 1
    let horarios1 = document.createElement('div');
    horarios1.classList.add('col-6', 'd-flex', 'justify-content-end');
    // Contenedor 2
    let horarios2 = document.createElement('div');
    horarios2.classList.add('d-flex', 'justify-content-start', 'row');
    // Lista
    let horariosLista = document.createElement('ul');
    horariosLista.classList.add('list-inline');
    // Título de horario
    let horariosTitulo = document.createElement('li');
    horariosTitulo.classList.add('list-inline-item', 'row', 'col-4');
    let horariosTituloTexto = document.createElement('strong');
    horariosTituloTexto.textContent = 'Horarios:';
    horariosTitulo.appendChild(horariosTituloTexto);
    horariosLista.appendChild(horariosTitulo);
    
    // Se recorren los días de la semana del json con el horario
    let horario = edificio.horario;
    if (horario === undefined) {
        let diaElement = document.createElement('li');
        diaElement.classList.add('list-inline-item', 'row');
        // Día
        let mensaje = document.createElement('div');
        mensaje.classList.add('col-8');
        mensaje.textContent = "Permanentemente abierto";
        diaElement.appendChild(mensaje);

        // Se añade el elemento a la lista
        horariosLista.appendChild(diaElement);
    }
    
    for (let dia in horario) {
        let diaHorario = horario[dia].split("$");
        let diaElement = document.createElement('li');
        diaElement.classList.add('list-inline-item', 'row');
        // Día
        let diaNombre = document.createElement('div');
        diaNombre.classList.add('col-2');
        // El nombre del día es strong
        let diaNombreTexto = document.createElement('strong');
        diaNombreTexto.textContent = diaHorario[0] + ": ";
        diaNombre.appendChild(diaNombreTexto);
        
        diaElement.appendChild(diaNombre);
        // Horas
        let diaHoras = document.createElement('div');
        diaHoras.classList.add('col-10');
        diaHoras.textContent = diaHorario[1];
        diaElement.appendChild(diaHoras);
        // Se añade el elemento a la lista
        horariosLista.appendChild(diaElement);
    }
    horarios2.appendChild(horariosLista);
    horarios1.appendChild(horarios2);
    horasVisita.appendChild(horarios1);
    
    modalBody.appendChild(horasVisita);

    // Botones
    let grupoBotones = document.createElement('div');
    grupoBotones.classList.add('button-group');

    // Añadir al plan
    let botonAgregar = document.createElement('button');
    botonAgregar.classList.add('btn', 'btn-primary', 'btn-xl', 'text-uppercase');
    botonAgregar.setAttribute('type', 'button');
    botonAgregar.onclick = function() {
        // Datos de sesión
        // - almacenar edifico en plan, con hora y salida
        // - día (hoy)
        window.location.href = '#';
        borrarIndex();
        plan();
        // window.location.href = 'plan.html';
    };
    botonAgregar.textContent = 'Añadir al plan';
    grupoBotones.appendChild(botonAgregar);

    // Más información (web del edificio)
    let url = edificio.url; 
    // El botón se genera solamente si tiene URL 
    if (url !== undefined) {
        let botonInfo = document.createElement('button');
        botonInfo.classList.add('btn', 'btn-secondary', 'btn-xl', 'text-uppercase');
        botonInfo.setAttribute('type', 'button');
        botonInfo.onclick = function() {
            window.location.href = url;
        };
        botonInfo.textContent = 'Más información';
        grupoBotones.appendChild(botonInfo);
    } 

    /* también se podría hacer esto ¿? (creo que queda un poco mal)
    let botonInfo = document.createElement('button');
    botonInfo.classList.add('btn', 'btn-secondary', 'btn-xl', 'text-uppercase');
    botonInfo.setAttribute('type', 'button');
    // Check de URL
    if (edificiosJSON[i].url !== undefined) {
        botonInfo.classList.add('disabled');
    } else {
        botonInfo.onclick = function() {
            window.location.href = edificiosJSON[i].url;
        };
    }
    

    botonInfo.textContent = 'Más información';
    botones.appendChild(botonInfo);
    */

    modalBody.appendChild(grupoBotones);

    return modalBody;
}

function crearItemClima(dia, hora, temperatura, clima) {
    let item = document.createElement('div');
    item.classList.add('mx-3');

    let diaElement = document.createElement('div');
    item.appendChild(diaElement);

    let img = document.createElement('img');
    img.classList.add('img-weather');
    img.setAttribute('src', 'assets/img/weather/' + clima + '.png');
    diaElement.appendChild(img);

    let horaElement = document.createElement('p');
    horaElement.classList.add('item-intro', 'text-muted', 'mb-0');
    horaElement.textContent = hora;
    diaElement.appendChild(horaElement);

    let temperaturaElement = document.createElement('p');
    temperaturaElement.classList.add('item-intro', 'text-muted', 'mb-0');
    temperaturaElement.textContent = temperatura;
    diaElement.appendChild(temperaturaElement);

    return item; // O no ¿?
}

function crearCamposVisita(i) {
    // Contenedor
    let contenedor = document.createElement('div');
    contenedor.classList.add('col-6', 'd-flex', 'justify-content-start', 'align-items-center');
    // Lista de elementos
    let horasVisita = document.createElement('div');
    horasVisita.classList.add('hour-list');
    // Contenedor de entrada
    let horaEntrada = document.createElement('div');
    horaEntrada.classList.add('row', 'mb-4', 'd-flex', 'hour-group');
    // Contenedor de mensaje
    let horaEntradaLabelContainer = document.createElement('div');
    horaEntradaLabelContainer.classList.add('d-flex', 'justify-content-start', 'align-items-center');
    // Mensaje
    let horaEntradaLabel = document.createElement('strong');
    horaEntradaLabel.textContent = 'Hora de Entrada:';
    horaEntradaLabelContainer.appendChild(horaEntradaLabel);
    // Contenedor de input
    let horaEntradaInputContainer = document.createElement('div');
    horaEntradaInputContainer.classList.add('d-flex', 'justify-content-start', 'align-items-center');
    // Input
    let horaEntradaInput = document.createElement('input');
    horaEntradaInput.classList.add('form-control-sm');
    horaEntradaInput.setAttribute('id', 'hourIn' + i);
    horaEntradaInput.setAttribute('type', 'text');
    horaEntradaInput.setAttribute('placeholder', '10:00');
    horaEntradaInput.setAttribute('data-sb-validations', 'required');
    horaEntradaInputContainer.appendChild(horaEntradaInput);

    horaEntrada.appendChild(horaEntradaLabelContainer);
    horaEntrada.appendChild(horaEntradaInputContainer);
    horasVisita.appendChild(horaEntrada);

    // Contenedor de salida
    let horaSalida = document.createElement('div');
    horaSalida.classList.add('row', 'd-flex', 'hour-group');
    // Contenedor de mensaje
    let horaSalidaLabelContainer = document.createElement('div');
    horaSalidaLabelContainer.classList.add('d-flex', 'justify-content-start', 'align-items-center');
    // Mensaje
    let horaSalidaLabel = document.createElement('strong');
    horaSalidaLabel.textContent = 'Hora de Salida:';
    horaSalidaLabelContainer.appendChild(horaSalidaLabel);
    // Contenedor de input
    let horaSalidaInputContainer = document.createElement('div');
    horaSalidaInputContainer.classList.add('d-flex', 'justify-content-start', 'align-items-center');
    // Input
    let horaSalidaInput = document.createElement('input');
    horaSalidaInput.classList.add('form-control-sm');
    horaSalidaInput.setAttribute('id', 'hourOut' + i);
    horaSalidaInput.setAttribute('type', 'text');
    horaSalidaInput.setAttribute('placeholder', '11:30');
    horaSalidaInput.setAttribute('data-sb-validations', 'required');
    horaSalidaInputContainer.appendChild(horaSalidaInput);

    horaSalida.appendChild(horaSalidaLabelContainer);
    horaSalida.appendChild(horaSalidaInputContainer);
    horasVisita.appendChild(horaSalida);
    contenedor.appendChild(horasVisita);   

    return contenedor;
}

function logoToHome() {    
    // Si ya está en la página de inicio, no hace nada
    let container = document.getElementById('slider');
    // Si el contenedor no existe
    if (container === null) {
        // Se elimina el plan
        borrarPlan();
        // Obtener header
        let header = document.getElementById('header');
        // Añadir clases al header
        header.classList.add('masthead');
        inicio();
    }    
}

function crearSlider() {
    // obtener header
    let header = document.getElementById('header');
    // añadir clases al header
    header.classList.add('masthead');

    // Crear el slider
    let slider = document.createElement('div');
    slider.classList.add('slider');
    slider.setAttribute('id', 'slider');
    header.appendChild(slider);

    // Crear el contenedor de las imágenes
    let swiperWrapper = document.createElement('div');
    swiperWrapper.classList.add('swiper-wrapper');
    slider.appendChild(swiperWrapper);

    // Crear las imágenes
    let img = document.createElement('img');
    img.setAttribute('src', 'assets/img/slider/imagen1.jpg');
    img.setAttribute('alt', 'Imagen slider 1');
    let swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    swiperSlide.appendChild(img);
    swiperWrapper.appendChild(swiperSlide);

    let img2 = document.createElement('img');
    img2.setAttribute('src', 'assets/img/slider/imagen2.jpg');
    img2.setAttribute('alt', 'Imagen slider 2');
    let swiperSlide2 = document.createElement('div');
    swiperSlide2.classList.add('swiper-slide');
    swiperSlide2.appendChild(img2);
    swiperWrapper.appendChild(swiperSlide2);

    let img3 = document.createElement('img');
    img3.setAttribute('src', 'assets/img/slider/imagen3.jpg');
    img3.setAttribute('alt', 'Imagen slider 3');
    let swiperSlide3 = document.createElement('div');
    swiperSlide3.classList.add('swiper-slide');
    swiperSlide3.appendChild(img3);
    swiperWrapper.appendChild(swiperSlide3);

    // Crear botones de navegación
    let swiperPagination = document.createElement('div');
    swiperPagination.classList.add('swiper-pagination');
    slider.appendChild(swiperPagination);

    // Crear contenedor
    let container = document.createElement('div');
    container.classList.add('container');
    slider.appendChild(container);

    // Crear subtítulo
    let mastheadSubheading = document.createElement('div');
    mastheadSubheading.classList.add('masthead-subheading');
    mastheadSubheading.textContent = 'Diseña una ruta pensada únicamente para ti';
    container.appendChild(mastheadSubheading);

    // Crear título
    let mastheadHeading = document.createElement('div');
    mastheadHeading.classList.add('masthead-heading', 'text-uppercase');
    mastheadHeading.textContent = '!Atrévete a conocer Mallorca!';
    container.appendChild(mastheadHeading);

    // Crear botón
    let btn = document.createElement('a');
    btn.classList.add('btn', 'btn-primary', 'btn-xl', 'text-uppercase');
    btn.textContent = 'Planificar Ruta';
    // al hacer click, llama a plan()
    btn.onclick = function() {
        window.location.href = '#';
        borrarIndex();
        plan();
    };
    container.appendChild(btn);



    /*
    <div class="slider" id="slider">
                <!-- Aquí se generará el slider de imágenes -->
                <div class="swiper-wrapper">
                    <div class="swiper-slide"><img src="assets/img/slider/imagen1.jpg" alt="Imagen test 1"></div>
                    <div class="swiper-slide"><img src="assets/img/slider/imagen2.jpg" alt="Imagen test 2"></div>
                    <!-- <div class="swiper-slide"><img src="assets/img/slider/imagen3.gif" alt="Imagen test 3"></div> -->
                    <!-- <div class="swiper-slide"><img src="assets/img/slider/imagen4.png" alt="Imagen test 4"></div> -->
                </div>
                <!-- Agregar botones de navegación si es necesario -->
                <div class="swiper-pagination"></div>
                <div class="container">
                    <div class="masthead-subheading">Diseña una ruta pensada únicamente para ti</div>
                    <div class="masthead-heading text-uppercase">!Atrévete a conocer Mallorca!</div>
                    <a class="btn btn-primary btn-xl text-uppercase" href="plan.html">Planificar Ruta</a>
                </div>
            </div>
    */
}

function borrarIndex() {
    borrarSlider();
    // Se borra el contenido del container
    let container = document.getElementById('portfolioContainer');
    container.innerHTML = '';
    // borrar sección de equipo
    let main = document.getElementById('main');
    let team = document.getElementById('team');
    if (team)
        main.removeChild(team);
}

function borrarPlan() {
    let container = document.getElementById('portfolioContainer');
    container.innerHTML = ''; // Se borra el contenido del container
}

// borra el slider del header y le quita los estilos al header
function borrarSlider() {
    // borrar slider del header
    let header = document.getElementById('header');
    let slider = document.getElementById('slider');
    if (slider)
        header.removeChild(slider);
    
    // borrar clases del header
    header.classList.remove('masthead');
}

function plan() {
    // obtener el elemento <div> de clase "container"
    let divContainer = document.getElementById('portfolioContainer');
    
    // Crea el elemento <div> de clase "text-center"
    let divTextCenter = document.createElement('div');
    divTextCenter.classList.add('text-center', 'py-5');

    // Crea los elementos <h2> y <h3>
    let h2 = document.createElement('h2');
    h2.classList.add('section-heading', 'text-uppercase', 'mb-2');
    h2.textContent = 'Construye tu ruta';

    let h3 = document.createElement('h3');
    h3.classList.add('section-subheading', 'text-muted', 'mb-3');
    h3.textContent = '¡Organiza tu visita y no te quedes sin ver nada!';

    // Añade los elementos <h2> y <h3> al <div> "text-center"
    divTextCenter.appendChild(h2);
    divTextCenter.appendChild(h3);

    // Añade el <div> "text-center" al <div> "container"
    divContainer.appendChild(divTextCenter);

    let divBusqueda = crearCamposBusqueda();
    divContainer.appendChild(divBusqueda);

    // crear el <div> "row"
    let divRowContainer = document.createElement('div');
    divRowContainer.classList.add('row');
    divContainer.appendChild(divRowContainer);

    let mapContainer = crearMapa();
    divRowContainer.appendChild(mapContainer);

    let listContainer = crearLista();
    divRowContainer.appendChild(listContainer);
}

function crearCamposBusqueda() {
    // crear contenedor principal
    let container = document.createElement('div');

    let html = `
        <!-- Barra de búsqueda -->
        <div class="container d-flex align-items-center mb-3">
            <!-- Botón del calendario -->
            <div class="d-block">
                    <button class="btn btn-primary me-4" id="calendar-button">
                        Elegir día
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                            <path d="M6.75 0a.75.75 0 0 1 .75.75V3h9V.75a.75.75 0 0 1 1.5 0V3h2.75c.966 0 1.75.784 1.75 1.75v16a1.75 1.75 0 0 1-1.75 1.75H3.25a1.75 1.75 0 0 1-1.75-1.75v-16C1.5 3.784 2.284 3 3.25 3H6V.75A.75.75 0 0 1 6.75 0ZM21 9.5H3v11.25c0 .138.112.25.25.25h17.5a.25.25 0 0 0 .25-.25Zm-17.75-5a.25.25 0 0 0-.25.25V8h18V4.75a.25.25 0 0 0-.25-.25Z"></path>
                        </svg>
                    </button>
                    <div type="button" id="calendar-container"></div>
            </div>
            <div class="input-group mb-3">
                <!-- Filtros -->
                <div class="dropdown">
                    <button class="btn btn-primary dropdown-toggle me-2" data-bs-toggle="dropdown">Filtros</button>
                    <form class="dropdown-menu" id="filtros-busqueda">
                        <div class="dropdown-item filtro d-flex">
                            <div class="col-6 d-flex justify-content-start align-items-center me-2">
                                <label>Hora de Inicio:</label>
                            </div>
                            <div class="col-6 d-flex justify-content-start">
                                <input class="form-control-sm" id="SearchHourStart" type="text" placeholder="10:00" data-sb-validations="required" />
                            </div>
                        </div>
                        <div class="dropdown-item filtro d-flex">
                            <div class="col-6 d-flex justify-content-start align-items-center me-2">
                                <label>Hora de Fin:</label>
                            </div>
                            <div class="col-6 d-flex justify-content-start">
                                <input class="form-control-sm"  id="SearchHourEnd" type="text" placeholder="11:30" data-sb-validations="required" />
                            </div>
                        </div>
                        <div class="dropdown-item filtro d-flex">
                            <div class="col-6 d-flex justify-content-start align-items-center me-2">
                                <label>Actividad gratuita:</label>
                            </div>
                            <div class="col-6 d-flex justify-content-start align-items-center">
                                <input class="form-check-input" type="checkbox" id="SearchFree">
                            </div>
                        </div>
                        <div class="dropdown-item filtro d-flex">
                            <div class="col-6 d-flex justify-content-start align-items-center me-2">
                                <label>Parking cercano:</label>
                            </div>
                            <div class="col-6 d-flex justify-content-start align-items-center">
                                <input class="form-check-input" type="checkbox" id="ParkingNear">
                            </div>
                        </div>
                        <div class="dropdown-item filtro d-flex">
                            <div class="col-6 d-flex justify-content-start align-items-center me-2">
                                <label>Hostelería cercana:</label>
                            </div>
                            <div class="col-6 d-flex justify-content-start align-items-center">
                                <input class="form-check-input" type="checkbox" id="HosteleriaCercana">
                            </div>
                        </div>
                    </form>
                </div>
                <!-- Barra de búsqueda -->
                <input type="text" class="form-control" placeholder="Buscar..." aria-label="Buscar" aria-describedby="SearchButton">
                <button class="btn btn-primary" type="submit" id="SearchButton">
                    <i class="fas fa-search"></i>
                </button>
            </div>
        </div>
        `;
    container.innerHTML = html;

    añadirEventosBusqueda();

    return container
}

function añadirEventosBusqueda() {
    let horaIn = document.getElementById('SearchHourStart');
    let horaOut = document.getElementById('SearchHourEnd');
    let searchFree = document.getElementById('SearchFree');
    let parkingNear = document.getElementById('ParkingNear');
    let HosteleriaCercana = document.getElementById('HosteleriaCercana');

    
}

function crearMapa() {
    // crear contenedor principal
    let mapaContainer = document.createElement('div');
    mapaContainer.classList.add('col-lg-8', 'col-sm-6', 'mb-4', 'd-flex', 'justify-content-center');
    mapaContainer.id = 'mapBuildingContainer';

    // crear mapa
    let mapa = document.createElement('div');
    mapa.id = 'map';
    mapa.style.width = '600px';
    mapa.style.height = '400px';
    mapaContainer.appendChild(mapa);
    
    return mapaContainer;

    /*
    <div class="col-lg-8 col-sm-6 mb-4" id="mapBuildingContainer">
        <!-- Map img-->
        <div class="mb-2 d-flex justify-content-center">
            <div id="map" style="width: 600px; height: 400px;"></div>
            <!-- <img class="img-fluid" src="assets/img/tempMapa/Mapallorca.jpg" alt="ElMapa" /> -->
        </div>
        
        <!-- Selected From Map-->
        <div class="portfolio-item">
            <a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal1">
                <div class="portfolio-hover">
                    <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                </div>
                <img class="img-fluid" src="assets/img/portfolio/1.jpg" alt="..." />
            </a>
            <div class="portfolio-caption">
                <div class="portfolio-caption-heading">Catedral de Palma</div>
                <div class="portfolio-caption-subheading text-muted">También conocida como La Seu</div>
            </div>
        </div>
    </div>
    */
}

function crearLista() {

}