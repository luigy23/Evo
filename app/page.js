"use client"

import { Button, Card, CardBody, CardFooter, Divider, } from '@nextui-org/react'
import Image from 'next/image'

import Chat from './Componentes/Chat/Chat'

export default function Home() {



  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-smoke-900 gap-3 dark">

      <Card shadow='md' width='300px' height='300px' className='flex flex-col items-center  justify-center gap-3'

      >
        <CardBody className='bg-smoke-700' >
          <h1>¿Qué quieres hacer?</h1>
        </CardBody>
        <CardFooter className='gap-2 justify-center' >
          <Button variant='shadow' color='success'>📅 Rutina</Button>
          <Button variant='shadow' color='primary'>📝 Nota</Button>
          <Button variant='shadow' color='default'>🎯 Objetivo</Button>
          <Button variant='shadow' color='warning'>📈 Ventas</Button>
          <Button variant='shadow' color='danger'>🧠 Sabiduría</Button>
        </CardFooter>

      </Card>


      <Chat />



      <Card shadow='md' width='300px' height='300px' className='flex flex-col items-center justify-center gap-3'
        isBlurred={true}
      >
        <CardBody >
          <h1>un consejo para hoy?</h1>
          <Divider />
          
        </CardBody>
      </Card>


      <Button variant='shadow' color='success'>Click me</Button>

    </main>
  )
}
