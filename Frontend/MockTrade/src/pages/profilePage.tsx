import BuyCurrencyDialog from "@/components/custom/homeBody/buyCurrencyDialog";
import FetchCurrencies from "@/components/custom/homeBody/fetchCurrencies";
import MyCurrencies from "@/components/custom/profileBody/myCurrencies";
import ProfileTopBar from "@/components/custom/profileBody/profileTopBar";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ProfilePage() {
    const trader = useSelector((state: RootState) => state.traderInfo);
    const [data, setData] = useState<any>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [currencyDetails, setCurrencyDetails] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await FetchCurrencies();
                setData(result);
            } catch (error) {
                console.error("Error fetching currencies:", error);
            }
        };
        fetchData();
    }, [trader]);

    return (
        <>
            {trader.trader && (
                <div className="profilePage w-[100vw] h-[100vh] flex flex-col justify-start gap-5 items-center">
                    <ProfileTopBar />
                    <MyCurrencies
                        currencies={trader.trader.coins}
                        data={data}
                        setCurrencyDetails={setCurrencyDetails}
                        setIsOpen={setIsOpen}
                    />
                    <BuyCurrencyDialog
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        currencyDetails={currencyDetails}
                    />
                </div>
            )}
        </>
    );
}
