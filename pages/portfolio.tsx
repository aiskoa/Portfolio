import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { SpeedInsights } from "@vercel/speed-insights/next";
import fs from "fs";
import path from "path";
import Link from "next/link";

import {
  SiAstro,
  SiCplusplus,
  SiElectron,
  SiGnubash,
  SiGo,
  SiHtml5,
  SiJavascript,
  SiLinux,
  SiNextdotjs,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRust,
  SiSqlite,
  SiSvelte,
  SiTailwindcss,
  SiTypescript,
  SiWordpress,
} from "react-icons/si";
import { FaLinux, FaLink, FaJava } from "react-icons/fa";
import { VscTerminalPowershell } from "react-icons/vsc";

interface Item {
  title: string;
  language: string;
  language2: string;
  date: string;
  image: string;
  altText: string;
  githubLink: string;
  description1: string;
  description2: string;
  readMoreLink: string;
  GoToLink: string;
}

interface PortfolioProps {
  translations: { [key: string]: string };
}

/**
 * Given a programming language name, returns the corresponding icon.
 * @param {string} os - The name of the programming language
 * @returns {ReactElement} The icon of the programming language, or null if the language is not supported
 */

function getProgrammingIcon(p_Language: string): React.ReactNode {
  const icons: Record<string, React.ReactNode> = {
    javascript: <SiJavascript className="inline-block w-4 h-4 mr-1" />,
    java: <FaJava className="inline-block w-4 h-4 mr-1" />,
    python: <SiPython className="inline-block w-4 h-4 mr-1" />,
    html: <SiHtml5 className="inline-block w-4 h-4 mr-1" />,
    electron: <SiElectron className="inline-block w-4 h-4 mr-1" />,
    react: <SiReact className="inline-block w-4 h-4 mr-1" />,
    bash: <SiGnubash className="inline-block w-4 h-4 mr-1" />,
    typescript: <SiTypescript className="inline-block w-4 h-4 mr-1" />,
    astro: <SiAstro className="inline-block w-4 h-4 mr-1" />,
    linux: <SiLinux className="inline-block w-4 h-4 mr-1" />,
    sql: <SiSqlite className="inline-block w-4 h-4 mr-1" />,
    powershell: <VscTerminalPowershell className="inline-block w-4 h-4 mr-1" />,
    nextjs: <SiNextdotjs className="inline-block w-4 h-4 mr-1" />,
    php: <SiPhp className="inline-block w-4 h-4 mr-1" />,
    wordpress: <SiWordpress className="inline-block w-4 h-4 mr-1" />,
    go: <SiGo className="inline-block w-4 h-4 mr-1" />,
    svelte: <SiSvelte className="inline-block w-4 h-4 mr-1" />,
    rust: <SiRust className="inline-block w-4 h-4 mr-1" />,
    tailwindcss: <SiTailwindcss className="inline-block w-4 h-4 mr-1" />,
    cpp: <SiCplusplus className="inline-block w-4 h-4 mr-1" />,
    postgresql: <SiPostgresql className="inline-block w-4 h-4 mr-1" />,
  };

  const l = p_Language.toLowerCase();
  return (icons[l] || null) as React.ReactNode;
}

function getProgrammingIcon2(p_Language2: string): React.ReactNode {
  const icons: Record<string, React.ReactNode> = {
    javascript: <SiJavascript className="inline-block w-4 h-4 mr-1" />,
    java: <FaJava className="inline-block w-4 h-4 mr-1" />,
    python: <SiPython className="inline-block w-4 h-4 mr-1" />,
    html: <SiHtml5 className="inline-block w-4 h-4 mr-1" />,
    electron: <SiElectron className="inline-block w-4 h-4 mr-1" />,
    react: <SiReact className="inline-block w-4 h-4 mr-1" />,
    bash: <SiGnubash className="inline-block w-4 h-4 mr-1" />,
    typescript: <SiTypescript className="inline-block w-4 h-4 mr-1" />,
    astro: <SiAstro className="inline-block w-4 h-4 mr-1" />,
    linux: <SiLinux className="inline-block w-4 h-4 mr-1" />,
    sql: <SiSqlite className="inline-block w-4 h-4 mr-1" />,
    powershell: <VscTerminalPowershell className="inline-block w-4 h-4 mr-1" />,
    nextjs: <SiNextdotjs className="inline-block w-4 h-4 mr-1" />,
    php: <SiPhp className="inline-block w-4 h-4 mr-1" />,
    wordpress: <SiWordpress className="inline-block w-4 h-4 mr-1" />,
    go: <SiGo className="inline-block w-4 h-4 mr-1" />,
    svelte: <SiSvelte className="inline-block w-4 h-4 mr-1" />,
    rust: <SiRust className="inline-block w-4 h-4 mr-1" />,
    tailwindcss: <SiTailwindcss className="inline-block w-4 h-4 mr-1" />,
    cpp: <SiCplusplus className="inline-block w-4 h-4 mr-1" />,
    postgresql: <SiPostgresql className="inline-block w-4 h-4 mr-1" />,
  };

  const l = p_Language2.toLowerCase();
  return (icons[l] || null) as React.ReactNode;
}

const Portfolio: NextPage<PortfolioProps> = ({ translations }) => {
  const t = (key: string) => translations[key] || key;
  const [data, setData] = useState<Item[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/_pr/projects.json");
      const json: Item[] = await res.json();
      setData(json);
    }
    fetchData();
  }, []);

  const filteredData = data
    ? data
        .filter((item: Item) => {
          // Filtrar según el término de búsqueda si está presente
          const searchTermMatches =
            searchTerm === "" ||
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description1
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            item.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.language2.toLowerCase().includes(searchTerm.toLowerCase());

          const sortOrderMatches =
            sortOrder === "" ||
            (sortOrder === "asc" || sortOrder === "desc"
              ? true
              : (item[sortOrder as keyof Item] || "")
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()));

          return searchTermMatches && sortOrderMatches;
        })
        .sort((a, b) => {
          switch (sortOrder) {
            case "asc":
              return a.date.localeCompare(b.date);
            case "desc":
              return b.date.localeCompare(a.date);
            case "titleAsc":
              return a.title.localeCompare(b.title);
            case "titleDesc":
              return b.title.localeCompare(a.title);
            case "langAsc":
              return a.language.localeCompare(b.language);
            case "langDesc":
              return b.language.localeCompare(a.language);
            default:
              return 0;
          }
        })
    : [];

  return (
    <>
      <Head>
        <title>AISKOA - Portfolio</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="description" content="Aiskoa's Portfolio."></meta>
        <meta
          property="og:description"
          content="Aiskoa's Projects and portfolio."
        />
        <meta property="og:title" content="AISKOA - Portfolio" />
        <meta name="theme-color:" content="#8e52f5"></meta>
        <meta property="og:url" content="https://aiskoa.vercel.app/portfolio" />
      </Head>
      <div className="portfolio">
        <br />
        <div className="flex justify-around hover:justify-evenly">
          <img
            className="pointer-events-none focus:pointer-events-auto"
            draggable="false"
            loading="lazy"
            src="/logo.png"
            width="120"
            height="120"
          ></img>
        </div>
        <br />
        <h1 className="flex justify-center text-2xl font-bold lg:text-3xl">
          <span className="text-transparent bg-gradient-to-r from-black to-gray-500 dark:from-violet-600 dark:to-gray-400 bg-clip-text">
            {t("projects")}
          </span>
        </h1>
        <p className="flex justify-center font-semibold text-center">
          {t("projectsDesc")}
        </p>
        <br />

        <div className="flex items-center justify-center max-w-md mx-auto">
          <div className="relative flex items-center h-12 overflow-hidden border rounded-lg bg-white dark:bg-violet-800 focus-within:shadow-lg dark:focus-within:shadow-violet-900 border-white dark:border-violet-800">
            <div className="grid w-12 h-full place-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              className="w-full h-full pr-2 text-sm outline-none peer"
              type="text"
              id="search"
              placeholder=" Search something..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative flex items-center h-12 ml-2 overflow-hidden rounded-lg bg-white dark:bg-violet-800 focus-within:shadow-lg dark:focus-within:shadow-violet-900">
            <select
              className="block px-2 py-2 pr-8 leading-tight text-gray-700 border rounded-lg appearance-none bg-zinc-200 dark:bg-violet-800 border-zinc-200 dark:border-violet-800 dark:text-slate-200 focus:outline-none focus:bg-white focus:border-gray-500"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">No Filter</option>
              <option value="asc">Date (Asc)</option>
              <option value="desc">Date (Desc)</option>
              <option value="titleAsc">Title (Asc)</option>
              <option value="titleDesc">Title (Desc)</option>
              <option value="langAsc">Language (Asc)</option>
              <option value="langDesc">Language (Desc)</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none dark:text-slate-200">
              {/* Flecha hacia abajo */}
              <svg
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12.586L4.707 7.293a1 1 0 0 1 1.414-1.414L10 10.758l4.879-4.879a1 1 0 0 1 1.414 1.414L10 12.586z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <br />
        {/* Cada proyecto es un elemento, mostrados tres por fila para pantallas grandes y uno para dispositivos moviles */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
          {filteredData.map((item: Item, index: number) => (
            <div key={index} className="w-full">
              <Link
                href={item.readMoreLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="overflow-hidden border-2 rounded-lg shadow-lg cursor-pointer dark:bg-gray-800 dark:hover:border-violet-800 hover:border-yellow-500">
                  <img
                    className="relative object-cover w-full h-48 overflow-hidden md:h-60"
                    loading="lazy"
                    src={item.image}
                    alt={item.altText}
                  />
                  <div className="p-4">
                    <div>
                      <span className="ml-1 text-lg font-medium text-gray-800 dark:text-gray-200 hover:underline">
                        {item.title}
                      </span>
                    </div>
                    <span className="block mt-1 text-xs font-bold text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <button
                          title="Lenguaje de programacin1"
                          className="flex items-center px-2 py-1 text-xs text-gray-800 border border-gray-400 rounded-md dark:text-gray-200"
                        >
                          {getProgrammingIcon(item.language)}
                          <span>{item.language}</span>
                        </button>
                        <span className="inline-block mx-1"></span>
                        <button
                          title="Lenguaje de programacin2"
                          className="flex items-center px-2 py-1 text-xs text-gray-800 border border-gray-400 rounded-md dark:text-gray-200"
                        >
                          {getProgrammingIcon2(item.language2)}
                          <span>{item.language2}</span>
                        </button>
                      </div>
                    </span>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {item.description1}
                    </p>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {item.description2}
                    </p>
                    <div className="flex justify-between mt-4">
                      <p className="text-xs text-yellow-500">{item.date}</p>
                      <button
                        data-ripple-light="true"
                        type="button"
                        onClick={() => window.open(item.readMoreLink, "_blank")}
                        className="relative px-4 py-2 overflow-hidden font-medium duration-300 border border-b-4 rounded-md outline-none bg-violet-900 text-violet-400 border-violet-400 hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 group"
                      >
                        <span className="bg-violet-400 shadow-violet-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                        Read More
                      </button>
                      <button
                        data-ripple-light="true"
                        type="button"
                        onClick={() => window.open(item.GoToLink, "_blank")}
                        className="relative px-4 py-2 overflow-hidden font-medium duration-300 border border-b-4 rounded-md outline-none text-lime-400 bg-lime-900 border-lime-400 hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 group"
                      >
                        <span className="bg-violet-400 shadow-violet-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                        Go to
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <br />
        {/* 𝕽♛ */}
      </div>
    </>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  const translationsPath = path.join(
    process.cwd(),
    "locales",
    locale,
    "index.json"
  );
  const translationsFile = fs.readFileSync(translationsPath, "utf8");
  const translations = JSON.parse(translationsFile);

  return {
    props: {
      translations,
    },
  };
}

export default Portfolio;
