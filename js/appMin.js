document.addEventListener('DOMContentLoaded',inicio());let map;let edificiosJSON;function inicio(){crearSlider();if(sessionStorage.getItem('date')===null)
    setCurrentDate();if(sessionStorage.getItem('i')===null)
    sessionStorage.setItem('i','0');leerJSONEdificios().then(()=>{crearSeccionPortfolio();crearSeccionTeam();if(!document.getElementById('submitSuccessMessage')){crearContactoYFooter()}});getUserPosition();setNavPorfolioHidden(!1);let aLogo=document.getElementById('logoMashorca');let aInicio=document.getElementById('inicio');aLogo.onclick=goHome;aInicio.onclick=goHome;scriptSlider()}
    async function leerJSONEdificios(){try{const path=['edificios.json','https://www.descobreixteatre.com/assets/json/Teatre.json'];let response=[];let objetosJSON=[];for(let i=0;i<path.length;i++){response[i]=await fetch(path[i]);objetosJSON[i]=await response[i].json()}
    edificiosJSON=[];getEdificiosObjJson(objetosJSON[0]);getEventosTeatroObjJson(objetosJSON[1])}catch(error){console.error('Error al cargar el archivo JSON:',error)}}
    function getEdificiosObjJson(objetoJSON){let listaObjetos=objetoJSON.itemListElement;listaObjetos.forEach(function(objeto){let struct={nombre:objeto.name,subtitulo:objeto.description.alternativeHeadline,descripcion:objeto.description.description,estilo:objeto.description.genre,horario:convertirHorariosJson(objeto.openingHours),imagen:objeto.image,video:objeto.subjectOf.video,audio:objeto.subjectOf.audio,lat:objeto.geo.latitude,lon:objeto.geo.longitude,url:objeto.url,likes:objeto.aggregateRating.ratingCount,isAccessibleForFree:objeto.isAccessibleForFree,parking:objeto.parking};edificiosJSON.push(struct)})}
    function getEventosTeatroObjJson(objetoJSON){let globalPath="https://www.descobreixteatre.com/";let listaObjetos=objetoJSON.itemListElement;listaObjetos.forEach(function(objeto){if(objeto.address.addressRegion==="Mallorca"){let currLat=objeto.geo.latitude;let currLon=objeto.geo.longitude;let nameTeatre=objeto.name;let ciudad=objeto.address.addressLocality;let event=objeto.event;event.forEach(function(evento){let struct={nombre:evento.name+" ("+ciudad+")",subtitulo:nameTeatre,descripcion:evento.description,imagen:globalPath+objeto.image.contentUrl,video:"",audio:"",lat:currLat,lon:currLon,isAccessibleForFree:!1,fecha:evento.startDate,parking:!0};if(evento.additionalProperty[0].value)
    struct.video=globalPath+evento.additionalProperty[0].url;edificiosJSON.push(struct)})}})}
    function convertirHorariosJson(openingHours){const diasSemanaIng=["Mo","Tu","We","Th","Fr","Sa","Su"];const diasSemanaEsp=["Lu","Ma","Mi","Ju","Vi","Sa","Do"];const horario=[];if(openingHours===undefined){return undefined}
    openingHours.forEach(function(horarioDia){const dias=horarioDia.split(" ")[0].split("-");const horas=horarioDia.split(" ")[1].split("-");let inicioDia=diasSemanaIng.indexOf(dias[0]);let finDia=diasSemanaIng.indexOf(dias[dias.length-1]);if(inicioDia>finDia){finDia+=7}
    for(let i=0;i<7;i++){let dia=diasSemanaEsp[i];if(i>=inicioDia&&i<=finDia){horario.push(`${dia}$${horas[0]} - ${horas[1]}`)}}});return horario}
    function setCurrentDate(){let fechaActual=new Date();let year=fechaActual.getFullYear();let month=String(fechaActual.getMonth()+1).padStart(2,'0');let day=String(fechaActual.getDate()).padStart(2,'0');sessionStorage.setItem('date',`${year}-${month}-${day}`)}
    function setNavPorfolioHidden(bool){let navP=document.getElementById("portfolioNav");if(bool)
    navP.setAttribute('hidden','true');else navP.removeAttribute('hidden')}
    function crearSeccionPortfolio(){let divContainer=document.getElementById('portfolioContainer');let divTextCenter=document.createElement('div');divTextCenter.classList.add('text-center');let h2=document.createElement('h2');h2.classList.add('section-heading','text-uppercase');h2.textContent='Conoce los lugares más emblemáticos de la isla';let h3=document.createElement('h3');h3.classList.add('section-subheading','text-muted');h3.textContent='Aprende sobre los atractivos culturales de la isla';divTextCenter.appendChild(h2);divTextCenter.appendChild(h3);divContainer.appendChild(divTextCenter);let divRowPortfolio=document.createElement('div');divRowPortfolio.classList.add('row');divContainer.appendChild(divRowPortfolio);let i=0;edificiosJSON.forEach(function(edificio){if(i<6){let subtitulo="";if(edificio?.subtitulo!==undefined)
    subtitulo=edificio.subtitulo;let itemHTML=`
                    <div class="col-lg-4 col-sm-6 mb-4">
                        <div class="portfolio-item">
                            <a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal${i}">
                                <div class="portfolio-hover">
                                    <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                                </div>
                                <img class="img-fluid" src="${edificio.imagen}" alt="..." loading="lazy"/>
                            </a>
                            <div class="portfolio-caption">
                                <div class="portfolio-caption-heading">${edificio.nombre}</div>
                                <div class="portfolio-caption-subheading text-muted">${subtitulo}</div>
                            </div>
                        </div>
                    </div>
                `;divRowPortfolio.innerHTML+=itemHTML;i++}});generarPopUpsInicio()}
    function crearSeccionTeam(){let nuevaSection=document.createElement('section');nuevaSection.classList.add('page-section','bg-light');nuevaSection.id='team';let divContainer=document.createElement('div');divContainer.classList.add('container');let divTextCenter=document.createElement('div');divTextCenter.classList.add('text-center');let h2=document.createElement('h2');h2.classList.add('section-heading','text-uppercase');h2.textContent='Nuestro Equipo';let h3=document.createElement('h3');h3.classList.add('section-subheading','text-muted');h3.textContent='Trabajando por el interés cultural de Mallorca.';divTextCenter.appendChild(h2);divTextCenter.appendChild(h3);let divRow=document.createElement('div');divRow.classList.add('row');let equipo=[{nombre:"Eduardo Osuna",rol:"Diseñador Jefe",imagen:"assets/img/team/1.jpg"},{nombre:"Santiago Rattenbach",rol:"Desarrollador Jefe",imagen:"assets/img/team/3.jpg"},{nombre:"Jorge",rol:"Director de Marketing",imagen:"assets/img/team/2.jpg"}];equipo.forEach(function(miembro){let miembroHTML=`
                <div class="col-lg-4">
                    <div class="team-member">
                        <img class="mx-auto rounded-circle" src="${miembro.imagen}" alt="..." loading="lazy" />
                        <h4>${miembro.nombre}</h4>
                        <p class="text-muted">${miembro.rol}</p>
                        <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="${miembro.nombre} Twitter Profile"><i class="fab fa-twitter"></i></a>
                        <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="${miembro.nombre} Facebook Profile"><i class="fab fa-facebook-f"></i></a>
                        <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="${miembro.nombre} LinkedIn Profile"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
            `;divRow.innerHTML+=miembroHTML});let divRowTexto=document.createElement('div');divRowTexto.classList.add('row');let divTexto=document.createElement('div');divTexto.classList.add('col-lg-8','mx-auto','text-center');let pTexto=document.createElement('p');pTexto.classList.add('large','text-muted');pTexto.textContent='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eaque, laboriosam veritatis, quos non quis ad perspiciatis, totam corporis ea, alias ut unde.';divTexto.appendChild(pTexto);divRowTexto.appendChild(divTexto);divContainer.appendChild(divTextCenter);divContainer.appendChild(divRow);divContainer.appendChild(divRowTexto);nuevaSection.appendChild(divContainer);let main=document.getElementById('main');main.appendChild(nuevaSection)}
    function crearContactoYFooter(){let seccionContacto=document.getElementById('contact');seccionContacto.innerHTML=`
        <div class="container">
            <div class="text-center">
                <h2 class="section-heading text-uppercase">Contáctanos</h2>
                <h3 class="section-subheading text-muted">Te ayudaremos con cualquier duda que tengas.</h3>
            </div>
            <!-- * * * * * * * * * * * * * * *-->
            <!-- * * SB Forms Contact Form * *-->
            <!-- * * * * * * * * * * * * * * *-->
            <!-- This form is pre-integrated with SB Forms.-->
            <!-- To make this form functional, sign up at-->
            <!-- https://startbootstrap.com/solution/contact-forms-->
            <!-- to get an API token!-->
            <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                <div class="row align-items-stretch mb-5">
                    <div class="col-md-6">
                        <div class="form-group">
                            <!-- Name input-->
                            <input class="form-control" id="name" type="text" placeholder="Juan Pérez *" data-sb-validations="required" />
                            <div class="invalid-feedback" data-sb-feedback="name:required">Hace falta un nombre.</div>
                        </div>
                        <div class="form-group">
                            <!-- Email address input-->
                            <input class="form-control" id="email" type="email" placeholder="juanperez@ejemplo.com *" data-sb-validations="required,email" oninput="validateEmailInput()"/>
                            <div class="invalid-feedback" data-sb-feedback="email:required">Hace falta un email.</div>
                            <div class="invalid-feedback" data-sb-feedback="email:email">El Email no es válido.</div>
                        </div>
                        <div class="form-group mb-md-0">
                            <!-- Phone number input-->
                            <input class="form-control" id="phone" type="tel" placeholder="611 11 11 11 *" data-sb-validations="required" />
                            <div class="invalid-feedback" data-sb-feedback="phone:required">Hace falta un teléfono.</div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group form-group-textarea mb-md-0">
                            <!-- Message input-->
                            <textarea class="form-control" id="message" placeholder="Escribe tu mensaje *" data-sb-validations="required"></textarea>
                            <div class="invalid-feedback" data-sb-feedback="message:required">Hace falta un mensaje.</div>
                        </div>
                    </div>
                </div>
                <!-- Submit success message-->
                <!---->
                <!-- This is what your users will see when the form-->
                <!-- has successfully submitted-->
                <div class="d-none" id="submitSuccessMessage">
                    <div class="text-center text-white mb-3">
                        <div class="fw-bolder">¡Enviado correctamente!</div>
                    </div>
                </div>
                <!-- Submit error message-->
                <!---->
                <!-- This is what your users will see when there is-->
                <!-- an error submitting the form-->
                <div class="d-none" id="submitErrorMessage"><div class="text-center text-danger mb-3">Ha ocurrido un error...</div></div>
                <!-- Submit Button-->
                <div class="text-center"><button class="btn btn-primary btn-xl text-uppercase disabled" id="submitButton" type="submit">Enviar</button></div>
            </form>
        </div>`;let seccionFooter=document.getElementById('footer');seccionFooter.innerHTML=`
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-4 text-lg-start" id="Copyright"></div>
                <div class="col-lg-4 my-3 my-lg-0">
                    <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                    <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                    <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                </div>
                <div class="col-lg-4 text-lg-end">
                    <a class="link-dark text-decoration-none me-3" href="#!">Política de Privacidad</a>
                    <a class="link-dark text-decoration-none" href="#!">Términos de Uso</a>
                </div>
            </div>
        </div>`;let date=new Date(sessionStorage.getItem('date'));document.getElementById('Copyright').innerHTML="Copyright &copy; Mallorca Route "+date.getFullYear()}
    function generarPopUpsInicio(){let popUpContainer=document.getElementById('portfolio-modals');let i=0;edificiosJSON.forEach(function(edificio){generarPopUp(popUpContainer,edificio,i);let hourIn=document.getElementById('hourIn'+i);let hourOut=document.getElementById('hourOut'+i);function checkInput(i){let botonAgregar=document.getElementById('botonAgregar'+i);let hourIn=document.getElementById('hourIn'+i);let hourOut=document.getElementById('hourOut'+i);if(hourIn.value&&hourOut.value&&hourIn.value<hourOut.value){botonAgregar.disabled=!1}else{botonAgregar.disabled=!0}}(function(i){hourIn.addEventListener('change',function(){checkInput(i)});hourOut.addEventListener('change',function(){checkInput(i)});checkInput(i)})(i);i++})}
    function generarPopUp(popUpsContainer,edificio,i){let popUp=document.createElement('div');popUp.classList.add('portfolio-modal','modal','fade');popUp.id="portfolioModal"+i;popUp.setAttribute('tabindex','-1');popUp.setAttribute('role','dialog');popUp.setAttribute('aria-hidden','true');let popUpContent=generarContenidoPopUp(edificio,i);popUp.appendChild(popUpContent);popUpsContainer.appendChild(popUp)}
    function generarContenidoPopUp(edificio,i){let container1=document.createElement('div');container1.classList.add('modal-dialog','d-flex','justify-content-center');let container2=document.createElement('div');container2.classList.add('modal-content');container1.appendChild(container2);let closeModal=document.createElement('div');closeModal.classList.add('close-modal');closeModal.setAttribute('data-bs-dismiss','modal');let closeImg=document.createElement('img');closeImg.setAttribute('src','assets/img/close-icon.svg');closeImg.setAttribute('alt','Close modal');closeImg.setAttribute('loading','lazy');closeModal.appendChild(closeImg);container2.appendChild(closeModal);let container3=document.createElement('div');container3.classList.add('container');container2.appendChild(container3);let container4=document.createElement('div');container4.classList.add('row','justify-content-center');container3.appendChild(container4);let container5=document.createElement('div');container5.classList.add('col-lg-8');container4.appendChild(container5);let modalBody=generarModalBodyContent(edificio,i);container5.appendChild(modalBody);return container1}
    function generarModalBodyContent(edificio,i){let modalBody=document.createElement('div');modalBody.setAttribute('id','modalBody'+i);modalBody.classList.add('modal-body');let titulo=document.createElement('h2');titulo.classList.add('text-uppercase');titulo.textContent=edificio.nombre;modalBody.appendChild(titulo);if(edificio?.subtitulo!==undefined&&edificio.subtitulo!==""){let subtitulo=document.createElement('p');subtitulo.classList.add('item-intro','text-muted','mt-2','mb-4');subtitulo.textContent=edificio.subtitulo+".";modalBody.appendChild(subtitulo)}
    if(edificio?.video===undefined||edificio?.video===""){let imagen=document.createElement('img');imagen.classList.add('img-fluid','d-block','mx-auto');imagen.setAttribute('loading','lazy');imagen.setAttribute('src',edificio.imagen);imagen.setAttribute('alt',edificio.nombre);modalBody.appendChild(imagen)}else{let video=document.createElement('video');video.classList.add('img-fluid','d-block','mx-auto');video.setAttribute('loading','lazy');video.setAttribute('src',edificio.video);video.setAttribute('alt',edificio.nombre);video.setAttribute('controls','true');modalBody.appendChild(video)}
    if(edificio?.audio!==undefined&&edificio?.audio!==""){let audio=document.createElement('audio');audio.classList.add('d-block','mx-auto','mb-4','mt-2');audio.setAttribute('src',edificio.audio);audio.setAttribute('controls','true');audio.setAttribute('loading','lazy');modalBody.appendChild(audio)}
    if(edificio?.estilo!==undefined){let divEstilo=document.createElement('div');divEstilo.classList.add('list-inline-item','mb-3');let strongEstilo=document.createElement('strong');strongEstilo.innerHTML="Estilo:";divEstilo.appendChild(strongEstilo);divEstilo.innerHTML+=" "+edificio.estilo;modalBody.appendChild(divEstilo)}
    let divBotonDescripcion=document.createElement('div');divBotonDescripcion.classList.add('d-flex','justify-content-center');modalBody.appendChild(divBotonDescripcion);let collapse=document.createElement('button');collapse.classList.add('btn','btn-primary','mb-4','mt-2','text-center','px-4','py-3','fw-bolder');collapse.style.fontFamily='Montserrat';collapse.setAttribute('data-bs-toggle','collapse');collapse.setAttribute('data-bs-target','#descripcion'+i);collapse.textContent="Descripción"+" ↓";divBotonDescripcion.appendChild(collapse);collapse.onclick=function(){if(collapse.textContent.includes("↓")){collapse.textContent="Descripción"+" ↑"}else{collapse.textContent="Descripción"+" ↓"}}
    let descripcion=document.createElement('p');descripcion.id='descripcion'+i;descripcion.textContent=edificio.descripcion;descripcion.classList.add('collapse');modalBody.appendChild(descripcion);let listaClima=document.createElement('div');listaClima.setAttribute('hidden','true');listaClima.classList.add('mb-4','listaHorizontal');let listaClimaBody=document.createElement('div');listaClimaBody.setAttribute('id','clima');listaClimaBody.classList.add('d-flex','justify-content-center');let hora=0;let offsetDias=new Date(sessionStorage.getItem('date')).getDate()-new Date().getDate();if(offsetDias===0){hora=new Date().getHours();do{hora++}while(hora%3!==0);}
    for(let j=0;hora<24;hora=hora+3,j++){let latitud=edificio.lat;let longitud=edificio.lon;obtenerDatosClima(latitud,longitud,hora,(j+8*offsetDias)).then(item=>{listaClimaBody.appendChild(item);if(listaClima.getAttribute("hidden")){listaClima.removeAttribute("hidden")}}).catch(error=>{console.log(error)})}
    listaClima.appendChild(listaClimaBody);modalBody.appendChild(listaClima);let horasVisita=document.createElement('div');horasVisita.classList.add('row');let horasVisitaBody=crearCamposVisita(i);horasVisita.appendChild(horasVisitaBody);let horarios1=document.createElement('div');horarios1.classList.add('col-6','d-flex','justify-content-end');let horarios2=document.createElement('div');horarios2.classList.add('d-flex','justify-content-start','row');let horariosLista=document.createElement('ul');horariosLista.classList.add('list-inline');let horariosTitulo=document.createElement('li');horariosTitulo.classList.add('list-inline-item','row','col-4');let horariosTituloTexto=document.createElement('strong');horariosTituloTexto.textContent='Horarios:';horariosTitulo.appendChild(horariosTituloTexto);horariosLista.appendChild(horariosTitulo);let horario=edificio?.horario;if(horario===undefined){let diaElement=document.createElement('li');diaElement.classList.add('list-inline-item','row');let mensaje=document.createElement('div');mensaje.classList.add('col-8');mensaje.textContent="Permanentemente abierto";diaElement.appendChild(mensaje);horariosLista.appendChild(diaElement)}
    for(let dia in horario){let diaHorario=horario[dia].split("$");let diaElement=document.createElement('li');diaElement.classList.add('list-inline-item','row');let diaNombre=document.createElement('div');diaNombre.classList.add('col-2');let diaNombreTexto=document.createElement('strong');diaNombreTexto.textContent=diaHorario[0]+": ";diaNombre.appendChild(diaNombreTexto);diaElement.appendChild(diaNombre);let diaHoras=document.createElement('div');diaHoras.classList.add('col-10');diaHoras.textContent=diaHorario[1];diaElement.appendChild(diaHoras);horariosLista.appendChild(diaElement)}
    horarios2.appendChild(horariosLista);horarios1.appendChild(horarios2);horasVisita.appendChild(horarios1);modalBody.appendChild(horasVisita);let grupoBotones=document.createElement('div');grupoBotones.classList.add('button-group');let botonAgregar=document.createElement('button');botonAgregar.classList.add('btn','btn-primary','btn-xl','text-uppercase');botonAgregar.setAttribute('type','button');botonAgregar.setAttribute('id','botonAgregar'+i);botonAgregar.setAttribute('data-bs-dismiss','modal');botonAgregar.textContent='Añadir al plan';grupoBotones.appendChild(botonAgregar);if(isPlan()){botonAgregar.onclick=function(){if(sessionStorage.getItem('plan')===null||sessionStorage.getItem('plan')==='[]'){let ol=document.getElementById('ol_espacioLista');ol.innerHTML=''}
    savePopUpData(i,edificio.nombre);añadirElementoListaPlan(parseInt(sessionStorage.getItem('i'))-1,edificio.nombre,document.getElementById('hourIn'+i).value,document.getElementById('hourOut'+i).value)}}else{botonAgregar.onclick=function(){savePopUpData(i,edificio.nombre);window.location.href='#';borrarIndex();plan()}}
    let url=edificio?.url;if(url!==undefined){let botonInfo=document.createElement('button');botonInfo.classList.add('btn','btn-secondary','btn-xl','text-uppercase');botonInfo.setAttribute('type','button');botonInfo.onclick=function(){window.open(url)};botonInfo.textContent='Más información';grupoBotones.appendChild(botonInfo)}
    modalBody.appendChild(grupoBotones);return modalBody}
    function obtenerDatosClima(latitud,longitud,hora,indice){const apiKeyWeather='1ff240de287dae93a6e61f1f4a04bf0a';let urlClima=`https://api.openweathermap.org/data/2.5/forecast?lat=${latitud}&lon=${longitud}&appid=${apiKeyWeather}&units=metric`;return new Promise((resolve,reject)=>{fetch(urlClima).then(response=>response.json()).then(data=>{let clima=data.list[indice].weather[0].icon;let temperatura=data.list[indice].main.temp;if(clima===undefined||temperatura===undefined){reject('No hay datos sobre el clima disponibles a las'+hora+' horas');return}
    let item=crearItemClima(hora,temperatura,clima);if(item===undefined){reject('No se han podido obtener el item');return}
    resolve(item)}).catch(error=>{console.error(error);reject("Error al obtener los datos del clima")})})}
    function savePopUpData(j,nombre){let struct={i:parseInt(sessionStorage.getItem('i')),name:nombre,hourIn:document.getElementById('hourIn'+j).value,hourOut:document.getElementById('hourOut'+j).value}
    sessionStorage.setItem('i',struct.i+1);let planStr=sessionStorage.getItem('plan');let plan;if(planStr){plan=JSON.parse(planStr);plan.push(struct)}else{plan=[struct]}
    sessionStorage.setItem('plan',JSON.stringify(plan))}
    function crearItemClima(hora,temperatura,clima){temperatura=Math.round(temperatura);let item=document.createElement('div');item.classList.add('mx-3');let diaElement=document.createElement('div');item.appendChild(diaElement);let img=document.createElement('img');img.classList.add('img-weather');img.setAttribute('src','https://openweathermap.org/img/wn/'+clima+'@4x.png');img.setAttribute('loading','lazy');diaElement.appendChild(img);let horaElement=document.createElement('p');horaElement.classList.add('item-intro','text-muted','mb-0');if(hora<10){horaElement.textContent="0"+hora+":00"}else{horaElement.textContent=hora+":00"}
    diaElement.appendChild(horaElement);let temperaturaElement=document.createElement('p');temperaturaElement.classList.add('item-intro','text-muted','mb-0');temperaturaElement.textContent=temperatura+"°C";diaElement.appendChild(temperaturaElement);return item}
    function crearCamposVisita(i){let contenedor=document.createElement('div');contenedor.classList.add('col-6','d-flex','justify-content-start','align-items-center');let horasVisita=document.createElement('div');horasVisita.classList.add('hour-list');let horaEntrada=document.createElement('div');horaEntrada.classList.add('row','mb-4','d-flex','hour-group');let horaEntradaLabelContainer=document.createElement('div');horaEntradaLabelContainer.classList.add('d-flex','justify-content-start','align-items-center');let horaEntradaLabel=document.createElement('strong');horaEntradaLabel.textContent='Hora de Entrada:';horaEntradaLabelContainer.appendChild(horaEntradaLabel);let horaEntradaInputContainer=document.createElement('div');horaEntradaInputContainer.classList.add('d-flex','justify-content-start','align-items-center');let horaEntradaInput=document.createElement('input');horaEntradaInput.classList.add('form-control-sm');horaEntradaInput.setAttribute('id','hourIn'+i);horaEntradaInput.setAttribute('type','time');horaEntradaInput.setAttribute('placeholder','10:00');horaEntradaInput.setAttribute('data-sb-validations','required');horaEntradaInputContainer.appendChild(horaEntradaInput);horaEntrada.appendChild(horaEntradaLabelContainer);horaEntrada.appendChild(horaEntradaInputContainer);horasVisita.appendChild(horaEntrada);let horaSalida=document.createElement('div');horaSalida.classList.add('row','d-flex','hour-group');let horaSalidaLabelContainer=document.createElement('div');horaSalidaLabelContainer.classList.add('d-flex','justify-content-start','align-items-center');let horaSalidaLabel=document.createElement('strong');horaSalidaLabel.textContent='Hora de Salida:';horaSalidaLabelContainer.appendChild(horaSalidaLabel);let horaSalidaInputContainer=document.createElement('div');horaSalidaInputContainer.classList.add('d-flex','justify-content-start','align-items-center');let horaSalidaInput=document.createElement('input');horaSalidaInput.classList.add('form-control-sm');horaSalidaInput.setAttribute('id','hourOut'+i);horaSalidaInput.setAttribute('type','time');horaSalidaInput.setAttribute('placeholder','11:30');horaSalidaInput.setAttribute('data-sb-validations','required');horaSalidaInputContainer.appendChild(horaSalidaInput);horaSalida.appendChild(horaSalidaLabelContainer);horaSalida.appendChild(horaSalidaInputContainer);horasVisita.appendChild(horaSalida);contenedor.appendChild(horasVisita);return contenedor}
    function goHome(){let container=document.getElementById('slider');if(container===null){borrarPlan();let header=document.getElementById('header');header.classList.add('masthead');inicio()}}
    function crearSlider(){let header=document.getElementById('header');header.classList.add('masthead');let slider=document.createElement('div');slider.classList.add('slider');slider.setAttribute('id','slider');header.appendChild(slider);let swiperWrapper=document.createElement('div');swiperWrapper.classList.add('swiper-wrapper');slider.appendChild(swiperWrapper);let i=1;while(i<=3){let img=document.createElement('img');let path="assets/img/slider/imagen"+i;img.setAttribute('src',path+'.webp');let set=path+'-s.webp 300w, '+path+'-m.webp 768w, '+path+'.webp 1024w, ';img.setAttribute('srcset',set);img.setAttribute('alt','Imagen slider '+i);if(i!==1){img.setAttribute('loading','lazy')}
    let swiperSlide=document.createElement('div');swiperSlide.classList.add('swiper-slide');swiperSlide.appendChild(img);swiperWrapper.appendChild(swiperSlide);i++}
    let container=document.createElement('div');container.classList.add('container','containerSlider');slider.appendChild(container);let mastheadSubheading=document.createElement('div');mastheadSubheading.classList.add('masthead-subheading');mastheadSubheading.textContent='Diseña una ruta pensada únicamente para ti';container.appendChild(mastheadSubheading);let mastheadHeading=document.createElement('div');mastheadHeading.classList.add('masthead-heading','text-uppercase');mastheadHeading.textContent='!Atrévete a conocer Mallorca!';container.appendChild(mastheadHeading);let btn=document.createElement('button');btn.classList.add('btn','btn-primary','btn-xl','text-uppercase');btn.textContent='Planificar Ruta';btn.onclick=function(){window.location.href='#';borrarIndex();plan()};container.appendChild(btn)}
    function borrarIndex(){setNavPorfolioHidden(!0);borrarSlider();let container=document.getElementById('portfolioContainer');container.innerHTML='';let main=document.getElementById('main');let team=document.getElementById('team');if(team)
    main.removeChild(team);let popUpsContainer=document.getElementById('portfolio-modals');popUpsContainer.innerHTML=''}
    function borrarPlan(){let container=document.getElementById('portfolioContainer');container.innerHTML='';let popUpsContainer=document.getElementById('portfolio-modals');popUpsContainer.innerHTML=''}
    function borrarSlider(){let header=document.getElementById('header');let slider=document.getElementById('slider');if(slider)
    header.removeChild(slider);header.classList.remove('masthead')}
    function isPlan(){return document.getElementById('ol_espacioLista')!=null}
    function plan(){let divContainer=document.getElementById('portfolioContainer');let divTextCenter=document.createElement('div');divTextCenter.classList.add('text-center','pt-5','pb-2');let h2=document.createElement('h2');h2.classList.add('section-heading','text-uppercase','mb-2');h2.textContent='Construye tu ruta';let h3=document.createElement('h3');h3.classList.add('section-subheading','text-muted','mb-3');h3.textContent='¡Organiza tu visita y no te quedes sin ver nada!';divTextCenter.appendChild(h2);divTextCenter.appendChild(h3);divContainer.appendChild(divTextCenter);let divBusqueda=crearCamposBusqueda();divContainer.appendChild(divBusqueda);let busquedaContainer=document.createElement('div');busquedaContainer.setAttribute('id','busqueda-container');let barra=document.getElementById('barra');barra.appendChild(busquedaContainer);añadirEventosBusqueda();calendario();autocompletar();let divRowContainer=document.createElement('div');divRowContainer.classList.add('row');divContainer.appendChild(divRowContainer);let mapContainer=crearMapa();divRowContainer.appendChild(mapContainer);initMapa();busquedaBoton();let listContainer=crearLista();divRowContainer.appendChild(listContainer);let planStr=sessionStorage.getItem('plan');if(planStr){let plan=JSON.parse(planStr);for(let j=0;j<plan.length;j++){añadirElementoListaPlan(plan[j].i,plan[j].name,plan[j].hourIn,plan[j].hourOut)}}}
    function crearCamposBusqueda(){let container=document.createElement('div');container.classList.add('container','d-flex','align-items-center','mb-3');container.setAttribute('id','busqueda');let calendarContainer=document.createElement('div');calendarContainer.classList.add('d-block');container.appendChild(calendarContainer);let calendarButton=document.createElement('button');calendarButton.classList.add('btn','btn-primary','me-4');calendarButton.setAttribute('id','calendar-button');calendarButton.textContent='Elegir día';calendarContainer.appendChild(calendarButton);let calendarIcon=document.createElement('svg');calendarIcon.setAttribute('xmlns','http://www.w3.org/2000/svg');calendarIcon.setAttribute('viewBox','0 0 24 24');calendarIcon.setAttribute('width','24');calendarIcon.setAttribute('height','24');calendarIcon.setAttribute('fill','currentColor');let path=document.createElement('path');path.setAttribute('d','M6.75 0a.75.75 0 0 1 .75.75V3h9V.75a.75.75 0 0 1 1.5 0V3h2.75c.966 0 1.75.784 1.75 1.75v16a1.75 1.75 0 0 1-1.75 1.75H3.25a1.75 1.75 0 0 1-1.75-1.75v-16C1.5 3.784 2.284 3 3.25 3H6V.75A.75.75 0 0 1 6.75 0ZM21 9.5H3v11.25c0 .138.112.25.25.25h17.5a.25.25 0 0 0 .25-.25Zm-17.75-5a.25.25 0 0 0-.25.25V8h18V4.75a.25.25 0 0 0-.25-.25Z');calendarIcon.appendChild(path);calendarButton.appendChild(calendarIcon);let calendarContainer2=document.createElement('div');calendarContainer2.setAttribute('type','button');calendarContainer2.setAttribute('id','calendar-container');calendarContainer.appendChild(calendarContainer2);let html=`
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
            `;container.innerHTML+=html;return container}
    function buscar(valor){if(!estaEnJson(valor)){alert('No se ha encontrado ningún edificio con ese nombre');return}
    sessionStorage.setItem("mapSelectedPlace",valor);swapSelectedPlace();resetMapa();let element=document.getElementById('mapSelectedPlace');element.scrollIntoView({behavior:'smooth',block:'center'})}
    function busquedaBoton(){let boton=document.getElementById('SearchButton');boton.onclick=function(){let valor=document.getElementById('barra').value;buscar(valor)}}
    function mostrarResultados(results){let container=document.createElement('div');container.classList.add('container','d-flex','flex-column','align-items-center','mb-3');container.setAttribute('id','searchResults');for(let i=0;i<results.length;i++){if(!checkCondicionesFiltros(results[i])){continue}
    let item=document.createElement('div');item.classList.add('d-flex','justify-content-center','align-items-center','mb-2');item.setAttribute('id','resultado'+i);item.textContent=results[i].nombre;container.appendChild(item)}
    return container}
    function estaEnJson(nombre){for(let i=0;i<edificiosJSON.length;i++){if(edificiosJSON[i].nombre===nombre){return!0}}
    return!1}
    function buscarEnJson(){const nombresUnicos=new Set();edificiosJSON.forEach(edificio=>nombresUnicos.add(edificio.nombre));return[...nombresUnicos]}
    function autocompletar(){let search=document.getElementById('barra');$(search).autocomplete({source:buscarEnJson(),open:function(){$('.ui-autocomplete').addClass('search-z-index')}})}
    function calendario(){let isShowing=!1;let calContainer=$('#calendar-container');if(calContainer.length===0){console.error('No se ha encontrado el contenedor del calendario');return}
    calContainer.hide();calContainer.datepicker({minDate:0,dateFormat:'yy-mm-dd',onSelect:function(dateText){let userConfirmation=confirm("¿Quieres cambiar la fecha del plan?\n\nFecha actual: "+sessionStorage.getItem('date'));if(userConfirmation){sessionStorage.setItem('date',dateText)
    let diaLista=document.getElementById('diaLista');diaLista.textContent="Día "+dateText;let modalBody=document.getElementById('portfolioModal0');if(modalBody!==null){swapSelectedPlace()}
    calContainer.hide();isShowing=!1}else{calContainer.datepicker('setDate',sessionStorage.getItem('date'))}}});let calButton=$('#calendar-button');calButton.click(function(){if(!isShowing){calContainer.show();isShowing=!0}else{calContainer.hide();isShowing=!1}});$(document).mouseup(function(e){let calContainer2=$('#calendar-container');if(!calContainer2.is(e.target)&&calContainer2.has(e.target).length===0){calContainer2.hide()}})}
    function añadirEventosBusqueda(){let horaIn=document.getElementById('SearchHourStart');let horaOut=document.getElementById('SearchHourEnd');let searchFree=document.getElementById('SearchFree');let parkingNear=document.getElementById('ParkingNear');let botonFiltros=document.getElementById('botonFiltros');let radio=document.getElementById('SearchRadius');botonFiltros.onclick=function(event){event.preventDefault();sessionStorage.setItem('hourInFiltros',"");sessionStorage.setItem('hourOutFiltros',"");if(radio.value!==""){sessionStorage.setItem('distanciaFiltros',radio.value)}else{sessionStorage.setItem('distanciaFiltros','0')}
    checkHorasFiltros(horaIn.value,horaOut.value);sessionStorage.setItem('searchFree',""+searchFree.checked);sessionStorage.setItem('parkingNear',""+parkingNear.checked);resetMapa()}
    sessionStorage.setItem('hourInFiltros',"");sessionStorage.setItem('hourOutFiltros',"");sessionStorage.setItem('distanciaFiltros',"0");sessionStorage.setItem('searchFree',"false");sessionStorage.setItem('parkingNear',"false")}
    function checkHorasFiltros(horaIn,horaOut){if(esHora(horaIn)&&esHora(horaOut)){let parts1=horaIn.split(":");let parts2=horaOut.split(":");let h1=parseInt(parts1[0]);let h2=parseInt(parts2[0]);if(h1<h2){sessionStorage.setItem('hourInFiltros',horaIn);sessionStorage.setItem('hourOutFiltros',horaOut)}else if(h1==h2){let m1=parseInt(parts1[1]);let m2=parseInt(parts2[1]);if(m1<m2){sessionStorage.setItem('hourInFiltros',horaIn);sessionStorage.setItem('hourOutFiltros',horaOut)}}}}
    function esHora(hora){try{let parts=hora.split(":");if(parts.lenght===2){let h=parseInt(parts[0]);let m=parseInt(parts[1]);return h>=0&&h<24&&m>=0&&m<=60}
    return!1}catch(error){return!1}}
    function crearMapa(){let mainContainer=document.createElement('div');mainContainer.classList.add('col-lg-8','col-sm-6','mb-4');mainContainer.setAttribute('id','mapContainer');let mapaContainer=document.createElement('div');mapaContainer.classList.add('mb-2','d-flex','justify-content-center');mainContainer.appendChild(mapaContainer);let map=document.createElement('div');map.setAttribute('id','map');map.setAttribute('style','width: 600px; height: 400px;');mapaContainer.appendChild(map);let html=`
            <!-- Selected From Map-->
            <div class="portfolio-item" id="mapSelectedPlace">
                <a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal0">
                    <div id="popUpPortfolioHover" class="portfolio-hover" hidden="true">
                        <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                    </div>
                    <img id="mapSelectedPlaceImg" class="img-fluid" src="" alt="Missing image..." hidden="true" loading="lazy"/>
                </a>
                <div class="portfolio-caption">
                    <div class="portfolio-caption-heading" id="mapSelectedPlaceTitle">Busca tu destino</div>
                    <div class="portfolio-caption-subheading text-muted" id="mapSelectedPlaceSubtitle">Puedes usar tanto la barra de búsqueda como el mapa</div>
                </div>
            </div>
            `;mainContainer.innerHTML+=html;return mainContainer}
    function initMapa(){let lat=parseFloat(sessionStorage.getItem('crd-latitude'));let lon=parseFloat(sessionStorage.getItem('crd-longitude'));map=L.map('map').setView([lat,lon],10.5);L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);let marker=L.marker([39.59398458121737,2.678878006135083]).addTo(map);marker.bindPopup("<b>Casa de Carlos</b><br>Dominio público.");añadirMarcadoresMapa()}
    function añadirMarcadoresMapa(){if(sessionStorage.getItem('distanciaFiltros')!=="0"){let circle=L.circle([parseFloat(sessionStorage.getItem('crd-latitude')),parseFloat(sessionStorage.getItem('crd-longitude'))],{color:'blue',fillColor:'#30f',fillOpacity:0.1,radius:parseInt(sessionStorage.getItem('distanciaFiltros'))*1000}).addTo(map)}
    for(let i=0;i<edificiosJSON.length;i++){let lugar=edificiosJSON[i];if(lugar.lat===undefined||lugar.lon===undefined){console.error('El lugar '+lugar.nombre+' no tiene coordenadas')}else{if(checkCondicionesFiltros(lugar)){let marker=L.marker([lugar.lat,lugar.lon]).addTo(map);marker.on('click',function(){sessionStorage.setItem("mapSelectedPlace",lugar.nombre);swapSelectedPlace();resetMapa();let element=document.getElementById('mapSelectedPlace');element.scrollIntoView({behavior:'smooth',block:'center'})})}}}}
    function checkCondicionesFiltros(lugar){return(sessionStorage.getItem('searchFree')==="false"||lugar?.isAccessibleForFree===!0)&&(sessionStorage.getItem('parkingNear')==="false"||lugar?.parking===!0)&&(sessionStorage.getItem('distanciaFiltros')==="0"||calcularDistancia(lugar.lat,lugar.lon)<=parseInt(sessionStorage.getItem('distanciaFiltros')))&&((sessionStorage.getItem('hourInFiltros')===""&&sessionStorage.getItem('hourOutFiltros')==="")||checkHorario(lugar))}
    function checkHorario(lugar){let horaIn=sessionStorage.getItem('hourInFiltros');let horaOut=sessionStorage.getItem('hourOutFiltros');let horario=lugar.horario;let dia=(new Date(sessionStorage.getItem('date')).getDay()-1)%7;let horaInCorrecta=!1;let horaOutCorrecta=!1;for(let i=0;i<horario.length;i++){let parts=horario[i].split('$');let diaHorario=parseInt(parts[0]);let horarioDia=parts[1].split(' - ');let horaInHorario=horarioDia[0].split(':');let horaOutHorario=horarioDia[1].split(':');if(diaHorario===dia){if((horaIn=='')||(parseInt(horaInHorario[0])<parseInt(horaIn)&&parseInt(horaInHorario[0])<parseInt(horaOut))){horaInCorrecta=!0}
    if((horaOut=='')||(parseInt(horaOutHorario[0])>parseInt(horaIn)&&parseInt(horaOutHorario[0])>parseInt(horaOut))){horaOutCorrecta=!0}}}
    return horaInCorrecta&&horaOutCorrecta}
    function calcularDistancia(lat,lon){let lat1=parseFloat(sessionStorage.getItem('crd-latitude'));let lon1=parseFloat(sessionStorage.getItem('crd-longitude'));let lat2=lat;let lon2=lon;let R=6371;let dLat=(lat2-lat1)*Math.PI/180;let dLon=(lon2-lon1)*Math.PI/180;let a=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)*Math.sin(dLon/2);let c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));let d=R*c;return d}
    function resetMapa(){borrarMarkers();añadirMarcadoresMapa()}
    function borrarMarkers(){let panelMarker=document.querySelector('.leaflet-marker-pane');let panelShadow=document.querySelector('.leaflet-shadow-pane');let panelPopup=document.querySelector('.leaflet-popup-pane');panelMarker.innerHTML="";panelShadow.innerHTML="";panelPopup.innerHTML="";let panelCirculo=document.querySelector('.leaflet-overlay-pane');if(panelCirculo){let paths=panelCirculo.querySelectorAll('path');paths.forEach(function(path){path.remove()})}}
    function getUserPosition(){let options={enableHighAccuracy:!0,timeout:5000,maximumAge:0};function success(pos){let crd=pos.coords;sessionStorage.setItem('crd-latitude',""+crd.latitude);sessionStorage.setItem('crd-longitude',""+crd.longitude)};function error(){console.error('No se ha podido obtener la ubicación del usuario');sessionStorage.setItem('crd-latitude',"39.59398458121737");sessionStorage.setItem('crd-longitude',"2.678878006135083")};navigator.geolocation.getCurrentPosition(success,error,options)}
    function swapSelectedPlace(){let popUpPortfolioHover=document.getElementById("popUpPortfolioHover");if(popUpPortfolioHover.getAttribute("hidden"))
    popUpPortfolioHover.removeAttribute("hidden");let heading=document.getElementById("mapSelectedPlaceTitle");let subHeading=document.getElementById("mapSelectedPlaceSubtitle");let img=document.getElementById("mapSelectedPlaceImg");if(img.getAttribute("hidden"))
    img.removeAttribute("hidden");let popUpContainer=document.getElementById('portfolio-modals');popUpContainer.innerHTML="";let nombreSelectedPlace=sessionStorage.getItem("mapSelectedPlace");let edificio=obtenerEdificioJSON(nombreSelectedPlace);heading.innerText=nombreSelectedPlace;if(edificio?.subtitulo===undefined)
    subHeading.innerText="";else subHeading.innerText=edificio?.subtitulo;img.setAttribute("src",edificio.imagen);map.setView([edificio.lat,edificio.lon],15);generarPopUp(popUpContainer,edificio,0);let hourIn=document.getElementById('hourIn0');let hourOut=document.getElementById('hourOut0');function checkInput(){let botonAgregar=document.getElementById('botonAgregar0');let hourIn=document.getElementById('hourIn0');let hourOut=document.getElementById('hourOut0');if(hourIn.value&&hourOut.value&&hourIn.value<hourOut.value){botonAgregar.disabled=!1}else{botonAgregar.disabled=!0}}
    hourIn.addEventListener('change',function(){checkInput()});hourOut.addEventListener('change',function(){checkInput()});checkInput()}
    function obtenerEdificioJSON(nombreEdificio){let i=0;while(i<edificiosJSON.length-1&&edificiosJSON[i].nombre!==nombreEdificio){i++}
    return edificiosJSON[i]}
    function crearLista(){let espacioListaContainer=document.createElement('div');espacioListaContainer.classList.add('col-lg-4','col-sm-6','mb-4');let divDia=document.createElement('div');divDia.classList.add('d-flex','justify-content-center');espacioListaContainer.appendChild(divDia);let h3=document.createElement('h3');h3.classList.add('section-heading','text-uppercase');h3.setAttribute('id','diaLista');h3.textContent='Día '+sessionStorage.getItem('date');divDia.appendChild(h3);let listaOrdenada=document.createElement('ol');listaOrdenada.classList.add('espacioLista','list-group');listaOrdenada.setAttribute('id','ol_espacioLista');if(sessionStorage.getItem('plan')===null||sessionStorage.getItem('plan')==='[]'){let mensaje=document.createElement('div');mensaje.classList.add('text-center','text-muted','mt-3','me-3','ms-3','fs-5');mensaje.setAttribute('id','aventura');mensaje.textContent='Aquí se mostrarán los destinos de tu próxima aventura...';listaOrdenada.appendChild(mensaje)}
    espacioListaContainer.appendChild(listaOrdenada);return espacioListaContainer}
    function añadirElementoListaPlan(i,nombreSitio,horaIn,horaOut){let ol=document.getElementById("ol_espacioLista");let li=document.createElement('li');li.classList.add('list-group-item');li.setAttribute('id','li_espacioLista'+i);let horas;if(horaIn!=""&&horaOut!=""){horas=horaIn+" - "+horaOut+":"}else{horas="N/A"}
    if(nombreSitio===undefined){nombreSitio="N/A"}else{li.onclick=function(){window.location.href="#portfolioModal0"}
    li.style.cursor="pointer"}
    let html=`
            <div class="col-8"> 
                <strong> ${horas} </strong> ${nombreSitio}
            </div>
            `;li.innerHTML+=html;let div1=document.createElement('div');div1.classList.add('col-4','d-flex','justify-content-end');let but=document.createElement('button');but.classList.add('btn','btn-secondary');but.innerHTML+='<i class="fa-solid fa-trash"></i>';but.onclick=function(){eliminarElementoListaPlan(i)};div1.appendChild(but);li.appendChild(div1);ol.appendChild(li);li.onclick=function(){buscar(nombreSitio)}}
    function eliminarElementoListaPlan(i){let ol=document.getElementById("ol_espacioLista");let li=document.getElementById("li_espacioLista"+i);ol.removeChild(li);let planStr=sessionStorage.getItem('plan');if(planStr){let plan=JSON.parse(planStr);let j=0;while(j<plan.length&&plan[j].i!=i)
    j++
    if(j<plan.length)
    plan.splice(j,1);sessionStorage.setItem('plan',JSON.stringify(plan))}}
    function scriptSlider(){var swiper=new Swiper(".slider",{loop:!0,speed:2000,autoplay:{delay:5000,disableOnInteraction:!1,},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev",},keyboard:!0,})}