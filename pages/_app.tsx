import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Footer, Navigation } from "../components";
import Background from "../components/common/background";
import { ThemeProvider } from "next-themes";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
import React from "react";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const translations = pageProps.translations || {};

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
        <Background />
        <Navigation translations={translations} />
        <main className="container mx-auto px-4">
          <Component {...pageProps}/>
        </main>
        <Footer translations={translations} />
      </ThemeProvider>
    </>
  );
};

export default MyApp;
