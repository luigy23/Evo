"use client"


import React, { useState } from 'react'
import { Textarea, Button, Card, CardFooter, CardBody, Input } from '@nextui-org/react'
import Mensaje from './Mensaje'
import openFun from '@/app/services/openia'







const Chat = () => {



    const [value, setValue] = useState('')
    const [mensajes, setMensajes] = useState([{"role": "system", "content": `
    Eres un asistente de desarrollo personal.
      
    
    `}])


    // a la funcion openia (OpenFun) se le pasa un array con los mensajes [{"role": "user", "content": prompt,}]

    const handleSumit = async(e) => {
        e.preventDefault()
        if (!value) return
        setMensajes((mensajes) => [...mensajes, { "role": "user", "content": value }])
        console.log(mensajes)
        //para asegurarnos de que el mensaje se envia despues de que se actualiza el estado
        const newMensajes = [...mensajes, { "role": "user", "content": value }]
        setValue('')
        const res = await openFun( newMensajes)
        setMensajes((mensajes) => [...mensajes, { "role": "assistant", "content": res }])
        
        

    }
    return (

        <Card className='pb-0 w-[80%]' isBlurred={true}>
            <CardBody className='gap-2'>
            
            {mensajes.map((mensaje, index) => {
                
                if (mensaje.role === 'system') {
                    return 
                }
                return(
                <Mensaje key={index} user={mensaje.role === 'user'}>
                    {mensaje.content}
                </Mensaje>)
})}


            </CardBody>
            <form onSubmit={handleSumit} className='inline'>
            <CardFooter className='gap-2 '>
                
                <Input placeholder='Escribe algo' className='text-slate-100' color='default' minRows={1}
                    value={value} onChange={(e) => setValue(e.target.value)}
                />
                <Button
                    type='submit'
                    variant='shadow' isIconOnly color='success' icon='check'>
                    📩
                </Button>
                

            </CardFooter>
            </form>
        </Card>
    )
}

export default Chat