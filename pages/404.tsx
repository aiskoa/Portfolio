import { NextPage } from 'next';
import Link from 'next/link';
import { ReactElement, useRef, useState } from 'react';
import Head from 'next/head';
import { FaHome } from "react-icons/fa";
import { motion, HTMLMotionProps } from "framer-motion";
import fs from 'fs';
import path from 'path';

const MotionButton: React.FC<HTMLMotionProps<"button">> = motion.button;

interface NotFoundProps {
  translations: { [key: string]: string };
}

const NotFound: NextPage<NotFoundProps> = ({ translations }): ReactElement => {
  const t = (key: string) => translations[key] || key;

  const TARGET_TEXT = t("go_back"); // Use translation for this text
  const CYCLES_PER_LETTER = 2;
  const SHUFFLE_TIME = 50;

  const CHARS = "!@#$%^&*():{};|,.<>/?";

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [text, setText] = useState(TARGET_TEXT);

  const scramble = () => {
    let pos = 0;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setText(TARGET_TEXT);
  };

  return (
    <>
      
      <Head>
        <title>AISKOA - 404</title>
        <link rel="shortcut icon" type="image/png" href="./favicon.ico" />
        <meta name="description" content="AISKOA 404 Not Found." />
        <meta property="og:description" content="AISKOA 404 Not Found." />
        <meta name="theme-color" content="#8e52f5" />
        <meta property="og:title" content="AISKOA - Not Found" />
        
        <meta property="og:url" content="https://aiskoa.vercel.app" />
      </Head>
      <div className="flex flex-col">
        <img
          src="https://i.ibb.co/PtTThks/lis.gif"
          loading="lazy"
          draggable="false"
          alt="Life Is Strange"
          className="object-cover w-full h-64 filter blur-sm"
        />
        <br />
        <div className="flex justify-center flex-1">
          <div className="max-w-xl px-4 py-8 mx-auto text-center">
            <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
                {t("error_notfound_one")} 
            </h1>
            <p className="mt-4 text-gray-500">
              {t("error_notfound_two")}
            </p>
            <br />
            <Link href="/">
              <MotionButton
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.975 }}
                onMouseEnter={scramble}
                onMouseLeave={stopScramble}
                className="group relative overflow-hidden rounded-lg border-[1px] border-neutral-500 bg-black px-4 py-2 font-mono font-medium uppercase text-neutral-300 transition-colors hover:text-indigo-300 leading-tight shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg duration-150 ease-in-out dark:bg-purple-600"
              >
                <div className="relative z-10 flex items-center gap-2">
                  <FaHome />
                  <span>{text}</span>
                </div>
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: "-100%" }}
                  transition={{ repeat: Infinity, repeatType: "mirror", duration: 1, ease: "linear" }}
                  className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-indigo-400/0 from-40% via-indigo-400/100 to-indigo-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
                />
              </MotionButton>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  const translationsPath = path.join(process.cwd(), 'locales', locale, 'index.json');
  const translationsFile = fs.readFileSync(translationsPath, 'utf8');
  const translations = JSON.parse(translationsFile);

  return {
    props: {
      translations,
    },
  };
}

export default NotFound;