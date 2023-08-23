"use client"

import { Button } from '@nextui-org/react'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-smoke-900">

      <h1>
        Hola
      </h1>
      <Button variant='shadow' color='success'>Click me</Button>
     
    </main>
  )
}
