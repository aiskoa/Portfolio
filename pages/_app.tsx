import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { Footer, Navigation } from "../components";
import { ThemeProvider } from "next-themes";
import { ThemeProvider as TaildwindTheme } from "@material-tailwind/react";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

const MyApp = ({ Component, pageProps }: AppProps) => {
  const translations = pageProps.translations || {};

  return (
    <>
      <TaildwindTheme>
        <ThemeProvider attribute="class" enableSystem={false}>
          <Navigation translations={translations} />
          <main className="container mx-auto px-4">
            <Component {...pageProps}/>
          </main>
        </ThemeProvider>
      </TaildwindTheme>
      <Footer translations={translations} />
    </>
  );
};

export default MyApp;