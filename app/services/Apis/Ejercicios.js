import supabase from "@/app/services/supabase";

export const traerEjericios = async (dia) => {
    console.log(dia)
    const { data, error } = await supabase
        .from('Ejercicios')
        .select('*')
        .eq('Día', dia)
    if (error) {
        return false
    }
    return data
}

export const traerDiaPorNombre = async (nombre) => {
    const { data, error } = await supabase
        .from('DiasEjercicios')
        .select('id')
        .eq('Nombre', nombre)
    if (error) {
        console.log('Ocurrio un error al obtener los ejercicios')
        return false
    }
    return data
}

export const crearEjercicio = async (ejercicio) => {
    console.log(ejercicio)
    const { data, error } = await supabase
        .from('Ejercicios')
        .insert(ejercicio)
    if (error) {
        console.log(error)
        console.log('Ocurrio un error al crear el ejercicio')
        return false
    }
    return true
}

export const traerEjerciciodelaFecha = async (fecha) => {
    const { data, error } = await supabase
        .from('Ejercicios')
        .select('*')
        .eq('Fecha', fecha)
    if (error) {
        console.log('Ocurrio un error al obtener los ejercicios')
        return false
    }
    return data
}

export const postEjercicioRealizado = async (ejercicio) => {
    console.log(ejercicio)
    const { data, error } = await supabase
        .from('CalendarioEjercicios')
        .insert(ejercicio)
    if (error) {
        console.log('Ocurrio un error al crear el ejercicio')
        console.log(error)
        //retonamos un error
        return false
    }
    return true



}

export const updateEjercicioRealizado = async (ejercicio) => {
    console.log(ejercicio)
    const { data, error } = await supabase
        .from('CalendarioEjercicios')
        .update(ejercicio)
        .eq('id', ejercicio.id)
    if (error) {
        console.log('Ocurrio un error al crear el ejercicio')
        console.log(error)
        //retonamos un error
        return false
    }
    return true
}

export const traerEjerciciosRealizados = async (fecha) => {
    console.log(fecha)
    const { data, error } = await supabase
        .from('CalendarioEjercicios')
        .select('*')
        .eq('Fecha', fecha)
    if (error) {
        console.log(error)
        console.log('Ocurrio un error al obtener los ejercicios')
        return false
    }
    return data
}

export const eliminarEjercicio = async (id) => {
    const { data, error } = await supabase
        .from('Ejercicios')
        .delete()
        .eq('id', id)
    if (error) {
        console.log(error)
        console.log('Ocurrio un error al eliminar el ejercicio')
        return false
    }
    return true

}




// supabase
// .from('CalendarioEjercicios')
// .insert(ejercicio)
// .then((data) => {
//     console.log(data)
//     return true
// })
// .catch((error) => {
//     console.log(error)
//     return false
// })
