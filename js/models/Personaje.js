// exportamos y definimos la clase Personaje
export class Personaje {
    constructor(datoApi) {
        this.nombre = datoApi.name;
        this.genero = datoApi.gender;
        this.wizard = datoApi.wizard;
        this.wand = datoApi.wand;
        this.imagen = datoApi.image;
    }

    // metodo que devuelve si es mago o no
    esMago() {
        return this.wizard ? "Es mago" : "No es mago";
    }
}