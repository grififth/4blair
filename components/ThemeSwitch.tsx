import { useTheme } from "next-themes";

import { HiOutlineLightBulb } from "react-icons/hi";

const themes = ["light", "gruvbox", "onedark", "dracula", "dark"];

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="w-full h-full flex items-center justify-center text-text">
      <button
        className="w-8 h-8"
        onClick={() => {
          setTheme(themes[(themes.indexOf(theme) + 1) % themes.length]);
        }}
      >
        <HiOutlineLightBulb style={{ width: "100%", height: "100%" }} />
      </button>
    </div>
  );
}
