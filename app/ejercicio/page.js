"use client"
import { Button, } from '@nextui-org/react'
import React from 'react'
import NextLink from 'next/link'
import supabase from '@/app/services/supabase'
import { useEffect, useState } from 'react'

const EjercicioPage = () => {
    //la semana empieza en lunes
    const dia_de_la_semana_actual = new Date().getDay() - 1
    const [dias, setDias] = useState(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado','Domingo', ])
    useEffect(() => {
        supabase.from('DiasEjercicios').select('Nombre').order(
            'id', { ascending: true }
        ).then(({data}) => {
            setDias(data.map(dia => dia.Nombre))
            console.log(data)
        })
    }, [])
    


    return (
        <main className="flex min-h-screen flex-col  relative items-center justify-center py-5 px-5 bg-smoke-900 gap-3 dark">
            <h1>el dia de hoy es {dias[dia_de_la_semana_actual]}</h1>
                <Button  variant='shadow' color='success' as={NextLink} href={`ejercicio/${dias[dia_de_la_semana_actual]}`}>
                    Ver Ejercicio
                </Button>
 

        </main>
    )
}

export default EjercicioPage