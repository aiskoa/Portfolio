import type { NextPage } from 'next';
import Head from 'next/head';
import { ReactElement } from 'react';
import { About } from '../components';
import { config } from "../config/index";
import fs from 'fs';
import path from 'path';

interface HomeProps {
  translations: { [key: string]: string };
}

const Home: NextPage<HomeProps> = ({ translations }): ReactElement => {
  return (
    <div className="space-y-14 lg:space-y-24">
      <Head>
        <title>AISKOA - Cybersecurity</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="theme-color" content="#8e52f5" />
        <meta property="og:image" content={config.github.url} />
        <meta name="description" content="IT consultant and web application developer, focused on results." />
        <meta property="og:description" content="IT consultant and web application developer, focused on results." />
        <meta property="og:title" content="AISKOA - Cybersecurity" />
        <meta property="og:url" content="https://aiskoa.vercel.app" />
      </Head>
      <main className="max-w-4xl mx-auto mt-16 antialiased">
        <About translations={translations} />
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

export default Home;