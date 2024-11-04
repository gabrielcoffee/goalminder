'use client'
import Loading from '@/components/Loading';
import Login from '@/components/Login';
import { useAuth } from '@/context/AuthContext';
import React, { useEffect, useState } from 'react'

const metadata = {
    title: "Goalminder - Profile"
}

export default function ProfilePage() {

	const { curUser, userData, loading } = useAuth();
	const { data, setData } = useState(null);

	useEffect(() => {
		if (!curUser || !userData) {
			return 
		}
		setData(userData);
	}, [curUser, userData])

	if (loading) {
		return <Loading/>
	}
  
	if (!curUser) {
		return <Login/>
	}

	return (
		<div>
		<span>Profile</span>

		</div>
	)
}
