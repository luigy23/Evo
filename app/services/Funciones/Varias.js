import { traerEnseñanzas } from "../Apis/Enseñanzas";
import { traerNombreIdLibros } from "../Apis/Libros";
import supabase from "../supabase";

export const ObtenerEnseñanzasAlAzar = async () => {
    const libros = await traerNombreIdLibros()
    let libroAlAzar;
    let enseñanzaAlAzar;

    while (true) {
        libroAlAzar = await alAzar(libros)
        const enseñanzas = await traerEnseñanzas(libroAlAzar.id)
        if (enseñanzas.length > 0) {
            const {texto} = await alAzar(enseñanzas)
            enseñanzaAlAzar = texto;
            console.log(enseñanzaAlAzar)
            break
        }
    }


    return { enseñanza: enseñanzaAlAzar, libro: libroAlAzar['Nombre del Libro'] }


}

const alAzar = async (grupo) => {
   const random = grupo[Math.floor(Math.random() * grupo.length)]
    return random
}

