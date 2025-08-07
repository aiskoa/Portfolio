import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import Link from "next/link";
import Head from "next/head";
import { config } from "../../config";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import c from "react-syntax-highlighter/dist/cjs/languages/prism/c";
import go from "react-syntax-highlighter/dist/cjs/languages/prism/go";
import sql from "react-syntax-highlighter/dist/cjs/languages/prism/sql";
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism";
import php from "react-syntax-highlighter/dist/cjs/languages/prism/php";
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx";
import cpp from "react-syntax-highlighter/dist/cjs/languages/prism/cpp";
import java from "react-syntax-highlighter/dist/cjs/languages/prism/java";
import yaml from "react-syntax-highlighter/dist/cjs/languages/prism/yaml";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import batch from "react-syntax-highlighter/dist/cjs/languages/prism/batch";
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import ignore from "react-syntax-highlighter/dist/cjs/languages/prism/ignore";
import powershell from "react-syntax-highlighter/dist/cjs/languages/prism/powershell";
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { scroller } from "react-scroll";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import "katex/dist/katex.min.css";

// Registra los lenguajes para el resaltado de sintaxis
SyntaxHighlighter.registerLanguage("c", c);
SyntaxHighlighter.registerLanguage("sql", sql);
SyntaxHighlighter.registerLanguage("php", php);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("cpp", cpp);
SyntaxHighlighter.registerLanguage("go", go);
SyntaxHighlighter.registerLanguage("nx", ignore);
SyntaxHighlighter.registerLanguage("java", java);
SyntaxHighlighter.registerLanguage("yaml", yaml);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("batch", batch);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("powershell", powershell);
SyntaxHighlighter.registerLanguage("javascript", javascript);

// Definir el tipo Frontmatter
interface Frontmatter {
  title: string;
  date: string;
  cover_image: string;
  alt: string;
  excerpt: string;
  tags1: string;
  tags2: string;
}

// Definir el tipo de Props para el componente
interface PostPageProps {
  frontmatter: Frontmatter;
  content: string;
  translations: { [key: string]: string };
}

// Definir el tipo Heading para `headings`
interface Heading {
  id: string;
  text: string;
}

export default function PostPage({ frontmatter, content, translations }: PostPageProps) {
  const { title, date, cover_image, alt, excerpt, tags1, tags2 } = frontmatter;
  const router = useRouter();
  const t = (key: string) => translations[key] || key;

  const [headings, setHeadings] = useState<Heading[]>([]);
  const [showIndex, setShowIndex] = useState(false);

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll("h2"));
    const headingsData: Heading[] = headingElements.map((heading) => ({
      id: heading.id,
      text: heading.innerText,
    }));
    setHeadings(headingsData);
  }, [content]);

  const scrollTo = (id: string) => {
    scroller.scrollTo(id, {
      smooth: true,
      offset: -100,
    });
  };

  const toggleIndex = () => {
    setShowIndex(!showIndex);
  };

  return (
    <>
      <Head>
        <title>AISKOA - Blog</title>
        <link rel="shortcut icon" type="image/jpg" href="/favicon.ico" />
        <meta name="description" content={excerpt} />
        <meta property="og:site_name" content="AISKOA Cybersecurity" />
        <meta property="og:type" content="article" />
        <meta property="og:description" content={excerpt} />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="https://aiskoa.vercel.app" />
        <meta property="og:image" content={cover_image} />
        <meta name="theme-color" content="#8e52f5" />
      </Head>
      
      {/* Contenedor principal con padding top para compensar navbar fijo */}
      <div className="min-h-screen pt-16 pb-8">
        {/* Botones de navegación */}
        <div className="flex justify-start ml-5 text-center mb-6">
          <Link href="/blog">
            <button
              type="button"
              className="me-5 inline-block px-6 py-2.5 bg-purple-600 text-white dark:text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out dark:bg-purple-600 dark:hover:bg-purple-700 dark:active:bg-purple-800 dark:focus:bg-purple-700"
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m15 19-7-7 7-7"
                />
              </svg>
            </button>
          </Link>
          
          {/* Botón para mostrar/ocultar el índice en móvil */}
          <button
            type="button"
            onClick={toggleIndex}
            className="md:hidden me-5 inline-block px-6 py-2.5 bg-purple-600 text-white dark:text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out dark:bg-purple-600 dark:hover:bg-purple-700 dark:active:bg-purple-800 dark:focus:bg-purple-700"
          >
            {showIndex ? "Ocultar Índice" : "Mostrar Índice"}
          </button>
        </div>

        {/* Contenedor principal con mejor estructura */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
          {/* Índice flotante - Mejorado */}
          <aside 
            className={`
              ${showIndex ? 'block' : 'hidden'} 
              md:block md:fixed md:top-24 md:right-4 md:w-72 lg:w-80
              z-20 w-full mb-6 md:mb-0 p-4 
              bg-white/90 backdrop-blur-sm rounded-lg shadow-lg 
              dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700
              max-h-[calc(100vh-8rem)] overflow-y-auto
            `}
          >
            <h3 className="mb-4 font-bold text-center text-gray-800 dark:text-white border-b pb-2">
              {t("index_title")}
            </h3>
            <ul className="text-gray-800 dark:text-gray-200 space-y-2">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <button
                    onClick={() => scrollTo(heading.id)}
                    disabled={heading.id === ""}
                    className="w-full text-left p-2 rounded-md bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 font-medium text-blue-600 dark:text-violet-400 hover:text-blue-800 dark:hover:text-violet-200 text-sm"
                  >
                    {heading.text}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Contenido del post con margen apropiado */}
          <div className="w-full md:mr-80 lg:mr-96">
            {/* Header del post */}
            <header className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                {title}
              </h1>
              <div className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-2">
                {excerpt}
              </div>
              <div className="text-base md:text-lg text-gray-500 dark:text-gray-400 mb-2">
                {date}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                {tags1}, {tags2}
              </div>
              <div className="mb-8">
                <img
                  src={cover_image}
                  alt={alt}
                  className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
                />
              </div>
            </header>

            {/* Contenido del markdown */}
            <article className="w-full max-w-none">
              <div className="prose prose-base md:prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-img:rounded-lg prose-img:shadow-md">
                <ReactMarkdown
                  remarkPlugins={[gfm, remarkMath]}
                  rehypePlugins={[rehypeSlug, rehypeKatex]}
                  components={{
                    // Solucionamos el problema de anidación: las imágenes no se envuelven en p
                    img: ({ node, ...props }) => (
                      <span className="block my-6">
                        <Zoom>
                          <img 
                            {...props} 
                            alt={props.alt || 'Imagen'} 
                            className="w-full rounded-lg shadow-md"
                          />
                        </Zoom>
                        {props.alt && (
                          <span className="block text-center text-sm text-gray-600 dark:text-gray-400 mt-2 italic">
                            {props.alt}
                          </span>
                        )}
                      </span>
                    ),
                    // Mejoramos los blockquotes
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-blue-500 pl-4 my-6 italic text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-4 rounded-r-lg">
                        {children}
                      </blockquote>
                    ),
                    // Componente de código mejorado
                    code: CodeComponent,
                    // Párrafos normales - sin cambios especiales
                    p: ({ children }) => {
                      // Filtramos elementos que no deberían estar en párrafos
                      const hasBlockElements = React.Children.toArray(children).some(child => 
                        React.isValidElement(child) && 
                        typeof child.type === 'function' && 
                        (child.type.name === 'img' || child.props?.className?.includes('block'))
                      );
                      
                      if (hasBlockElements) {
                        return <div className="mb-4 leading-relaxed">{children}</div>;
                      }
                      
                      return <p className="mb-4 leading-relaxed">{children}</p>;
                    },
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}

// Componente para el resaltado de código mejorado
interface CodeComponentProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const CodeComponent: React.FC<CodeComponentProps> = ({
  inline,
  className,
  children,
  ...props
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "";

  return !inline && match ? (
    <div className="relative my-6 rounded-lg overflow-hidden shadow-lg">
      <div className="flex justify-between items-center bg-gray-800 px-4 py-2 text-white text-sm">
        <span className="font-medium">#{language.toUpperCase()}</span>
        <div className="flex items-center space-x-2">
          {copied ? (
            <span className="text-green-400 font-medium">¡Copiado!</span>
          ) : (
            <CopyToClipboard
              text={String(children)}
              onCopy={() => setCopied(true)}
            >
              <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors duration-200">
                Copiar
              </button>
            </CopyToClipboard>
          )}
        </div>
      </div>
      <SyntaxHighlighter 
        showLineNumbers={true} 
        language={language} 
        style={okaidia}
        customStyle={{
          margin: 0,
          borderRadius: 0,
        }}
      >
        {String(children)}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code className={`${className} px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono`} {...props}>
      {children}
    </code>
  );
};

// Mantener las interfaces y funciones getStaticPaths/getStaticProps igual
interface Params {
  slug: string;
}

export async function getStaticPaths({ locales }: { locales: string[] }) {
  const paths = locales.flatMap((locale) => {
    const postsDirectory = path.join(process.cwd(), 'posts', locale);
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }
    const files = fs.readdirSync(postsDirectory);
    return files
      .filter((filename) => filename.endsWith(".md"))
      .map((filename) => ({
      params: { slug: filename.replace(".md", "") },
      locale,
    }));
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params, locale }: { params: Params, locale: string }) {
  const markdownWithMeta = fs.readFileSync(
    path.join(process.cwd(), 'posts', locale, params.slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  const translationsPath = path.join(process.cwd(), 'locales', locale, 'index.json');
  const translationsFile = fs.readFileSync(translationsPath, 'utf8');
  const translations = JSON.parse(translationsFile);

  return {
    props: {
      frontmatter,
      content,
      translations,
    },
  };
}