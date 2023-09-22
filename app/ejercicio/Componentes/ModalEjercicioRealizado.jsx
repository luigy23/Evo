"use client"
import IconArrowLeft from '@/app/Icons/IconArrowLeft'
import { postEjercicioRealizado, updateEjercicioRealizado } from '@/app/services/Apis/Ejercicios'
import { Button, Input, Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/react'

import React, { useState } from 'react'

const ModalEjercicioRealizado = ({isOpen, onOpenChange, ejercicio, recargar}) => {

    const [accion, setAccion] = useState('Todo')
    const [reps, setReps] = useState(ejercicio.Reps)
    const [series, setSeries] = useState(ejercicio.Series)


    const onOpenChangeHandler = () => {
        reiniciar()
        onOpenChange()
    }

    const onClickOtro = () => {
        setAccion('Otro')
        

    }

    const handleGuardar = () => {
        const { Nombre, Reps, Series, Medida, Día} = ejercicio
        const fecha = new Date()

        if(reps === '' || series === '') {
            alert('Debes llenar todos los campos')
            return
        }

        const ejercicioRealizado = {
            id: ejercicio.id,
            Nombre,
            Reps: reps,
            Series: series,
            Medida,
            Día,
            Fecha: fecha,
            idEjercicio: ejercicio.id,
            Estado: 2,
        }
        console.log(ejercicioRealizado)
        CreateOrUpdate(ejercicioRealizado)
        reiniciar()
    }


    const onClickTodo = () => {


        const { Nombre, Reps, Series, Medida, Día} = ejercicio
        const fecha = new Date()

        const ejercicioRealizado = {
            Nombre,
            Reps,
            Series,
            Medida,
            Día,
            Fecha: fecha,
            idEjercicio: ejercicio.id,
            Estado: 1,
        }
        console.log(ejercicioRealizado)
        CreateOrUpdate(ejercicioRealizado)
        reiniciar()
        setAccion('Todo')
    }

    const onClickNada = () => {
       
        const { Nombre, Reps, Series, Medida, Día} = ejercicio
        const fecha = new Date()

        const ejercicioRealizado = {
            id: ejercicio.id,
            Nombre,
            Reps,
            Series,
            Medida,
            Día,
            Fecha: fecha,
            idEjercicio: ejercicio.id,
            Estado: 0,
        }
        console.log(ejercicioRealizado)
        

        CreateOrUpdate(ejercicioRealizado)
        reiniciar()

}


    const CreateOrUpdate = (ejercicioRealizado) => {
        if(ejercicio.Estado==null) {
            postEjercicioRealizado(ejercicioRealizado).then(res =>  {
                if(res) {
                    alert('Ejercicio guardado')
                    onOpenChangeHandler()
                    recargar()
                    return

                }
                alert('Error al guardar')
            })
        } else {
            updateEjercicioRealizado(ejercicioRealizado).then(res =>  {
                if(res) {
                    alert('Ejercicio Actualizado')
                    onOpenChangeHandler()
                    recargar()
                    return

                }
                alert('Error al guardar')
            })
        }
    }





    const reiniciar = () => {
        setAccion('Todo')
        setReps(ejercicio.Reps)
        setSeries(ejercicio.Series)
    }



  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChangeHandler} size='4xl' >
    <ModalContent className='dark'>
        <ModalBody >
            <div className='flex flex-col justify-center items-center gap-4 w-full'>
                {
                accion === 'Todo' &&
                <>
                <div className='flex  justify-center items-center gap-2 w-full'>
                <Button variant='shadow' color='success' className='bg-[#C7FF6B] text-[#1c5428] font-medium text-xl'
                onClick={onClickTodo}
                >Todo</Button>
                <Button variant='flat' color='primary' className='font-medium text-xl'
                onClick={onClickOtro}
                >Otro</Button>
                </div>
                <Button variant='flat' color='danger' className='font-medium text-xl'
                onClick={onClickNada}
                >Nada</Button>
                </>
                }
{
    accion !== 'Todo' &&
                <div className='flex flex-col w-full gap-2 p-2'>
                    <div className='flex text-slate-100 items-center gap-4 w-full'>
                    <Button variant='ghost' color='default'  isIconOnly onClick={onClickTodo}>
                        <IconArrowLeft />
                    </Button>
                    <p>¿Cuanto hiciste?</p>
                    </div>

                    <form className='flex flex-col  gap-3 w-full text-slate-100 items-center justify-center'
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleGuardar()
                    }}
                    >
                        <div className='flex  gap-2 w-full justify-center items-center mt-2'>
                        <Input  color='secondary' type='number'
                        label='Reps'
                        value={reps} onChange={(e) => setReps(e.target.value)} />
                        x
                        <Input label='Series' color='secondary' type='number' value={series} onChange={(e) => setSeries(e.target.value)} />
                        </div>
                        <Button  type='submit' variant='flat' color='success'
                        >
                            Guardar
                        </Button>
                    </form>
                </div>
}
            </div>
        </ModalBody>
    </ModalContent>

</Modal>
  )
}

export default ModalEjercicioRealizado


{/* <Button variant='flat' color='primary' className='font-medium text-xl'>Casi Todo</Button>
<Button variant='flat' color='success' className='font-medium text-xl'>Aún más</Button>
<Button variant='flat' color='danger' className='font-medium text-xl'>Nada</Button> */}