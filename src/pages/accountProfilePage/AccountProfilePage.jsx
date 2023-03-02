import React, { useRef, useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import './accountProfilePage.css'
import Input from '../../components/inputFields/Input'
import { updateUserProfile } from '../../services/auth'

function AccountProfilePage() {
  const { currentUser } = useAuthContext()
  const [isEditing, setIsEditing] = useState(false)
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

  function handleUpdateUserProfile() {
    const newUser = {
      displayName: nameRef.current.value
    }
    updateUserProfile(newUser, currentUser)
    setIsEditing(false)
  }

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
        <div className="profile__btn-container">
          {
            isEditing ? (
              <>
                <button className="profile__btn profile__btn--cancel" onClick={() => setIsEditing(!isEditing)}>Cancel</button>
                <button className="profile__btn" onClick={handleUpdateUserProfile}>Update</button>
              </>
            ) : (
              <button className="profile__btn" onClick={() => setIsEditing(!isEditing)}>Edit</button>
            )
          }
        </div>
      </div>
    </section>
  )
}

export default AccountProfilePage