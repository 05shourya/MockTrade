import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import GlassDialog from "../Dialogs/glassDialog";
import { Description, DialogTitle } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { removeToken } from "@/redux/authentication/jwtTokenSlice";
import { setIsValidUser } from "@/redux/authentication/validUserSlice";


export default function LogoutBtn() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch<any>();

    const handleLogout = () => {
        dispatch(removeToken());
        dispatch(setIsValidUser(false));
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    return (
        <>
            <button
                className="loginSignupBtn px-1 py-2 rounded-lg bg-red-500 hover:bg-red-700 flex items-center justify-center font-semibold tracking-wider text-base text-black gap-3"
                onClick={openModal}
            >
                Logout
                <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
            <GlassDialog isOpen={isOpen} closeModal={closeModal}>
                <DialogTitle className="text-lg font-bold">
                    Confirm Logout
                </DialogTitle>
                <Description className="mt-2">
                    Are you sure you want to log out?
                </Description>

                {/* Buttons for confirmation or cancel */}
                <div className="mt-4 flex justify-end gap-3">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>
            </GlassDialog>
        </>
    );
}
