"use client"
import { Button, Card, CardBody, CardHeader, Input, Modal, ModalBody, ModalContent, Skeleton, useDisclosure } from '@nextui-org/react'
import React, { Suspense, useEffect, useState } from 'react'
import IconNerd from '../Icons/NerdIcon'
import supabase from '../services/supabase'
import NextLink  from 'next/link'
import IconSearch from '../Icons/SearchIcon'
import IconBookOpen from '../Icons/IconBookOpen'

const Libros = () => {

  const [libros, setLibros] = useState([])
  const [buscador, setBuscador] = useState('')
  const [nuevoLibro, setNuevoLibro] = useState({
    "Nombre del Libro": "",
    "Descripcion": ""
  })

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Libros:

  // [ {
  //     "id": 1,
  //     "created_at": "2023-09-12T21:38:28.651966+00:00",
  //     "Nombre del Libro": "Vendes o Vendes",
  //     "Descripcion": "Un libro de ventas y de negocios, de como tratar a los clientes etc"
  // },]

  const colores = ['bg-danger-400 shadow-danger-300', ' bg-success-500 shadow-success-400 text-slate-800',
    'bg-warning-500 shadow-warning-400 text-slate-800', 'bg-primary-500 shadow-primary-400 text-slate-800',

]

  useEffect(() => {
    cargarSupabase()
  }, [])

  const cargarSupabase = async () => {
    const { data, error } = await supabase
      .from('Libros')
      .select('*')
    setLibros(data)
    console.log(data, error)
  }
  const crearLibro = async (e) => {
    e.preventDefault()

//validamos datos
    if (nuevoLibro["Nombre del Libro"] === '' || nuevoLibro["Descripcion"] === '') {
      alert('Debes llenar todos los campos')
      return
    }


    const { data, error } = await supabase
      .from('Libros')
      .insert(nuevoLibro)
    console.log(data, error)

    if (error) {
      alert('Ocurrio un error al crear el libro')
      return
    }

    cargarSupabase()
    //limpiamos el formulario, cerramos el modal y mostramos un mensaje
    setNuevoLibro({
      "Nombre del Libro": "",
      "Descripcion": ""
    })
    alert('Libro creado correctamente')
    onOpenChange(false)
    

  }


  return (
    <>
      <main className="flex min-h-screen flex-col relative items-center justify-start p-24 bg-smoke-900 gap-3 dark">
        {/* Formulario de busqueda */}
        <form className="flex flex-col gap-3 items-center justify-center w-full">
          <h1>Libros</h1>
          <div className="flex-wrap md:flex gap-1 w-full  items-center justify-center">
            <Input
              value={buscador}
              onChange={(e) => setBuscador(e.target.value)
              
              }
              className='md:w-80'


              placeholder="Busca o preguntame" color='secondary' startContent={<IconNerd className="w-5" />} />
            <div className="flex gap-1 items-center justify-center mt-1 md:mt-0">
              <Button isIconOnly color='secondary' auto><IconSearch /> </Button>
              <Button color='primary' auto
              onPress={onOpen}
              >Crear</Button>
            </div>
          </div>

        </form>
        <section className="flex flex-col gap-3 mt-24 w-full  md:w-[80%]">
          {
            libros.length > 0 ? (

              libros
                .filter((libro) =>
                  buscador === '' ||
                  libro["Nombre del Libro"].toLowerCase().includes(buscador.toLowerCase())
                )
                .map((libro) => {

                  const color = colores[libro.id % colores.length]

                  console.log(`shadow-md ${color}`)
                  return (
                   
                      <Card className={`shadow-md ${color}`} fullWidth={true}  key={libro.id} as={NextLink} 
                      href={`/libros/${libro["Nombre del Libro"]}`}

                      >
                        <CardHeader className='py-2 '>
                          <h3 className='font-semibold'>{libro["Nombre del Libro"]}</h3>
                       </CardHeader>
                      </Card>)
                    
                }))
              : (
                <>
                  <Skeleton className='rounded-md w-40 h-10 ' />
                  <Skeleton className='rounded-md w-40 h-10 ' />
                  <Skeleton className='rounded-md w-40 h-10 ' />
                </>
              )
          }
        </section>

      </main>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className='dark'>
          {
            (onClose) => (
              <>
                <ModalBody>
                <form className="flex flex-col gap-2 items-center justify-center" onSubmit={crearLibro} >
                    <h2 className='text-slate-300'>Crear libro</h2>
                    <div className="flex gap-1 justify-center items-center  flex-wrap ">
                      <Input

                        value={nuevoLibro["Nombre del Libro"]}
                        onChange={(e) => setNuevoLibro({ ...nuevoLibro, "Nombre del Libro": e.target.value })}
                        placeholder="Nombre del libro" color='primary' startContent={<IconNerd className="w-5" />} />
                      <Input
                        className='min-w-40'
                        value={nuevoLibro["Descripcion"]}
                        onChange={(e) => setNuevoLibro({ ...nuevoLibro, "Descripcion": e.target.value })}
                        placeholder="Descripcion" color='secondary' startContent={<IconBookOpen className="w-5" />} />
                      <Button 
                      type='submit'
                      className='mt-2' color='primary' variant='flat' auto>Crear</Button>
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

        export default Libros