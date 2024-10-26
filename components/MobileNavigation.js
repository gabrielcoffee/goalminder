'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import Link from 'next/link';

export default function MobileNavigation() {

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="flex flex-col">
            <button onClick={toggleMenu} className="w-10 h-10 border flex items-center justify-center">
                <Menu className="w-6 h-6" />
            </button>
        
            {isOpen && (
                <ul className="mt-4 space-y-2">
                    <li><Link href="/" className="block py-2">Home</Link></li>
                    <li><Link href="/about" className="block py-2">About</Link></li>
                    <li><Link href="/services" className="block py-2">Services</Link></li>
                    <li><Link href="/contact" className="block py-2">Contact</Link></li>
                </ul>
            )}
        </div>
    )
}