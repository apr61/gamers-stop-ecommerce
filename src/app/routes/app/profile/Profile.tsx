import { useState } from "react";
import "./profile.css";
import Input from "@/components/ui/input/Input";
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
		data,
	) => {
		console.log(data);
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
								btnType="ghost"
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
