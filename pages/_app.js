//_app.js
import "../styles/main.css";

import { AuthProvider } from "../utils/AuthContext";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps, router }) {
    return (
        <AuthProvider>
            <AnimatePresence exitBeforeEnter>
                <Component {...pageProps} key={router.route} />
            </AnimatePresence>
        </AuthProvider>
    );
}

export default MyApp;
