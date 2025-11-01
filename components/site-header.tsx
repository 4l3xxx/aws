"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useI18n } from "@/components/i18n-provider"
import { useState, useEffect } from "react"

const smoothScrollTo = (elementId: string) => {
  // Jika tidak di halaman utama, redirect ke halaman utama dengan anchor
  if (typeof window !== 'undefined' && window.location.pathname !== '/') {
    window.location.href = `/#${elementId}`
    return
  }
  
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}

export function SiteHeader() {
  const [isLifeDropdownOpen, setIsLifeDropdownOpen] = useState(false)
  const { t } = useI18n()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isLifeDropdownOpen) {
        setIsLifeDropdownOpen(false)
      }
    }

    if (isLifeDropdownOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isLifeDropdownOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Beranda PT. Agri Wangi Sentosa">
          <img
            src="/images/agriwangi-logo.png"
            alt="Logo PT. Agri Wangi Sentosa"
            width={180}
            height={55}
            className="h-14 w-auto"
          />
          <span className="sr-only">PT. Agri Wangi Sentosa</span>
        </Link>

        <nav aria-label="Site Navigation" className="hidden gap-8 md:flex">
          <button 
            onClick={() => smoothScrollTo('about')} 
            className="text-base hover:text-primary transition-colors duration-200"
          >
            {t("header.nav.about")}
          </button>
          <button 
            onClick={() => smoothScrollTo('plantation')} 
            className="text-base hover:text-primary transition-colors duration-200"
          >
            {t("header.nav.plantation")}
          </button>
          <button 
            onClick={() => smoothScrollTo('factories')} 
            className="text-base hover:text-primary transition-colors duration-200"
          >
            {t("header.nav.factories")}
          </button>
          <div className="relative">
            <button 
              onClick={() => setIsLifeDropdownOpen(!isLifeDropdownOpen)}
              className="text-base hover:text-primary transition-colors duration-200 flex items-center gap-1"
            >
              {t("header.nav.life")}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isLifeDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <Link 
                  href="/kegiatan"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setIsLifeDropdownOpen(false)}
                >
                  {t("header.nav.activities")}
                </Link>
                <button 
                  onClick={() => {
                    smoothScrollTo('life')
                    setIsLifeDropdownOpen(false)
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  {t("header.nav.life")}
                </button>
              </div>
            )}
          </div>
          <button 
            onClick={() => smoothScrollTo('products')} 
            className="text-base hover:text-primary transition-colors duration-200"
          >
            {t("header.nav.products")}
          </button>
          <button 
            onClick={() => smoothScrollTo('contact')} 
            className="text-base hover:text-primary transition-colors duration-200"
          >
            {t("header.nav.contact")}
          </button>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Button
            onClick={() => smoothScrollTo('contact')}
            aria-label="Hubungi Kami"
          >
            {t("header.cta.contact")}
          </Button>
        </div>
      </div>
    </header>
  )
}
