'use client' 
import Link from 'next/link';
import React from 'react'

export default function HeaderButton(props) {

    const { children, href } = props;

    return (
        <Link href={href}>
            <button className={'buttonShadow w-32 p-4 rounded-sm hover:bg-slate-800 hover:text-white active:scale-90 '}>
                <span>{children}</span>
            </button>
        </Link>
    )
}
