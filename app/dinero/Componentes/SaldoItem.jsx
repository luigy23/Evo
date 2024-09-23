import { Card, Chip, Modal } from '@nextui-org/react'
import React from 'react'
import NextLink from 'next/link'
import { formatearDinero } from '@/app/services/Funciones/Formateadores'
import { eliminarSaldo } from '@/app/services/Apis/Saldos'
const SaldoItem = ({saldo}) => {


    const HandleeliminarSaldo = async () => {

        //confirmar si se quiere eliminar el saldo
        const confirmar = confirm('¿Estas seguro de eliminar el saldo?')
        if (!confirmar) {
            return
        }



        const res = await eliminarSaldo(saldo.id)
        if (!res) {
            alert('Ocurrio un error al eliminar el saldo')
            return
        }
        alert('Saldo eliminado')
    }



  return (
    <>
    <Card
    href={`/dinero/${saldo.id}`}
    as={NextLink}
    onContextMenu={(e) => {
        e.preventDefault()
        HandleeliminarSaldo()
    }}

    key={saldo.id} className="bg-smoke-600 shadow-primary-400 text-slate-100 p-2 rounded-xl flex items-center justify-between gap-2">
        <div>
            <p>{saldo.Descripcion}</p>


        </div>
        <div>
            <Chip color='success' variant='flat' >{formatearDinero(saldo.Dinero)}</Chip>
        </div>
    </Card>


    
    </>
  )
}

export default SaldoItem