'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { Fredoka } from 'next/font/google'
import HeaderButton from './HeaderButton';
import MobileNavigation from './MobileNavigation';
import { Menu } from 'lucide-react';

const fredoka = Fredoka({
    subsets: ['latin'],
    weight: ['400','700'],
});

export default function Header() {

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
        <header className="flex justify-between w-full p-1">

            <div className='text-xl md:text-3xl items-center flex p-4
             bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent hover:animate-gradient'>
                <Link href={"/"}>
                    <span className={fredoka.className}>Goalminder</span>
                </Link>
            </div>

            <div className="hidden md:flex gap-8 font-normal items-center ">
                <HeaderButton href="/create">Create Goal</HeaderButton>
                <HeaderButton href="/profile">Profile</HeaderButton>
            </div>

            <div className="sm:hidden flex flex-col my-auto p-4">
                <button onClick={toggleMenu}>
                    <Menu size={40}/>
                </button>
            </div>
        </header>

        <div className="sm:hidden overflow-hidden transition-all duration-300 ease-in-out"
           style={{ maxHeight: isOpen ? '200px' : '0px' }}>

            <ul className="space-y-8 py-4 my-4 flex flex-col items-center text-lg"> 
                <li><Link href={"/create"}>Set Goal</Link></li>
                <li><Link href={"/profile"}>Profile</Link></li>
            </ul>
      </div>
    </>
  )
}
