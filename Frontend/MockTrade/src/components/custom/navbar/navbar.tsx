import LoginSignupBtn from "./login_signup_btn";
import SearchBar from "./searchBar";
import ThemeButton from "./themeButton";
import ProfileAvatar from "./profileAvatar";
import LogoutBtn from "./logoutBtn";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface NavBarProps {
    setSearchQuery: (query: string) => void;
}

export default function NavBar({ setSearchQuery }: NavBarProps) {
    const isValidUser = useSelector(
        (state: RootState) => state.validUser.isValidUser
    );

    return (
        <>
            <div className="navBar flex w-full items-center flex-row justify-center my-3 gap-10">
                <div className="flex justify-start flex-grow ml-6">
                    <SearchBar setSearchQuery={setSearchQuery} />
                </div>
                <div className="flex justify-center gap-10 mr-10">
                    <ThemeButton />
                    {!isValidUser && <LoginSignupBtn />}
                    {isValidUser && <ProfileAvatar />}
                    {isValidUser && <LogoutBtn />}
                </div>
            </div>
        </>
    );
}
