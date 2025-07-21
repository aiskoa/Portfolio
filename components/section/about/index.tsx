import React, { ReactElement } from "react";
import Image from "next/image";

import { config } from "../../../config/index";
import Link from "next/link";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Tooltip as MaterialTooltip } from "@material-tailwind/react";
import dynamic from 'next/dynamic';

const Tooltip = dynamic(() => Promise.resolve(MaterialTooltip), {
  ssr: false,
});
import {
  SiReact, SiNextdotjs,
  SiNodedotjs, SiVercel, SiGnubash, SiPython, SiMysql, SiKalilinux,
  SiMicrosoftazure, SiPlatzi, SiUdemy, SiLinkedin, SiTwitter,
  SiDiscord, SiJavascript, SiMicrosoftsqlserver, SiCisco,
  SiFigma, SiPhp, SiMicrosoft, SiGit, SiSqlite, SiCplusplus,
  SiPostgresql,
  SiCloudflare,
  SiHtml5,
  SiAstro,
  SiElectron,
  SiTailwindcss,
  SiApache,
  SiDebian,
  SiDocker,
  SiNginx,
  SiNotion,
  SiUbuntu,
  SiVisualstudiocode,
  SiAmazonaws,
  SiGithub,
  SiMongodb,
  SiOvh,
  SiVmware,
  SiBluetooth,
  SiRaspberrypi,
  SiWordpress,
  SiGo,
} from "react-icons/si";

interface AboutProps {
  translations: { [key: string]: string };
}

const About: React.FC<AboutProps> = ({ translations }): ReactElement => {
  const t = (key: string) => translations[key] || key;

  const skillsData = [
    {
      title: t("languages"),
      icons: [
        { key: "bash", text: "Bash", icon: <SiGnubash size={16} className="text-gray-800 dark:text-gray-100"/> },
        { key: "cplusplus", text: "C++", icon: <SiCplusplus size={16} className="text-gray-800 dark:text-gray-100"/> },
        { key: "go", text: "Go", icon: <SiGo size={16} className="text-gray-800 dark:text-gray-100"/> },
        { key: "html5", text: "HTML", icon: <SiHtml5 size={16} className="text-gray-800 dark:text-gray-100"/> },
        { key: "javascript", text: "JavaScript", icon: <SiJavascript size={16} className="text-gray-800 dark:text-gray-100"/> },
        { key: "python", text: "Python", icon: <SiPython size={16} className="text-gray-800 dark:text-gray-100"/> },
        { key: "sql", text: "SQL", icon: <SiSqlite size={16} className="text-gray-800 dark:text-gray-100"/> },
        { key: "php", text: "PHP", icon: <SiPhp size={16} className="text-gray-800 dark:text-gray-100"/> },
      ],
    },
    {
      title: t("frameworks_lib"),
      icons: [
        { key: "electron", text: "Electron", icon: <SiElectron size={16} className="text-gray-800 dark:text-gray-100"/> },
        { key: "nextjs", text: "Next.js", icon: <SiNextdotjs size={16} className="text-gray-800 dark:text-gray-100"/> },
        { key: "react", text: "React", icon: <SiReact size={16} className="text-gray-800 dark:text-gray-100"/> },
        { key: "nodejs", text: "Node.js", icon: <SiNodedotjs size={16} className="text-gray-800 dark:text-gray-100"/> },
        { key: "tailwindcss", text: "Tailwind CSS", icon: <SiTailwindcss size={16} className="text-gray-800 dark:text-gray-100"/>},
        { key: "wordpress", text: "WordPress", icon: <SiWordpress size={16} className="text-gray-800 dark:text-gray-100"/> },
      ],
    },
    {
      title: t("tools"),
      icons: [
        { key: "apache", text: "Apache", icon: <SiApache size={16} className="text-gray-800 dark:text-gray-100"/> },
        { key: "debian", text: "Debian", icon: <SiDebian size={16} className="text-gray-800 dark:text-gray-100"/> },
        { key: "docker", text: "Docker", icon: <SiDocker size={16} className="text-gray-800 dark:text-gray-100"/> },
        { key: "git", text: "Git", icon: <SiGit size={16} className="text-gray-800 dark:text-gray-100"/> },
        { key: "nginx", text: "Nginx", icon: <SiNginx size={16} className="text-gray-800 dark:text-gray-100"/> },
        { key: "ubuntu", text: "Ubuntu", icon: <SiUbuntu size={16} className="text-gray-800 dark:text-gray-100"/> },
        { key: "vscode", text: "VSCode", icon: <SiVisualstudiocode size={16} className="text-gray-800 dark:text-gray-100"/> },
        { key: "kalilinux", text: "Kali Linux", icon: <SiKalilinux size={16} className="text-gray-800 dark:text-gray-100"/> },
        { key: "vmware", text: "VMware", icon: <SiVmware size={16} className="text-gray-800 dark:text-gray-100"/> },
      ],
    },
    {
      title: t("clouds_bd"),
      icons: [
        { key: "azure", text: "Azure", icon: <SiMicrosoftazure size={16} className="text-gray-800 dark:text-gray-100"/> }, 
        { key: "aws", text: "AWS", icon: <SiAmazonaws size={16} className="text-gray-800 dark:text-gray-100"/> },
        { key: "cloudflare", text: "Cloudflare", icon: <SiCloudflare size={16} className="text-gray-800 dark:text-gray-100"/> },
        { key: "cisco", text: "Cisco", icon: <SiCisco size={16} className="text-gray-800 dark:text-gray-100"/> },
        { key: "github", text: "GitHub", icon: <SiGithub size={16} className="text-gray-800 dark:text-gray-100"/> },
        { key: "mysql", text: "MySQL", icon: <SiMysql size={16} className="text-gray-800 dark:text-gray-100"/> },
        { key: "postgresql", text: "PostgreSQL", icon: <SiPostgresql size={16} className="text-gray-800 dark:text-gray-100"/> },
        { key: "ovh", text: "OVH", icon: <SiOvh size={16} className="text-gray-800 dark:text-gray-100"/> },
        { key: "vercel", text: "Vercel", icon: <SiVercel size={16} className="text-gray-800 dark:text-gray-100"/> },
      ],
    },
    // {
    //   title: "Hardware",
    //   icons: [
    //     { key: "bluetooth", text: "Bluetooth", icon: <SiBluetooth size={16} className="text-gray-800 dark:text-gray-100"/> },
    //     { key: "raspberrypi", text: "Raspberrypi", icon: <SiRaspberrypi size={16} className="text-gray-800 dark:text-gray-100"/> },
    //   ],
    // },
  ];

  return (
    <div className="container relative px-4 mx-auto">
      {/* background image gif */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('../bgChess.gif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(5px)",
          opacity: 0.2,
          mixBlendMode: "multiply",
        }}
      />
      {/* principal content */}
      <div className="relative z-10">
        
        <div className="flex flex-col-reverse text-center lg:space-x-5 lg:flex lg:flex-row item-center lg:-mx-4 lg:text-left">
          <div className="lg:px-4 lg:mt-12 ">
            <h1 className="text-2xl font-bold text-black-900 lg:text-5xl dark:text-white">
              Alejandro Aguilar
            </h1>
            <h2 className="text-2xl font-bold lg:text-3xl">
              <span className="text-transparent bg-gradient-to-r from-black to-gray-400 dark:from-white dark:to-gray-600 bg-clip-text">
                {t("job")}
              </span>
            </h2>
            <div className="flex items-center justify-center mt-2 space-x-2 md:justify-center lg:justify-start xsm:justify-center sm:justify-center">
              <Link href={t("resume-link")}>
                <button
                  type="button"
                  className="inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-600 active:shadow-lg transition duration-150 ease-in-out dark:bg-purple-600 dark:hover:bg-purple-700 dark:active:bg-purple-800 dark:focus:bg-purple-700"
                >
                  <span className="animate-spin inline-block w-2 h-2 border-[2px] border-current border-t-transparent rounded-full mr-2"></span>
                  <span>{t("resume")}</span>
                </button>
              </Link>
            </div>
            <div className="mt-6 text-gray-800 dark:text-white">
              <p className="mb-4 select-none">{t("about-me")}</p>
            </div>
          </div>
          <div className="flex-shrink-0 mx-auto mb-10 pointer-events-none focus:pointer-events-auto lg:mt-12 lg:px-4" draggable="false">
            <Image
              src={config.github.url}
              priority={true}
              alt="Profile"
              className="rounded-full"
              width="250"
              height="250"
            />
          </div>
        </div>
        <div className="flex flex-row justify-center space-x-2 md:justify-center lg:justify-start xsm:justify-center sm:justify-center">
          <Link href="/contact">
            <button
              type="button"
              className="mt-2 inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-700 active:shadow-lg transition duration-150 ease-in-out dark:bg-purple-600 dark:hover:bg-purple-700 dark:active:bg-purple-800 dark:focus:bg-purple-700"
            >
              <span>{t("me")}</span>
            </button>
          </Link>
          <Link href="/blog">
            <button
              type="button"
              className="mt-2 inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-600 active:shadow-lg transition duration-150 ease-in-out dark:bg-purple-600 dark:hover:bg-purple-700 dark:active:bg-purple-800 dark:focus:bg-purple-700"
            >
              <span>{t("button_blog")}</span>
            </button>
          </Link>
          <Link href="/writeup">
            <button
              type="button"
              className="mt-2 inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-black active:shadow-lg transition duration-150 ease-in-out dark:bg-purple-600 dark:hover:bg-purple-700 dark:active:bg-purple-800 dark:focus:bg-purple-700"
            >
              <span>{t("machines")}</span>
            </button>
          </Link>
        </div>
      {/* Sección de Skills como etiquetas */}
      <div className="mt-10">
        <h2 className="text-xl text-center">{t("skills")}</h2>
        <div className="ml-5">
          {skillsData.map((category) => (
            <div key={category.title} className="mb-4">
              <h3 className="font-semibold">{category.title}</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {category.icons.map((skill) => (
                  <Tooltip
                    key={skill.key}
                    placement="top"
                    className="mt-0.5 p-1 bg-gray-800 text-white text-xs rounded animate-fadeIn"
                    content={skill.text}
                    nonce=""
                    onResize={() => {}}
                    onResizeCapture={() => {}}
                  >
                    <span
                      className="inline-flex items-center rounded-full
                                bg-gray-200 text-gray-800
                                dark:bg-gray-700 dark:text-gray-100
                                text-xs py-0.5 px-2 transition-colors duration-300"
                    >
                      {skill.icon}
                      <span className="ml-1">{skill.text}</span>
                    </span>
                  </Tooltip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default About;