import { useState } from "react";
import CurrencyTable from "./currencyTable";
import BuyCurrencyDialog from "./buyCurrencyDialog";

interface HomeBodyProps {
    data: any[]; // Receive data as props
}

export default function HomeBody({ data }: HomeBodyProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currencyDetails, setCurrencyDetails] = useState(null);
    return (
        <>
            <div className="homeBody w-[98%] flex-grow my-6 ">
                <CurrencyTable
                    data={data}
                    setIsOpen={setIsOpen}
                    setCurrencyDetails={setCurrencyDetails}
                />
                <BuyCurrencyDialog
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    currencyDetails={currencyDetails}
                />
            </div>
        </>
    );
}
