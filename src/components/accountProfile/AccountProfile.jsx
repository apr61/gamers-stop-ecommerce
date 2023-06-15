import React, { useRef, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import "./accountProfile.css";
import Input from "../../components/inputFields/Input";
import { updateUserProfile } from "../../services/auth";

function AccountProfilePage() {
  const { currentUser, setCurrentUser } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const nameRef = useRef();

  function handleUpdateUserProfile(e) {
    e.preventDefault();
    const newUser = {
      displayName: nameRef.current.value,
    };

    updateUserProfile(newUser, currentUser);
    setCurrentUser({ ...currentUser, displayName: nameRef.current.value });
    setIsEditing(false);
  }

  return (
    <section className="profile main">
      <h2 className="profile__title">Profile</h2>
      <form className="profile__body" onSubmit={handleUpdateUserProfile}>
        {isEditing ? (
          <Input
            labelName={"Name"}
            ref={nameRef}
            value={currentUser.displayName}
            readOnly={!isEditing}
          />
        ) : (
          <>
            <Input
              labelName={"Name"}
              ref={nameRef}
              value={currentUser.displayName}
              readOnly={!isEditing}
            />
            <Input
              labelName={"Email"}
              inputType={"email"}
              value={currentUser.email}
              readOnly={!isEditing}
            />
          </>
        )}

        <div className="profile__btn-container">
          {isEditing ? (
            <>
              <button
                className="profile__btn profile__btn--cancel"
                onClick={() => setIsEditing(!isEditing)}
                type="button"
              >
                Cancel
              </button>
              <button className="profile__btn" type="submit">
                Update
              </button>
            </>
          ) : (
            <button
              className="profile__btn"
              onClick={() => setIsEditing(!isEditing)}
              type="button"
            >
              Edit
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default AccountProfilePage;
