//_app.js
import "../styles/globals.css";

import { AuthProvider } from "../utils/AuthContext";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps, router }) {
    return (
        <AuthProvider>
            <AnimatePresence exitBeforeEnter>
                <ThemeProvider attribute="class">
                    <Component {...pageProps} key={router.route} />
                </ThemeProvider>
            </AnimatePresence>
        </AuthProvider>
    );
}

export default MyApp;
