'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import HeaderButton from './HeaderButton';
import { Menu } from 'lucide-react';
import { IoMenuSharp } from "react-icons/io5";
import { useAuth } from '@/context/AuthContext';

export default function Header() {

    const { logout, curUser } = useAuth();

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
        <header className="flex justify-between w-full p-1 sm:border-b-[1px] border-slate-800">

            <div className='text-2xl md:text-xl pl-4 items-center flex text-slate-800'>
                <Link href={"/"}>
                    <span>Goalminder</span>
                </Link>
            </div>

            {
                curUser ?
                <div className="hidden md:flex gap-2 font-normal text-sm items-center ">
                    <HeaderButton border white href="/set-goal">Set New Goal</HeaderButton>
                    <HeaderButton border white href="/goals">My Goals</HeaderButton>
                    <HeaderButton border white href="/profile">Profile</HeaderButton>
                    <HeaderButton clickHandler={logout} href="/">Log out</HeaderButton>
                </div>
                :
                <div className="hidden md:flex gap-2 font-normal text-sm items-center ">
                    <HeaderButton white border href="/set-goal">Sign up</HeaderButton>
                    <HeaderButton href="/goals">Log in</HeaderButton>
                </div>
            }
            

            <div className="sm:hidden flex flex-col my-auto p-4">
                <button onClick={toggleMenu}>
                    <Menu size={30}/>
                </button>
            </div>
        </header>

        <div className="sm:hidden overflow-hidden transition-all duration-500 ease-in-out border-b-[1px] border-b-slate-800"
           style={{ maxHeight: isOpen ? '300px' : '0px' }}>

            <ul className={"flex flex-col items-center text-lg text-center"}> 
                <li className='active:bg-slate-800 active:text-white w-full p-4'><Link href={"/set-goal"} onClick={toggleMenu}>Set New Goal</Link></li>
                <li className='active:bg-slate-800 active:text-white w-full p-4'><Link href={"/goals"} onClick={toggleMenu}>My Goals</Link></li>
                <li className='active:bg-slate-800 active:text-white w-full p-4'><Link href={"/profile"} onClick={toggleMenu}>Profile</Link></li>
                <li className='active:bg-slate-800 active:text-white w-full p-4'><Link href={"/"} onClick={logout && toggleMenu}>Log out</Link></li>
            </ul>
        </div>
    </>
  )
}
