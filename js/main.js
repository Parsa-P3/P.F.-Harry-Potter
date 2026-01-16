import { Casa } from "./models/Casa.js";

// creación de la descripción
const descripcion = document.createElement("p");
descripcion.className = "descripcion";
descripcion.textContent =
    "Selecciona una casa para ver sus personajes. Haz clic en nombre de casa para ver numeros de cada genero o haz clic en un personaje para ver su información.";
document.body.appendChild(descripcion);

// creación del select
const select = document.createElement("select");
const optionDefault = document.createElement("option");
optionDefault.textContent = "Elige una casa";

// disabled=true y selected=true para que no se pueda seleccionar y aparezca por defecto
optionDefault.disabled = true;
optionDefault.selected = true;
select.appendChild(optionDefault);
document.body.appendChild(select);

// creación del título
const titulo = document.createElement("h2");
document.body.appendChild(titulo);

// creación de la lista
const lista = document.createElement("ul");
document.body.appendChild(lista);

// creación de las casas
const casas = [
    new Casa("Gryffindor"),
    new Casa("Slytherin"),
    new Casa("Ravenclaw"),
    new Casa("Hufflepuff"),
    new Casa("Sin Casa") // para personajes sin casa
];

// rellenar el select con las casas
casas.forEach((casa, index) => {
    // crear opción
    const option = document.createElement("option");
    option.value = index;

    option.textContent = casa.nombre;
    // añadir opción al select
    select.appendChild(option);
});

// obtener los datos de la API
fetch("https://hp-api.onrender.com/api/characters")
    .then(res => res.json())
    .then(datosApi => {

        // añadir el evento change al select
        select.addEventListener("change", () => {
            descripcion.style.display = "none";
            lista.innerHTML = "";

            // obtener la casa seleccionada
            const casaSeleccionada = casas[select.value];
            titulo.textContent = casaSeleccionada.nombre;
            // asignamos nombre vacío si es "Sin Casa" porque en la API los personajes sin casa tienen el campo vacío
            if (titulo.textContent === "Sin Casa") {
                casaSeleccionada.nombre = "";
                titulo.textContent = "Sin Casa";
            }

            // Cambiar fondo según la casa seleccionada
            switch (casaSeleccionada.nombre.toLowerCase()) {
                case "gryffindor":
                    document.body.style.backgroundImage = "url('assets/bgG.jpg')";
                    document.body.style.backgroundRepeat = "repeat";
                    break;
                case "slytherin":
                    document.body.style.backgroundImage = "url('assets/bgS.jpg')";
                    document.body.style.backgroundRepeat = "repeat";
                    break;
                case "ravenclaw":
                    document.body.style.backgroundImage = "url('assets/bgR.jpg')";
                    document.body.style.backgroundRepeat = "repeat";
                    break;
                case "hufflepuff":
                    document.body.style.backgroundImage = "url('assets/bgH.jpg')";
                    document.body.style.backgroundRepeat = "repeat";
                    break;
                case "":
                    document.body.style.backgroundImage = "url('assets/bgDefault.jpg')";
                    document.body.style.backgroundSize = "auto";
                    document.body.style.backgroundRepeat = "repeat";
                    document.body.style.backgroundPositionX = "center";
                    break;
                default:
                    document.body.style.backgroundImage = "";
                    break;
            }

            // obtener los personajes de la casa seleccionada
            const personajes = casaSeleccionada.obtenerPersonajes(datosApi);

            // recorrer los personajes y crear los elementos de la lista
            personajes.forEach(personaje => {

                const li = document.createElement("li");
                const img = document.createElement("img");
                img.referrerPolicy = "no-referrer";
                // img.src = personaje.imagen ||
                //     "./assets/placeholder.png"; 

                const originalUrl = personaje.image || personaje.imagen;
                if (originalUrl && originalUrl.includes("http")) {
                    // Başına wsrv.nl (Image Proxy) ekleyerek Netlify engelini aşalım
                    img.src = `https://wsrv.nl/?url=${originalUrl}`;
                } else {
                    img.src = "./assets/placeholder.png";
                }
                const nombre = document.createElement("p");
                nombre.textContent = personaje.nombre;

                // añadir evento click al nombre
                li.append(img, nombre);
                li.addEventListener("click", () => {
                    // mostrar la información del personaje
                    alert(`
                    Nombre: ${personaje.nombre} 
                    Género: ${personaje.genero === "male" ? "Masculino" : "Femenino"}
                    Varita:  ${personaje.wand.wood || "Desconocida"}, ${personaje.wand.core || "Desconocido"}, ${personaje.wand.length || "Desconocida"}cm ,
                    Mago :  ${personaje.esMago()}
                    `);
                });

                // añadir el elemento a la lista
                lista.appendChild(li);
            });
        });

        // añadir evento click al título
        titulo.addEventListener("click", () => {
            const casa = casas[select.value];
            alert(
                `La casa ${casa.nombre} de ${casa.enumerarPersonajes()} tiene ${casa.contarMasculinos()} personajes masculinos.`
            );
        });
    });

