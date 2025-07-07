import React, { ReactElement } from "react";
import { useRouter } from "next/router";

/**
 * @description               Change the language of the application
 * @returns { ReactElement }  ChangeLanguage component which is used to change the language of the current application
 */

const ChangeLanguage: React.FC = (): ReactElement => {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  const changeLanguage = (locale: string) => {
    router.push({ pathname, query }, asPath, { locale });
  };

  return (
    <>
      <button
        onClick={() => changeLanguage(router.locale === "en" ? "es" : "en")}
      >
        {router.locale === "en" ? "🇺🇸" : "🇪🇸"}
      </button>
    </>
  );
}

export default ChangeLanguage;