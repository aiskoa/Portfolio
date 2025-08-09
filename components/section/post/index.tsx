import React from "react";
import Link from "next/link";
import { PostType } from "../../../models";

import {
  SiAstro,
  SiCplusplus,
  SiElectron,
  SiGnubash,
  SiHtml5,
  SiJavascript,
  SiLinux,
  SiPhp,
  SiPostgresql,
  SiPowershell,
  SiPython,
  SiReact,
  SiSqlite,
  SiTailwindcss,
  SiTypescript,
  SiWordpress,
  SiHelpdesk,
  SiKalilinux,
  SiWindows,
  SiGo,
  SiRust,
} from "react-icons/si";
import {
  FaLinux,
  FaJava,
  FaTools,
  FaRobot,
  FaBrain,
  FaRegMoon,
} from "react-icons/fa";

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
    go: <SiGo className="inline-block w-4 h-4 mr-1" />,
    rust: <SiRust className="inline-block w-4 h-4 mr-1" />,
    tailwindcss: <SiTailwindcss className="inline-block w-4 h-4 mr-1" />,
    cpp: <SiCplusplus className="inline-block w-4 h-4 mr-1" />,
    postgresql: <SiPostgresql className="inline-block w-4 h-4 mr-1" />,
    helpdesk: <SiHelpdesk className="inline-block w-4 h-4 mr-1" />,
    hacking: <SiKalilinux className="inline-block w-4 h-4 mr-1" />,
    tools: <FaTools className="inline-block w-4 h-4 mr-1" />,
    ai: <FaRobot className="inline-block w-4 h-4 mr-1" />,
    mental: <FaBrain className="inline-block w-4 h-4 mr-1" />,
    irl: <FaRegMoon className="inline-block w-4 h-4 mr-1" />,
    windows: <SiWindows className="inline-block w-4 h-4 mr-1" />,
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
    go: <SiGo className="inline-block w-4 h-4 mr-1" />,
    rust: <SiRust className="inline-block w-4 h-4 mr-1" />,
    tailwindcss: <SiTailwindcss className="inline-block w-4 h-4 mr-1" />,
    cpp: <SiCplusplus className="inline-block w-4 h-4 mr-1" />,
    postgresql: <SiPostgresql className="inline-block w-4 h-4 mr-1" />,
    helpdesk: <SiHelpdesk className="inline-block w-4 h-4 mr-1" />,
    hacking: <SiKalilinux className="inline-block w-4 h-4 mr-1" />,
    tools: <FaTools className="inline-block w-4 h-4 mr-1" />,
    ai: <FaRobot className="inline-block w-4 h-4 mr-1" />,
    mental: <FaBrain className="inline-block w-4 h-4 mr-1" />,
    irl: <FaRegMoon className="inline-block w-4 h-4 mr-1" />,
    windows: <SiWindows className="inline-block w-4 h-4 mr-1" />,
  };

  const l = tag_2.toLowerCase();
  return icons[l] || null;
}

export default function Post({ post }: PostType) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="px-2 my-4 md:px-3 lg:px-4">
        <article className="overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-violet-900/20 hover:border-gray-300 dark:hover:border-violet-600">
          <div className="relative overflow-hidden">
            <img
              alt={post.frontmatter.alt || post.frontmatter.title}
              className="w-full h-auto transition-transform duration-300 hover:scale-105"
              src={post.frontmatter.cover_image}
            />
          </div>
          <div className="p-4">
            <header className="leading-tight">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200">
                {post.frontmatter.title}
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                {post.frontmatter.excerpt}
              </p>
              <div className="flex items-center">
                <button
                  title="Tag 1"
                  className="flex items-center px-2 py-1 text-xs text-gray-800 border border-gray-400 rounded-md dark:text-gray-200"
                >
                  {getTagIcon(post.frontmatter.tags1)}
                  <span>{post.frontmatter.tags1}</span>
                </button>
                <span className="inline-block mx-1"></span>
                <button
                  title="Tag 2"
                  className="flex items-center px-2 py-1 text-xs text-gray-800 border border-gray-400 rounded-md dark:text-gray-200"
                >
                  {getTagIcon2(post.frontmatter.tags2)}
                  <span>{post.frontmatter.tags2}</span>
                </button>
              </div>

              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                {post.frontmatter.date}
              </p>
            </header>
          </div>
        </article>
      </div>
    </Link>
  );
}
