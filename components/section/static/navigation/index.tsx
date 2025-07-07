import Link from "next/link";
import React, { ReactElement } from "react";
import { Language, Theme } from "../../..";
import Image from 'next/image'

interface NavigationProps {
  translations: { [key: string]: string };
}

/**
 * @description Here goes the theme button, music and home buttons
 * @returns { ReactElement } Navigation Component
 */

const Navigation: React.FC<NavigationProps> = ({ translations }): ReactElement => {
  const t = (key: string) => translations[key] || key;
  return (
    <div className="sticky top-0 z-20 py-2 bg-white md:py-6 md:mb-6 dark:bg-black">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link
          href="/"
          className={
            "font-medium tracking-wider transition-colors text-gray-900 hover:text-sky-500 uppercase dark:text-white"
          }>
          <img className="pointer-events-none focus:pointer-events-auto" draggable="false" loading="lazy" src="../icon-logo.png" width={30} height={30} alt="Home"></img>
        </Link>
        <Theme />
        <Link href="/portfolio">{t("projects")}</Link>
        <Language />
      </div>
    </div>
  );
};

export default Navigation;
