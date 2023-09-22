"use client"
import { eliminarEjercicio, postEjercicioRealizado } from '@/app/services/Apis/Ejercicios'
import { useDisclosure } from '@nextui-org/react'
import React from 'react'
import ModalEjercicioRealizado from './ModalEjercicioRealizado'

const Ejercicio = ({ejercicio, recargar}) => {
  const {Series, Reps, Medida, Nombre} = ejercicio
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const coloresEstado = {
    0: 'bg-red-500 text-white',
    1: 'bg-[#58b56c] text-white',
    2: 'bg-secondary-400 text-white',
  }
  const tachadoEstado = {
    0: '',
    1: 'line-through',
    2: 'line-through',
  }

  const handleContext = async (e) => {
    e.preventDefault()

    //ventana de confirmacion
    const confirmacion = confirm('¿Desea eliminar el ejercicio?')
    if(!confirmacion) return



    if(!isNaN(ejercicio.Estado)) {
    const res = await eliminarEjercicio(ejercicio.idEjercicio)
    if(res) {recargar();     return}
    alert('No se pudo eliminar el ejercicio')

  }
    const res = await eliminarEjercicio(ejercicio.id)
    if(res) {recargar(); return}
    alert('No se pudo eliminar el ejercicio')


  }








  return (
    <>
    <div className={`w-full flex ${
       !isNaN(ejercicio.Estado)  ?
      coloresEstado[ejercicio.Estado]: 'bg-slate-100 text-[#58b56c]'
    } justify-between items-center gap-2 py-3 px-3 
     rounded-md shadow-sm shadow-[#58b56c] cursor-pointer `}
    onClick={onOpen}
    onContextMenu={handleContext}
    >
       <h2 className={`${tachadoEstado[ejercicio.Estado]} 'font-medium text-3xl'`}>{Nombre}</h2>
       <p className='font-medium '> {Reps}x{Series} {Medida}</p>
    </div>
    <ModalEjercicioRealizado isOpen={isOpen} onOpenChange={onOpenChange} ejercicio={ejercicio} recargar={recargar} />
    </>
  )
}

export default Ejercicio

