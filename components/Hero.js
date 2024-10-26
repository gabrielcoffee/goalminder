import { Fredoka } from 'next/font/google';
import React from 'react'

const fredoka = Fredoka({
    subsets: ['latin'],
    weight: ['400','700'],
});

export default function Hero() {
    return (
      <div className="flex flex-col items-center gap-8">
        <h1 className={'text-4xl font-bold text-center ' + fredoka.className}>Goalminder</h1>
        <p className='font-thin'>We send <strong>reminders</strong> of your goals. You check the progress and <strong>keep on track</strong>!</p>
      </div>
    )
}
