import React from 'react'
import { Link } from 'react-router-dom'
import Input from '../../components/inputFields/Input'
import Navbar from '../../components/navbar/Navbar'
import './commonStyle.css'

function SignUp() {
	return (
		<>
			<Navbar />
			<section className="auth-page">
				<h2 className="auth-page__title">Sign up</h2>
				<form className='auth-page__form'>
					<Input labelName={'Name'} placeholder={'Enter your name'} inputType={'text'} />
					<Input labelName={'Email'} placeholder={'Enter your email'} inputType={'email'} />
					<Input labelName={'Password'} placeholder={'Enter your password'} inputType={'password'} />
					<Input labelName={'Confirm Password'} placeholder={'Enter your password again'} inputType={'password'} />
					<button className="auth-page__btn">Sign Up</button>
				</form>
				<p className="auth-page__info">Already have an account? Go <Link to='/signin'>here</Link></p>
			</section>
		</>
	)
}

export default SignUp