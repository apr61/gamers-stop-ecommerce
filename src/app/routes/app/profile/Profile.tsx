import { useState } from "react";
import Input from "@/components/ui/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

type AccountFormType = {
  name: string;
  email: string;
};

function AccountProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm<AccountFormType>({
    defaultValues: {
      email: user?.email,
      name: user?.user_metadata.full_name,
    },
  });

  const handleUpdateUserProfile: SubmitHandler<AccountFormType> = async (
    data
  ) => {
    console.log(data);
  };

  return (
    <section className="max-w-[20rem] mx-auto">
      <h2 className="text-2xl text-center">Profile</h2>
      <form
        className="flex flex-col gap-2"
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
        <div className="flex gap-4 items-center justify-center">
          {isEditing ? (
            <>
              <Button
                type="button"
                btnType="outline"
                onClick={() => setIsEditing(!isEditing)}
              >
                Cancel
              </Button>
              <Button disabled={isSubmitting || !isValid}>
                {isSubmitting ? "Loading..." : "Save"}
              </Button>
            </>
          ) : (
            <Button type="button" onClick={() => setIsEditing(!isEditing)}>
              Edit
            </Button>
          )}
        </div>
      </form>
    </section>
  );
}

export default AccountProfilePage;
