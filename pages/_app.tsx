//_app.js
import "../styles/globals.css";

import { ThemeProvider } from "next-themes";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps, router }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider attribute="class">
                <Component {...pageProps} key={router.route} />
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default MyApp;
