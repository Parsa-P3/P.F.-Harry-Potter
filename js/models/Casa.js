// importamos la clase Personaje para poder crear objetos de ese tipo
import { Personaje } from "./Personaje.js";    

// definimos y exportamos la clase Casa
export class Casa {
    constructor(nombre) {
        this.nombre = nombre;
        this.personajesDeCasa = [];
    }

    // metodo que obtiene los personajes de esta casa a partir de todos los datos de la API
    obtenerPersonajes(todosLosDatosApi) {
        // Filtrar personajes de esta casa
        const filtrados = todosLosDatosApi.filter(
            p => p.house === this.nombre
        );

        // Crear objetos Personaje
        this.personajesDeCasa = filtrados.map(
            dato => new Personaje(dato)
        );
        return this.personajesDeCasa;
    }

    // metodo que devuelve el numero de personajes de la casa
    enumerarPersonajes() {
        return this.personajesDeCasa.length;
    };

    // metodo que cuenta las personajes masculinos de la casa
    contarMasculinos() {
        // filtramos los personajes masculinos y devolvemos su longitud
        return this.personajesDeCasa.filter(
            p => p.genero === "male"
        ).length;
    }
}