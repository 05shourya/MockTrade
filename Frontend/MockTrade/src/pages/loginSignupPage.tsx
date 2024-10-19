import { LoginForm } from "@/components/custom/loginSignup/loginForm";

interface LoginSignupPageProps {
    isLoggingIn: boolean;
}

export default function LoginSignupPage({ isLoggingIn }: LoginSignupPageProps) {
    return (
        <>
            <div className="loginForm w-full h-[100vh] flex justify-center items-center">
                <LoginForm isLoggingIn={isLoggingIn} />
            </div>
        </>
    );
}
