"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Language, getTranslation, type Translations } from "@/lib/translation"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const LANGUAGE_STORAGE_KEY = "mil-app-language"

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "fr")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (mounted) {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
    }
  }

  const t = getTranslation(language)

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
