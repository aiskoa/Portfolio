import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { SiNextdotjs, 
  SiTypescript, 
  SiGo, 
  SiSvelte, 
  SiPhp, 
  SiMysql, 
  SiPostgresql, 
  SiJavascript, 
  SiRust, 
  SiWails, 
  SiPython, 
  SiLinux,
  SiHtml5 } from "react-icons/si";

const MotionButton: React.FC<HTMLMotionProps<"button">> = motion.button;
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface FeaturedProject {
  titleKey: string;
  descKey: string;
  image: string;
  tech: React.ReactNode[];
  link: string;
  demo: string;
  color: string;
}

const projects: FeaturedProject[] = [
  {
    titleKey: "project_one_title",
    descKey: "project_one_desc",
    image: "https://i.ibb.co/fzWgbnC5/nex-website.png",
    tech: [<SiNextdotjs key="next" />, <SiTypescript key="ts" />],
    link: "/portfolio",
    demo: "https://nexdrak.com",
    color: "from-blue-500 to-cyan-500"
  },
  {
    titleKey: "project_two_title",
    descKey: "project_two_desc",
    image: "https://i.ibb.co/21Dx81sr/gieimm.png",
    tech: [<SiGo key="go" />, <SiSvelte key="svelte" />],
    link: "/blog/gie",
    demo: "https://gie-aiskoa.vercel.app",
    color: "from-emerald-500 to-teal-500"
  },
  {
    titleKey: "project_three_title",
    descKey: "project_three_desc",
    image: "https://i.ibb.co/Q7L9rpsk/fortimx.png",
    tech: [<SiPhp key="php" />, <SiMysql key="sql" />],
    link: "/portfolio",
    demo: "https://fortimx.com",
    color: "from-violet-500 to-purple-500"
  }
];

const FeaturedProjects = ({ translations }: { translations: { [key: string]: string } }) => {
  const t = (key: string) => translations[key] || key;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [text, setText] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const TARGET_TEXT = t("view_full_portfolio");
  const CYCLES_PER_LETTER = 2;
  const SHUFFLE_TIME = 50;
  const CHARS = "!@#$%^&*():{};|,.<>/?";

  useEffect(() => {
    setText(TARGET_TEXT);
  }, [TARGET_TEXT]);

  const scramble = () => {
    let pos = 0;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setText(TARGET_TEXT);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const currentProject = projects[currentIndex];

  return (
    <div className="mt-24 mb-12">
      <div className="flex flex-col items-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t("latest_projects")}
        </h2>
        <div className="w-20 h-1 bg-gray-900 dark:bg-violet-600 rounded-full"></div>
      </div>

      {/* Responsive Container: Taller on mobile to fit stacked content, fixed height on desktop */}
      <div className="relative h-[600px] md:h-[400px] w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-2xl bg-gray-900">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0 w-full h-full flex flex-col md:flex-row"
          >
            {/* Image Section - 35% height on mobile, 60% width on desktop */}
            <div className="w-full md:w-3/5 h-[35%] md:h-full relative overflow-hidden group">
              <div className={`absolute inset-0 bg-gradient-to-br ${currentProject.color} opacity-20 group-hover:opacity-10 transition-opacity duration-300 z-10`}></div>
              <img 
                src={currentProject.image} 
                alt={t(currentProject.titleKey)}
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Content Section - 65% height on mobile, 40% width on desktop */}
            <div className="w-full md:w-2/5 h-[65%] md:h-full bg-white dark:bg-gray-800 p-6 md:p-8 flex flex-col justify-center relative z-20">
              <div className="flex gap-3 mb-3 text-xl text-gray-700 dark:text-gray-300">
                {currentProject.tech.map((icon, idx) => (
                  <span key={idx} className="p-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    {icon}
                  </span>
                ))}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t(currentProject.titleKey)}
              </h3>
              
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-6 leading-relaxed line-clamp-4 md:line-clamp-none">
                {t(currentProject.descKey)}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <Link href={currentProject.link} className="w-full sm:w-auto">
                  <button className="w-full px-4 py-2 bg-gray-900 hover:bg-gray-800 dark:bg-violet-600 dark:hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-all duration-300 shadow-lg shadow-gray-500/30 dark:shadow-violet-500/30 text-center hover:scale-105 hover:-translate-y-1">
                    {t("learn_more")}
                  </button>
                </Link>
                <a 
                  href={currentProject.demo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 text-center hover:scale-105 hover:-translate-y-1"
                >
                  {t("live_demo")}
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons - Adjusted for visibility in Light Mode */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 bg-black/30 dark:bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-black/50 dark:hover:bg-white/20 transition-all"
          aria-label="Previous project"
        >
          <FaChevronLeft size={18} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 bg-black/30 dark:bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-black/50 dark:hover:bg-white/20 transition-all"
          aria-label="Next project"
        >
          <FaChevronRight size={18} />
        </button>

        {/* Indicators - Adjusted for visibility */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`w-2 h-2 rounded-full transition-all shadow-sm ${
                idx === currentIndex 
                  ? "bg-gray-900 dark:bg-violet-600 w-6" 
                  : "bg-gray-400/80 hover:bg-gray-600 dark:hover:bg-violet-400"
              }`}
              aria-label={`Go to project ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <Link href="/portfolio">
          <MotionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={scramble}
            onMouseLeave={stopScramble}
            className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-300 bg-gray-900 font-lg rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:bg-white dark:text-gray-900 hover:shadow-lg hover:shadow-gray-500/50 dark:hover:shadow-violet-500/50 dark:hover:bg-violet-600 dark:hover:text-white hover:bg-gray-700 overflow-hidden"
          >
            <div className="relative z-10 flex items-center gap-2">
              <span>{text}</span>
              <svg 
                className="w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </div>
            <motion.span
              initial={{ y: "100%" }}
              whileHover={{ y: "-100%" }}
              transition={{ repeat: Infinity, repeatType: "mirror", duration: 1, ease: "linear" }}
              className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-gray-400/0 from-40% via-gray-400/20 to-gray-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
            />
          </MotionButton>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProjects;
