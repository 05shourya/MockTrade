import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

const ThemeContext = createContext({
    isDarkTheme: false,
    toggleTheme: () => {},
});

export function useTheme() {
    return useContext(ThemeContext);
}

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const storedTheme = localStorage.getItem("darkTheme") === "true";
    const [isDarkTheme, setDarkTheme] = useState(storedTheme);

    useEffect(() => {
        document.body.classList.toggle("dark", isDarkTheme);
        localStorage.setItem("darkTheme", JSON.stringify(isDarkTheme));
    }, [isDarkTheme]);

    const toggleTheme = () => {
        setDarkTheme((prevTheme) => !prevTheme);
    };

    return (
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
