//_app.js
import "../styles/globals.css";

import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps, router }) {
    return (
        <ThemeProvider attribute="class">
            <Component {...pageProps} key={router.route} />
        </ThemeProvider>
    );
}

export default MyApp;
