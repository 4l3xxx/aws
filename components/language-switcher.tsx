"use client"

import { useEffect, useState } from "react"
import { useI18n, type Lang } from "@/components/i18n-provider"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { lang: currentLang, setLang } = useI18n()
  const [lang, setLocal] = useState<Lang>(currentLang)

  useEffect(() => {
    // Restore preference from cookie or localStorage
    try {
      const cookie = document.cookie.split("; ").find((c) => c.startsWith("lang="))
      const fromCookie = cookie?.split("=")[1] as Lang | undefined
      const fromStorage = (localStorage.getItem("lang") as Lang | null) ?? undefined
      const initial = fromCookie || fromStorage || (navigator.language?.startsWith("en") ? "EN" : "ID")
      applyLang(initial)
    } catch {
      // no-op
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function applyLang(next: Lang) {
    setLocal(next)
    setLang(next)
  }

  return (
    <div className="flex items-center gap-2 text-sm select-none" aria-label="Language selector">
      <Globe className="h-4 w-4 text-foreground/70" aria-hidden />
      <button
        className={`transition-base ${lang === "ID" ? "text-primary font-medium" : "text-foreground/70 hover:text-foreground"}`}
        onClick={() => applyLang("ID")}
        aria-pressed={lang === "ID"}
        aria-label="Ubah bahasa ke Indonesia"
      >
        ID
      </button>
      <span className="text-foreground/40">|</span>
      <button
        className={`transition-base ${lang === "EN" ? "text-primary font-medium" : "text-foreground/70 hover:text-foreground"}`}
        onClick={() => applyLang("EN")}
        aria-pressed={lang === "EN"}
        aria-label="Switch language to English"
      >
        EN
      </button>
    </div>
  )
}
