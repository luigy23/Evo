import supabase from "../supabase";

 const obtenerSaldo = async (id) => {
    const { data, error } = await supabase
        .from('Saldos')
        .select('*')
        .eq('id', id)
    console.log(data, error)
    return data
}

const cargarSaldos = async () => {
    const { data, error } = await supabase
        .from('Saldos')
        .select('*')
    console.log(data, error)
    return data
}

const editarSaldo = async (saldo) => {
    const { data, error } = await supabase
        .from('Saldos')
        .update(saldo)
        .eq('id', saldo.id)
    console.log(data, error)

    if (error) {
        console.log('Ocurrio un error al editar el saldo')
        return false
    }
    return true
}

const crearteSaldo = async (saldo) => {
    const { data, error } = await supabase
        .from('Saldos')
        .insert(saldo)
    console.log(data, error)

    if (error) {
        console.log('Ocurrio un error al crear el saldo')
        return false
    }
    return true
}

// Gastos

 const cargarGastosPorId = async (id) => {
    const { data, error } = await supabase
        .from('Gastos')
        .select('*')
        .eq('Saldo', id)
    console.log(data, error)
    return data
}

 const crearGasto = async (gasto) => {
    const { data, error } = await supabase
        .from('Gastos')
        .insert(gasto)
    console.log(data, error)
    if (error) {
        console.log('Ocurrio un error al crear el gasto')
        return false
    }
    return true
}

 const editarGasto = async (gasto) => {
    const { data, error } = await supabase
        .from('Gastos')
        .update(gasto)
        .eq('id', gasto.id)
    console.log(data, error)
    if (error) {
        console.log('Ocurrio un error al editar el gasto')
        return false
    }
    return true
}

 const eliminarGasto = async (id) => {
    const { data, error } = await supabase
        .from('Gastos')
        .delete()
        .eq('id', id)
    console.log(data, error)
    if (error) {
        console.log('Ocurrio un error al eliminar el gasto')
        return false
    }
    return true
}



module.exports = {
    cargarSaldos,
    editarSaldo,
    crearteSaldo,
    obtenerSaldo,
    cargarGastosPorId,
    crearGasto,
    editarGasto,
    eliminarGasto
    
    
}