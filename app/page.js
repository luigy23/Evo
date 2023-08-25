"use client"

import { Button, Card, CardBody, CardFooter, Input, Textarea } from '@nextui-org/react'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [value, setValue] = useState('')


  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-smoke-900 gap-3 dark">

    <Card shadow='md' width='300px' height='300px' className='flex flex-col items-center justify-center gap-3'
    isBlurred={true} 
    >
      <CardBody>
      <h1>¿Qué quieres hacer?</h1>
      </CardBody>
      <CardFooter className='gap-2 justify-center' >
      <Button variant='shadow' color='success'>📅 Rutina</Button>
      <Button variant='shadow' color='primary'>📝 Nota</Button>
      <Button variant='shadow' color='default'>🎯 Objetivo</Button>
      <Button variant='shadow' color='warning'>📈 Ventas</Button>
      </CardFooter>
    
    </Card>

      <Textarea placeholder='Type something' label='Hola'  color='primary' minRows={2}
      value={value} onChange={(e) => setValue(e.target.value)}
      />

      <Button variant='shadow' color='success'>Click me</Button>
     
    </main>
  )
}
