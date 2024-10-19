import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GlassDialog from "../Dialogs/glassDialog";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

interface Trader {
    id: string;
    username: string;
    coins: any[];
    balance: number;
}

interface ProfileDialogProps {
    setIsOpen: (value: boolean | ((prevState: boolean) => boolean)) => void;
    isOpen: boolean;
    trader: Trader;
}

export default function ProfileDialog({
    isOpen,
    setIsOpen,
    trader,
}: ProfileDialogProps) {
    const navigate = useNavigate();
    function closeModal() {
        setIsOpen(false);
    }

    const openProfilepage = () => {
        navigate("/profile");
        closeModal();
    };
    return (
        <>
            <GlassDialog isOpen={isOpen} closeModal={closeModal}>
                <h2 className="text-lg font-bold mb-4">User Details</h2>
                <p>
                    <strong>Username:</strong> {trader.username}
                </p>
                <p>
                    <strong>Balance:</strong> {trader.balance}
                </p>
                <p>
                    <strong>Wallet Id:</strong> {trader.id}
                </p>

                <div className="flex gap-4">
                    <button
                        onClick={closeModal}
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                        Close
                    </button>
                    <button
                        onClick={openProfilepage}
                        className="mt-4 flex items-center gap-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400"
                    >
                        Visit
                        <FontAwesomeIcon icon={faExternalLink} />
                    </button>
                </div>
            </GlassDialog>
        </>
    );
}
