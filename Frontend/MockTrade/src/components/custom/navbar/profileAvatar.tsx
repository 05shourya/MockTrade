import { useEffect, useState } from "react";
import ProfileDialog from "./profileDialog";
import FetchFromBackend from "@/common Functions/fetchFromBackend";
import ProfilePicture from "../profileBody/profilePic";

export default function ProfileAvatar() {
    const [isOpen, setIsOpen] = useState(false);
    const [trader, setTrader] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const trader = await FetchFromBackend("/trader/getTrader");
            setTrader(trader);
            return trader;
        };
        fetchData();
    }, []);

    return (
        <>
            <ProfilePicture
                size={2.75}
                onClick={() => {
                    setIsOpen(true);
                }}
            />
            {trader && (
                <ProfileDialog
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    trader={trader}
                />
            )}
        </>
    );
}
