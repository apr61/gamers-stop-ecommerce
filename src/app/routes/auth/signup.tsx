import SignUpForm from "@/features/auth/components/SignupForm";
import Navbar from "@/components/navbar/Navbar";

const SignUp = () => {
  return (
    <>
      <Navbar />
      <main className="max-w-md mx-auto w-full min-h-screen flex flex-col items-center justify-center">
        <SignUpForm />
      </main>
    </>
  );
};

export default SignUp;
