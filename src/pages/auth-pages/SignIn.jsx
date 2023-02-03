import React from 'react'
import { Link } from 'react-router-dom'
import Input from '../../components/inputFields/Input'
import Navbar from '../../components/navbar/Navbar'
import './commonStyle.css'

function SignIn() {
	return (
		<>
			<Navbar />
			<section className="auth-page">
				<h2 className="auth-page__title">Sign In</h2>
				<form className='auth-page__form'>
					<Input labelName={'Email'} placeholder={'Enter your email'} inputType={'email'} />
					<Input labelName={'Password'} placeholder={'Enter your password'} inputType={'password'} />
					<button className="auth-page__btn">Sign In</button>
				</form>
				<p className="auth-page__info">Don't have a account? Create <Link to='/signup'>here</Link></p>
			</section>
		</>
	)
}

export default SignIn