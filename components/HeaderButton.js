'use client' 
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function HeaderButton(props) {

    const { children, href, clickHandler, border, white } = props;

    const [selected, setSelected] = useState(false);
    
    return (
        <Link href={href}>
            {
                white ?
                    <button onClick={clickHandler} className={'buttonShadow w-28 text-sm py-4 rounded-sm hover:bg-slate-100 active:scale-90 hover:border-slate-500' + (border && ' border border-white ') + (selected && ' border-b-slate-800')}>
                        <span>{children}</span>
                    </button>
                    :
                    <button onClick={clickHandler} className={'buttonShadow w-28 text-sm py-4 rounded-sm bg-slate-800 hover:bg-slate-700 text-white active:scale-90' + (border && ' border border-slate-300')}>
                        <span>{children}</span>
                    </button>
            }
            
        </Link>
    )
}
