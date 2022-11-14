//_app.js
import "../styles/globals.css";

import { AuthProvider } from "../utils/AuthContext";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps, router }) {
    return (
        <AuthProvider>
            <ThemeProvider attribute="class">
                <Component {...pageProps} key={router.route} />
            </ThemeProvider>
        </AuthProvider>
    );
}

export default MyApp;
