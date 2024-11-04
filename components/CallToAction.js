'use client'
import { useAuth } from '@/context/AuthContext';
import React from 'react'
import HeroButton from './HeroButton';

export default function CallToAction() {

    const { curUser } = useAuth()

    if (curUser) {
        return (
            <div className="flex gap-10">
                <HeroButton href='/set-goal' border white>Set a new Goal</HeroButton>
                <HeroButton href='/goals'>Check my Goals</HeroButton>
            </div>
        )
    }

    return (
        <div className="flex gap-10">
            <HeroButton href='/set-goal' border white>Sign up</HeroButton>
            <HeroButton href='/goals'>Log in</HeroButton>
        </div>
    )
}