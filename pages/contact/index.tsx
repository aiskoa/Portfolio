import { config } from "../../config/index";
import { NextPage } from "next";
import Head from "next/head";
import { Contact } from "../../components";
import { ReactElement } from "react";
import fs from 'fs';
import path from 'path';

interface ContactSectionProps {
  translations: { [key: string]: string };
}

const ContactSection: NextPage<ContactSectionProps> = ({ translations }): ReactElement => {
  return (
    <div className="space-y-14 lg:space-y-24">
      <Head>
        <title>AISKOA - Contact</title>
        <link rel="shortcut icon" type="image/jpg" href="../favicon.ico" />
        <meta property="og:image"
          content={config.github.url} />
        <meta name="description"
          content="Skills section - Here I list most of the skills I use in my daily basis and my personal projects"></meta>
        <meta property="og:description"
          content="Skills section - Here I list most of the skills I use in my daily basis and my personal projects"/>
        <meta property="og:title" content="AISKOA - Cybersecurity" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: *; font-src 'self'; connect-src 'self' https://vitals.vercel-insights.com;"
        />
        <meta name="theme-color:" content="#8e52f5"></meta>
        <meta property="og:url" content="https://aiskoa.vercel.app" />
      </Head>
      <main className="max-w-4xl mx-auto mt-16 antialiased">
        <Contact translations={translations} />
      </main>
    </div>
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

export default ContactSection;