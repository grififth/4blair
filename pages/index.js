//Home page

import { useAuth } from "../utils/AuthContext";

import Link from "next/link";
import Router from "next/router";
import { useEffect } from "react";

import { motion } from "framer-motion";

export default function Home() {
    const { user, signOut } = useAuth();

    useEffect(() => {
        if (user) {
            Router.push("/posts");
        }
    }, [user]);

    return (
        <motion.div className="home" initial="initial" animate="animate" exit="exit">
            <div className="home-card">
                <motion.div
                    className="home-title"
                    variants={{
                        exit: {
                            opacity: 0,
                        },
                    }}
                >
                    <h1>Blairchan</h1>
                    <p>A Private, Completely Anonymous Social Platform</p>
                </motion.div>
                <motion.div
                    className="home-button"
                    variants={{
                        exit: {
                            opacity: 0,
                        },
                    }}
                >
                    <Link href="/auth">
                        <button className="button-29">Get Started</button>
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    );
}
