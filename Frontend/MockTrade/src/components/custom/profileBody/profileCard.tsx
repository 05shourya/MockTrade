import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import ProfilePicture from "./profilePic";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfileCard() {
    const trader = useSelector((state: RootState) => state.traderInfo);

    return (
        <>
            {trader.trader && (
                <Card className="px-10 py-5 min-w-max mt-5 flex">
                    <CardContent className="flex flex-col items-center justify-center">
                        <ProfilePicture size={8} />
                        <p className="text-lg font-semibold mt-3">
                            {trader.trader.username}
                        </p>
                        <div className="flex flex-col mt-2">
                            <p className="text-gray-600">
                                Wallet ID: {trader.trader.id}
                            </p>
                            <p className="text-gray-600">
                                Balance: {trader.trader.balance}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </>
    );
}
