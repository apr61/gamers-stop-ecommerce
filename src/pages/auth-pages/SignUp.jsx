import { updateProfile } from 'firebase/auth'
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/inputFields/Input'
import Navbar from '../../components/navbar/Navbar'
import { signUp } from '../../services/auth'
import './commonStyle.css'

function SignUp() {

	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const nameRef = useRef()
	const emailRef = useRef()
	const passwordRef = useRef()
	const confirmPasswordRef = useRef()
	const navigate = useNavigate()

	function handleSubmit(e) {
		e.preventDefault()
		if (passwordRef.current.value !== confirmPasswordRef.current.value) {
			return setError('Passwords don\'t match')
		}
		try {
			setError('')
			setLoading(true)
			const name = nameRef.current.value
			signUp(emailRef.current.value, passwordRef.current.value)
			.then((userCredential) => updateProfile(userCredential.user, {displayName: name}))
			.then(() => {
				navigate('/')
			})
		} catch {
			setError('Unable to Create account')
		} finally {
			setLoading(false)
		}
	}
	return (
		<>
			<Navbar />
			<section className="auth-page">
				<h2 className="auth-page__title">Sign up</h2>
				{
					error && (
						<p className="auth-page__error-msg">{error}</p>
					)
				}
				<form className='auth-page__form' onSubmit={handleSubmit}>
					<Input labelName={'Name'} placeholder={'Enter your name'} ref={nameRef} />
					<Input labelName={'Email'} placeholder={'Enter your email'} inputType={'email'} ref={emailRef} />
					<Input labelName={'Password'} placeholder={'Enter your password'} inputType={'password'} ref={passwordRef} />
					<Input labelName={'Confirm Password'} placeholder={'Enter your password again'} inputType={'password'} ref={confirmPasswordRef} />
					<button className="auth-page__btn" disabled={loading}>Sign Up</button>
				</form>
				<p className="auth-page__info">Already have an account? Go <Link to='/signin'>here</Link></p>
			</section>
		</>
	)
}

export default SignUp