"use client"
import { Button, Input, Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import IconArrowLeft from '../../Icons/IconArrowLeft'
import IconArrowRight from '../../Icons/IconArrowRight'
import Ejercicio from '../Componentes/Ejercicio'
import NextLink from 'next/link'
import supabase from '@/app/services/supabase'
import DiaTitulo from '../Componentes/DiaTitulo'
import { crearEjercicio, traerDiaPorNombre, traerEjerciciodelaFecha, traerEjerciciosRealizados, traerEjericios } from '@/app/services/Apis/Ejercicios'

const EjercicioPage = ({params}) => {
    const dia = decodeURI(params.dia)
    const dias = [ 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
    const dia_de_la_semana_actual = dias.indexOf(dia)
    const dia_anterior = dia_de_la_semana_actual === 0 ? dias[6]: dias[dia_de_la_semana_actual - 1];
    const dia_siguiente = dia_de_la_semana_actual === 6 ? dias[0] : dias[dia_de_la_semana_actual + 1];

    const [ejercicios, setEjercicios] = useState([])
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [ejercicio, setEjercicio] = useState({
        Nombre: '',
        Reps: 0,
        Series: 0,
        Medida: '',
        'Día': 0
    })



    useEffect(() => {
        cargarEjercicios()

      
    }, [])

    const cargarEjercicios =  async() => {

        const fecha = new Date().toISOString().slice(0, 10)
        console.log(fecha)

       
        const ejerciciosfecha = await traerEjerciciosRealizados(fecha)
        
        const idDia = await traerDiaPorNombre(dia)
        if (idDia.length === 0) return
        const ejercicios = await traerEjericios(idDia[0].id)

        console.log(ejerciciosfecha)
        console.log(ejercicios)

         if (ejerciciosfecha.length > 0) {
            //si hay ejercicios que coincidan el id de ejercicios con el idEjecicio de ejerciciosFecha, remplazamos el ejercicio de ejercicios por el de ejerciciosFecha:
            ejerciciosfecha.forEach(ejercicioFecha => {
                const index = ejercicios.findIndex(ejercicio => ejercicio.id === ejercicioFecha.idEjercicio)
                if (index !== -1) {
                    ejercicios[index] = ejercicioFecha
                }
            })
            
            setEjercicios(ejercicios)
         }
        //     const ejercicios = ejerciciosfecha.filter(ejercicio => ejercicio['Día'] === idDia[0].id)
        //     setEjercicios(ejercicios)
        //     return
            
        // }

        setEjercicios(ejercicios)
    }



 
        

    const handleCrearEjercicio = async (e) => {
        e.preventDefault()
        if (ejercicio.Nombre === '' || ejercicio.Reps === 0 || ejercicio.Series === 0 || ejercicio.Medida === '') return

        const ejercicioCreado = await crearEjercicio({...ejercicio, 'Día': dia_de_la_semana_actual+1})
        if (ejercicioCreado) {
            alert('Ejercicio creado')
            limpiar()
            recargar()
            onOpenChange()
        }
    }

    const recargar = () => {
        cargarEjercicios()
    }

    const limpiar = () => {
        setEjercicio({
            Nombre: '',
            Reps: 0,
            Series: 0,
            Medida: '',
            'Día': 0
        })
    }
    





// ejercicios:
    // [
    //     {
    //       id: 1,
    //       created_at: '2023-09-19T01:08:14.724729+00:00',
    //       Nombre: 'Lenvantamientos',
    //       Reps: 15,
    //       Series: 3,
    //       Medida: 'Reps',
    //       'Día': 1
    //     }
    //   ]
    


    return (
        <>
        <main className="flex min-h-screen flex-col  relative items-center justify-start py-5 px-5 bg-smoke-900 gap-3 dark">
            <div className='w-full flex justify-between items-center dark '>
                <Button isIconOnly variant='shadow' color='success' as={NextLink} href={`/ejercicio/${dia_anterior}`}>
                    <IconArrowLeft />
                </Button>
                <DiaTitulo dia={dia} dias={dias} />
                <Button isIconOnly variant='shadow' color='success' as={NextLink} href={`/ejercicio/${dia_siguiente}`}>
                    <IconArrowRight />
                </Button>
            </div>

            <div className='w-full flex flex-col justify-center items-center mt-12 gap-4 '>
                {   ejercicios.length === 0 ? <h1 className='text-slate-200'>No hay ejercicios para este dia</h1> :
                    ejercicios.map(ejercicio => {
                        return (
                            <Ejercicio key={ejercicio.id} ejercicio={ejercicio} recargar={recargar} />
                        )
                    })

                }

            </div>
            <div>
                <Button onClick={onOpen}>Crear</Button>
            </div>

        </main>

       {/* Modal de crear */}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='4xl' >
            <ModalContent className='dark'>
                <ModalBody >

                <form className='flex flex-col gap-2 items-center justify-center w-full' onSubmit={
                    handleCrearEjercicio
                }>
                <h2 className='text-slate-200'>Crear Ejercicio</h2>
                
                <Input placeholder='Nombre' color='secondary' value={ejercicio.Nombre} onChange={(e) => setEjercicio({...ejercicio, Nombre: e.target.value})} />
                <div className='flex gap-2 items-center justify-center'>
                <Input type='number' color='primary'  placeholder='Series' value={ejercicio.Series} onChange={(e) => setEjercicio({...ejercicio, Series: e.target.value})} />
                <h2 className='text-slate-50'>x</h2>
                <Input type='number' color='primary'  placeholder='Repeticiones' value={ejercicio.Reps} onChange={(e) => setEjercicio({...ejercicio, Reps: e.target.value})}
                 />
                </div>
                <Input placeholder='Medida' color='success'  value={ejercicio.Medida} onChange={(e) => setEjercicio({...ejercicio, Medida: e.target.value})}/>
                <Button color='primary' type='submit' fullWidth >Crear</Button>
                </form>
                </ModalBody>
            </ModalContent>
        
        </Modal>
        </>
    )
}

export default EjercicioPage