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
    <div className="sticky top-0 z-20 py-2 bg-white md:py-6 md:mb-6 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 flex items-center justify-between text-gray-900 dark:text-gray-100">
        <Link
          href="/"
          className={
            "font-medium tracking-wider transition-colors hover:text-sky-500 uppercase text-gray-900 dark:text-gray-100"
          }>
          <Image className="pointer-events-none focus:pointer-events-auto" draggable="false" src="/icon-logo.png" width={30} height={30} alt="Home" />
        </Link>
        <Theme />
        <Link href="/portfolio" className="transition-colors hover:text-sky-500 text-gray-900 dark:text-gray-100">{t("projects")}</Link>
        <Language />
      </div>
    </div>
  );
};

export default Navigation;
