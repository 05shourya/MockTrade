import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import LoginSignupPage from "./pages/loginSignupPage";
import { ThemeProvider } from "./themeContext";
import Trial from "./pages/trial";
import ProfilePage from "./pages/profilePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTraderInfo } from "./redux/authentication/traderInfoSlice";
import validate from "./common Functions/validateUser";
import { setIsValidUser } from "./redux/authentication/validUserSlice";
import { RootState } from "./redux/store";

function App() {
    const dispatch = useDispatch<any>();
    const token = useSelector((state: RootState) => state.tokenInfo.token);
    useEffect(() => {
        token && dispatch(fetchTraderInfo());
        const checkUser = async () => {
            if (token) {
                const isValid = await validate(token);
                dispatch(setIsValidUser(isValid));
            } else {
                dispatch(setIsValidUser(false));
            }
        };
        checkUser();
    }, [token]);
    return (
        <>
            <ThemeProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/login"
                            element={<LoginSignupPage isLoggingIn={true} />}
                        />
                        <Route
                            path="/register"
                            element={<LoginSignupPage isLoggingIn={false} />}
                        />
                        <Route path="/trial" element={<Trial />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </>
    );
}

export default App;
