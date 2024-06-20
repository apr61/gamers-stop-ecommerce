import { useState } from "react";
import "./accountProfile.css";
import Input from "../../../components/ui/input/Input";
import { updateUserProfile } from "../../../services/auth";
import { User } from "../../../utils/types";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectCurrentUser, setUser } from "../authSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../../components/ui/button/Button";

type AccountFormType = {
  name: string;
  email: string;
};

function AccountProfilePage() {
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { isValid, isSubmitting, errors },
  } = useForm<AccountFormType>({
    defaultValues: {
      email: currentUser?.email as string,
      name: currentUser?.displayName as string,
    },
  });

  const handleUpdateUserProfile: SubmitHandler<AccountFormType> = async (
    data
  ) => {
    const updatedUser: Partial<User> = {
      name: data.name,
    };
    try {
      await updateUserProfile(updatedUser);
      dispatch(setUser({ ...currentUser!, ...updatedUser }));
    } catch (err) {
      if (err instanceof Error) {
        setError("root", { message: err.message });
      }
    }
    setIsEditing(false);
  };

  return (
    <section className="profile main">
      <h2 className="profile__title">Profile</h2>
      <form
        className="profile__body"
        onSubmit={handleSubmit(handleUpdateUserProfile)}
      >
        {isEditing ? (
          <Input
            label={"Name"}
            placeholder="Your name"
            {...register("name", { required: "Name is required" })}
          />
        ) : (
          <>
            <Input
              label={"Name"}
              {...register("name")}
              placeholder="Your name"
            />
            <Input
              label={"Email"}
              type={"email"}
              {...register("email")}
              placeholder="you@exmaple.com"
            />
          </>
        )}
        {errors.name && (
          <p role="alert" className="form-errors">
            {errors.name.message}
          </p>
        )}
        {errors.root && (
          <p role="alert" className="form-errors">
            {errors.root.message}
          </p>
        )}
        <div className="profile__btn-container">
          {isEditing ? (
            <>
              <Button
                type="button"
                text="Cancel"
                btnType="danger"
                onClick={() => setIsEditing(!isEditing)}
              />
              <Button
                text={isSubmitting ? "Loading..." : "Save"}
                isDisabled={isSubmitting || !isValid}
              />
            </>
          ) : (
            <Button
              text="Edit"
              type="button"
              onClick={() => setIsEditing(!isEditing)}
            />
          )}
        </div>
      </form>
    </section>
  );
}

export default AccountProfilePage;
