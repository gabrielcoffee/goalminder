'use client' 
import Link from 'next/link';
import React from 'react'

export default function HeroButton(props) {

    const { children, href, white, border } = props;

    return (
        <Link href={href}>
            {
                white ?
                <button className={'buttonShadow p-4 w-48 rounded-sm hover:bg-slate-100 active:scale-90 hover:border-slate-500' + (border && ' border border-slate-300')}>
                    <span>{children}</span>
                </button>
                :
                <button className={'buttonShadow p-4 w-48  rounded-sm bg-slate-800 hover:bg-slate-700 text-white active:scale-90' + (border && ' border border-slate-400')}>
                    <span>{children}</span>
                </button>
            }
            
        </Link>
    )
}