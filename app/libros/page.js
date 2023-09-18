"use client"
import { Button, Input, Modal, ModalBody, ModalContent, Skeleton, useDisclosure } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import IconNerd from '../Icons/NerdIcon'
import IconSearch from '../Icons/SearchIcon'
import IconBookOpen from '../Icons/IconBookOpen'
import Libro, { LibroSkeleton } from './Componentes/Libro'
import { cargarLibros, crearteLibro, editarLibro, eliminarLibro } from '../services/Apis/Libros'

const Libros = () => {

  const [libros, setLibros] = useState([])
  const [buscador, setBuscador] = useState('')
  const [accion, setAccion] = useState('Crear Libro')
  const [nuevoLibro, setNuevoLibro] = useState({
    "Nombre del Libro": "",
    "Descripcion": ""
  })

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const colores = ['bg-danger-400 shadow-danger-300', ' bg-success-500 shadow-success-400 text-slate-800',
    'bg-warning-500 shadow-warning-400 text-slate-800', 'bg-primary-500 shadow-primary-400 text-slate-800',

]
  useEffect(() => {
    cargarSupabase()
  }, [])

  const cargarSupabase = async () => {
    const res = await cargarLibros()
    if (!res) {
      alert('Ocurrio un error al cargar los libros')
      return
    }
    setLibros(res)
    
  }
  const handleSumbit = async (e) => {
    e.preventDefault()

    //validamos datos
    if (nuevoLibro["Nombre del Libro"] === '' || nuevoLibro["Descripcion"] === '') {
      alert('Debes llenar todos los campos')
      return
    }
    if (accion === 'Crear Libro') {
      crearLibro()
      return
    }
    if (accion === 'Editar Libro') {
      editareLibro()
      return
    }


    
    

  }
  const handleEditar = (libro) => {
    
    const libroEditado = {
      id: libro.id,
      "Nombre del Libro": libro["Nombre del Libro"],
      "Descripcion": libro["Descripcion"]
    }
    setNuevoLibro(libroEditado)
    setAccion('Editar Libro')
    onOpenChange(true)

    
  }
  const crearLibro = async () => {

    const res = await crearteLibro(nuevoLibro)
    if (!res) {
      alert('Ocurrio un error al crear el libro')
      return
    }
    limpiarYCargar('creado')
  }
  const editareLibro = async () => {
    const res = await editarLibro(nuevoLibro)
    if (!res) {  
      alert('Ocurrio un error al editar el libro')
      return
    }
    limpiarYCargar('editado')

  }
  const eliminarteLibro = async () => {

    //preguntamos si esta seguro de eliminar el libro
    const confirmacion = confirm('¿Estas seguro de eliminar el libro?')
    if (!confirmacion) {
      return
    }
    const res = await eliminarLibro(nuevoLibro.id)
    if (!res) {
      alert('Ocurrio un error al eliminar el libro')
      return
    }
    limpiarYCargar('eliminado')
  }
  const limpiarYCargar = (accion) => {

    cargarSupabase()
    //limpiamos el formulario, cerramos el modal y mostramos un mensaje
    setNuevoLibro({
      "Nombre del Libro": "",
      "Descripcion": ""
    })
    alert(`Libro ${accion} correctamente`)
    onOpenChange(false)
  }




  return (
    <>
      <main className="flex min-h-screen flex-col relative items-center justify-start  p-24 bg-smoke-900 gap-3 dark">
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
        {/* Libros */}
        <section className="flex flex-col gap-3 mt-24 w-full  md:w-[80%]">
          {
            libros.length > 0 
            ? (
              libros
                .filter((libro) =>
                  buscador === '' ||
                  libro["Nombre del Libro"].toLowerCase().includes(buscador.toLowerCase())
                )
                .map((libro) => {
                  const color = colores[libro.id % colores.length]
                  return <Libro key={libro.id} libro={libro} color={color} handleEditar={handleEditar}
                   />
                }))
            : (
                <>
                  <LibroSkeleton />
                </>
              )
          }
        </section>

      </main>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className='dark'>
            <ModalBody>
            <form className="flex flex-col gap-2 items-center justify-center" onSubmit={handleSumbit} >
                <h2 className='text-slate-300'>{accion}</h2>
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
                  className='mt-2' color='primary' variant='flat' auto>{accion}</Button>
                  {
                    accion === 'Editar Libro' && (
                      <Button
                        className='mt-2' color='danger' variant='flat' auto onPress={eliminarteLibro}>Eliminar</Button>
                    )

                      
                  }
                </div>

            </form>
            </ModalBody>
        </ModalContent>
      </Modal>
    </>
        )
}

export default Libros