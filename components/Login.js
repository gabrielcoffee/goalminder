'use client'

import { useState, useEffect } from 'react'
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';

export default function Login({isSignUp}) {
	const [isLogin, setIsLogin] = useState(isSignUp ? false : true);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [username, setUsername] = useState('');
	const [passwordsMatch, setPasswordsMatch] = useState(true);
	const [showPassword, setShowPassword] = useState(false);

	const [authenticating, setAuthenticating] = useState(false);
	const { signup, login } = useAuth();

	useEffect(() => {
		if (!isLogin) {
		    setPasswordsMatch(password === confirmPassword)
		}
	}, [password, confirmPassword, isLogin])

	async function handleSubmit() {
        if (isLogin) {
            if (!email || !password) {
                return
            }
        }
        else {
            if (!username || !email || password < 6 || !passwordsMatch) {
                return
            }
        }

		setAuthenticating(true);
		try {
			if (isLogin) {
                console.log("Loggin in existing user");
                await login(email, password);
            }
			else {
                console.log("Signing up new user");
                const userCredential = await signup(email, password);
				const user = userCredential.user;

				await updateProfile(user, {
					displayName: username
				})

				// Save additional user info to Firestore
				const userDocRef = doc(db, 'users', user.uid);
				await setDoc(userDocRef, {
					email: user.email,
					username: username,
				});
            }

		} catch (e) {
			console.log(e.message);

		} finally {
			setAuthenticating(false);
		}
	}

	// Toggle between login and signup
	const toggleAuthMode = () => {
		setIsLogin(!isLogin)
		setPassword('')
		setConfirmPassword('')
		setPasswordsMatch(true)
	}

	return (
		<div className={"flex items-center justify-center fixed inset-0"}>

		<div className="w-[350px] overflow-hidden">

			<div className="p-6">

			<div className='text-center'>
				<h2 className={"text-4xl font-semibold text-gray-900 mb-2"}>
				{isLogin ? 'Log in' : 'Sign Up'}
				</h2>
				<p className="text-sm text-gray-500 mb-6">
				{isLogin ? "Only a few steps and you're in" : 'Create a new account to set incredible goals'}
				</p>
			</div>
			
			<div className="flex flex-col gap-2">

				{!isLogin && (
				<div className="space-y-1">
					<label htmlFor="username" className="block text-sm font-medium text-gray-700">
					Username
					</label>
					<input
					id="username"
                    autoComplete='username'
					type="text"
					placeholder="Enter your username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
					className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
				</div>
				)}

				<div className="space-y-1">
				<label htmlFor="email" className="block text-sm font-medium text-gray-700">
					Email
				</label>
				<input
					id="email"
					type="email"
                    autoComplete='email'
					placeholder="Enter your email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					className="text-base w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				/>
				</div>
				
				<div className="space-y-1 relative">
				<label htmlFor="password" className="block text-sm font-medium text-gray-700">
					Password
				</label>
				<input
					id="password"
					type={showPassword ? 'text' : 'password'}
					placeholder="Enter your password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
                    autoComplete='current-password'
					className="text-base w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				/>
				<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="absolute top-8 right-2"
					>
						{!showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
					</button>
				</div>

				{!isLogin && (
				<div className="space-y-1 relative">
					<label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
					Confirm Password
					</label>
					<input
					id="confirmPassword"
					type={showPassword ? 'text' : 'password'}
					placeholder="Confirm your password"
					value={confirmPassword}
                    autoComplete='new-password'
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
					className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="absolute top-8 right-2"
					>
						{!showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
					</button>
				</div>
				)}

				{!isLogin && !passwordsMatch && (
				<p className="text-sm text-red-600">Passwords do not match</p>
				)}
				
				<button
				className={"w-full flex justify-center items-center p-4 mt-4 rounded-sm shadow-sm text-md font-medium" 
					+ "  text-white bg-slate-800 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600 "}
				disabled={!passwordsMatch}
                onClick={handleSubmit}
				>
				{
				authenticating ? (
					<span>Authenticating...</span>
				) :
					isLogin ? (
						<>
						<LogIn className="mr-2 h-4 w-4" /> Log in
						</>
					) : (
						<>
						<UserPlus className="mr-2 h-4 w-4" /> Sign up
						</>
					)
				}
				</button>
			</div>

			</div>

			<div className="py-2 border-gray-100 text-center">
			<button
				onClick={toggleAuthMode}
				className="text-sm text-slate-800 hover:text-slate-600 font-medium sm:hover:underline"
			>
				<span>{isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}</span>
			</button>
			</div>

		</div>
		</div>
	)
}