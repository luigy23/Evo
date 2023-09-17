import React from 'react'
import NextLink from 'next/link'

import { Card, CardHeader, Skeleton } from '@nextui-org/react'

const Libro = ({ libro, color, handleEditar }) => {
    return (
        <Card

            onContextMenu={(e) => {
                e.preventDefault()
                handleEditar(libro)
            }
            }
            href={`/libros/${libro["Nombre del Libro"]}`}
            className={`shadow-md ${color}`} fullWidth={true} key={libro.id} as={NextLink}>
            <CardHeader className='py-2 '>
                <h3 className='font-semibold'>{libro["Nombre del Libro"]}</h3>
            </CardHeader>
        </Card>
    )
}

export default Libro

export const LibroSkeleton = () => {
    return (
        <>
            <Skeleton className='rounded-md w-40 h-10 ' />
            <Skeleton className='rounded-md w-40 h-10 ' />
            <Skeleton className='rounded-md w-40 h-10 ' />
        </>
    )
}

