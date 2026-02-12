import React, { ReactElement } from "react";
import { SiDiscord, SiGithub, SiHackthebox, SiInstagram, SiLinkedin, SiTryhackme, SiX } from "react-icons/si";
import { config } from "../../../../config/index";
import { SkillsIcon } from "../../../";

interface FooterProps {
  translations: { [key: string]: string };
}

/**
 * @description Footer contains links to socials and important stuff
 * @returns { ReactElement } Footer component
 */

const Footer: React.FC<FooterProps> = ({ translations }): ReactElement => {
  const t = (key: string) => translations[key] || key;
  return (
    <div className="py-6 mt-12 lg:mt-18 sm:pb-36 sm:py-12">
      <div className="container mx-auto px-4 text-gray-800 dark:text-white">
        <div className="pb-8 mb-2 border-t-2 border-gray-300 dark:border-white-300"></div>
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <p>{t("footer")}</p>
          <div className="flex flex-wrap pt-2 space-x-2 text-2xl font-medium sm:space-x-4 lg:pt-0">
            <a
                href={config.socials.linkedin}
                className={"transition-colors dark:hover:border-violet-800 hover:text-yellow-500 p-1"}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
              <SkillsIcon text="Linkedin" children={<SiLinkedin />} />
            </a>
            <a
              href={config.socials.github}
              className={"transition-colors dark:hover:border-violet-800 hover:text-yellow-500 p-1"}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <SkillsIcon text="GitHub" children={<SiGithub />} />
            </a>
            <a
                href={config.socials.instagram}
                className={"transition-colors dark:hover:border-violet-800 hover:text-yellow-500 p-1"}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <SkillsIcon text="Instagram" children={<SiInstagram />} />
            </a>
            <a
              href={config.socials.twitter}
              className={"transition-colors dark:hover:border-violet-800 hover:text-yellow-500 p-1"}
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
            >
              <SkillsIcon text="X" children={<SiX />} />
            </a>
            <a
              href={config.socials.discord}
              className={"transition-colors dark:hover:border-violet-800 hover:text-yellow-500 p-1"}
              target="_blank"
              rel="noreferrer"
              aria-label="Discord"
            >
              <SkillsIcon text="Discord" children={<SiDiscord />} />
            </a>
            <a
              href={config.socials.Hackthebox}
              className={"transition-colors dark:hover:border-violet-800 hover:text-yellow-500 p-1"}
              target="_blank"
              rel="noreferrer"
              aria-label="HackTheBox"
            >
              <SkillsIcon text="HackTheBox" children={<SiHackthebox />} />
            </a>
            <a
              href={config.socials.TryHackMe}
              className={"transition-colors dark:hover:border-violet-800 hover:text-yellow-500 p-1"}
              target="_blank"
              rel="noreferrer"
              aria-label="TryHackMe"
            >
              <SkillsIcon text="TryHackMe" children={<SiTryhackme />} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
