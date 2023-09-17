"use client"
import React, { useEffect, useState } from 'react'
import supabase from '@/app/services/supabase'
import BtnActualizar from './componentes/BtnActualizar'
import IconArrowUpdate from '@/app/Icons/IconArrowUpdate'
import { Button, Input, Skeleton, Textarea, useDisclosure, Modal, ModalBody, ModalContent } from '@nextui-org/react'
import IconAdd from '@/app/Icons/IconAdd'



const Libro =  ({params}) => {

    const NombreLibro = decodeURI(params.libro)
    console.log(NombreLibro)
    const [libro, setLibro] = useState([])
    const [enseñanzas, setEnseñanzas] = useState([])
    const [nuevaEnseñanza, setNuevaEnseñanza] = useState('')
    const [enseñanzaSeleccionada, setEnseñanzaSeleccionada] = useState({id: '', texto: ''})

    const { isOpen, onOpen, onOpenChange } = useDisclosure();



    useEffect(() => {
        console.log("hola")
        getLibro(NombreLibro).then(data => {
            getEnseñanza(data[0].id)
        })

    }, [])



    const getLibro = async (NombreLibro) => {
        console.log(NombreLibro)
        const { data, error } = await supabase
            .from('Libros')
            .select('*')
            .eq('Nombre del Libro', NombreLibro)
        console.log(data, error)
        setLibro(data)
        return data
    }
    const getEnseñanza = async (id) => {

        const { data, error } = await supabase
            .from('Enseñanzas')
            .select('*')
            .eq('Libro', id)
            .order('id')
        console.log(data, error)
        setEnseñanzas(data)
    }

    const recargar = () => {
        getLibro(NombreLibro).then(data => {
            getEnseñanza(data[0].id)
        })
    }

    const crearEnseñanza = async () => {
        if (nuevaEnseñanza === '') {
            alert('Debes llenar todos los campos')
            return
        }
        const { data, error } = await supabase
            .from('Enseñanzas')
            .insert({
                Libro: libro[0].id,
                texto: nuevaEnseñanza
            })
        console.log(data, error)
        if (error) {
            alert('Ocurrio un error al crear la enseñanza')
            return
        }
        setNuevaEnseñanza('')
        recargar()
    }
    const editarEnseñanza = async (id, texto) => {
        
        const { data, error } = await supabase
            .from('Enseñanzas')
            .update({
                texto: texto
            })
            .eq('id', id)
        console.log(data, error)
        if (error) {
            alert('Ocurrio un error al editar la enseñanza')
            return
        }
        recargar()
    }

    const handleClickEnseñanza = (texto, id) => {
        setEnseñanzaSeleccionada({id: id, texto: texto})
        onOpen()


        
    }
    const handlesumbitEditarEnseñanza = (e) => {
        e.preventDefault()

        if (enseñanzaSeleccionada.texto === '') {
            alert('Debes llenar todos los campos')
            return
        }
        

        editarEnseñanza(enseñanzaSeleccionada.id, enseñanzaSeleccionada.texto)
        onOpenChange()
    }

    




    const colores = ['bg-danger-200 shadow-danger-300', ' bg-success-100 shadow-success-400 text-slate-800',
   'bg-primary-200 shadow-primary-400 text-slate-800',
]



  return (
    <>
    <main className="flex min-h-screen flex-col relative items-center justify-start p-24 bg-smoke-900 gap-3 dark">
       <div>
            <div className='flex gap-2'>
            <h1 className='text-slate-100 font-bold'> {NombreLibro}</h1>
            <Button color="success" auto isIconOnly variant='flat' onClick={recargar}>
            <IconArrowUpdate />
            </Button>
            </div>
        <div className='bg-green-500 h-1 w-full rounded-xl mt-2'></div>
       </div>
       <p className='text-slate-100'> {libro[0]&& libro[0].Descripcion} </p>
       <div className='flex gap-2 items-center justify-center w-full'
       >
        <Textarea className='w-[80%]'  color='secondary' placeholder='Escribe una nueva enseñanza' value={nuevaEnseñanza} onChange={(e) => setNuevaEnseñanza(e.target.value)} />

        <Button color="success" auto isIconOnly variant='flat' onClick={crearEnseñanza}>
            <IconAdd />
        </Button>

        </div>
        

        <h2 className='text-slate-100'> Enseñanzas</h2>
        <ul className='gap-2'>
            {
            
            enseñanzas.length > 0 ?(
            
            enseñanzas.map(enseñanza => {
            const color = colores[enseñanza.id % colores.length]
            return(
                <li key={enseñanza.id} className={`shadow-md ${color} px-3 py-2 mb-2 rounded-lg`}
                onClick={() => handleClickEnseñanza(enseñanza.texto, enseñanza.id
                )}
                >
                    <p className='text-slate-100 whitespace-pre-wrap'> {enseñanza.texto}</p>
                </li>
            )}
            ))
            : (
                <div className='flex flex-col gap-4'>
                 <Skeleton className='rounded-md w-40 h-10 ' />
                  <Skeleton className='rounded-md w-40 h-10 ' />
                  <Skeleton className='rounded-md w-40 h-10 ' />
                </div>
            )
        
        
            
            
            }
        </ul>

    </main>

    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='4xl' >
        <ModalContent className='dark w-full' >
          {
            (onClose) => (
              <>
                <ModalBody className='w-full'>
                <form className="flex flex-col gap-2 items-center justify-center w-full" onSubmit={handlesumbitEditarEnseñanza}
                 >
                    <h2 className='text-slate-300'>Editar enseñanza</h2>
                    <div className="flex gap-1 justify-center items-center  flex-wrap w-full">
                        <Textarea
                        className='w-full'
                        value={enseñanzaSeleccionada.texto}
                        onChange={(e) => setEnseñanzaSeleccionada({ ...enseñanzaSeleccionada, texto: e.target.value })}
                        placeholder="Escribe una nueva enseñanza" color='primary' />
                        <Button
                        type='submit'
                        className='mt-2' color='primary' variant='flat' auto>Editar</Button>
                    </div>
                </form>
                
                </ModalBody>
                </>
                )
          }
          </ModalContent>


      </Modal>
    </>
  )
}

export default Libro