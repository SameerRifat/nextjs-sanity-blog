import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './ModeToggle'

const Navbar = () => {
  return (
    <nav className='my_container border-b py-4 flex justify-between items-center'>
      <Link href='/' className='font-bold text-3xl'>
        Sameer<span className='text-primary'>Blog</span>
      </Link>
      <ModeToggle />
    </nav>
  )
}

export default Navbar