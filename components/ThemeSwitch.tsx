import { useTheme } from "next-themes";

import { HiOutlineLightBulb } from "react-icons/hi";
export default function ThemeSwitch() {
    const { theme, setTheme } = useTheme();
    return (
        <div className="w-full h-full flex items-center justify-center">
            <button
                className="w-8 h-8"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
                <HiOutlineLightBulb style={{ width: "100%", height: "100%" }} />
            </button>
        </div>
    );
}
