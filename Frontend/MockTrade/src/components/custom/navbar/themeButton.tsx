import { useTheme } from "@/themeContext";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ThemeButton() {
    const { isDarkTheme, toggleTheme } = useTheme();

    return (
        <div className="themeButton w-10 h-10 text-2xl rounded-full flex justify-center items-center">
            <button onClick={toggleTheme}>
                <FontAwesomeIcon icon={isDarkTheme ? faSun : faMoon} />
            </button>
        </div>
    );
}
