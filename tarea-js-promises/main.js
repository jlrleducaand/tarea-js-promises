// funcionaminto servidor json con nodes.js
//C:\CLASES2023\2DAW_2324\DWEC\Practicas\Actividades_API_JSON\tarea-js-promises> json-server --watch tarea-js-promises/db/peliculas.json
const baseURL = "http://localhost:3000";

const listPelisContainer = document.querySelector('#listado-peliculas ul');
const gifContainer = document.getElementById('loading');
const infoContainer = document.getElementById('info-pelicula');
const estrellasContainer = document.getElementById('estrellas');
const cartelContainer = document.getElementById('cartel');

const vidDirector = document.getElementById('director');
const vidClasificacion = document.getElementById('clasificacion');

let valoracion = 0;  //numero para el bucle de estrellas

fetch(baseURL + "/peliculas") // Cambiado de "/db/peliculas" a "/peliculas"
    .then(resp => {
        if (!resp.ok) {
            throw new Error(`La respuesta de la Red no fue ok: ${resp.status}`)
        } else {
            // tiempo de retardo
            if (resp.status === 200) {
                //abre json
                resp.json()
                    //bucle para creacion de lista
                    .then(data => {
                        data.forEach(peli => {
                            let newLi = document.createElement('li');
                            newLi.innerHTML = '<a href="#" class="pelicula" >' + peli.nombre + '</a>';

                            newLi.addEventListener('click', () => {
                                buscarPelicula(peli.id);
                            })
                            listPelisContainer.appendChild(newLi);
                        })
                    })
                console.log("la lista ha sido cargada");
            } else {
                pelicula = null
                console.log("La película no existe");
                //ej3.innerText = "No se localiza la película."
            }
        }
    }).catch(error => console.log("fetch2 error:" + error));


async function buscarPelicula(id) {
    infoContainer.style.display = 'none';
    gifContainer.style.display = 'block';

    try {
        const resp = await fetchSlow(baseURL + "/pelicula/" + id);

        if (!resp.ok) {
            throw new Error(`La respuesta de la Red no fue ok: ${resp.status}`);
        }

        const data = await resp.json();

        console.log(data);
        vidDirector.innerText = data.director;
        vidClasificacion.innerText = buscarClasificacion(data.clasificacion);
        // Llama a la función que actualiza las estrellas de valoración
        actualizarEstrellas(data.clasificacion);
        console.log(data);
        cartelPelicula(data.cartel);
    } catch (error) {
        console.error('Hubo un problema con la petición Fetch:', error);
    } finally {
        gifContainer.style.display = 'none';
        infoContainer.style.display = 'block';
    }
}

function actualizarEstrellas(valoracion) {
    estrellasContainer.innerHTML = ''; // Limpiar las estrellas anteriores

    for (let i = 0; i < valoracion; i++) {
        const star = document.createElement('i');
        star.className = 'fa fa-star';
        estrellasContainer.appendChild(star);
    }
}

function cartelPelicula(strImg){
    cartelContainer.innerHTML = '';
    const cartel = document.createElement('img');

    cartel.setAttribute('src', `assets/imgs/${strImg}`);
    cartel.setAttribute('alt',"Cartel de la Pelicula");
    cartel.setAttribute('id', `${strImg}`)
    cartel.classList.add("img-fluid",  "rounded-top");
    cartelContainer.appendChild(cartel);
    //cartelContainer.innerHTML = `<img src="/assets/imgs/${strImg}" class="img-fluid rounded-top" alt="Cartel de la película">
    //`;
}

function buscarClasificacion(id){
    fetch(baseURL + "/clasificaciones/" + id)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(`La respuesta de la Red no fue ok: ${resp.status}`);
            }
            return resp.json();
        })
        .then(data => {
            console.log(data);
            vidClasificacion.innerText = data.nombre;
        })
        .catch(error => {
            console.error('Hubo un problema con la petición Fetch:', error);
        });
}

async function fetchSlow(input, init=null, ms=1000){
    let p;
    p=await fetch(input, init);
    await new Promise(resolve => setTimeout(resolve, ms));
    return p;
}