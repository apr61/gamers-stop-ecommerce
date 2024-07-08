import SignUpForm from "@/features/auth/components/SignupForm";
import {UserNavbar} from "@/components/navbar/Navbar";

const SignUp = () => {
  return (
    <>
      <UserNavbar />
      <main className="max-w-md mx-auto w-full min-h-screen flex flex-col items-center justify-center">
        <SignUpForm />
      </main>
    </>
  );
};

export default SignUp;
