import React, { useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Input from '../../components/inputFields/Input'
import Navbar from '../../components/navbar/Navbar'
import { useAuthContext } from '../../context/AuthContext'
import './commonStyle.css'

function SignIn() {
	const { signIn } = useAuthContext()
	const navigate = useNavigate()
	const location = useLocation()
	const from = location.state?.from?.pathname || '/'
	
	const emailRef = useRef()
	const passwordRef = useRef()

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')


	async function handleSubmit(e) {
		e.preventDefault()
		try {
			setLoading(true)
			await signIn(emailRef.current.value, passwordRef.current.value)
			navigate(from, { replace: true })
		} catch {
			setError('Username or password not found')
		} finally {
			setLoading(false)
		}
	}
	return (
		<>
			<Navbar />
			<section className="auth-page">
				<h2 className="auth-page__title">Sign In</h2>
				{error && (
					<p className="auth-page__error-msg">{error}</p>
				)}
				<form className='auth-page__form' onSubmit={handleSubmit}>
					<Input labelName={'Email'} placeholder={'Enter your email'} inputType={'email'} ref={emailRef} />
					<Input labelName={'Password'} placeholder={'Enter your password'} inputType={'password'} ref={passwordRef} />
					<button className={!loading ? 'auth-page__btn' : 'auth-page__btn auth-page__btn--loading'} disabled={loading}>Sign In</button>
				</form>
				<p className="auth-page__info">Don't have a account? Create <Link to='/signup'>here</Link></p>
			</section>
		</>
	)
}

export default SignIn