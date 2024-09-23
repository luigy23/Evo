"use client"
import { Button, Chip, Input, Modal, ModalBody, ModalContent, Skeleton, useDisclosure } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import IconSearch from '../Icons/SearchIcon'
import IconNerd from '../Icons/NerdIcon'
import { cargarSaldos, crearteSaldo } from '@/app/services/Apis/Saldos'
import { formatearDinero } from '../services/Funciones/Formateadores'
import { IconDollar } from '../Icons/IconDollar'
import SaldoItem from './Componentes/SaldoItem'
import BackButton from '../Componentes/Chat/BotonBack'
const DineroPage = () => {

	const [saldos, setSaldos] = useState([{
		id: 1,
		Descripcion: 'Saldo de la semana'
	}])

	const [buscador, setBuscador] = useState('')

	const [nuevoSaldo, setNuevoSaldo] = useState({
		Descripcion: '',
		Dinero: 0
	})

	useEffect(() => {


		cargarSaldos().then(data => {
			setSaldos(data)
			console.log(data)
		})
			.catch(error => { console.log(error) })

	}, [])

	//metodos del modal
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	//metodos del formulario
	const handleSumbit = (e) => {
		e.preventDefault()
		crearteSaldo(nuevoSaldo).then(data => {
			if (data) {
				setSaldos([...saldos, nuevoSaldo])
				setNuevoSaldo({
					Descripcion: '',
					Dinero: 0
				})
				onOpenChange()
			}
		})

		
	}

	const handleNuevoSaldo = (e) => {
		setNuevoSaldo({
			...nuevoSaldo,
			[e.target.name]: e.target.value
		})
	}




	return (
		<>
			<main className="flex min-h-screen flex-col items-center justify-start p-4 md:p-24 bg-smoke-900 gap-3 dark">

				<form className="flex flex-col gap-3 items-center justify-center w-full">

					<div className="w-full flex items-center justify-between gap-3 pt-2 ">
					<BackButton	/>
					<h1>Saldos</h1>
					</div>
					<div className="mt-8 flex-wrap md:flex gap-1 w-full  items-center justify-center">
						<Input



							className='md:w-80'
							value={buscador}
							onChange={(e) => setBuscador(e.target.value)}

							placeholder="Busca o preguntame" color='secondary' startContent={<IconNerd className="w-5" />} />
						<div className="flex gap-1 items-center justify-center mt-1 md:mt-0">
							<Button isIconOnly color='secondary' auto><IconSearch /> </Button>
							<Button color='primary' auto onPress={onOpen}

							>Crear</Button>
						</div>
					</div>

				</form>

				{/* Saldos */}

				<section className="flex flex-col gap-3 mt-5 w-full  md:w-[80%]">
					{
						saldos.length > 0
							? (
								saldos
									.filter((saldo) =>
										buscador === '' ||
										saldo.Descripcion.toLowerCase().includes(buscador.toLowerCase())
									)
									.map((saldo) => {
										return (
											<SaldoItem key={saldo.id} saldo={saldo} />
										)
									})
							)
							: (
								<>
									<Skeleton height='50px' />
									<Skeleton height='50px' />
									<Skeleton height='50px' />
									<Skeleton height='50px' />
								</>
							)

					}

				</section>



			</main>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent className='dark'>
					<ModalBody>
						<form className="flex flex-col gap-2 items-center justify-center" onSubmit={handleSumbit} >
							<h2 className='text-slate-300'>Crear Saldo</h2>
							<div className="flex  gap-1 justify-center items-center   flex-wrap ">
								<Input

									value={nuevoSaldo.Descripcion}
									onChange={handleNuevoSaldo}
									name='Descripcion'
									placeholder="Nombre del Saldo" color='primary' startContent={<IconNerd className="w-5" />} />

								<Input
									value={nuevoSaldo.Dinero}
									onChange={handleNuevoSaldo}
									name='Dinero'

									placeholder="Precio" color='secondary' startContent={<IconDollar className="w-5" />} />

								<Chip color='success' variant='flat' >{formatearDinero(nuevoSaldo.Dinero)}</Chip>

								<Button
									type='submit'
									className='mt-2' color='primary' variant='flat' auto>Crear Saldo</Button>


							</div>

						</form>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

export default DineroPage