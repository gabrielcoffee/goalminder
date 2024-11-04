'use client'

import { useState, useEffect } from 'react'
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function Login() {
	const [isLogin, setIsLogin] = useState(true);
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
		if (!username || !email || password < 6 || !passwordsMatch) {
			return
		}

		console.log('Trying to login or signup user');
		setAuthenticating(true);
		try {
			if (isLogin) {
                console.log("Loggin in existing user");
                await login(email, password);
            }
			else {
                console.log("Signing new user");
                await signup(email, password);
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
		<div className={"flex items-center justify-center mt-20"}>

		<div className="w-[350px] overflow-hidden mb-20">

			<div className="p-6">

			<div className='text-center'>
				<h2 className={"text-4xl font-semibold text-gray-900 mb-2"}>
				{isLogin ? 'Log in' : 'Sign Up'}
				</h2>
				<p className="text-sm text-gray-500 mb-6">
				{isLogin ? "Only a few steps and you're in" : 'Create a new account to set incredible goals'}
				</p>
			</div>
			
			<form onSubmit={handleSubmit} className="flex flex-col gap-2">

				{!isLogin && (
				<div className="space-y-1">
					<label htmlFor="username" className="block text-sm font-medium text-gray-700">
					Username
					</label>
					<input
					id="username"
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
				type="submit"
				className={"w-full flex justify-center items-center p-4 mt-4 border border-transparent rounded-sm shadow-sm text-md font-medium" 
					+ "  text-white bg-slate-800 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600 "}
				disabled={!passwordsMatch}
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
			</form>

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