'use client'
import { Fragment, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { HomeIcon, MagnifyingGlassIcon, PencilIcon, PlusCircleIcon, PlusIcon, UserCircleIcon, UserGroupIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import LoginModal from './LoginModal'

export default function Navbar() {
	const [open, setOpen] = useState(false); //Usestate to handle the Model state.
	return (
		<>
			{/* Large screen Top Navbar */}
			<header className="bg-white shadow-md z-50">
				<nav className="mx-auto flex max-w-7xl items-center  py-4 px-4 lg:px-8" aria-label="Global">
					<div className='justify-between flex w-full items-center text-center'>
						{/* Company Logo Image */}
						<div className="flex md:pr-10 pr-6">
							<Link href="/" className="-m-1.5 p-1.5">
								<span className="sr-only">Your Company</span>
								<img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="company_logo" />
							</Link>
						</div>
						{/* Searchbar */}
						<div className='flex mr-6 items-center justify-center border border-gray-300 bg-white p-2 rounded-full sm:w-full'>
							<MagnifyingGlassIcon className='w-6 h-6 text-gray-400' />
							<input className='pl-3 pr-2 w-full outline-none' type="text" placeholder='Search' />
						</div>
						{/* User Account Image in Mobile device */}
						<img onClick={()=>{setOpen(true)}} src='https://chat.openai.com/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FAAcHTtfrP64vPbcohE8hWzmlFoEJrcjfUSUsaFcvvus%3Ds96-c&w=48&q=75' className='sm:hidden rounded-full w-8
                                h-8'/>
					</div>
					{/* Navlinks */}
					<Popover.Group className="hidden sm:flex">
						<div className='flex hover:bg-blue-100 hover:rounded-full px-4 py-1 items-center  cursor-pointer text-md font-semibold leading-6 text-gray-500 hover:text-blue-500'>
							<HomeIcon className='w-6 h-6 text-blue-400 mr-1' />
							Homepage
						</div>
						<Popover className="relative flex px-4 py-1 items-center hover:bg-blue-100 hover:rounded-full hover:text-blue-500  text-md font-semibold leading-6 text-gray-500 cursor-pointer">
							<UserGroupIcon className='w-6 h-6 text-blue-400 mr-1' />
							<Popover.Button className="flex outline-none">
								Communities
								<ChevronDownIcon className="h-4 w-4 flex-none text-gray-400 outline-none mt-1.5" aria-hidden="true" />
							</Popover.Button>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-200"
								enterFrom="opacity-0 translate-y-1"
								enterTo="opacity-100 translate-y-0"
								leave="transition ease-in duration-150"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-1">
								<Popover.Panel className="absolute -left-[86px] top-full z-10 mt-3 w-screen max-w-xs  overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
									<div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">

										<PlusCircleIcon className='w-8
                                h-8 mr-3'/>
										<div className="flex-auto">
											<Link href={""} className="block font-semibold text-gray-900">
												Create Community
												<span className="absolute inset-0" />
											</Link>
										</div>
									</div>
									<hr />
									<div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
										<img src='https://chat.openai.com/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FAAcHTtfrP64vPbcohE8hWzmlFoEJrcjfUSUsaFcvvus%3Ds96-c&w=48&q=75' className='rounded-full w-8
                                h-8 mr-3'/>
										<div className="flex-auto">
											<Link href={""} className="block font-semibold text-gray-900">
												Community Name
												<span className="absolute inset-0" />
											</Link>
											<p className=" text-gray-600">Community Descrpition</p>
										</div>
									</div>
								</Popover.Panel>
							</Transition>
						</Popover>
						<div className='flex py-2 px-4 hover:bg-blue-100 hover:rounded-full hover:text-blue-500 text-md font-semibold leading-6 text-gray-500 cursor-pointer'>
							<PencilIcon className='w-6 h-6 text-blue-400 mr-1' />
							MyPosts
						</div>
					</Popover.Group>
					{/* <Popover className="relative px-4 py-1 items-center  hover:rounded-full  text-md font-semibold leading-6 text-gray-500 cursor-pointer hidden lg:flex lg:flex-1 lg:justify-end">
						<Popover.Button className="flex items-center outline-none">
							<div className='flex items-center'>
								<img src='https://chat.openai.com/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FAAcHTtfrP64vPbcohE8hWzmlFoEJrcjfUSUsaFcvvus%3Ds96-c&w=48&q=75' className='rounded-full w-8
                                h-8 mr-3'/>
								<p className='mr-2'>Abdullah</p>
								<ChevronDownIcon className="h-4 w-4 flex-none text-gray-400 outline-none mt-1.5" aria-hidden="true" />
							</div>
						</Popover.Button>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<Popover.Panel className="absolute left-0 top-full z-10 mt-3 w-full max-w-xs overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-900/5">
								<button className="w-full py-2 px-5 rounded-md hover:bg-gray-50">
									Logout
								</button>
							</Popover.Panel>
						</Transition>
					</Popover>  */}
					<button onClick={() => { setOpen(true) }} className='py-2 px-4 hover:bg-blue-100 hover:rounded-full hover:text-blue-500 text-md font-semibold leading-6 text-gray-500 cursor-pointer hidden sm:flex sm:flex-1 lg:justify-end'>
						<UserCircleIcon className='w-6 h-6 text-blue-400 mr-1' />
						Login
					</button>
				</nav>
			</header>
			{/* Mobile screen Bottom Navbar */}
			<div class="sm:hidden fixed bottom-0 left-1/2 z-50 h-16 w-full  -translate-x-1/2 rounded-t-3xl  bg-white">
				<div class="mx-auto grid h-full max-w-2xl grid-cols-5 border border-gray-200 rounded-t-3xl">
					<button class="items-center justify-center rounded-tl-3xl px-5 hover:bg-gray-100 text-center">
						<HomeIcon class="mb-1 h-6 w-6 text-gray-500 hover:text-blue-500  mx-auto" />
					</button>
					<button class="items-center justify-center px-5 hover:bg-gray-100">
						<UserGroupIcon class="mb-1 h-6 w-6 text-gray-500 hover:text-blue-500  mx-auto" />
					</button>
					<div class="flex items-center justify-center">
						<button class="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300">
							<PlusIcon class="h-6 w-6 text-white  mx-auto" />
						</button>
					</div>
					<button class="items-center justify-center px-5 hover:bg-gray-100">
						<PencilIcon class="mb-1 h-6 w-6 text-gray-500 hover:text-blue-500  mx-auto" />
					</button>
					<button class="items-center justify-center px-5 hover:bg-gray-100 rounded-r-xl">
						<UserCircleIcon class="mb-1 h-7 w-7 text-gray-500 hover:text-blue-500  mx-auto" />
					</button>
				</div>
			</div>
			{/* Login Modal Component */}
			<LoginModal
				open={open}
				setOpen={setOpen}
			/>
		</>
	)
}
