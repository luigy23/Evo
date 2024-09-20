// Funcion que formatea un numero a un formato de moneda Colombiana

export const formatearDinero = (numero) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(numero)
}