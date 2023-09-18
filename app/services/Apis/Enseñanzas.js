import supabase from "../supabase"

export const  traerEnseñanzas = async (id) => {
    const { data, error } = await supabase
        .from('Enseñanzas')
        .select('*')
        .eq('Libro', id)
    console.log(data, error)
    if (error) {
        console.log('Ocurrio un error al obtener las enseñanzas')
        return false
    }
    return data
}