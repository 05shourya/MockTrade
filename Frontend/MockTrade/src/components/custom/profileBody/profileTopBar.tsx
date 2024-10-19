import { RootState } from "@/redux/store";
import { Button } from "@headlessui/react";
import { useSelector } from "react-redux";
import ThemeButton from "../navbar/themeButton";
import { useNavigate } from "react-router-dom";
import LogoutBtn from "../navbar/logoutBtn";
import ProfilePicture from "./profilePic";
import TransactionButton from "./TransactionButon";

export default function ProfileTopBar() {
    const isValidUser = useSelector(
        (state: RootState) => state.validUser.isValidUser
    );
    const trader = useSelector((state: RootState) => state.traderInfo);
    const navigate = useNavigate();
    return (
        <>
            {trader.trader && (
                <div className="profileNav px-3 w-[98vw] mt-5 flex flex-row items-start justify-between">
                    <div className="flex flex-row items-center gap-10">
                        <ProfilePicture size={8} />
                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-4xl tracking-widest">
                                {trader.trader.username}
                            </p>
                            <p className="font-extralight text-xl">
                                Wallet-id: {trader.trader.id}
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                                <p className="font-medium text-xl">
                                    Balance: {trader.trader.balance} $
                                </p>
                                <TransactionButton isAddBalance={true} />
                                <TransactionButton isAddBalance={false} />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row justify-center gap-10">
                        {isValidUser && <ThemeButton />}
                        <Button
                            className="bg-blue-700 text-white rounded-lg px-5"
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            Home
                        </Button>
                        {isValidUser && <LogoutBtn />}
                    </div>
                </div>
            )}
        </>
    );
}
