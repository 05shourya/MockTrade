import TransactFunds from "@/common Functions/transactFunds";
import { fetchTraderInfo } from "@/redux/authentication/traderInfoSlice";
import { Button } from "@headlessui/react";
import { useDispatch } from "react-redux";
import GlassDialog from "../Dialogs/glassDialog";
import { useState } from "react";

interface TransactionButtonProps {
    isAddBalance: boolean; // True for Add Funds, False for Withdraw Funds
}

export default function TransactionButton({
    isAddBalance,
}: TransactionButtonProps) {
    const [inputValue, setInputValue] = useState<number | string>(50);
    const dispatch = useDispatch<any>();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const openModal = async () => {
        setIsOpen(true);
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!isNaN(Number(value))) {
            setInputValue(value);
        }
    };
    const handleConfirmClick = async () => {
        await TransactFunds(isAddBalance, Number(inputValue));
        dispatch(fetchTraderInfo());
        closeModal();
        setInputValue(500);
    };
    const closeModal = () => {
        setIsOpen(false);
    };
    const buttonText = isAddBalance ? "Add Funds" : "Withdraw Funds";
    const buttonStyle = isAddBalance
        ? "bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2"
        : "bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2";

    return (
        <>
            <Button onClick={openModal} className={buttonStyle}>
                {buttonText}
            </Button>
            <GlassDialog isOpen={isOpen} closeModal={closeModal}>
                <div className="flex flex-col items-center justify-center space-y-5">
                    <h1 className="text-xl font-semibold">
                        Confirm Transaction
                    </h1>

                    <input
                        type="number"
                        value={inputValue}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                        placeholder="Enter amount"
                        step={10}
                    />

                    <button
                        onClick={handleConfirmClick}
                        className={buttonStyle}
                    >
                        {buttonText}
                    </button>
                </div>
            </GlassDialog>
        </>
    );
}
