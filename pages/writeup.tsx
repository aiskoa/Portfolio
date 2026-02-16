import React, { useState, useEffect } from "react";
import type { NextPage } from 'next';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import Link from "next/link";
import { 
  SiTryhackme, 
  SiHackthebox, 
  SiApple, 
  SiRootme, 
  SiAndroid, 
  SiKedro, 
  SiValorant, 
} from "react-icons/si";
import { FaTerminal, FaSearch, FaWindows, FaLinux, FaExpand, FaTimes } from "react-icons/fa";
import { MdSignalCellular0Bar, MdSignalCellular1Bar, MdSignalCellular3Bar, MdSignalCellular4Bar } from "react-icons/md";

interface Item {
  title: string;
  platform: string;
  os: string;
  difficulty: string;
  image: string;
  altText: string; // Used for techniques
  githubLink: string;
  description: string;
  GoToLink: string;
}

interface WriteUpProps {
  translations: { [key: string]: string };
}

const getPlatformStyle = (platform: string) => {
  const p = platform.toLowerCase().replace(/\s/g, '');
  if (p === 'hackthebox') return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20';
  if (p === 'tryhackme') return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
  if (p === 'hackmyvm') return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20';
  if (p === 'rootme') return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
  if (p === 'vulnhub') return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20';
  if (p === 'picoctf') return 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20';
  return 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20';
};

const getDifficultyStyle = (difficulty: string) => {
  const d = difficulty.toLowerCase();
  if (d === 'easy') return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20';
  if (d === 'medium') return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20';
  if (d === 'hard') return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20';
  return 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20';
};

function getPlatformIcon(platform: string) {
  const p = platform.toLowerCase().replace(/\s/g, '');
  if (p === "tryhackme") return <SiTryhackme className="inline-block w-3 h-3 mr-1" />;
  if (p === "hackthebox") return <SiHackthebox className="inline-block w-3 h-3 mr-1" />;
  if (p === "rootme") return <SiRootme className="inline-block w-3 h-3 mr-1" />;
  if (p === "hackmyvm") return <SiKedro className="inline-block w-3 h-3 mr-1" />;
  if (p === "vulnhub") return <SiValorant className="inline-block w-3 h-3 mr-1" />;
  return null;
}

function getDifficultyIcon(difficulty: string) {
  const d = difficulty.toLowerCase();
  if (d === "none") return <MdSignalCellular0Bar className="inline-block w-3 h-3 mr-1" />;
  if (d === "easy") return <MdSignalCellular1Bar className="inline-block w-3 h-3 mr-1" />;
  if (d === "medium") return <MdSignalCellular3Bar className="inline-block w-3 h-3 mr-1" />;
  if (d === "hard") return <MdSignalCellular4Bar className="inline-block w-3 h-3 mr-1" />;
  return null;
}

const WriteUp: NextPage<WriteUpProps> = ({ translations }) => {
  const t = (key: string) => translations[key] || key;
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [platformFilter, setPlatformFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/_pr/machines.json');
        const json: Item[] = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching writeups:", error);
      } finally {
        setTimeout(() => setLoading(false), 800); // Fake loading for terminal effect
      }
    }
    fetchData();
  }, []);

  const filteredData = data.filter(item => {
    const matchPlatform = platformFilter === 'all' || item.platform.toLowerCase().replace(/\s/g, '') === platformFilter;
    const matchDifficulty = difficultyFilter === 'all' || item.difficulty.toLowerCase() === difficultyFilter;
    const matchSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.altText.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchPlatform && matchDifficulty && matchSearch;
  });

  const stats = {
    total: data.length,
    htb: data.filter(i => i.platform.toLowerCase().replace(/\s/g, '') === 'hackthebox').length,
    thm: data.filter(i => i.platform.toLowerCase().replace(/\s/g, '') === 'tryhackme').length,
    hvm: data.filter(i => i.platform.toLowerCase().replace(/\s/g, '') === 'hackmyvm').length,
  };

  const uniquePlatforms = Array.from(new Set(data.map(item => item.platform.toLowerCase().replace(/\s/g, ''))));
  const platformsToShow = ['all', ...uniquePlatforms];

  return (
    <>
      <Head>
        <title>AISKOA - WriteUps</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="description" content="Aiskoa's Pentest machines writeups and notes." />
      </Head>

      <div className="min-h-screen py-8 font-mono">
        <div className="w-full rounded-xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#1a1d29] transition-colors duration-300">
          <div className="bg-gray-100 dark:bg-[#13151f] px-4 py-3 flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            <div className="ml-auto text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <FaTerminal />
              <span>aiskoa@writeups:~</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-4 md:p-8">
            <div className="mb-8 font-mono text-sm md:text-base">
              <div className="flex flex-wrap items-center gap-x-2 mb-2">
                <span className="text-violet-600 dark:text-green-400 font-bold">┌──(aiskoa㉿kali)-[~/writeups]</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-violet-600 dark:text-green-400 font-bold">└─$</span>
                <span className="text-gray-700 dark:text-gray-300">./list_writeups.sh</span>
                <span className="w-2 h-4 bg-gray-400 dark:bg-gray-500 animate-pulse"></span>
              </div>
            </div>

            {/* Loading State EPICCC */}
            {loading ? (
              <div className="py-12 space-y-2 font-mono text-sm">
                <div className="text-gray-500 dark:text-gray-400">[+] Initializing database connection...</div>
                <div className="text-gray-500 dark:text-gray-400">[+] Authenticating user...</div>
                <div className="text-violet-600 dark:text-green-400">[!] Loading modules...</div>
                <div className="text-violet-600 dark:text-green-400">[!] Starting writeups...</div>
                <div className="text-violet-700 dark:text-green-600">---- Ready! ----</div>
              </div>
            ) : (
              <>
                {/* ASCII Art (Hidden on small screens, maybe) */}
                <div className="hidden lg:block mb-8 text-[0.6rem] leading-none font-bold text-violet-600 dark:text-green-500/80 whitespace-pre select-none opacity-80">
{`
██╗    ██╗██████╗ ██╗████████╗███████╗██╗   ██╗██████╗ ███████╗
██║    ██║██╔══██╗██║╚══██╔══╝██╔════╝██║   ██║██╔══██╗██╔════╝
██║ █╗ ██║██████╔╝██║   ██║   █████╗  ██║   ██║██████╔╝███████╗
██║███╗██║██╔══██╗██║   ██║   ██╔══╝  ██║   ██║██╔═══╝ ╚════██║
╚███╔███╔╝██║  ██║██║   ██║   ███████╗╚██████╔╝██║     ███████║
 ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝   ╚═╝   ╚══════╝ ╚═════╝ ╚═╝     ╚══════╝
`}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 rounded-lg bg-gray-50 dark:bg-zinc-800/50 border-l-4 border-violet-500">
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Total Writeups</span>
                    <span className="text-2xl font-bold text-gray-800 dark:text-white">{stats.total}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">HackTheBox</span>
                    <span className="text-2xl font-bold text-gray-800 dark:text-white">{stats.htb}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">TryHackMe</span>
                    <span className="text-2xl font-bold text-gray-800 dark:text-white">{stats.thm}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">HackMyVM</span>
                    <span className="text-2xl font-bold text-gray-800 dark:text-white">{stats.hvm}</span>
                  </div>
                </div>

                {/* Filters & Search */}
                <div className="mb-8 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/30">
                  <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
                    
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-violet-600 dark:text-green-400 mb-1">[PLATFORM SELECTOR]</div>
                      <div className="flex flex-wrap gap-2">
                        {platformsToShow.map(p => (
                          <button
                            key={p}
                            onClick={() => setPlatformFilter(p)}
                            className={`px-3 py-1 text-xs font-medium rounded border transition-all ${
                              platformFilter === p 
                                ? 'bg-violet-600 dark:bg-green-600 text-white border-transparent' 
                                : 'text-gray-600 dark:text-gray-400 border-gray-300 dark:border-zinc-600 hover:border-violet-400 dark:hover:border-green-400'
                            }`}
                          >
                            {p.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-bold text-violet-600 dark:text-green-400 mb-1">[DIFFICULTY LEVEL]</div>
                      <div className="flex flex-wrap gap-2">
                        {['all', 'easy', 'medium', 'hard'].map(d => (
                          <button
                            key={d}
                            onClick={() => setDifficultyFilter(d)}
                            className={`px-3 py-1 text-xs font-medium rounded border transition-all ${
                              difficultyFilter === d
                                ? 'bg-violet-600 dark:bg-green-600 text-white border-transparent' 
                                : 'text-gray-600 dark:text-gray-400 border-gray-300 dark:border-zinc-600 hover:border-violet-400 dark:hover:border-green-400'
                            }`}
                          >
                            {d.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="w-full lg:w-auto mt-4 lg:mt-0">
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaSearch className="text-gray-400 group-focus-within:text-violet-500 dark:group-focus-within:text-green-400" />
                        </div>
                        <input
                          type="text"
                          className="block w-full lg:w-64 pl-10 pr-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-md leading-5 bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:border-violet-500 dark:focus:border-green-500 focus:ring-1 focus:ring-violet-500 dark:focus:ring-green-500 sm:text-sm"
                          placeholder="grep search..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-700">
                  <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
                    <thead className="bg-gray-50 dark:bg-zinc-800">
                      <tr>
                        <th scope="col" className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Machine</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">Platform</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">Difficulty</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">Techniques</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden xl:table-cell">OS</th>
                        <th scope="col" className="px-4 md:px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-[#1a1d29] divide-y divide-zinc-200 dark:divide-zinc-800">
                      {filteredData.map((item, index) => (
                        <tr key={index} 
                            onClick={() => window.location.href = item.GoToLink}
                            className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors group cursor-pointer border-b border-gray-100 dark:border-zinc-800/50 last:border-0"
                        >
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center min-w-0">
                              <div className="flex-shrink-0 h-12 w-12 relative rounded overflow-hidden border border-gray-200 dark:border-zinc-700 group-hover:border-violet-500 dark:group-hover:border-green-500 transition-colors group/image"
                                   onClick={(e) => {
                                     e.stopPropagation();
                                     setSelectedImage(item.image);
                                   }}>
                                <img className="h-full w-full object-cover transition-transform duration-300 group-hover/image:scale-110" src={item.image} alt="" />
                                <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 transition-colors flex items-center justify-center">
                                  <FaExpand className="text-white opacity-0 group-hover/image:opacity-100 transition-opacity w-3 h-3" />
                                </div>
                              </div>
                              <div className="ml-4 min-w-0 flex-1">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <a 
                                    href={item.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-green-400 transition-colors hover:underline"
                                  >
                                    {item.title}
                                  </a>
                                  <a 
                                    href={item.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="p-1 text-gray-400 hover:text-violet-600 dark:hover:text-green-400 transition-colors"
                                    title="View Machine Page"
                                  >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                  </a>
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2 md:line-clamp-none whitespace-normal pr-2">
                                  {item.description}
                                </div>
                                {/* Mobile-only badges */}
                                <div className="flex md:hidden flex-wrap gap-2 mt-2">
                                  <span className={`px-1.5 py-0.5 inline-flex items-center text-[10px] font-medium rounded border ${getPlatformStyle(item.platform)}`}>
                                    {getPlatformIcon(item.platform)}
                                    {item.platform}
                                  </span>
                                  <span className={`px-1.5 py-0.5 inline-flex items-center text-[10px] font-medium rounded border ${getDifficultyStyle(item.difficulty)}`}>
                                    {getDifficultyIcon(item.difficulty)}
                                    {item.difficulty}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                            <span className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-md border ${getPlatformStyle(item.platform)}`}>
                              {getPlatformIcon(item.platform)}
                              {item.platform}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                            <span className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-md border ${getDifficultyStyle(item.difficulty)}`}>
                              {getDifficultyIcon(item.difficulty)}
                              {item.difficulty}
                            </span>
                          </td>
                          <td className="px-6 py-4 hidden lg:table-cell">
                            <div className="flex flex-wrap gap-1">
                              {item.altText.split(',').slice(0, 3).map((tech, i) => (
                                <span key={i} className="px-2 py-0.5 text-[10px] rounded bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-zinc-700">
                                  {tech.trim()}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap hidden xl:table-cell">
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              {item.os.toLowerCase() === 'windows' ? <FaWindows className="mr-1.5" /> : <FaLinux className="mr-1.5" />}
                              {item.os}
                            </div>
                          </td>
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <span className="text-violet-600 dark:text-green-400 group-hover:text-violet-900 dark:group-hover:text-green-300 flex items-center justify-end gap-1 group-hover:translate-x-1 transition-transform">
                              <span className="hidden sm:inline">Read</span>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {filteredData.length === 0 && (
                    <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                      No writeups found matching your query.
                    </div>
                  )}
                </div>

                {/* Footer Line */}
                <div className="mt-6 flex justify-between text-xs font-mono text-gray-500 dark:text-gray-500 border-t border-zinc-200 dark:border-zinc-800 pt-4">
                  <span>[aiskoa@kali] ▪︎ listening port: 8000</span>
                  <span className="text-violet-600 dark:text-green-500">[{filteredData.length} records displayed]</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-opacity duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button 
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors p-2"
              onClick={() => setSelectedImage(null)}
            >
              <FaTimes size={24} />
            </button>
            <img 
              src={selectedImage} 
              alt="Preview" 
              className="w-full h-full object-contain rounded-lg shadow-2xl border border-gray-700"
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
        </div>
      )}
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
