"use client"

import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider, } from '@nextui-org/react'
import Image from 'next/image'
import NextLink from 'next/link'

import Chat from './Componentes/Chat/Chat'
import { ObtenerEnseñanzasAlAzar } from './services/Funciones/Varias'
import { useEffect, useState } from 'react'
import IconNextArrow from './Icons/IconNextArrow'

export default function Home() {

  const [consejo, setConsejo] = useState({})



  const ObtenerConsejo = async () => {
    const consejo = await ObtenerEnseñanzasAlAzar()
    setConsejo(consejo)
  }
  useEffect(() => {
    ObtenerConsejo()
  }, [])

  


  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-smoke-900 gap-3 dark">

      <Card shadow='md' width='300px' height='300px' className='flex flex-col items-center  justify-center gap-3'

      >
        <CardBody className='bg-smoke-700' >
          <h1>¿Qué quieres hacer?</h1>
        </CardBody>
        <CardFooter className='gap-2 justify-center flex flex-wrap' >
          <Button href='/ejercicio' as={NextLink} variant='shadow' color='success'>🏋️‍♂️ Ejercicio</Button>
          <Button href='/dinero' as={NextLink} variant='shadow' color='primary'>💰 Dinero</Button>
          <Button variant='shadow' color='default'>🎯 Objetivo</Button>
          <Button variant='shadow' color='warning'>📈 Ventas</Button>
         

          <Button href='/libros' as={NextLink} variant='shadow' color='danger'>🧠 Sabiduría</Button>
        </CardFooter>

      </Card>


      <Chat />



      <Card shadow='md' 
        isBlurred={true}
        fullWidth={true}
      >
        <CardHeader>
         <h2>Consejo para hoy</h2>
        </CardHeader>
        <Divider />
        <CardBody >
          <p className='text-slate-100 whitespace-pre-wrap'>{consejo.enseñanza}</p>
        </CardBody>
        <CardFooter  >
          <div className='flex w-full  gap-2 justify-between'>
          <Chip color='success' className=' h-auto py-0' variant='flat' href={`/libros/${consejo.libro}`} as={NextLink}>
            <h3>{consejo.libro}</h3>
          </Chip>
          <Button
            onClick={ObtenerConsejo}
            isIconOnly
            variant='shadow' color='success'>
              <IconNextArrow/>
          </Button>
          </div>
        </CardFooter>

      </Card>


     

    </main>
  )
}
