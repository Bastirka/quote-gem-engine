import { useEffect, useState, useCallback } from "react";
import { detectLang, t, type Lang } from "@/i18n/translations";

export const useLang = () => {
  const [lang, setLangState] = useState<Lang>("lv");

  useEffect(() => {
    setLangState(detectLang());
  }, []);

  const setLang = useCallback((l: Lang) => {
    localStorage.setItem("pricelab-lang", l);
    setLangState(l);
    document.documentElement.lang = l;
  }, []);

  return { lang, setLang, tr: t[lang] };
};
