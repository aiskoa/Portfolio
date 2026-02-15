import { config } from "../../../config";
import Image from "next/image";
import Box from "../../common/box";
import {
  SiReact, SiNextdotjs,
  SiNodedotjs, SiVercel, SiGnubash, SiPython, SiMysql, SiKalilinux,
  SiPlatzi, SiUdemy, SiLinkedin,
  SiDiscord, SiJavascript, SiCisco,
  SiFigma, SiPhp, SiGit, SiSqlite, SiCplusplus,
  SiPostgresql,
  SiCloudflare,
  SiX,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { DiMsqlServer } from "react-icons/di";
import { FaMicrosoft } from "react-icons/fa";
import { ReactElement } from "react";
import { SkillsIcon } from "../..";

interface SkillsProps {
  translations: { [key: string]: string };
}

/**
 * @description Skills section
 * @returns { ReactElement } A preview of the skills section
 */

const Skills: React.FC<SkillsProps> = ({ translations }): ReactElement => {
  const t = (key: string) => translations[key] || key;
  return (
    <>
      <div className="flex justify-center place-items-center">
        <div className="flex-shrink-0 mb-10 lg:mt-12 lg:px-4" draggable="false">
          <Image
            src={config.github.url}
            alt="Profile"
            priority={true}
            className="rounded-full"
            draggable="false"
            width={250}
            height={250}
          />
        </div>
      </div>
      <h2 className="ml-5 text-2xl dark:text-white">{t("skills")}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4">
        <Box
          title={t("languages")}
          icons={[
          <SkillsIcon key={"javascript"} text="Javascript" children={<SiJavascript />} />,
          <SkillsIcon key={"python"} text="Python" children={<SiPython />} />,
          <SkillsIcon key={"cplusplus"} text="C++" children={<SiCplusplus />} />,
        ]}
        />
        <Box
          title="Frontend"
          icons={[
            <SkillsIcon key={"react"} text="React" children={<SiReact />} />,
            <SkillsIcon key={"next"} text="Nextjs" children={<SiNextdotjs />} />,
            <SkillsIcon key={"figma"} text="Figma" children={<SiFigma />} />,
          ]}
        />
        <Box
          title="Backend"
          icons={[
            <SkillsIcon key={"node"} text="Nodejs" children={<SiNodedotjs />} />,
            <SkillsIcon key={"php"} text="PHP" children={<SiPhp />} />,
            <SkillsIcon key={"sql"} text="SQL" children={<SiSqlite />} />,
          ]}
        />
        <Box
          title="DBs"
          icons={[
            <SkillsIcon key={"postgreSQL"} text="PostgreSQL" children={<SiPostgresql />} />,
            <SkillsIcon key={"sqlServer"} text="SQL Server" children={<DiMsqlServer />} />,
            <SkillsIcon key={"mysql"} text="MySQL" children={<SiMysql />} />,
          ]}
        />
        <Box
          title={t("other")}
          icons={[
            <SkillsIcon key={"kali"} text="Kali Linux" children={<SiKalilinux />} />,
            // <SkillsIcon text="Docker" children={<SiDocker />} />,
            <SkillsIcon key={"git"} text="Git" children={<SiGit />} />,
            <SkillsIcon key={"bash"} text="Bash" children={<SiGnubash />} />,
          ]}
        />
        <Box
          title={t("cloud")}
          icons={[
            // <SkillsIcon text="Heroku" children={<SiHeroku />} />,
            <SkillsIcon key={"vercel"} text="Vercel" children={<SiVercel />} />,
            <SkillsIcon key={"azure"} text="Azure" children={<VscAzure />} />,
            <SkillsIcon key={"cisco"} text="Cisco" children={<SiCloudflare />} />,
          ]}
        />
        <Box
          title={t("education")}
          icons={[
            <a key="microsoft" href="https://www.linkedin.com/groups/14079083/">
              <SkillsIcon text="MS Aleph" children={<FaMicrosoft />} />
            </a>,
            <a key="platzi" href="https://platzi.com/p/alejandro-aguilar74/">
              <SkillsIcon text="PLatzi" children={<SiPlatzi />} />
            </a>,
            <a key="udemy" href="https://www.udemy.com/user/alejandro-aguilar-120/">
              <SkillsIcon text="Udemy" children={<SiUdemy />} />
            </a>,
          ]}
        />
        <Box
          title={t("comunication")}
          icons={[
              <a key="discord" href="https://discord.com/users/1035181000872951838">
                <SkillsIcon text="Discord" children={<SiDiscord />} />
              </a>,
              <a key="twitter" href="https://twitter.com/aiskoac">
              <SkillsIcon text="X" children={<SiX />} />
            </a>,
              <a key="linkedin" href="https://www.linkedin.com/in/aiskoa/">
                <SkillsIcon text="Linkedin" children={<SiLinkedin />} />
              </a>,
            ]}
          />
        {/* 𝕽♛ */}
      </div>
    </>
  );
};

export default Skills;
