import { useEffect } from "react";
import { useTranslation } from "react-i18next";

/**
 * Updates document.title and meta description in response to language changes.
 * SSR/initial paint comes from createFileRoute().head(); this hook keeps the
 * document in sync once react-i18next has loaded and whenever the user switches.
 */
export function useDocumentMeta(titleKey: string, descriptionKey?: string) {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    const title = t(titleKey);
    if (typeof document !== "undefined" && title) {
      document.title = title;
      if (descriptionKey) {
        const desc = t(descriptionKey);
        let tag = document.querySelector('meta[name="description"]');
        if (!tag) {
          tag = document.createElement("meta");
          tag.setAttribute("name", "description");
          document.head.appendChild(tag);
        }
        tag.setAttribute("content", desc);
      }
    }
  }, [t, i18n.language, titleKey, descriptionKey]);
}
