import { FormEvent, useRef, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import "./accountProfile.css";
import Input from "../inputFields/Input";
import { updateUserProfile } from "../../services/auth";
import { User } from "../../utils/types";

function AccountProfilePage() {
  const { currentUser, setCurrentUser } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const nameRef = useRef(null);

  const handleUpdateUserProfile = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userFullname = nameRef.current?.['value']
    const updatedUser : Partial<User> = {
      name: userFullname
    };
    await updateUserProfile(updatedUser);
    setCurrentUser({...currentUser!, ...updatedUser})
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
            value={currentUser!.displayName as string}
            readOnly={!isEditing}
            placeholder="Your name"
          />
        ) : (
          <>
            <Input
              labelName={"Name"}
              ref={nameRef}
              value={currentUser!.displayName as string}
              readOnly={!isEditing}
              placeholder="Your name"
            />
            <Input
              labelName={"Email"}
              inputType={"email"}
              value={currentUser?.email!}
              readOnly={!isEditing}
              placeholder="you@exmaple.com"
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
