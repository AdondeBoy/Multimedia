document.addEventListener('DOMContentLoaded', inicio());

let map;
// const apiKeyWeather = '1ff240de287dae93a6e61f1f4a04bf0a';

function inicio() {
    // Obtener día de hoy
    if (sessionStorage.getItem('date') === null)
        setCurrentDate();
    // Obtener geolocalización
    getUserPosition();
    // mostrar portfolio
    setNavPorfolioHidden(false);

    // Inicializar contador si no existe todavía
    if (sessionStorage.getItem('i') === null)
        sessionStorage.setItem('i', '0');

    // Completar el footer
    let date = new Date(sessionStorage.getItem('date'));
    document.getElementById('Copyright').innerHTML = "Copyright &copy; Mallorca Route " + date.getFullYear();

    // Define los datos estáticos en un arreglo de objetos
    let lugares = [
        {
            nombre: "Catedral de Palma",
            subtitulo: "También conocida como La Seu",
			estilo: "Arquitectura gótica",
			descripcion: "La Catedral de Mallorca es un templo de estilo gótico levantino construido a la orilla de la bahía de Palma. Se trata de una de las catedrales más altas de Europa y uno de los edificios más emblemáticos de la isla de Mallorca.",
            imagen: "assets/img/portfolio/1.jpg",
            video: "assets/video/matrices.mp4",
            audio: "assets/audio/fonerAudio.mp3",
            horario: [
                "Lu$10:00 - 17:15",
                "Ma$10:00 - 17:15",
                "Mi$10:00 - 17:15",
                "Ju$10:00 - 17:15",
                "Vi$10:00 - 17:15",
                "Sa$10:00 - 14:15",
                "Do$10:00 - 14:15"
            ],
            lat: 39.56751097483424,
            lon: 2.648302373075007,
			url: "http://catedraldemallorca.org/",
            isAccessibleForFree: false,
            parking: true
        },
        {
            nombre: "Parroquia de San Bartomeu",
            subtitulo: "Parroquia de estilo neogótico y modernista",
			estilo: "Arquitectura gótica",
			descripcion: "La Parroquia de Sant Bartomeu es un templo de estilo neogótico situado en el centro de la localidad de Sóller, en la isla de Mallorca. Se trata de una iglesia de gran belleza arquitectónica y de gran valor histórico y cultural.",
            imagen: "assets/img/portfolio/2.jpg",
            horario: [
                "Lu$09:00 - 17:30",
                "Ma$09:00 - 17:30",
                "Mi$09:00 - 17:30",
                "Ju$09:00 - 17:30",
                "Vi$09:00 - 17:30",
                "Sa$09:00 - 12:00"
            ],
            lat: 39.765942,
            lon: 2.715518,
			url: "https://soller.es/es/lugares/iglesia-de-sant-bartomeu/",
            isAccessibleForFree: true,
            parking: false
        },
        {
            nombre: "Talaiots",
            subtitulo: "Piedras",
            imagen: "assets/img/portfolio/3.jpg",
            horario: [
                "Lu$10:00 - 13:00",
                "Ma$10:00 - 13:00",
                "Mi$10:00 - 13:00",
                "Ju$10:00 - 13:00",
                "Vi$10:00 - 13:00",
                "Sa$10:00 - 13:00",
                "Do$10:00 - 13:00"
            ],
            lat: 39.55443557349407,
            lon: 2.706647944936505,
            isAccessibleForFree: true,
            parking: true
        },
        {
            nombre: "Edificio",
            subtitulo: "Emblema de la arquitectura modernista",
            imagen: "assets/img/portfolio/4.jpeg",
            horario: [
                "Lu$10:00 - 13:00",
                "Ma$10:00 - 13:00",
                "Mi$10:00 - 13:00",
                "Ju$10:00 - 13:00",
                "Vi$10:00 - 13:00",
                "Sa$10:00 - 13:00",
                "Do$10:00 - 13:00"
            ],
            lat: 39.576435992206605,
            lon: 2.6532397998618347,
            isAccessibleForFree: false,
            parking: false
        },
        {
            nombre: "Castell de l'Almudaina",
            subtitulo: "Residencia oficial de verano del rey",
            imagen: "assets/img/portfolio/5.jpg",
            horario: [
                "Lu$10:00 - 13:00",
                "Ma$10:00 - 13:00",
                "Mi$10:00 - 13:00",
                "Ju$10:00 - 13:00",
                "Vi$10:00 - 13:00",
                "Sa$10:00 - 13:00",
                "Do$10:00 - 13:00"
            ],
            lat: 39.5711,
            lon: 2.6463,
            isAccessibleForFree: false,
            parking: false
        },
        {
            nombre: "Castell de Bellver",
            subtitulo: "Actual Museo de Historia de Palma",
			estilo: "Castillo medieval gótico",
			descripcion: "El castillo de Bellver es una fortificación de estilo gótico situada a unos tres kilómetros de la ciudad española de Palma de Mallorca, en Baleares. Fue construido a principios del siglo XIV por orden del rey Jaime II de Mallorca. Se encuentra sobre un monte de 112 metros sobre el nivel del mar, en una zona rodeada de bosque, desde donde se puede contemplar la ciudad, el puerto, la sierra de Tramontana y el Llano de Mallorca; de hecho, su nombre viene del catalán antiguo bell veer, que significa «bella vista». Una de sus peculiaridades es que se trata de uno de los pocos castillos de toda Europa de planta circular, siendo el más antiguo de estos.",
            imagen: "assets/img/portfolio/6.jpg",
            horario: [
                "Ma$10:00 - 18:00",
                "Mi$10:00 - 18:00",
                "Ju$10:00 - 18:00",
                "Vi$10:00 - 18:00",
                "Sa$10:00 - 18:00",
                "Do$10:00 - 15:00"
            ],
            lat: 39.5711,
            lon: 2.6463,
			url: "https://castelldebellver.palma.es/es/",
            isAccessibleForFree: false,
            parking: true
        }
    ];
    
    let edificiosJSON = lugares;

    // poner función en el logo y en el botón de inicio
    let aLogo = document.getElementById('logoMashorca');
    let aInicio = document.getElementById('inicio');
    // Al hacer click sobre el logo o el botón de inicio, se vuelve a la página de inicio
    aLogo.onclick = goHome;
    aInicio.onclick = goHome;

    crearSlider();
    crearSeccionPortfolio(edificiosJSON);
    crearSeccionTeam();
    scriptSlider();
}

async function leerJSON (){
    // Hacer una solicitud GET al archivo JSON utilizando fetch()
    fetch('edificios.json')
    .then(function(response) {
        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON: ' + response.status);
        }
        // Convertir la respuesta a JSON
        return response.json();
    })
    .then(function(edificios) {
        // guardar edificios en edificiosJSON
        return edificios;
    })
    .catch(function(error) {
        // Capturar y manejar cualquier error que ocurra durante la solicitud
        console.error('Error al cargar el archivo JSON:', error);
        return null;
    });
}

async function obtenerObjetosEdificiosJSON() {
    let objetoJSON = await leerJSON();
    let lugares = [];

    if (objetoJSON) {
        let listaObjetos = JSON.parse(objetoJSON).itemListElement;

        listaObjetos.forEach(function(objeto) {
            let struct = {
                nombre: objeto.name,
                subtitulo: objeto.description.alternativeHeadline,
                descripcion: objeto.description.description,
                estilo: objeto.description.genre,
                horario: convertirHorariosJson(objeto.openingHours),
                imagen: objeto.image,
                video: objeto.subjectOf.video,
                audio: objeto.subjectOf.audio,
                lat: objeto.geo.latitude,
                lon: objeto.geo.longitude,
                url: objeto.url,
                likes: objeto.aggregateRating.ratingCount,
                isAccessibleForFree: objeto.isAccessibleForFree,
                parking: objeto.parking
            };

            lugares.push(struct);
        });
    }

    return lugares;
}

function convertirHorariosJson(openingHours) {
    const diasSemanaIng = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    const diasSemanaEsp = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];
    const horario = [];

    openingHours.forEach(function(horarioDia) {
        const dias = horarioDia.split(" ")[0].split("-");
        const horas = horarioDia.split(" ")[1].split("-");

        let inicioDia = diasSemanaIng.indexOf(dias[0]);
        let finDia = diasSemanaIng.indexOf(dias[dias.length - 1]);

        // Asegurarse de que el inicio del día sea menor o igual al final del día
        if (inicioDia > finDia) {
            finDia += 7;
        }

        // Iterar sobre todos los días de la semana y agregar los horarios correspondientes
        for (let i = 0; i < 7; i++) {
            let dia = diasSemanaEsp[i];
            if (i >= inicioDia && i <= finDia) {
                horario.push(`${dia}$${horas[0]} - ${horas[1]}`);
            }
        }
    });

    return horario;
}

function setCurrentDate() {
    // Obtener la fecha actual
    let fechaActual = new Date();

    // Obtener el año, el mes y el día
    let year = fechaActual.getFullYear();
    let month = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11, por eso se suma 1
    let day = String(fechaActual.getDate()).padStart(2, '0');

    // Formatear la fecha en 'yy-mm-dd'
    sessionStorage.setItem('date', `${year}-${month}-${day}`);
}

function setNavPorfolioHidden (bool) {
    let navP = document.getElementById("portfolioNav");
    if (bool)
        navP.setAttribute('hidden', 'true');
    else
        navP.removeAttribute('hidden');
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
        let  subtitulo = "";
        if (edificio?.subtitulo !== undefined)
            subtitulo = edificio.subtitulo;

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
                        <div class="portfolio-caption-subheading text-muted">${subtitulo}</div>
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

    // crear contenedor de la información y engancharlo a container2
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

function generarModalBodyContent(edificio, i) {
    let modalBody = document.createElement('div');
    modalBody.setAttribute('id', 'modalBody' + i);
    modalBody.classList.add('modal-body');

    // añadir título
    let titulo = document.createElement('h2');
    titulo.classList.add('text-uppercase');
    titulo.textContent = edificio.nombre;
    modalBody.appendChild(titulo);

    // añadir subtítulo con nombre alternativo si lo tiene
    if (edificio?.subtitulo !== undefined) {
        // existe un subtitulo
        let subtitulo = document.createElement('p');
        subtitulo.classList.add('item-intro', 'text-muted', 'mb-0');
        subtitulo.textContent =  edificio.subtitulo + ".";
        modalBody.appendChild(subtitulo);
    }
    
    // añadir imagen (supongo que lo cambiaremos por un vídeo o maybe un slider con ambos)
    if (edificio?.video === undefined || edificio?.video !== "") {
        let imagen = document.createElement('img');
        imagen.classList.add('img-fluid', 'd-block', 'mx-auto');
        imagen.setAttribute('src', edificio.imagen);
        imagen.setAttribute('alt', edificio.nombre);
        modalBody.appendChild(imagen);
    } else {
        let video = document.createElement('video');
        video.classList.add('img-fluid', 'd-block', 'mx-auto');
        video.setAttribute('src', edificio.video);
        video.setAttribute('alt', edificio.nombre);
        video.setAttribute('controls', 'true');
        modalBody.appendChild(video);
    }

    if (edificio?.audio !== undefined || edificio?.audio !== "") {
        let audio = document.createElement('audio');
        audio.classList.add('d-block', 'mx-auto', 'mb-4', 'mt-2');
        audio.setAttribute('src', edificio.audio);
        audio.setAttribute('controls', 'true');
        modalBody.appendChild(audio);
    }

    // añadir estilo si existe
    if (edificio?.estilo !== undefined) {
        let divEstilo = document.createElement('div');
        divEstilo.classList.add('list-inline-item', 'mb-3');

        let strongEstilo = document.createElement('strong');
        strongEstilo.innerHTML = "Estilo:";

        divEstilo.appendChild(strongEstilo);
        divEstilo.innerHTML += " " + edificio.estilo;
        modalBody.appendChild(divEstilo);
    }

    // añadir descripción
    let descripcion = document.createElement('p');
    descripcion.textContent = edificio.descripcion;
    modalBody.appendChild(descripcion);
    
    // añadir clima  
    let listaClima = document.createElement('div');
    listaClima.setAttribute('hidden', 'true');
    listaClima.classList.add('mb-4', 'listaHorizontal');
    
    let listaClimaBody = document.createElement('div');
    listaClimaBody.setAttribute('id', 'clima');
    listaClimaBody.classList.add('d-flex', 'justify-content-center');
    // Obtener datos de la API del clima
    let hora = 0;
    let offsetDias = new Date(sessionStorage.getItem('date')).getDate() - new Date().getDate();
    // Si la fecha almacenada es la de hoy, solo se mostrará el clima para las horas futuras
    if (offsetDias === 0) {
        hora = new Date().getHours();
        // Se redondea a la hora anterior a la siguiente hora múltiplo de 3
        do {
            hora++;
        } while (hora % 3 !== 0);
    }
    // Se itera sobre las horas del día disponibles
    for (let j = 0; hora < 24; hora=hora+3, j++) {
        let latitud = edificio.lat;
        let longitud = edificio.lon;
        obtenerDatosClima(latitud, longitud, hora, (j + 8*offsetDias))
        .then(item => {
            listaClimaBody.appendChild(item);
            if (listaClima.getAttribute("hidden")) {
                listaClima.removeAttribute("hidden");
            }
        })
        .catch(error => {
            console.log(error);
        });
        
    }
    listaClima.appendChild(listaClimaBody);
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
    let horario = edificio?.horario;
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
    botonAgregar.setAttribute('data-bs-dismiss', 'modal');
    botonAgregar.textContent = 'Añadir al plan';
    grupoBotones.appendChild(botonAgregar);

    // añadir una función u otra en función de en qué página estemos (principal/plan)
    if (isPlan()) {
        // añadir elemento al plan directamente
        botonAgregar.onclick = function() {
            if (sessionStorage.getItem('plan') === null || sessionStorage.getItem('plan') === '[]') {
                // borrar placeholder de la lista
                let ol = document.getElementById('ol_espacioLista');
                ol.innerHTML = '';
            }
            
            // - almacenar edifico en plan, con hora y salida
            savePopUpData(i, edificio.nombre);
            añadirElementoListaPlan(parseInt(sessionStorage.getItem('i')) - 1, edificio.nombre, document.getElementById('hourIn' + i).value, document.getElementById('hourOut' + i).value);
        }

    } else {
        // desde index, guardar elemento en el plan de la sesión y generar plan
        botonAgregar.onclick = function() {
            // Datos de sesión
            // - almacenar edifico en plan, con hora y salida
            savePopUpData(i, edificio.nombre);
            window.location.href = '#';
            borrarIndex();
            plan();
        };
    }
    
    // Más información (web del edificio)
    let url = edificio?.url; 
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

    modalBody.appendChild(grupoBotones);

    return modalBody;
}

function obtenerDatosClima(latitud, longitud, hora, indice) {
    // Obtener la temperatura y el clima de la API
    const apiKeyWeather = '1ff240de287dae93a6e61f1f4a04bf0a';
    let urlClima = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitud}&lon=${longitud}&appid=${apiKeyWeather}&units=metric`;

    return new Promise((resolve, reject) => {
        fetch(urlClima)
            .then(response => response.json())
            .then(data => {
                let clima = data.list[indice].weather[0].icon;
                // Obtener la temperatura de la API
                let temperatura = data.list[indice].main.temp;
                
                if (clima === undefined || temperatura === undefined) {
                    reject('No hay datos sobre el clima disponibles a las' + hora + ' horas');
                    return;
                }

                // Crear el item del clima
                let item = crearItemClima(hora, temperatura, clima);
                if (item === undefined) {
                    reject('No se han podido obtener el item');
                    return;
                }
                resolve(item);
            })
            .catch(error => {
                console.error(error);
                reject("Error al obtener los datos del clima");
            });
    });
}

function savePopUpData(j, nombre) {
    // sea el día que sea, ya está guardado tal y como corresponde en la session
    // crear estructura de datos representativa de lo elegido
    let struct = {
        i: parseInt(sessionStorage.getItem('i')),
        name: nombre,
        hourIn: document.getElementById('hourIn' + j).value,
        hourOut: document.getElementById('hourOut' + j).value
    }

    // incrementar i
    sessionStorage.setItem('i', struct.i + 1);

    // añadir al plan
    let planStr = sessionStorage.getItem('plan');
    let plan;

    if (planStr) {
        plan = JSON.parse(planStr);
        plan.push(struct);

    } else {
        // plan no existe, crear array de "structs"
        plan = [struct];
    }

    sessionStorage.setItem('plan', JSON.stringify(plan));
}

function crearItemClima(hora, temperatura, clima) {
    temperatura = Math.round(temperatura);
    let item = document.createElement('div');
    item.classList.add('mx-3');

    let diaElement = document.createElement('div');
    item.appendChild(diaElement);

    let img = document.createElement('img');
    img.classList.add('img-weather');
    img.setAttribute('src', 'https://openweathermap.org/img/wn/' + clima + '@4x.png');
    diaElement.appendChild(img);

    let horaElement = document.createElement('p');
    horaElement.classList.add('item-intro', 'text-muted', 'mb-0');
    if (hora < 10) {
        horaElement.textContent = "0" + hora + ":00";
    } else {
        horaElement.textContent = hora + ":00";
    }
    diaElement.appendChild(horaElement);

    let temperaturaElement = document.createElement('p');
    temperaturaElement.classList.add('item-intro', 'text-muted', 'mb-0');
    temperaturaElement.textContent = temperatura + "°C";
    diaElement.appendChild(temperaturaElement);

    return item;
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

function goHome() {    
    // Si ya está en la página de inicio, no hace nada
    let container = document.getElementById('slider');
    // Si el contenedor no existe
    if (container === null) {
        // let userConfirmation = confirm("¿Quieres abandonar la planificación? Perderás tus datos actuales...");
        // if (userConfirmation) {
        //     sessionStorage.setItem('plan', '[]');
        // }
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
    let i = 1;
    while (i <= 3) {
        let img = document.createElement('img');
        let path = "assets/img/slider/imagen" + i + ".jpg";
        img.setAttribute('src', path);
        img.setAttribute('alt', 'Imagen slider ' + i);
        let swiperSlide = document.createElement('div');
        swiperSlide.classList.add('swiper-slide');
        swiperSlide.appendChild(img);
        swiperWrapper.appendChild(swiperSlide);
        i++;
    }

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
}

function borrarIndex() {
    setNavPorfolioHidden(true);
    borrarSlider();
    // Se borra el contenido del container
    let container = document.getElementById('portfolioContainer');
    container.innerHTML = '';

    // borrar sección de equipo
    let main = document.getElementById('main');
    let team = document.getElementById('team');
    if (team)
        main.removeChild(team);
    
    // borrar pop-ups
    let popUpsContainer = document.getElementById('portfolio-modals');
    popUpsContainer.innerHTML = '';
}

function borrarPlan() {
    let container = document.getElementById('portfolioContainer');
    // Se borra el contenido del container
    container.innerHTML = ''; 

    // borrar pop-ups
    let popUpsContainer = document.getElementById('portfolio-modals');
    popUpsContainer.innerHTML = '';

    // borrar plan de sessionStorage
    // sessionStorage.setItem('i', '0');
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

function isPlan() {
    return document.getElementById('ol_espacioLista') != null;
}

function plan() {
    // obtener el elemento <div> de clase "container"
    let divContainer = document.getElementById('portfolioContainer');
    
    // Crea el elemento <div> de clase "text-center"
    let divTextCenter = document.createElement('div');
    divTextCenter.classList.add('text-center', 'pt-5', 'pb-2');

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

    let busquedaContainer = document.createElement('div');
    busquedaContainer.setAttribute('id', 'busqueda-container');
    let barra = document.getElementById('barra');
    barra.appendChild(busquedaContainer);

    añadirEventosBusqueda();
    calendario();
    autocompletar();

    // crear el <div> "row"
    let divRowContainer = document.createElement('div');
    divRowContainer.classList.add('row');
    divContainer.appendChild(divRowContainer);

    let mapContainer = crearMapa();
    divRowContainer.appendChild(mapContainer);
    initMapa();
    busquedaBoton();

    let listContainer = crearLista();
    divRowContainer.appendChild(listContainer);
    

    // generar elementos de la lista de plan si los hay
    let planStr = sessionStorage.getItem('plan');

    if (planStr) {
        // hay elementos en el plan
        let plan = JSON.parse(planStr);
        for (let j = 0; j < plan.length; j++) {
            añadirElementoListaPlan(plan[j].i, plan[j].name, plan[j].hourIn, plan[j].hourOut);
        }
    }
}

function crearCamposBusqueda() {
    // crear contenedor principal
    let container = document.createElement('div');
    container.classList.add('container', 'd-flex', 'align-items-center', 'mb-3');
    container.setAttribute('id', 'busqueda');
    
    // crear contenedor de botón de calendario
    let calendarContainer = document.createElement('div');
    calendarContainer.classList.add('d-block');
    container.appendChild(calendarContainer);

    // crear botón de calendario
    let calendarButton = document.createElement('button');
    calendarButton.classList.add('btn', 'btn-primary', 'me-4');
    calendarButton.setAttribute('id', 'calendar-button');
    calendarButton.textContent = 'Elegir día';
    calendarContainer.appendChild(calendarButton);

    // crear icono de calendario
    let calendarIcon = document.createElement('svg');
    calendarIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    calendarIcon.setAttribute('viewBox', '0 0 24 24');
    calendarIcon.setAttribute('width', '24');
    calendarIcon.setAttribute('height', '24');
    calendarIcon.setAttribute('fill', 'currentColor');
    let path = document.createElement('path');
    path.setAttribute('d', 'M6.75 0a.75.75 0 0 1 .75.75V3h9V.75a.75.75 0 0 1 1.5 0V3h2.75c.966 0 1.75.784 1.75 1.75v16a1.75 1.75 0 0 1-1.75 1.75H3.25a1.75 1.75 0 0 1-1.75-1.75v-16C1.5 3.784 2.284 3 3.25 3H6V.75A.75.75 0 0 1 6.75 0ZM21 9.5H3v11.25c0 .138.112.25.25.25h17.5a.25.25 0 0 0 .25-.25Zm-17.75-5a.25.25 0 0 0-.25.25V8h18V4.75a.25.25 0 0 0-.25-.25Z');
    calendarIcon.appendChild(path);
    calendarButton.appendChild(calendarIcon);

    // crear contenedor de calendario
    let calendarContainer2 = document.createElement('div');
    calendarContainer2.setAttribute('type', 'button');
    calendarContainer2.setAttribute('id', 'calendar-container');
    calendarContainer.appendChild(calendarContainer2);

    let html = `
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
                            <label>Distancia máxima (km):</label>
                        </div>
                        <div class="col-6 d-flex justify-content-start">
                            <input class="form-control-sm"  id="SearchRadius" type="text" placeholder="10" data-sb-validations="required" />
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
                    <div class="dropdown-item d-flex justify-content-center">
                        <button class="btn btn-light" id="botonFiltros">Aplicar Filtros</button>
                    </div>
                </form>
            </div>
            <!-- Barra de búsqueda -->
            <input type="text" class="form-control" id="barra" placeholder="Buscar..." aria-label="Buscar" aria-describedby="SearchButton">
            <button class="btn btn-primary" type="submit" id="SearchButton">
                <i class="fas fa-search"></i>
            </button>
        </div>
        `;
    // Se inserta el html sin reemplazar lo anterior
    container.innerHTML += html;

    return container
}

function buscar(valor) {
    // Comprobar valor
    console.log("Nombre = " + valor);
    if (!estaEnJson(valor)) {
        alert('No se ha encontrado ningún edificio con ese nombre');
        return;
    } else {
        console.log('Edificio encontrado');
    }
    // Se guarda el nombre del edificio en la sesión
    sessionStorage.setItem("mapSelectedPlace", valor);
    // Se muestra el pop-up
    swapSelectedPlace();
    resetMapa();

    // Scroll al card para ver mejor el cambio
    let element = document.getElementById('mapSelectedPlace');

    element.scrollIntoView({behavior: 'smooth', block: 'center'});
}

function busquedaBoton() {
    // obtener valores de los campos de búsqueda
    let boton = document.getElementById('SearchButton');

    boton.onclick = function() {
        let valor = document.getElementById('barra').value;
        buscar(valor);
    }
}

function mostrarResultados(results) {
    // Muestra los resultados de la búsqueda como elementos que aparecen bajo la barra de búsqueda, con overflow y = scroll
    // Crear contenedor de resultados
    let container = document.createElement('div');
    container.classList.add('container', 'd-flex', 'flex-column', 'align-items-center', 'mb-3');
    container.setAttribute('id', 'searchResults');

    // Crear item resultado
    for (let i = 0; i < results.length; i++) {
        if (!checkCondicionesFiltros(results[i])) {
            continue;
        }
        let item = document.createElement('div');
        item.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'mb-2');
        item.setAttribute('id', 'resultado' + i);
        item.textContent = results[i].nombre;
        container.appendChild(item);
    }

    return container;
}

function estaEnJson(nombre) {
    let results = [
        {
            nombre: "Catedral de Palma",
            subtitulo: "También conocida como La Seu",
			estilo: "Arquitectura gótica",
			descripcion: "La Catedral de Mallorca es un templo de estilo gótico levantino construido a la orilla de la bahía de Palma. Se trata de una de las catedrales más altas de Europa y uno de los edificios más emblemáticos de la isla de Mallorca.",
            imagen: "assets/img/portfolio/1.jpg",
            horario: [
                "Lu$10:00 - 17:15",
                "Ma$10:00 - 17:15",
                "Mi$10:00 - 17:15",
                "Ju$10:00 - 17:15",
                "Vi$10:00 - 17:15",
                "Sa$10:00 - 14:15",
                "Do$10:00 - 14:15"
            ],
            lat: 39.56751097483424,
            lon: 2.648302373075007,
			url: "http://catedraldemallorca.org/",
            isAccessibleForFree: false,
            parking: true
        },
        {
            nombre: "Parroquia de San Bartomeu",
            subtitulo: "Parroquia de estilo neogótico y modernista",
			estilo: "Arquitectura gótica",
			descripcion: "La Parroquia de Sant Bartomeu es un templo de estilo neogótico situado en el centro de la localidad de Sóller, en la isla de Mallorca. Se trata de una iglesia de gran belleza arquitectónica y de gran valor histórico y cultural.",
            imagen: "assets/img/portfolio/2.jpg",
            horario: [
                "Lu$09:00 - 17:30",
                "Ma$09:00 - 17:30",
                "Mi$09:00 - 17:30",
                "Ju$09:00 - 17:30",
                "Vi$09:00 - 17:30",
                "Sa$09:00 - 12:00"
            ],
            lat: 39.765942,
            lon: 2.715518,
			url: "https://soller.es/es/lugares/iglesia-de-sant-bartomeu/",
            isAccessibleForFree: true,
            parking: false
        },
        {
            nombre: "Talaiots",
            subtitulo: "Piedras",
            imagen: "assets/img/portfolio/3.jpg",
            horario: [
                "Lu$10:00 - 13:00",
                "Ma$10:00 - 13:00",
                "Mi$10:00 - 13:00",
                "Ju$10:00 - 13:00",
                "Vi$10:00 - 13:00",
                "Sa$10:00 - 13:00",
                "Do$10:00 - 13:00"
            ],
            lat: 39.55443557349407,
            lon: 2.706647944936505,
            isAccessibleForFree: true,
            parking: true
        },
        {
            nombre: "Edificio",
            subtitulo: "Emblema de la arquitectura modernista",
            imagen: "assets/img/portfolio/4.jpeg",
            horario: [
                "Lu$10:00 - 13:00",
                "Ma$10:00 - 13:00",
                "Mi$10:00 - 13:00",
                "Ju$10:00 - 13:00",
                "Vi$10:00 - 13:00",
                "Sa$10:00 - 13:00",
                "Do$10:00 - 13:00"
            ],
            lat: 39.576435992206605,
            lon: 2.6532397998618347,
            isAccessibleForFree: false,
            parking: false
        },
        {
            nombre: "Castell de l'Almudaina",
            subtitulo: "Residencia oficial de verano del rey",
            imagen: "assets/img/portfolio/5.jpg",
            horario: [
                "Lu$10:00 - 13:00",
                "Ma$10:00 - 13:00",
                "Mi$10:00 - 13:00",
                "Ju$10:00 - 13:00",
                "Vi$10:00 - 13:00",
                "Sa$10:00 - 13:00",
                "Do$10:00 - 13:00"
            ],
            lat: 39.5711,
            lon: 2.6463,
            isAccessibleForFree: false,
            parking: false
        },
        {
            nombre: "Castell de Bellver",
            subtitulo: "Actual Museo de Historia de Palma",
			estilo: "Castillo medieval gótico",
			descripcion: "El castillo de Bellver es una fortificación de estilo gótico situada a unos tres kilómetros de la ciudad española de Palma de Mallorca, en Baleares. Fue construido a principios del siglo XIV por orden del rey Jaime II de Mallorca. Se encuentra sobre un monte de 112 metros sobre el nivel del mar, en una zona rodeada de bosque, desde donde se puede contemplar la ciudad, el puerto, la sierra de Tramontana y el Llano de Mallorca; de hecho, su nombre viene del catalán antiguo bell veer, que significa «bella vista». Una de sus peculiaridades es que se trata de uno de los pocos castillos de toda Europa de planta circular, siendo el más antiguo de estos.",
            imagen: "assets/img/portfolio/6.jpg",
            horario: [
                "Ma$10:00 - 18:00",
                "Mi$10:00 - 18:00",
                "Ju$10:00 - 18:00",
                "Vi$10:00 - 18:00",
                "Sa$10:00 - 18:00",
                "Do$10:00 - 15:00"
            ],
            lat: 39.5711,
            lon: 2.6463,
			url: "https://castelldebellver.palma.es/es/",
            isAccessibleForFree: false,
            parking: true
        }
    ];
    // Se recorren los nombres para comprobar que exista
    for (let i = 0; i < results.length; i++) {
        if (results[i].nombre === nombre) {
            return true;
        }
    }
    return false;
}

function buscarEnJson() {
    // buscar en el json (simulado)
    let results = [
        {
            nombre: "Catedral de Palma",
            subtitulo: "También conocida como La Seu",
			estilo: "Arquitectura gótica",
			descripcion: "La Catedral de Mallorca es un templo de estilo gótico levantino construido a la orilla de la bahía de Palma. Se trata de una de las catedrales más altas de Europa y uno de los edificios más emblemáticos de la isla de Mallorca.",
            imagen: "assets/img/portfolio/1.jpg",
            horario: [
                "Lu$10:00 - 17:15",
                "Ma$10:00 - 17:15",
                "Mi$10:00 - 17:15",
                "Ju$10:00 - 17:15",
                "Vi$10:00 - 17:15",
                "Sa$10:00 - 14:15",
                "Do$10:00 - 14:15"
            ],
            lat: 39.56751097483424,
            lon: 2.648302373075007,
			url: "http://catedraldemallorca.org/",
            isAccessibleForFree: false,
            parking: true
        },
        {
            nombre: "Parroquia de San Bartomeu",
            subtitulo: "Parroquia de estilo neogótico y modernista",
			estilo: "Arquitectura gótica",
			descripcion: "La Parroquia de Sant Bartomeu es un templo de estilo neogótico situado en el centro de la localidad de Sóller, en la isla de Mallorca. Se trata de una iglesia de gran belleza arquitectónica y de gran valor histórico y cultural.",
            imagen: "assets/img/portfolio/2.jpg",
            horario: [
                "Lu$09:00 - 17:30",
                "Ma$09:00 - 17:30",
                "Mi$09:00 - 17:30",
                "Ju$09:00 - 17:30",
                "Vi$09:00 - 17:30",
                "Sa$09:00 - 12:00"
            ],
            lat: 39.765942,
            lon: 2.715518,
			url: "https://soller.es/es/lugares/iglesia-de-sant-bartomeu/",
            isAccessibleForFree: true,
            parking: false
        },
        {
            nombre: "Talaiots",
            subtitulo: "Piedras",
            imagen: "assets/img/portfolio/3.jpg",
            horario: [
                "Lu$10:00 - 13:00",
                "Ma$10:00 - 13:00",
                "Mi$10:00 - 13:00",
                "Ju$10:00 - 13:00",
                "Vi$10:00 - 13:00",
                "Sa$10:00 - 13:00",
                "Do$10:00 - 13:00"
            ],
            lat: 39.55443557349407,
            lon: 2.706647944936505,
            isAccessibleForFree: true,
            parking: true
        },
        {
            nombre: "Edificio",
            subtitulo: "Emblema de la arquitectura modernista",
            imagen: "assets/img/portfolio/4.jpeg",
            horario: [
                "Lu$10:00 - 13:00",
                "Ma$10:00 - 13:00",
                "Mi$10:00 - 13:00",
                "Ju$10:00 - 13:00",
                "Vi$10:00 - 13:00",
                "Sa$10:00 - 13:00",
                "Do$10:00 - 13:00"
            ],
            lat: 39.576435992206605,
            lon: 2.6532397998618347,
            isAccessibleForFree: false,
            parking: false
        },
        {
            nombre: "Castell de l'Almudaina",
            subtitulo: "Residencia oficial de verano del rey",
            imagen: "assets/img/portfolio/5.jpg",
            horario: [
                "Lu$10:00 - 13:00",
                "Ma$10:00 - 13:00",
                "Mi$10:00 - 13:00",
                "Ju$10:00 - 13:00",
                "Vi$10:00 - 13:00",
                "Sa$10:00 - 13:00",
                "Do$10:00 - 13:00"
            ],
            lat: 39.5711,
            lon: 2.6463,
            isAccessibleForFree: false,
            parking: false
        },
        {
            nombre: "Castell de Bellver",
            subtitulo: "Actual Museo de Historia de Palma",
			estilo: "Castillo medieval gótico",
			descripcion: "El castillo de Bellver es una fortificación de estilo gótico situada a unos tres kilómetros de la ciudad española de Palma de Mallorca, en Baleares. Fue construido a principios del siglo XIV por orden del rey Jaime II de Mallorca. Se encuentra sobre un monte de 112 metros sobre el nivel del mar, en una zona rodeada de bosque, desde donde se puede contemplar la ciudad, el puerto, la sierra de Tramontana y el Llano de Mallorca; de hecho, su nombre viene del catalán antiguo bell veer, que significa «bella vista». Una de sus peculiaridades es que se trata de uno de los pocos castillos de toda Europa de planta circular, siendo el más antiguo de estos.",
            imagen: "assets/img/portfolio/6.jpg",
            horario: [
                "Ma$10:00 - 18:00",
                "Mi$10:00 - 18:00",
                "Ju$10:00 - 18:00",
                "Vi$10:00 - 18:00",
                "Sa$10:00 - 18:00",
                "Do$10:00 - 15:00"
            ],
            lat: 39.5711,
            lon: 2.6463,
			url: "https://castelldebellver.palma.es/es/",
            isAccessibleForFree: false,
            parking: true
        }
    ];
    // Filtrar por nombre según el resultado de la búsqueda
    //return results.filter(result => result.nombre.toLowerCase().includes(searchValue.toLowerCase()));
    return results.map(result => result.nombre);
}

function autocompletar() {
    // Autocompletar la búsqueda mediante la librería de jQuery
    let search = document.getElementById('barra');
    // Asignar la función de autocompletar a la barra de búsqueda
    $(search).autocomplete({
        /*
        source: function(request, response) {
            // Obtener los resultados de la búsqueda
            let results = buscarEnJson(request.term);
            // Mapear los resultados
            response(results.map(result => result.nombre));
        }
        */
        source: buscarEnJson(),
        open: function() {
            $('.ui-autocomplete').addClass('search-z-index');
        }
    });
}

// Es el script del calendario adaptado
function calendario() {
    let isShowing = false;
    // Oculta el contenedor del calendario al inicio
    let calContainer = $('#calendar-container');
    // Se checkea que exista el contenedor
    if (calContainer.length === 0) {
        // Se crea un elemento para indicarlo
        console.error('No se ha encontrado el contenedor del calendario');
        return;
    }
    // Se esconde el calendario
    calContainer.hide();
    
    // Inicializa el Datepicker en el contenedor del calendario
    calContainer.datepicker({
        minDate: 0, // Fecha mínima permitida
        dateFormat: 'yy-mm-dd', // Formato de fecha deseado
        onSelect: function(dateText) {
            // Manejar la selección de fecha
            // Se presenta un mensaje al usuario para confirmar el cambio de fecha
            let userConfirmation = confirm("¿Quieres cambiar la fecha del plan?\n\nFecha actual: " + sessionStorage.getItem('date'));
            if (userConfirmation) {
                // actualizar día en sessionStorage
                sessionStorage.setItem('date', dateText)
                let diaLista = document.getElementById('diaLista');
                diaLista.textContent = "Día " + dateText;

                let modalBody = document.getElementById('portfolioModal0');
                if (modalBody !== null) {
                    console.log("Cambiando fecha en el pop-up");
                    // volver a generar pop up para actualizar el tiempo
                    swapSelectedPlace();
                }

                // Oculta el contenedor del calendario después de seleccionar una fecha
                calContainer.hide();
                isShowing = false;
            } else {
                // Si el usuario cancela, se restaura la fecha original
                calContainer.datepicker('setDate', sessionStorage.getItem('date'));
            }
            
        }
    });
    
    let calButton = $('#calendar-button');
    // Muestra el calendario cuando se hace clic en el botón,
    // o lo oculta si ya se está mostrando
    calButton.click(function() {
        if (!isShowing) {
            calContainer.show();
            isShowing = true;
        } else {
            calContainer.hide();
            isShowing = false;
        }
    });

    $(document).mouseup(function(e) 
    {
        let calContainer2 = $('#calendar-container');
        if (!calContainer2.is(e.target) && calContainer2.has(e.target).length === 0) 
        {
            calContainer2.hide();
        }
    });
}

function añadirEventosBusqueda() {
    let horaIn = document.getElementById('SearchHourStart');
    let horaOut = document.getElementById('SearchHourEnd');
    let searchFree = document.getElementById('SearchFree');
    let parkingNear = document.getElementById('ParkingNear');
    let HosteleriaCercana = document.getElementById('HosteleriaCercana');
    let botonFiltros = document.getElementById('botonFiltros');
    let radio = document.getElementById('SearchRadius');
    
	botonFiltros.onclick = function () {
		// comprobar valores de todos los filtros
		// limpiar valor horas de sessionStorage
		sessionStorage.setItem('hourInFiltros', "");
		sessionStorage.setItem('hourOutFiltros', "");

        if (radio.value !== "") {
            sessionStorage.setItem('distanciaFiltros', radio.value);
        } else {
            sessionStorage.setItem('distanciaFiltros', '0');
        }
        
		// comprobar valor horas filtros
		checkHorasFiltros(horaIn.value, horaOut.value);
		
		// actualizar valores en session de los checkbox
		sessionStorage.setItem('searchFree', "" + searchFree.checked);
		sessionStorage.setItem('parkingNear', "" + parkingNear.checked);
		sessionStorage.setItem('HosteleriaCercana', "" + HosteleriaCercana.checked);
        
        // reiniciar mapa
        resetMapa();
	}

    // inicializar campos en sessionStorage
    sessionStorage.setItem('hourInFiltros', "");
    sessionStorage.setItem('hourOutFiltros', "");
    sessionStorage.setItem('distanciaFiltros', "0");
    sessionStorage.setItem('searchFree', "false");
    sessionStorage.setItem('parkingNear', "false");
    sessionStorage.setItem('HosteleriaCercana', "false");
}

// comprueba que los parámetros son textos de horas y que horaIn < horaOut
function checkHorasFiltros (horaIn, horaOut) {
	if (esHora(horaIn) && esHora(horaOut)) {
		let parts1 = horaIn.split(":");
		let parts2 = horaOut.split(":");
		
		let h1 = parseInt(parts1[0]);
		let h2 = parseInt(parts2[0]);
		if (h1 < h2) {
			// las horas son correctas
			sessionStorage.setItem('hourInFiltros', horaIn);
			sessionStorage.setItem('hourOutFiltros', horaOut);
		} else if (h1 == h2) {
			let m1 = parseInt(parts1[1]);
			let m2 = parseInt(parts2[1]);
			
			if (m1 < m2) {
				// los minutos son correctos
				sessionStorage.setItem('hourInFiltros', horaIn);
				sessionStorage.setItem('hourOutFiltros', horaOut);
			}
		}
	}
}

// comprueba si el texto hora es una hora correcta
function esHora (hora) {
	try {
		let parts = hora.split(":");
		
		if (parts.lenght === 2) {
			let h = parseInt(parts[0]);
			let m = parseInt(parts[1]);
			
			return h >= 0 && h < 24 && m >= 0 && m <= 60;
		}
		return false;
		
	} catch (error) {
		return false;
	}
}

function crearMapa() {
    // crear contenedor principal (mapa y card del edificio seleccionado)
    let mainContainer = document.createElement('div');
    mainContainer.classList.add('col-lg-8', 'col-sm-6', 'mb-4');
    mainContainer.setAttribute('id', 'mapContainer');

    // crear contenedor del mapa
    let mapaContainer = document.createElement('div');
    mapaContainer.classList.add('mb-2', 'd-flex', 'justify-content-center');
    mainContainer.appendChild(mapaContainer);

    // crear el mapa
    let map = document.createElement('div');
    map.setAttribute('id', 'map');
    map.setAttribute('style', 'width: 600px; height: 400px;');
    // map.style.width = '600px';
    // map.style.height = '400px';
    mapaContainer.appendChild(map);
   
    // Estaría bien en alt poner el nombre del edificio
    let html = `
        <!-- Selected From Map-->
        <div class="portfolio-item" id="mapSelectedPlace">
            <a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal0">
                <div id="popUpPortfolioHover" class="portfolio-hover" hidden="true">
                    <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                </div>
                <img id="mapSelectedPlaceImg" class="img-fluid" src="" alt="Missing image..." hidden="true"/>
            </a>
            <div class="portfolio-caption">
                <div class="portfolio-caption-heading" id="mapSelectedPlaceTitle">Busca tu destino</div>
                <div class="portfolio-caption-subheading text-muted" id="mapSelectedPlaceSubtitle">Puedes usar tanto la barra de búsqueda como el mapa</div>
            </div>
        </div>
        `;
    
    // Establecer el contenido HTML en el mapaContainer
    mainContainer.innerHTML += html;
    
    return mainContainer;
}

function initMapa() {
    // Se comprueba si el mapa ya se ha inicializado anteriormente
    let lat = parseFloat(sessionStorage.getItem('crd-latitude'));
    let lon = parseFloat(sessionStorage.getItem('crd-longitude'));

    // console.log(lat);
    // console.log(lon);
    // Inicializar el mapa y establecer su punto de vista en tus coordenadas y zoom
    // var map = L.map('map').setView([39.616775, 2.95], 9); // Coordenadas de Mallorca
    map = L.map('map').setView([lat, lon], 10.5);
    // let markerCasa = L.marker([lat, lon]).addTo(map);
    // Añadir una capa de mapa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

    let marker = L.marker([39.59398458121737, 2.678878006135083]).addTo(map);
    marker.bindPopup("<b>Casa de Carlos</b><br>Dominio público.");

    // Añadir marcadores al mapa
    // Coordenadas de los edificios
    añadirMarcadoresMapa();
}

function añadirMarcadoresMapa() {
    if (sessionStorage.getItem('distanciaFiltros') !== "0") {
        // no hay distancia máxima
        let circle = L.circle([parseFloat(sessionStorage.getItem('crd-latitude')), parseFloat(sessionStorage.getItem('crd-longitude'))], {
            color: 'blue',
            fillColor: '#30f',
            fillOpacity: 0.1,
            radius: parseInt(sessionStorage.getItem('distanciaFiltros')) * 1000
        }).addTo(map);
    }
    let lugares = [
        {
            nombre: "Catedral de Palma",
            subtitulo: "También conocida como La Seu",
			estilo: "Arquitectura gótica",
			descripcion: "La Catedral de Mallorca es un templo de estilo gótico levantino construido a la orilla de la bahía de Palma. Se trata de una de las catedrales más altas de Europa y uno de los edificios más emblemáticos de la isla de Mallorca.",
            imagen: "assets/img/portfolio/1.jpg",
            horario: [
                "Lu$10:00 - 17:15",
                "Ma$10:00 - 17:15",
                "Mi$10:00 - 17:15",
                "Ju$10:00 - 17:15",
                "Vi$10:00 - 17:15",
                "Sa$10:00 - 14:15",
                "Do$10:00 - 14:15"
            ],
            lat: 39.56751097483424,
            lon: 2.648302373075007,
			url: "http://catedraldemallorca.org/",
            isAccessibleForFree: false,
            parking: true
        },
        {
            nombre: "Parroquia de San Bartomeu",
            subtitulo: "Parroquia de estilo neogótico y modernista",
			estilo: "Arquitectura gótica",
			descripcion: "La Parroquia de Sant Bartomeu es un templo de estilo neogótico situado en el centro de la localidad de Sóller, en la isla de Mallorca. Se trata de una iglesia de gran belleza arquitectónica y de gran valor histórico y cultural.",
            imagen: "assets/img/portfolio/2.jpg",
            horario: [
                "Lu$09:00 - 17:30",
                "Ma$09:00 - 17:30",
                "Mi$09:00 - 17:30",
                "Ju$09:00 - 17:30",
                "Vi$09:00 - 17:30",
                "Sa$09:00 - 12:00"
            ],
            lat: 39.765942,
            lon: 2.715518,
			url: "https://soller.es/es/lugares/iglesia-de-sant-bartomeu/",
            isAccessibleForFree: true,
            parking: false
        },
        {
            nombre: "Talaiots",
            subtitulo: "Piedras",
            imagen: "assets/img/portfolio/3.jpg",
            horario: [
                "Lu$10:00 - 13:00",
                "Ma$10:00 - 13:00",
                "Mi$10:00 - 13:00",
                "Ju$10:00 - 13:00",
                "Vi$10:00 - 13:00",
                "Sa$10:00 - 13:00",
                "Do$10:00 - 13:00"
            ],
            lat: 39.55443557349407,
            lon: 2.706647944936505,
            isAccessibleForFree: true,
            parking: true
        },
        {
            nombre: "Edificio",
            subtitulo: "Emblema de la arquitectura modernista",
            imagen: "assets/img/portfolio/4.jpeg",
            horario: [
                "Lu$10:00 - 13:00",
                "Ma$10:00 - 13:00",
                "Mi$10:00 - 13:00",
                "Ju$10:00 - 13:00",
                "Vi$10:00 - 13:00",
                "Sa$10:00 - 13:00",
                "Do$10:00 - 13:00"
            ],
            lat: 39.576435992206605,
            lon: 2.6532397998618347,
            isAccessibleForFree: false,
            parking: false
        },
        {
            nombre: "Castell de l'Almudaina",
            subtitulo: "Residencia oficial de verano del rey",
            imagen: "assets/img/portfolio/5.jpg",
            horario: [
                "Lu$10:00 - 13:00",
                "Ma$10:00 - 13:00",
                "Mi$10:00 - 13:00",
                "Ju$10:00 - 13:00",
                "Vi$10:00 - 13:00",
                "Sa$10:00 - 13:00",
                "Do$10:00 - 13:00"
            ],
            lat: 39.5711,
            lon: 2.6463,
            isAccessibleForFree: false,
            parking: false
        },
        {
            nombre: "Castell de Bellver",
            subtitulo: "Actual Museo de Historia de Palma",
			estilo: "Castillo medieval gótico",
			descripcion: "El castillo de Bellver es una fortificación de estilo gótico situada a unos tres kilómetros de la ciudad española de Palma de Mallorca, en Baleares. Fue construido a principios del siglo XIV por orden del rey Jaime II de Mallorca. Se encuentra sobre un monte de 112 metros sobre el nivel del mar, en una zona rodeada de bosque, desde donde se puede contemplar la ciudad, el puerto, la sierra de Tramontana y el Llano de Mallorca; de hecho, su nombre viene del catalán antiguo bell veer, que significa «bella vista». Una de sus peculiaridades es que se trata de uno de los pocos castillos de toda Europa de planta circular, siendo el más antiguo de estos.",
            imagen: "assets/img/portfolio/6.jpg",
            horario: [
                "Ma$10:00 - 18:00",
                "Mi$10:00 - 18:00",
                "Ju$10:00 - 18:00",
                "Vi$10:00 - 18:00",
                "Sa$10:00 - 18:00",
                "Do$10:00 - 15:00"
            ],
            lat: 39.5711,
            lon: 2.6463,
			url: "https://castelldebellver.palma.es/es/",
            isAccessibleForFree: false,
            parking: true
        }
    ];

    // Añadir marcadores al mapa
    // Coordenadas de los edificios

    for (let i = 0; i < lugares.length; i++) {
        let lugar = lugares[i];
        if (lugar.lat === undefined || lugar.lon === undefined) {
            // Se comunica en consola
            console.error('El lugar ' + lugar.nombre + ' no tiene coordenadas');
        } else {
            if (checkCondicionesFiltros(lugar)) {
                let marker = L.marker([lugar.lat, lugar.lon]).addTo(map);
                // Al hacer clic en el marcador, se muestra la información del edificio en un pop-up
                marker.on('click', function() {
                    // Se guarda el nombre del edificio en la sesión
                    sessionStorage.setItem("mapSelectedPlace", lugar.nombre);
                    // Se muestra el pop-up
                    swapSelectedPlace();
                    resetMapa();

                    // Scroll al card para ver mejor el cambio
                    let element = document.getElementById('mapSelectedPlace');

                    element.scrollIntoView({behavior: 'smooth', block: 'center'});
                });
            }
        }
    }
}

function checkCondicionesFiltros(lugar) {
	// comprobar horas, entrada gratuita, ...
	return  (sessionStorage.getItem('searchFree') === "false" || lugar?.isAccessibleForFree === true) &&
			// comprobar parking cercano
			(sessionStorage.getItem('parkingNear') === "false" || lugar?.parking === true) &&
            // comprobar hostelería cercana
            (sessionStorage.getItem('HosteleriaCercana') === "false") && 
            // comprobar distancia
            (sessionStorage.getItem('distanciaFiltros') === "0" || calcularDistancia(lugar.lat, lugar.lon) <= parseInt(sessionStorage.getItem('distanciaFiltros')))
            ;		
}

function calcularDistancia(lat, lon) {
    let lat1 = parseFloat(sessionStorage.getItem('crd-latitude'));
    let lon1 = parseFloat(sessionStorage.getItem('crd-longitude'));
    let lat2 = lat;
    let lon2 = lon;

    // Fórmula de Haversine (calcular distancia entre dos puntos en la Tierra dadas sus coordenadas)
    let R = 6371; // Radio de la Tierra en km
    let dLat = (lat2 - lat1) * Math.PI / 180;
    let dLon = (lon2 - lon1) * Math.PI / 180;
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distancia en km
    return d;
}

function resetMapa() {
    // borrar marcadores
    borrarMarkers();
    // Se notifica por consola
    console.log('Mapa reseteado');
    // reiniciar marcadores
    añadirMarcadoresMapa();
}

function borrarMarkers() {
    let panelMarker = document.querySelector('.leaflet-marker-pane');
    let panelShadow = document.querySelector('.leaflet-shadow-pane');
    let panelPopup = document.querySelector('.leaflet-popup-pane');
    panelMarker.innerHTML = "";
    panelShadow.innerHTML = "";
    panelPopup.innerHTML = "";
    // Se borra también el círculo de área
    let panelCirculo = document.querySelector('.leaflet-overlay-pane');


    if (panelCirculo) {
        let paths = panelCirculo.querySelectorAll('path');

        // Elimina cada elemento <path>
        paths.forEach(function(path) {
            path.remove();
        });
    }
}

// guarda la posición del usuario o una posición por defecto 
function getUserPosition() {
    let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
       };
    
    function success(pos) {
        let crd = pos.coords;
        sessionStorage.setItem('crd-latitude', "" + crd.latitude);
        sessionStorage.setItem('crd-longitude', "" + crd.longitude);
    };

    function error() {
        // Se notifica en consola
        console.error('No se ha podido obtener la ubicación del usuario');
        // casa de Carlos
        sessionStorage.setItem('crd-latitude', "39.59398458121737");
        sessionStorage.setItem('crd-longitude', "2.678878006135083");
    };
    
    navigator.geolocation.getCurrentPosition(success, error, options);
}

function swapSelectedPlace() {
    console.log("swapSelectedPlace");
    // comprobar si está oculto (primera seleccion sobre el mapa)
    let popUpPortfolioHover = document.getElementById("popUpPortfolioHover");
    if (popUpPortfolioHover.getAttribute("hidden"))
        // está oculto
        popUpPortfolioHover.removeAttribute("hidden");

    // los elementos ya existen
    let heading = document.getElementById("mapSelectedPlaceTitle");
    let subHeading = document.getElementById("mapSelectedPlaceSubtitle");
    let img = document.getElementById("mapSelectedPlaceImg");

    if (img.getAttribute("hidden"))
        img.removeAttribute("hidden");

    // generar pop up correspondiente
    // obtener <div> contenedor de los pop-ups
    let popUpContainer = document.getElementById('portfolio-modals');
    popUpContainer.innerHTML = "";
    let nombreSelectedPlace = sessionStorage.getItem("mapSelectedPlace");
    let edificio = obtenerEdificioJSON(nombreSelectedPlace);

    // personalizar texto e imagen en función del lugar elegido en el mapa
    heading.innerText = nombreSelectedPlace;
    if (edificio?.subtitulo === undefined)
        subHeading.innerText = "";
    else
        subHeading.innerText = edificio?.subtitulo;
    img.setAttribute("src", edificio.imagen);

    map.setView([edificio.lat, edificio.lon], 15);
    
    generarPopUp(popUpContainer, edificio, 0);
}

function obtenerEdificioJSON(nombreEdificio) {
    let lugares = [
        {
            nombre: "Catedral de Palma",
            subtitulo: "También conocida como La Seu",
			estilo: "Arquitectura gótica",
			descripcion: "La Catedral de Mallorca es un templo de estilo gótico levantino construido a la orilla de la bahía de Palma. Se trata de una de las catedrales más altas de Europa y uno de los edificios más emblemáticos de la isla de Mallorca.",
            imagen: "assets/img/portfolio/1.jpg",
            video: "assets/video/matrices.mp4",
            audio: "assets/audio/fonerAudio.mp3",
            horario: [
                "Lu$10:00 - 17:15",
                "Ma$10:00 - 17:15",
                "Mi$10:00 - 17:15",
                "Ju$10:00 - 17:15",
                "Vi$10:00 - 17:15",
                "Sa$10:00 - 14:15",
                "Do$10:00 - 14:15"
            ],
            lat: 39.56751097483424,
            lon: 2.648302373075007,
			url: "http://catedraldemallorca.org/",
            isAccessibleForFree: false,
            parking: true
        },
        {
            nombre: "Parroquia de San Bartomeu",
            subtitulo: "Parroquia de estilo neogótico y modernista",
			estilo: "Arquitectura gótica",
			descripcion: "La Parroquia de Sant Bartomeu es un templo de estilo neogótico situado en el centro de la localidad de Sóller, en la isla de Mallorca. Se trata de una iglesia de gran belleza arquitectónica y de gran valor histórico y cultural.",
            imagen: "assets/img/portfolio/2.jpg",
            horario: [
                "Lu$09:00 - 17:30",
                "Ma$09:00 - 17:30",
                "Mi$09:00 - 17:30",
                "Ju$09:00 - 17:30",
                "Vi$09:00 - 17:30",
                "Sa$09:00 - 12:00"
            ],
            lat: 39.765942,
            lon: 2.715518,
			url: "https://soller.es/es/lugares/iglesia-de-sant-bartomeu/",
            isAccessibleForFree: true,
            parking: false
        },
        {
            nombre: "Talaiots",
            subtitulo: "Piedras",
            imagen: "assets/img/portfolio/3.jpg",
            horario: [
                "Lu$10:00 - 13:00",
                "Ma$10:00 - 13:00",
                "Mi$10:00 - 13:00",
                "Ju$10:00 - 13:00",
                "Vi$10:00 - 13:00",
                "Sa$10:00 - 13:00",
                "Do$10:00 - 13:00"
            ],
            lat: 39.55443557349407,
            lon: 2.706647944936505,
            isAccessibleForFree: true,
            parking: true
        },
        {
            nombre: "Edificio",
            subtitulo: "Emblema de la arquitectura modernista",
            imagen: "assets/img/portfolio/4.jpeg",
            horario: [
                "Lu$10:00 - 13:00",
                "Ma$10:00 - 13:00",
                "Mi$10:00 - 13:00",
                "Ju$10:00 - 13:00",
                "Vi$10:00 - 13:00",
                "Sa$10:00 - 13:00",
                "Do$10:00 - 13:00"
            ],
            lat: 39.576435992206605,
            lon: 2.6532397998618347,
            isAccessibleForFree: false,
            parking: false
        },
        {
            nombre: "Castell de l'Almudaina",
            subtitulo: "Residencia oficial de verano del rey",
            imagen: "assets/img/portfolio/5.jpg",
            horario: [
                "Lu$10:00 - 13:00",
                "Ma$10:00 - 13:00",
                "Mi$10:00 - 13:00",
                "Ju$10:00 - 13:00",
                "Vi$10:00 - 13:00",
                "Sa$10:00 - 13:00",
                "Do$10:00 - 13:00"
            ],
            lat: 39.5711,
            lon: 2.6463,
            isAccessibleForFree: false,
            parking: false
        },
        {
            nombre: "Castell de Bellver",
            subtitulo: "Actual Museo de Historia de Palma",
			estilo: "Castillo medieval gótico",
			descripcion: "El castillo de Bellver es una fortificación de estilo gótico situada a unos tres kilómetros de la ciudad española de Palma de Mallorca, en Baleares. Fue construido a principios del siglo XIV por orden del rey Jaime II de Mallorca. Se encuentra sobre un monte de 112 metros sobre el nivel del mar, en una zona rodeada de bosque, desde donde se puede contemplar la ciudad, el puerto, la sierra de Tramontana y el Llano de Mallorca; de hecho, su nombre viene del catalán antiguo bell veer, que significa «bella vista». Una de sus peculiaridades es que se trata de uno de los pocos castillos de toda Europa de planta circular, siendo el más antiguo de estos.",
            imagen: "assets/img/portfolio/6.jpg",
            horario: [
                "Ma$10:00 - 18:00",
                "Mi$10:00 - 18:00",
                "Ju$10:00 - 18:00",
                "Vi$10:00 - 18:00",
                "Sa$10:00 - 18:00",
                "Do$10:00 - 15:00"
            ],
            lat: 39.5711,
            lon: 2.6463,
			url: "https://castelldebellver.palma.es/es/",
            isAccessibleForFree: false,
            parking: true
        }
    ];

    let i = 0;
    while ( i < lugares.length - 1 && lugares[i].nombre !== nombreEdificio) {
        i++;
    }

    return lugares[i];
}

function crearLista() {
    // Crear el contenedor principal
    let espacioListaContainer = document.createElement('div');
    espacioListaContainer.classList.add('col-lg-4', 'col-sm-6', 'mb-4');

    // Crear div para poner el día
    let divDia = document.createElement('div');
    divDia.classList.add('d-flex', 'justify-content-center');
    espacioListaContainer.appendChild(divDia);

    // h3 con el día actual
    let h3 = document.createElement('h3');
    h3.classList.add('section-heading', 'text-uppercase');
    h3.setAttribute('id', 'diaLista');
    h3.textContent = 'Día ' + sessionStorage.getItem('date');
    divDia.appendChild(h3);

    // Crear la lista ordenada
    let listaOrdenada = document.createElement('ol');
    listaOrdenada.classList.add('espacioLista','list-group');
    listaOrdenada.setAttribute('id', 'ol_espacioLista');

    // Crear mensaje placeholder en la listcontainer si no hay nada en plan
    if (sessionStorage.getItem('plan') === null || sessionStorage.getItem('plan') === '[]') {
        let mensaje = document.createElement('div');
        // Márgen left y right
        mensaje.classList.add('text-center' , 'text-muted' , 'mt-3', 'me-3', 'ms-3', 'fs-5');
        mensaje.setAttribute('id', 'aventura');
        mensaje.textContent = 'Aquí se mostrarán los destinos de tu próxima aventura...';
        listaOrdenada.appendChild(mensaje);
    }
    
    // Agregar la lista ordenada al contenedor principal
    espacioListaContainer.appendChild(listaOrdenada);

    return espacioListaContainer;
}

function añadirElementoListaPlan(i, nombreSitio, horaIn, horaOut) {
    // Contenido HTML para agregar al mapaContainer
    let ol = document.getElementById("ol_espacioLista");
    
    let li = document.createElement('li');
    li.classList.add('list-group-item');
    li.setAttribute('id', 'li_espacioLista' + i);

    let horas;
    if (horaIn != "" && horaOut != "") {
        horas = horaIn + " - " + horaOut + ":";
    } else { 
        horas = "N/A";
    }

    if (nombreSitio === undefined) {
        nombreSitio = "N/A";
    } else {
        li.onclick = function() {window.location.href = "#portfolioModal0"}
        li.style.cursor = "pointer";
    }

    let html = `
        <div class="col-8"> 
            <strong> ${horas} </strong> ${nombreSitio}
        </div>
        `;
    li.innerHTML += html;

    let div1 = document.createElement('div');
    div1.classList.add('col-4', 'd-flex', 'justify-content-end');

    let but = document.createElement('button');
    but.classList.add('btn', 'btn-secondary');
    but.innerHTML += '<i class="fa-solid fa-trash"></i>';
    but.onclick = function() {eliminarElementoListaPlan(i);};

    div1.appendChild(but);
    li.appendChild(div1);
    ol.appendChild(li);

    li.onclick = function() {
        buscar(nombreSitio);
    }
}

function eliminarElementoListaPlan(i) {
    // eliminar visualmente
    let ol = document.getElementById("ol_espacioLista");
    let li = document.getElementById("li_espacioLista"+i);
    ol.removeChild(li);

    // eliminar de la sesión
    let planStr = sessionStorage.getItem('plan');

    if (planStr) {
        // hay elementos en el plan
        let plan = JSON.parse(planStr);

        let j = 0;
        while (j < plan.length && plan[j].i != i)
            j++

        if (j < plan.length)
            plan.splice(j, 1);

        sessionStorage.setItem('plan', JSON.stringify(plan));
    }
}

function scriptSlider() {
    var swiper = new Swiper(".slider", {
        loop: true,
        speed: 2000,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
        },
        keyboard: true,
    });
}