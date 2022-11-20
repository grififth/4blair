import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";

export default function NavBar() {
    return (
        <div className="w-screen h-12 flex p-2 shadow-md items-center bg-lightforeground dark:bg-darkforeground border-b-1 border-border">
            <Link href="/posts">
                <a className="font-bold text-4xl text-lightaccent dark:text-darkaccent m-0">
                    OnlyBlair
                </a>
            </Link>
            <div className="absolute top-2 right-2">
                <ThemeSwitch />
            </div>
        </div>
    );
}
