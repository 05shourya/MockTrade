import { DialogTitle } from "@headlessui/react";
import { useState } from "react";
import GlassDialog from "../Dialogs/glassDialog";
import TradeCoin from "@/common Functions/tradeCoin";
import { useDispatch } from "react-redux";
import { fetchTraderInfo } from "@/redux/authentication/traderInfoSlice";

interface BuyCurrencyDialogProps {
    setIsOpen: (value: boolean | ((prevState: boolean) => boolean)) => void;
    isOpen: boolean;
    currencyDetails: any;
}

export default function BuyCurrencyDialog({
    setIsOpen,
    isOpen,
    currencyDetails,
}: BuyCurrencyDialogProps) {
    const [value, setValue] = useState(0.1);
    const minValue = 0.01;
    const dispatch = useDispatch<any>();
    function closeModal() {
        setIsOpen(false);
        setValue(0.1);
    }

    const tradeCoin = async (isBuying: boolean) => {
        const resBody = currencyDetails && {
            name: currencyDetails.name,
            quantity: value,
            price: currencyDetails.current_price,
        };
        await TradeCoin(resBody, isBuying);
        await dispatch(fetchTraderInfo());

        closeModal();
    };

    return (
        <>
            <GlassDialog isOpen={isOpen} closeModal={closeModal}>
                <div className="w-full flex items-center gap-4">
                    <img
                        src={currencyDetails && currencyDetails.image}
                        alt={currencyDetails && currencyDetails.name}
                        className="w-8 h-8"
                    />
                    <DialogTitle
                        as="h3"
                        className="text-2xl font-semibold leading-8"
                    >
                        {currencyDetails && currencyDetails.name}
                    </DialogTitle>
                </div>
                {currencyDetails && (
                    <div className="mt-4 space-y-2 flex flex-col gap-3 items-center">
                        <p className="text-sm ">
                            <span className="font-semibold">Market Rank:</span>{" "}
                            {currencyDetails.market_cap_rank}
                        </p>
                        <p className="text-sm ">
                            <span className="font-semibold">Price:</span> ${" "}
                            {currencyDetails.current_price}
                        </p>
                        <p className="text-sm ">
                            <span className="font-semibold">Market Cap:</span> ${" "}
                            {currencyDetails.market_cap}
                        </p>
                        <p className="text-sm ">
                            <span className="font-semibold">24h Low:</span> ${" "}
                            {currencyDetails.low_24h}
                        </p>
                        <p className="text-sm ">
                            <span className="font-semibold">24h High:</span> ${" "}
                            {currencyDetails.high_24h}
                        </p>
                        <p className="text-sm ">
                            <span className="font-semibold">24h Change:</span>{" "}
                            {currencyDetails.price_change_percentage_24h}%
                        </p>
                    </div>
                )}
                <div className="mt-6 gap-6 flex flex-col-reverse justify-center items-center">
                    <div className="tradeButtons w-full flex">
                        <button
                            type="button"
                            className="bg-green-400 font-medium text-black py-2 px-8 rounded-l-lg hover:bg-green-300 transition duration-200 w-full"
                            onClick={() => {
                                tradeCoin(true);
                            }}
                        >
                            Buy
                        </button>
                        <button
                            type="button"
                            className="bg-red-500 font-medium text-black py-2 px-8 rounded-r-lg hover:bg-red-600 transition duration-200 w-full"
                            onClick={() => {
                                tradeCoin(false);
                            }}
                        >
                            Sell
                        </button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <b className="quantityText">Quantity: </b>
                        <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => setValue(value - 0.1)}
                            disabled={value <= minValue + 0.1}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>

                        <input
                            type="number"
                            className="w-24 text-center bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                            value={value}
                            onChange={(e) => setValue(Number(e.target.value))}
                            min={minValue}
                        />

                        <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => setValue(value + 0.1)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </GlassDialog>
        </>
    );
}
