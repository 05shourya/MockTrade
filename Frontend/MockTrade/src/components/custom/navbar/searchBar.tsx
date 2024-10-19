import { useEffect, useRef } from "react";

interface SearchBarProps {
    setSearchQuery: (query: string) => void;
}

function SearchBar({ setSearchQuery }: SearchBarProps) {
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Properly type the event
            if (event.ctrlKey && event.key === "k") {
                event.preventDefault(); // Prevent the default behavior
                searchInputRef.current?.focus(); // Use optional chaining to avoid null errors
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div className="flex items-center w-2/3 justify-center m-0 p-0">
            <input
                type="text"
                placeholder="Search (Ctrl + k)"
                className="flex-grow px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:focus:ring-blue-500"
                ref={searchInputRef}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                }} // Update search query
            />
        </div>
    );
}

export default SearchBar;
