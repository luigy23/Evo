import { formatearDinero } from '@/app/services/Funciones/Formateadores'
import { Chip } from '@nextui-org/react'
import React from 'react'
import {eliminarGasto} from '@/app/services/Apis/Saldos'

const GastoItem = ({gasto, limpiarYCargar}) => {

    const HandleeliminarGasto = async () => {
            
            //confirmar si se quiere eliminar el gasto
            const confirmar = confirm('¿Estas seguro de eliminar el gasto?')
            if (!confirmar) {
                return
            }
    
            const res = await eliminarGasto(gasto.id)
            if (!res) {
                alert('Ocurrio un error al eliminar el gasto')
                return
            }
            alert('Gasto eliminado')
            limpiarYCargar()
        }


    return (
        <div
        onClick={HandleeliminarGasto}
        
        key={gasto.id} className="bg-smoke-600 shadow-primary-400 text-slate-100 p-2 rounded-xl flex items-center justify-between gap-2">
            <div>
                <p  >{gasto.Descripcion}</p>
            </div>
            <div>
                <Chip color='success' variant='flat' >{formatearDinero(gasto.Valor)}</Chip>
            </div>
        </div>
    )
}

export default GastoItem