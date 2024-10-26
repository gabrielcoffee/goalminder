import { Fredoka } from 'next/font/google';
import Link from 'next/link';
import React from 'react'

const fredoka = Fredoka({
    subsets: ['latin'],
    weight: ['400','700'],
});


export default function HeaderButton(props) {

    const { children, href } = props;

    return (
        <Link href={href}>
            <button className={fredoka.className + ' p-4 buttonShadow w-32 rounded-sm duration-200 hover:shadow-lg hover:bg-slate-800 hover:text-white'}>
                <span>{children}</span>
            </button>
        </Link>
    )
}
