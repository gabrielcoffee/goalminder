'use client'
import Loading from '@/components/Loading';
import Login from '@/components/Login';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

const metadata = {
    title: "Goalminder - Profile"
}

export default function ProfilePage() {

	const { curUser, loading, userGoals, logout} = useAuth();

    const [showModalDelete, setShowModalDelete] = useState(false);
	const [username, setUsername] = useState("...");
	const [email, setEmail] = useState("...");

	useEffect(() => {
		if (!curUser) {
			return 
		}
		setUsername(curUser.displayName);
		setEmail(curUser.email);
	}, [curUser])

	async function handleDeleteAccount() {
		const goalRef = doc(db, 'users', curUser.uid);
        try {
            await deleteDoc(goalRef);
            console.log('Account deleted');
        }
        catch (e) {
            console.log(e.message);
        }
		logout();
        window.location.href = '/';
	}

	if (loading) {
		return <Loading/>
	}
  
	if (!curUser) {
		return <Login/>
	}

	return (
		// SHOWS ONLY WHEN DELETING A GOAL
		showModalDelete ?
		<div className='flex flex-col justify-center items-center fixed inset-0'>

			<div className='border border-slate-400 rounded-lg p-4 m-4 space-y-8'>
				<span>Are you sure you want to the delete your account? </span>

				<div className='flex items-center flex-col'>
					<span className='w-full font-bold'>{username}</span>
					<span className='w-full'>{email}</span>
					<span className='w-full'>Currently with {userGoals.length || 'no'} goals</span>
				</div>

				<div className='flex justify-around'>
					<button onClick={() => setShowModalDelete(false)} >Cancel</button>
					<button className='text-red-600' onClick={handleDeleteAccount}>Delete Account</button>
				</div>
			</div>
			
		</div>
		:
		<div className='flex flex-col justify-center inset-0 fixed items-center p-4'>
			<div className='flex flex-col gap-2 border border-slate-400 p-4 rounded-lg'>
				<h1 className='text-center text-xl'><strong>Profile Information</strong></h1>

				<div className='mx-2 flex flex-col gap-4 my-4'>
					<span className='text-lg justify-between flex gap-20'><strong>Name:</strong> {username}</span>
					<span className='text-lg justify-between flex gap-20'><strong>Email:</strong> {email}</span>
					<span className='text-lg justify-between flex gap-20'><strong>Password:</strong> <button>********</button></span>
				</div>

				<div className='flex flex-col justify-center'>
					<button onClick={() => setShowModalDelete(true)} className='text-center items-center p-4 text-red-600 bg-red-50'>Delete Account</button>
				</div>
			</div>
		</div>
	)
}
