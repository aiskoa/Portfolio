import { config } from "../../../config";
  import Image from "next/image";
  import Box from "../../common/box";
  import { ReactElement, useState, useRef } from 'react';
  import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
  import { SkillsIcon } from "../..";
  import { SiCisco, SiHackthebox, SiDiscord } from "react-icons/si";

  interface ContactProps {
    translations: { [key: string]: string };
  }

  /**
   * @description Contact section
   * @returns { ReactElement } A preview of the skills section
   */

  const ImageCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const images = [
      { src: "/providers/ipn.webp", alt: "IPN", icon: <SiDiscord size={24} /> }, // Ejemplo con un icono
      { src: "/providers/aiep.webp", alt: "AIEP" },
      { src: "/providers/humble.webp", alt: "Humble" },
      { src: "/providers/soundraw.webp", alt: "Soundraw" },
      { src: "/providers/plug-patches.webp", alt: "Plug Patches" },
      { src: "/providers/carnes-domicilio.webp", alt: "Carnes Domicilio", icon: <SiHackthebox size={24} /> } // Otro ejemplo con icono
    ];

    const prevSlide = () => {
      const isFirstSlide = currentIndex === 0;
      const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
      const isLastSlide = currentIndex === images.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    };

    return (
      <div className="relative flex items-center justify-center w-full h-64 overflow-hidden">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <div key={index} className="flex flex-col items-center justify-center flex-shrink-0 h-full min-w-full px-2">
              <img
                src={image.src}
                alt={image.alt}
                className="object-contain w-auto h-32 mx-auto mb-2" // Ajusta la altura de la imagen y añade margen inferior
                loading="lazy"
              />
              {image.icon && <div className="mt-1">{image.icon}</div>} {/* Renderiza el icono si existe */}
              {image.alt && <p className="text-sm text-center">{image.alt}</p>} {/* Muestra el texto debajo si existe */}
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-0 p-2 text-white transform -translate-y-1/2 bg-black rounded-full top-1/2"
        >
          <FiArrowLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 p-2 text-white transform -translate-y-1/2 bg-black rounded-full top-1/2"
        >
          <FiArrowRight size={24} />
        </button>
      </div>
    );
  };

  const Contact: React.FC<ContactProps> = ({ translations }): ReactElement => {
    const t = (key: string) => translations[key] || key;
    return (
      <>
        <div className="flex justify-center place-items-center">
          <div className="flex-shrink-0 mb-10 pointer-events-none lg:mt-12 lg:px-4 focus:pointer-events-auto" draggable="false">
            <Image
              src={config.github.url}
              alt="Profile"
              loading="lazy"
              className="rounded-full"
              draggable="false"
              width={250}
              height={250}
            />
          </div>
        </div>
        <div>
          
          <div className="p-2 m-5 font-thin border-2 border-gray-900 flex-column rounded-2xl dark:hover:border-purple-700 hover:border-blue-700 dark:border-white">
            <p className="text-2xl text-center">{t("contact")}</p>
            {/* Evita que las palabras y textos sean copiados */}
            <p className="flex select-none justify-evenly cursor-no-drop">{t("whoiam")}</p>
            <br />
            {/* Evita que las imagenes sean copiadas. */}
            <div className="flex flex-col items-center justify-around hover:justify-evenly">
              <p className="text-2xl text-center">Last Certificate</p>
              <div className="flex flex-col items-center justify-center">
                <img className="mb-2 pointer-events-none focus:pointer-events-auto" draggable="false" loading="lazy" src="https://i.ibb.co/xyMhftf/pentester-pro.png" width="400"></img>
                <a className="text-sm text-center underline" href="https://credsverse.com/credentials/a8f2ef1f-9c2e-4fef-a24c-ce8c26b10b91" target="_blank" rel="noreferrer">Verify</a>
              </div>
              <div className="flex flex-col items-center justify-center">
                <img className="mt-2 pointer-events-none focus:pointer-events-auto" draggable="false" loading="lazy" src="https://i.postimg.cc/9QRpBsZg/gestion-proyectos.jpg" width="400"></img>
                <a className="text-sm text-center underline" href="https://campus.aulavirtual.unc.edu.ar/mod/customcert/verify_certificate.php?code=Dp61of00Ql&qrcode=1" target="_blank" rel="noreferrer">Verify</a>
              </div>
              
              {/* Aquí puedes añadir un icono SI debajo de la imagen */}
              {/* <SiHackthebox size={24} className="mt-1" />
              <p className="text-sm text-center">Descripción opcional</p> */}
            </div>
            <br />
            <p className="flex select-none justify-evenly cursor-no-drop">{t("text_mail")}</p>
            <a className="flex justify-evenly" href="mailto:aiskoa@mail.com?Subject=DUDA%20_%20GENERAL"><strong>aiskoa@mail.com</strong></a>
            <br />
            <p className="text-2xl text-center">FAQ</p>
            <p className="flex select-none justify-evenly">{t("faq")}</p>
            {/* 𝕽♛ */}

            {/* <ImageCarousel/> */}
            <br />

            <div className="flex text-xs border-2 border-gray-300 border-solid rounded-md justify-evenly dark:border-white">
              <p className="font-bold text-yellow-500">
                BTC
              </p>
              <p className="truncate text-ellipsis">
                1sPVqrtZNvAF8NawLHvVSGCP4aNWvUuTf
              </p>
              <br />
              <p className="font-bold text-sky-500">
                ETH/BSC
              </p>
              <p className="break-all truncate text-ellipsis">
                0xcdf8d202be9876afcdb727d36a10d1ac1d0df52b
              </p>
            </div>

          </div>
        </div>
      </>
    );
  };

  export default Contact;