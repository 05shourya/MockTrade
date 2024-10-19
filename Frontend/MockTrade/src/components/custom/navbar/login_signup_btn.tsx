import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function LoginSignupBtn() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/login");
    };

    return (
        <>
            <button
                className="loginSignupBtn px-10 py-1 rounded-lg bg-gray-400 h-[100%] flex items-center justify-center font-semibold tracking-wider text-2xl hover:bg-gray-600 dark:bg-slate-800 dark:hover:bg-slate-500 gap-3"
                onClick={handleClick}
            >
                Login
                <FontAwesomeIcon icon={faSignInAlt} className="text-xl" />
            </button>
        </>
    );
}
