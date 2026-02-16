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
import { PrismLight as SyntaxHighlighterBase } from "react-syntax-highlighter";
const SyntaxHighlighter = SyntaxHighlighterBase as any;
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
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import "katex/dist/katex.min.css";
import { BsTwitterX, BsDownload, BsFileEarmarkCode } from "react-icons/bs";
import { FaFacebook, FaLinkedin, FaLink, FaArrowUp } from "react-icons/fa";

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
SyntaxHighlighter.registerLanguage("TypeScript", typescript);

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
  previousPost?: { slug: string; title: string } | null;
  nextPost?: { slug: string; title: string } | null;
  slug: string; // Added slug to props
}

// Definir el tipo Heading para `headings`
interface Heading {
  id: string;
  text: string;
}

export default function PostPage({ frontmatter, content, translations, previousPost, nextPost, slug }: PostPageProps) {
  const { title, date, cover_image, alt, excerpt, tags1, tags2 } = frontmatter;
  const router = useRouter();
  const t = (key: string) => translations[key] || key;

  const [headings, setHeadings] = useState<Heading[]>([]);
  const [showIndex, setShowIndex] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeHeading, setActiveHeading] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Función para calcular tiempo de lectura
  const calculateReadingTime = (text: string): number => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    return readingTime;
  };

  const readingTime = calculateReadingTime(content);

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll("h2"));
    const headingsData: Heading[] = headingElements.map((heading) => ({
      id: heading.id,
      text: heading.innerText,
    }));
    setHeadings(headingsData);

    // Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -40% 0px" }
    );

    headingElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [content]);

  // useEffect para la barra de progreso de lectura y scroll top
  useEffect(() => {
    const updateReadingProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
      
      const scrollableHeight = docHeight - windowHeight;
      
      // Show/Hide scroll top button
      setShowScrollTop(scrollTop > 500);
      
      if (scrollableHeight <= 0) {
        setReadingProgress(0);
        return;
      }
      
      const progress = (scrollTop / scrollableHeight) * 100;
      const clampedProgress = Math.min(100, Math.max(0, progress));
      
      setReadingProgress(clampedProgress);
    };

    updateReadingProgress();
    setTimeout(updateReadingProgress, 100);
    
    const handleScroll = () => {
      updateReadingProgress();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateReadingProgress);
    window.addEventListener('load', updateReadingProgress);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateReadingProgress);
      window.removeEventListener('load', updateReadingProgress);
    };
  }, []);

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadMarkdown = () => {
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = `${slug}.md`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      // Close mobile menu if open
      if (window.innerWidth < 1024) {
        setShowIndex(false);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const toggleIndex = () => {
    setShowIndex(!showIndex);
  };

  // Structured Data for LLMs/SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "image": cover_image,
    "datePublished": date, // Assuming date format is compatible or simple string
    "author": {
      "@type": "Person",
      "name": "Alejandro Aguilar", // Should probably be dynamic from config
      "url": "https://aiskoa.vercel.app"
    },
    "description": excerpt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://aiskoa.vercel.app/blog/${slug}`
    }
  };

  return (
    <>
      <Head>
        <title>{title} | AISKOA</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="description" content={excerpt} />
        <meta property="og:site_name" content="AISKOA Cybersecurity" />
        <meta property="og:type" content="article" />
        <meta property="og:description" content={excerpt} />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={`https://aiskoa.vercel.app/blog/${slug}`} />
        <meta property="og:image" content={cover_image} />
        <meta name="theme-color" content="#8e52f5" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      
      {/* Barra de progreso de lectura */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div 
          className="h-full bg-gradient-to-r from-violet-500 to-purple-600 transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Contenedor principal */}
      <div className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          
          {/* Layout Grid: Content + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 xl:gap-12 relative">
            
            {/* Columna Principal: Artículo */}
            <main className="w-full min-w-0">
              {/* Botón Volver */}
              <div className="mb-6">
                <Link href="/blog">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7 7-7" />
                    </svg>
                    Back to Blog
                  </button>
                </Link>
              </div>

              {/* Header del post */}
              <header className="mb-10">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                  {title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-8 border-b border-gray-200 dark:border-gray-800 pb-8">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {date}
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {readingTime} min read
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-full text-xs font-medium border border-violet-200 dark:border-violet-800">
                      {tags1}
                    </span>
                    {tags2 && (
                      <span className="px-2 py-0.5 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-full text-xs font-medium border border-violet-200 dark:border-violet-800">
                        {tags2}
                      </span>
                    )}
                  </div>
                </div>

                <div className="relative rounded-xl overflow-hidden shadow-xl aspect-video bg-gray-100 dark:bg-gray-800">
                  <img
                    src={cover_image}
                    alt={alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </header>

              {/* Contenido del markdown */}
              <article className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:scroll-mt-24
                prose-img:rounded-xl prose-img:shadow-lg
                prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800
              ">
                <ReactMarkdown
                  remarkPlugins={[gfm, remarkMath]}
                  rehypePlugins={[rehypeSlug, rehypeKatex]}
                  components={{
                    img: ({ node, ...props }) => (
                      <div className="block my-8">
                        <Zoom>
                          <img 
                            {...props} 
                            alt={props.alt || 'Imagen'} 
                            className="w-full rounded-xl shadow-lg border border-gray-200 dark:border-gray-800"
                          />
                        </Zoom>
                        {props.alt && (
                          <span className="block text-center text-sm text-gray-500 dark:text-gray-400 mt-3 italic">
                            {props.alt}
                          </span>
                        )}
                      </div>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-violet-500 pl-6 my-8 italic text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-r-xl not-italic">
                        <div className="relative">
                          <svg className="absolute -top-4 -left-2 w-8 h-8 text-violet-200 dark:text-violet-900 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21L14.017 18C14.017 16.896 14.321 16.061 14.929 15.495C15.537 14.929 16.49 14.545 17.787 14.343V11.142C16.879 11.214 16.142 11.393 15.576 11.679C15.01 11.965 14.565 12.441 14.241 13.106C13.565 12.33 12.981 11.411 12.489 10.349C11.997 9.287 11.751 8.046 11.751 6.626H7.957C7.957 8.846 8.441 10.95 9.409 12.939C10.377 14.928 11.913 16.941 14.017 18.979V21ZM5.983 21L5.983 18C5.983 16.896 6.287 16.061 6.895 15.495C7.503 14.929 8.456 14.545 9.753 14.343V11.142C8.845 11.214 8.108 11.393 7.542 11.679C6.976 11.965 6.531 12.441 6.207 13.106C5.531 12.33 4.947 11.411 4.455 10.349C3.963 9.287 3.717 8.046 3.717 6.626H0.081C0.081 8.846 0.565 10.95 1.533 12.939C2.501 14.928 4.037 16.941 5.983 18.979V21Z" />
                          </svg>
                          <div className="relative z-10 pl-2">
                            {children}
                          </div>
                        </div>
                      </blockquote>
                    ),
                    code: CodeComponent,
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-8 rounded-lg border border-gray-200 dark:border-gray-800">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                          {children}
                        </table>
                      </div>
                    ),
                    thead: ({ children }) => (
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        {children}
                      </thead>
                    ),
                    th: ({ children }) => (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800">
                        {children}
                      </td>
                    ),
                    a: ({ href, children }) => {
                      const isExternal = href && /^https?:\/\//.test(href.toString());
                      return (
                        <a
                          href={href?.toString()}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          className="font-semibold text-violet-600 underline underline-offset-4 decoration-violet-400 dark:text-violet-300 dark:decoration-violet-300 hover:text-violet-700 dark:hover:text-violet-200"
                        >
                          {children}
                        </a>
                      );
                    },
                    ul: ({ children }) => (
                      <ul className="list-disc pl-6 my-4 space-y-2">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal pl-6 my-4 space-y-2">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="leading-relaxed">
                        {children}
                      </li>
                    ),
                    p: ({ children }) => {
                      const childrenArray = React.Children.toArray(children);
                      const hasImage = childrenArray.some(child => 
                        React.isValidElement(child) && 
                        // Check for ReactMarkdown node prop or src prop
                        ((child.props as any)?.node?.tagName === 'img' || (child.props as any)?.src)
                      );
                      
                      if (hasImage) {
                        return <div className="mb-8 leading-relaxed">{children}</div>;
                      }
                      
                      return <p className="mb-6 leading-relaxed">{children}</p>;
                    },
                  }}
                >
                  {content}
                </ReactMarkdown>
              </article>

              {/* Botón LLM / Raw */}
              <div className="mt-8 flex justify-end">
                 <button
                    onClick={downloadMarkdown}
                    className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                    title="Download raw Markdown for LLMs"
                 >
                    <BsFileEarmarkCode className="w-4 h-4" />
                    Download MD
                 </button>
              </div>

              {/* Navegación entre posts */}
              <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {previousPost ? (
                    <Link href={`/blog/${previousPost.slug}`} className="group block h-full">
                      <div className="h-full p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-violet-500 dark:hover:border-violet-500 bg-white dark:bg-gray-900 transition-all duration-300 shadow-sm hover:shadow-md">
                        <div className="flex items-center gap-2 text-sm text-violet-600 dark:text-violet-400 mb-3 font-medium">
                          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          Previous Article
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2">
                          {previousPost.title}
                        </h4>
                      </div>
                    </Link>
                  ) : <div />}

                  {nextPost ? (
                    <Link href={`/blog/${nextPost.slug}`} className="group block h-full">
                      <div className="h-full p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-violet-500 dark:hover:border-violet-500 bg-white dark:bg-gray-900 transition-all duration-300 shadow-sm hover:shadow-md text-right">
                        <div className="flex items-center justify-end gap-2 text-sm text-violet-600 dark:text-violet-400 mb-3 font-medium">
                          Next Article
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2">
                          {nextPost.title}
                        </h4>
                      </div>
                    </Link>
                  ) : <div />}
                </div>
              </div>

              {/* Share Section */}
              <div className="mt-12 p-8 bg-gray-50 dark:bg-gray-900/50 rounded-2xl text-center">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                  Share this article
                </h3>
                <div className="flex justify-center gap-4 flex-wrap">
                  <button onClick={shareOnTwitter} className="p-3 bg-black text-white rounded-full hover:scale-110 transition-transform shadow-lg" aria-label="Share on X">
                    <BsTwitterX className="w-5 h-5" />
                  </button>
                  <button onClick={shareOnFacebook} className="p-3 bg-[#1877F2] text-white rounded-full hover:scale-110 transition-transform shadow-lg" aria-label="Share on Facebook">
                    <FaFacebook className="w-5 h-5" />
                  </button>
                  <button onClick={shareOnLinkedIn} className="p-3 bg-[#0A66C2] text-white rounded-full hover:scale-110 transition-transform shadow-lg" aria-label="Share on LinkedIn">
                    <FaLinkedin className="w-5 h-5" />
                  </button>
                  <button onClick={copyToClipboard} className="p-3 bg-gray-600 text-white rounded-full hover:scale-110 transition-transform shadow-lg relative" aria-label="Copy Link">
                    <FaLink className="w-5 h-5" />
                    {copied && (
                      <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </main>

            {/* Columna Lateral: Índice (Sticky Sidebar) */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
                <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">
                    {t("index_title")}
                  </h3>
                  <nav>
                    <ul className="space-y-1">
                      {headings.map((heading) => (
                        <li key={heading.id}>
                          <button
                            onClick={() => scrollTo(heading.id)}
                            className={`
                              w-full text-left py-1.5 px-3 rounded-md text-sm transition-all duration-200 border-l-2
                              ${activeHeading === heading.id 
                                ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 font-medium" 
                                : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"}
                            `}
                          >
                            {heading.text}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Floating Index Button (Mobile/Tablet) */}
      <button
        onClick={toggleIndex}
        className={`
          lg:hidden fixed bottom-6 right-6 z-40 p-4 bg-violet-600 text-white rounded-full shadow-xl 
          hover:bg-violet-700 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2
          ${showIndex ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}
        `}
        aria-label="Table of Contents"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {/* Mobile Index Modal */}
      {showIndex && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowIndex(false)} />
          <div className="absolute bottom-0 right-0 w-full sm:w-80 bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none shadow-2xl p-6 max-h-[80vh] overflow-y-auto transform transition-transform duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t("index_title")}</h3>
              <button onClick={() => setShowIndex(false)} className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ul className="space-y-2">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <button
                    onClick={() => scrollTo(heading.id)}
                    className={`
                      w-full text-left py-3 px-4 rounded-xl text-sm transition-colors
                      ${activeHeading === heading.id 
                        ? "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 font-medium" 
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"}
                    `}
                  >
                    {heading.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`
          fixed bottom-6 right-24 lg:right-6 z-40 p-3 bg-gray-900 dark:bg-gray-800 text-white rounded-full shadow-lg border border-gray-700
          hover:bg-black dark:hover:bg-gray-700 transition-all duration-300
          ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}
        `}
        aria-label="Scroll to top"
      >
        <FaArrowUp className="w-5 h-5" />
      </button>
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
    <div className="relative my-8 rounded-xl overflow-hidden shadow-2xl border border-gray-800 group">
      <div className="flex justify-between items-center bg-[#1e1e1e] px-4 py-2.5 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="ml-3 text-xs font-mono text-gray-400 uppercase tracking-wider">{language}</span>
        </div>
        <button
          className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded text-xs text-white transition-colors"
          onClick={() => {
            navigator.clipboard.writeText(String(children));
            setCopied(true);
          }}
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter 
        showLineNumbers={true} 
        language={language} 
        style={okaidia}
        customStyle={{
          margin: 0,
          padding: '1.5rem',
          fontSize: '0.9rem',
          lineHeight: '1.5',
          backgroundColor: '#1e1e1e', // VS Code dark theme bg
        }}
        lineNumberStyle={{
          minWidth: '2.5em',
          paddingRight: '1em',
          color: '#6e7681',
          textAlign: 'right',
        }}
      >
        {String(children)}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code className={`${className} px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-violet-600 dark:text-violet-400 rounded-md text-sm font-mono border border-gray-200 dark:border-gray-700`} {...props}>
      {children}
    </code>
  );
};

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

interface Params {
  slug: string;
}

export async function getStaticProps({ params, locale }: { params: Params, locale: string }) {
  const postsDirectory = path.join(process.cwd(), 'posts', locale);
  
  // Leer el post actual
  const markdownWithMeta = fs.readFileSync(
    path.join(postsDirectory, params.slug + ".md"),
    "utf-8"
  );
  const { data: frontmatter, content } = matter(markdownWithMeta);

  // Obtener todos los posts para encontrar el anterior y siguiente
  const files = fs.readdirSync(postsDirectory);
  const allPosts = files
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(".md", "");
      const postContent = fs.readFileSync(path.join(postsDirectory, filename), "utf-8");
      const { data: postFrontmatter } = matter(postContent);
      
      return {
        slug,
        title: postFrontmatter.title || '',
        date: postFrontmatter.date || '',
      };
    })
    // Ordenar por fecha (más reciente primero)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Encontrar el índice del post actual
  const currentIndex = allPosts.findIndex(post => post.slug === params.slug);
  
  // Obtener posts anterior y siguiente
  const previousPost = currentIndex < allPosts.length - 1 ? {
    slug: allPosts[currentIndex + 1].slug,
    title: allPosts[currentIndex + 1].title
  } : null;
  
  const nextPost = currentIndex > 0 ? {
    slug: allPosts[currentIndex - 1].slug,
    title: allPosts[currentIndex - 1].title
  } : null;

  // Leer traducciones
  const translationsPath = path.join(process.cwd(), 'locales', locale, 'index.json');
  const translationsFile = fs.readFileSync(translationsPath, 'utf8');
  const translations = JSON.parse(translationsFile);

  return {
    props: {
      frontmatter,
      content,
      translations,
      previousPost,
      nextPost,
      slug: params.slug,
    },
  };
}
