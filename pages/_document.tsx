import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html>
            <Head />
            <body className="bg-lightbackground dark:bg-darkbackground">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
