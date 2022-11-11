//Home page

import { useAuth } from "../utils/AuthContext";

import Link from "next/link";
import Router from "next/router";
import { useEffect } from "react";
import { useTheme } from "next-themes";

import { motion } from "framer-motion";

import Head from "next/head";

export default function Home() {
    const { user, signOut } = useAuth();
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        if (user) {
            Router.push("/posts");
        }
    }, [user]);

    return (
        <motion.div
            className="w-screen h-screen flex flex-col justify-center items-center"
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <Head>
                <title>OnlyBlair</title>
            </Head>
            <div className="absolute top-0 right-0">
                <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                    {theme === "dark" ? "Light" : "Dark"}
                </button>
            </div>
            <div className="flex flex-col gap-4">
                <h1 className="text-7xl font-bold text-center">OnlyBlair</h1>
                <p className="text-center text-gray-500 text-xl text-lightaccent dark:text-darkaccent">
                    Private, Secure, Completely Anonymous Social Platform
                </p>
            </div>
            <button>
                <Link href="/auth">
                    <a>Get Started</a>
                </Link>
            </button>
        </motion.div>
    );
}
