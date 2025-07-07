import React, { useState, useEffect } from "react";
import type { NextPage } from 'next';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';

/**
 * IMPORTS DE ICONOS
 * Ajusta según los íconos que desees usar:
 */
import { SiTryhackme, SiHackthebox, SiWindows11, SiApple, SiRootme, SiAndroid } from "react-icons/si";
import { FaLinux, FaLink } from "react-icons/fa";
import { MdSignalCellular0Bar, MdSignalCellular1Bar, MdSignalCellular3Bar, MdSignalCellular4Bar } from "react-icons/md";

interface Item {
  title: string;
  platform: string;
  os: string;
  difficulty: string;
  image: string;
  altText: string;
  githubLink: string;
  description: string;
  GoToLink: string;
}

interface WriteUpProps {
  translations: { [key: string]: string };
}

/**
 * Estas funciones devuelven el ícono adecuado
 * según el contenido de "platform" y "os".
 */
function getPlatformIcon(platform: string) {
  const p = platform.toLowerCase();
  if (p === "tryhackme") return <SiTryhackme className="inline-block w-4 h-4 mr-1" />;
  if (p === "hackthebox") return <SiHackthebox className="inline-block w-4 h-4 mr-1" />;
  if (p === "rootme") return <SiRootme className="inline-block w-4 h-4 mr-1" />;
  return null;
}

function getOsIcon(os: string) {
  const o = os.toLowerCase();
  if (o === "windows") return <SiWindows11 className="inline-block w-4 h-4 mr-1" />;
  if (o === "linux") return <FaLinux className="inline-block w-4 h-4 mr-1" />;
  if (o === "linux") return <SiAndroid className="inline-block w-4 h-4 mr-1" />;
  if (o === "macos") return <SiApple className="inline-block w-4 h-4 mr-1" />;
  return null;
}

function getDifficultyIcon(difficulty: string) {
  const d = difficulty.toLowerCase();
  if (d === "none") return <MdSignalCellular0Bar className="inline-block w-4 h-4 mr-1" />;
  if (d === "easy") return <MdSignalCellular1Bar className="inline-block w-4 h-4 mr-1" />;
  if (d === "medium") return <MdSignalCellular3Bar className="inline-block w-4 h-4 mr-1" />;
  if (d === "hard") return <MdSignalCellular4Bar className="inline-block w-4 h-4 mr-1" />;
  return null;
}

const WriteUp: NextPage<WriteUpProps> = ({ translations }) => {
  const t = (key: string) => translations[key] || key;
  const [data, setData] = useState<Item[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/_pr/machines.json');
      const json: Item[] = await res.json();
      setData(json);
    }
    fetchData();
  }, []);

  const filteredData = data
    ? data.filter((item: Item) => {
        const lowerSearch = searchTerm.toLowerCase();
        return (
          searchTerm === "" ||
          item.title.toLowerCase().includes(lowerSearch) ||
          item.platform.toLowerCase().includes(lowerSearch) ||
          item.os.toLowerCase().includes(lowerSearch) ||
          item.difficulty.toLowerCase().includes(lowerSearch) ||
          item.description.toLowerCase().includes(lowerSearch)
        );
      })
    : [];

  // Ordenar
  const sortedData = filteredData.sort((a, b) => {
    switch (sortOrder) {
      case "titleAsc":
        return a.title.localeCompare(b.title);
      case "titleDesc":
        return b.title.localeCompare(a.title);
      case "difficultyAsc":
        return a.difficulty.localeCompare(b.difficulty);
      case "difficultyDesc":
        return b.difficulty.localeCompare(a.difficulty);
      default:
        return 0;
    }
  });

  return (
    <>
      
      <Head>
        <title>AISKOA - WriteUps</title>
        <link rel="shortcut icon" type="image/png" href="./favicon.ico" />
        <meta name="description" content="Aiskoa's Pentest machines writeups and notes." />
        <meta property="og:description" content="Aiskoa's WriteUps." />
        <meta property="og:title" content="AISKOA - WriteUps" />
        <meta name="theme-color:" content="#8e52f5" />
        <meta property="og:url" content="https://aiskoa.vercel.app/writeup" />
      </Head>

      <div className='portfolio'>
        <br />
        <div className="flex justify-around hover:justify-evenly">
          <img
            className="pointer-events-none"
            draggable="false"
            loading="lazy"
            src="../logo.png"
            width="120"
            height="120"
            alt="Logo"
          />
        </div>
        <br />

        <h1 className="flex justify-center text-2xl font-bold lg:text-3xl">
          <span className="text-transparent bg-gradient-to-r from-zinc-900 to-slate-500 dark:from-violet-600 dark:to-zinc-600 bg-clip-text">
            WRITE UPS
          </span>
        </h1>
        <p className="flex justify-center font-semibold text-center">
          {t("writeDesc")}
        </p>
        <br />

        <div className='flex items-center justify-center max-w-md mx-auto'>
          <div className="relative flex items-center h-12 overflow-hidden border rounded-lg bg-zinc-200 dark:bg-violet-800 focus-within:shadow-lg dark:focus-within:shadow-violet-900 border-zinc-200 dark:border-violet-800">
            <div className="grid w-12 h-full place-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              className="w-full h-full pr-2 text-sm outline-none"
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative flex items-center h-12 ml-2 overflow-hidden rounded-lg bg-zinc-200 dark:bg-violet-800 focus-within:shadow-lg dark:focus-within:shadow-violet-900">
            <select
              className="block px-2 py-2 pr-8 leading-tight text-gray-700 border rounded-lg bg-zinc-200 dark:bg-violet-800 border-zinc-200 dark:border-violet-800 dark:text-slate-200 focus:outline-none focus:bg-white focus:border-gray-500"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Sin filtro</option>
              <option value="titleAsc">Título (Ascendente)</option>
              <option value="titleDesc">Título (Descendente)</option>
              <option value="difficultyAsc">Dificultad (Ascendente)</option>
              <option value="difficultyDesc">Dificultad (Descendente)</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none dark:text-slate-200">
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

        <div className="flex flex-wrap justify-center gap-6">
          {sortedData.map((item: Item, index: number) => (
            <div
              key={index}
              className="w-full p-2 sm:w-1/2 lg:w-1/3 xl:w-1/4"
            >
              <div className="overflow-hidden bg-gray-100 border-2 rounded-lg shadow-lg cursor-pointer dark:bg-gray-800 dark:hover:border-violet-800 hover:border-yellow-500">
                <img
                  className="object-cover w-full h-48 md:h-60"
                  loading="lazy"
                  src={item.image}
                  alt={item.altText}
                />
                <div className="p-4">
                  <div>
                    <a
                      href={item.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <FaLink className="inline-block w-6 h-6 text-gray-800 dark:text-white" />
                      <span className="ml-1 text-lg font-medium text-gray-800 dark:text-gray-200 hover:underline">
                        {item.title}
                      </span>
                    </a>
                  </div>

                  <div className="flex items-center mt-2 space-x-2">
                    <button
                      title="Plataforma"
                      className="flex items-center px-2 py-1 text-xs text-gray-800 border border-gray-400 rounded-md dark:text-gray-200"
                    >
                      {getPlatformIcon(item.platform)}
                      <span>{item.platform}</span>
                    </button>

                    <button
                      title="Sistema Operativo"
                      className="flex items-center px-2 py-1 text-xs text-gray-800 border border-gray-400 rounded-md dark:text-gray-200"
                    >
                      {getOsIcon(item.os)}
                      <span>{item.os}</span>
                    </button>

                    <button
                      title="Dificultad"
                      className="px-2 py-1 text-xs text-gray-800 border border-gray-400 rounded-md dark:text-gray-200"
                    >
                      {getDifficultyIcon(item.difficulty)}
                      <span>{item.difficulty}</span>
                    </button>
                  </div>

                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>

                  <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      onClick={() => window.open(item.GoToLink, "_self")}
                      className="px-4 py-2 text-sm font-medium border rounded-md text-lime-400 bg-lime-900 border-lime-400 hover:brightness-110"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <br />
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

export default WriteUp;