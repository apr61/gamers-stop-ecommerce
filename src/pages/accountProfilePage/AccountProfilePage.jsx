import React, { useRef, useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import './style.css'
import Input from '../../components/inputFields/Input'

function AccountProfilePage() {
	const { currentUser } = useAuthContext()
	const [isEditing, setIsEditing] = useState(false)
	const nameRef = useRef()
	const emailRef = useRef()
	const passwordRef = useRef()
	const confirmPasswordRef = useRef()

	return (
		<section className="profile main">
			<h2 className="profile__title">Profile</h2>
			<div className="profile__body">
				<Input labelName={"Name"} ref={nameRef} value={currentUser.displayName} readOnly={!isEditing} />
				<Input labelName={"Email"} ref={emailRef} value={currentUser.email} readOnly={!isEditing} />
				{
					isEditing && (
						<>
							<Input labelName={"Password"} ref={passwordRef} readOnly={!isEditing} />
							<Input labelName={"Confirm password"} ref={confirmPasswordRef} readOnly={!isEditing} />
						</>
					)
				}
				<button className="profile__btn" onClick={() => setIsEditing(!isEditing)}>Edit</button>
			</div>
		</section>
	)
}

export default AccountProfilePage