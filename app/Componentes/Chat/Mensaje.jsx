import { Chip } from '@nextui-org/react'
import React from 'react'

const Mensaje = ({children, user}) => {

    const color = user ? 'bg-success-100  text-slate-100 rounded-br-none ' : ' bg-default-100  text-slate-100 rounded-bl-none'
    const direction = user ? 'flex-row-reverse' : 'flex-row'

  return (
    <div className={`flex ${direction} gap-2`}>
    <span className={` ${color} px-2 py-1 rounded-md  inline-flex max-w-fit relative
    whitespace-pre-wrap
    
    `}>
        {children}
    </span>
    </div>

    
  )
}

export default Mensaje