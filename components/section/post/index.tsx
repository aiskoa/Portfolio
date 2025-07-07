import React from "react";
import Link from "next/link";
import { PostType } from "../../../models";

import { SiAstro, SiCplusplus, SiElectron, SiGnubash, SiHtml5, SiJavascript, SiLinux, SiPhp, SiPostgresql, SiPowershell, SiPython, SiReact, SiSqlite, SiTailwindcss, SiTypescript, SiWordpress, SiHelpdesk, SiKalilinux, SiWindows} from "react-icons/si";
import { FaLinux, FaJava, FaTools, FaRobot, FaBrain, FaRegMoon } from "react-icons/fa";

function getTagIcon(tag_1: string) {
  const icons: Record<string, JSX.Element> = {
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
    powershell: <SiPowershell className="inline-block w-4 h-4 mr-1" />,
    php: <SiPhp className="inline-block w-4 h-4 mr-1" />,
    wordpress: <SiWordpress className="inline-block w-4 h-4 mr-1" />,
    go: <SiGnubash className="inline-block w-4 h-4 mr-1" />,
    rust: <SiGnubash className="inline-block w-4 h-4 mr-1" />,
    tailwindcss: <SiTailwindcss className="inline-block w-4 h-4 mr-1" />,
    cpp: <SiCplusplus className="inline-block w-4 h-4 mr-1" />,
    postgresql: <SiPostgresql className="inline-block w-4 h-4 mr-1" />,
    helpdesk: <SiHelpdesk className="inline-block w-4 h-4 mr-1" />,
    hacking: <SiKalilinux className="inline-block w-4 h-4 mr-1" />,
    tools: <FaTools className="inline-block w-4 h-4 mr-1" />,
    ai: <FaRobot className="inline-block w-4 h-4 mr-1" />,
    mental: <FaBrain className="inline-block w-4 h-4 mr-1" />,
    irl: <FaRegMoon className="inline-block w-4 h-4 mr-1" />,
    windows: <SiWindows className="inline-block w-4 h-4 mr-1" />
  };

  const l = tag_1.toLowerCase();
  return icons[l] || null;
}

function getTagIcon2(tag_2: string) {
  const icons: Record<string, JSX.Element> = {
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
    powershell: <SiPowershell className="inline-block w-4 h-4 mr-1" />,
    php: <SiPhp className="inline-block w-4 h-4 mr-1" />,
    wordpress: <SiWordpress className="inline-block w-4 h-4 mr-1" />,
    go: <SiGnubash className="inline-block w-4 h-4 mr-1" />,
    rust: <SiGnubash className="inline-block w-4 h-4 mr-1" />,
    tailwindcss: <SiTailwindcss className="inline-block w-4 h-4 mr-1" />,
    cpp: <SiCplusplus className="inline-block w-4 h-4 mr-1" />,
    postgresql: <SiPostgresql className="inline-block w-4 h-4 mr-1" />,
    helpdesk: <SiHelpdesk className="inline-block w-4 h-4 mr-1" />,
    hacking: <SiKalilinux className="inline-block w-4 h-4 mr-1" />,
    tools: <FaTools className="inline-block w-4 h-4 mr-1" />,
    ai: <FaRobot className="inline-block w-4 h-4 mr-1" />,
    mental: <FaBrain className="inline-block w-4 h-4 mr-1" />,
    irl: <FaRegMoon className="inline-block w-4 h-4 mr-1" />,
    windows: <SiWindows className="inline-block w-4 h-4 mr-1" />
  };

  const l = tag_2.toLowerCase();
  return icons[l] || null;
}

export default function Post({ post }: PostType) {
  
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="px-4 my-4 custom-card md:px-6 lg:px-8">
        <article className="overflow-hidden border-2 rounded-lg shadow-lg dark:hover:border-violet-700 hover:border-black dark:bg-slate-800">
          <img
              alt={post.frontmatter.title}
              className="block object-cover custom-image"
              src={post.frontmatter.cover_image}
            />
          <div className="p-4">
            <header className="leading-tight">
              <h1 className="text-2xl font-bold">
                {post.frontmatter.title}
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {post.frontmatter.excerpt} 
              </p>
              <div className="flex items-center mt-2 space-x-2">
                <button
                      title="Tag 1"
                      className="flex items-center px-2 py-1 text-xs text-gray-800 border border-gray-400 rounded-md dark:text-gray-200"
                    >
                    {getTagIcon(post.frontmatter.tags1)}
                    <span>{post.frontmatter.tags1}</span>
                </button>
                <button
                      title="Tag 1"
                      className="flex items-center px-2 py-1 text-xs text-gray-800 border border-gray-400 rounded-md dark:text-gray-200"
                    >
                    {getTagIcon2(post.frontmatter.tags2)}
                    <span>{post.frontmatter.tags2}</span>
                </button>
              </div>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                {post.frontmatter.date}
              </p>
            </header>
          </div>
        </article>
      </div>
    </Link>
  );
}
