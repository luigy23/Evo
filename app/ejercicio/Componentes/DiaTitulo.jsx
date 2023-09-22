"use client";
import React from 'react'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import NextLink from 'next/link'

const DiaTitulo = ({dia, dias}) => {
  return (
    <Dropdown >
      <DropdownTrigger>
        <Button 
          variant="light" 
          className='py-2'
        >
         <h1> {dia}</h1>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        {
            dias.map((dia, index) => (
                <DropdownItem as={NextLink} href={`./${dia}`}   key={index}>{dia}</DropdownItem>
            ))

        }
      </DropdownMenu>
    </Dropdown>
  )
}

export default DiaTitulo