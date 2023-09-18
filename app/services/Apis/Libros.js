import supabase from "../supabase"


const cargarLibros = async () => {
    const { data, error } = await supabase
        .from('Libros')
        .select('*')
    console.log(data, error)
    return data
}


const editarLibro = async (libro) => {
    const { data, error } = await supabase
        .from('Libros')
        .update(libro)
        .eq('id', libro.id)
    console.log(data, error)

    if (error) {
        console.log('Ocurrio un error al editar el libro')
        return false
    }
    return true
}

const crearteLibro = async (libro) => {
    const { data, error } = await supabase
        .from('Libros')
        .insert(libro)
    console.log(data, error)

    if (error) {
        console.log('Ocurrio un error al crear el libro')
        return false
    }
    return true
}

const eliminarLibro = async (id) => {
    const { data, error } = await supabase
        .from('Libros')
        .delete()
        .eq('id', id)
    console.log(data, error)

    if (error) {
        console.log('Ocurrio un error al eliminar el libro')
        return false
    }
    return true
}

export const traerLibro = async (id) => {
    const { data, error } = await supabase
        .from('Libros')
        .select('*')
        .eq('id', id)
    console.log(data, error)

    if (error) {
        console.log('Ocurrio un error al traer el libro')
        return false
    }
    return data[0]
}

const traerNombreIdLibros = async () => {
    const { data, error } = await supabase
        .from('Libros')
        .select('id, "Nombre del Libro"')
    console.log(data, error)

    if (error) {
        console.log('Ocurrio un error al traer el libro')
        return false
    }
    return data
}



module.exports = {
    cargarLibros,
    editarLibro,
    crearteLibro,
    eliminarLibro,
    traerNombreIdLibros
}