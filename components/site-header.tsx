"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useI18n } from "@/components/i18n-provider"
import { useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import { Menu, X } from "lucide-react"

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
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t } = useI18n()
  const [mounted, setMounted] = useState(false)

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

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const original = document.body.style.overflow
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = original || ''
    }
    return () => {
      document.body.style.overflow = original || ''
    }
  }, [mobileOpen, mounted])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6 md:py-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Beranda PT. Agri Wangi Sentosa">
          <img
            src="/images/agriwangi-logo.png"
            alt="Logo PT. Agri Wangi Sentosa"
            width={180}
            height={55}
            className="h-10 w-auto md:h-14"
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

        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md border p-2 hover:bg-accent"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Desktop actions */}
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
      </div>
      {/* Mobile slide-over menu via portal to body to avoid header clipping/filters */}
      {mounted && mobileOpen && createPortal(
        <div className="md:hidden fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-xs bg-background shadow-2xl border-l p-4 flex flex-col gap-4 transition-transform duration-300 translate-x-0">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Menu</span>
              <button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="p-2 rounded-md hover:bg-accent">
                <X className="h-5 w-5" />
              </button>
            </div>
            <LanguageSwitcher />
            <nav className="flex flex-col gap-2">
              <button onClick={() => { smoothScrollTo('about'); setMobileOpen(false) }} className="text-base text-left px-1.5 py-2 hover:bg-accent rounded-md">{t("header.nav.about")}</button>
              <button onClick={() => { smoothScrollTo('plantation'); setMobileOpen(false) }} className="text-base text-left px-1.5 py-2 hover:bg-accent rounded-md">{t("header.nav.plantation")}</button>
              <button onClick={() => { smoothScrollTo('factories'); setMobileOpen(false) }} className="text-base text-left px-1.5 py-2 hover:bg-accent rounded-md">{t("header.nav.factories")}</button>
              <button onClick={() => { smoothScrollTo('life'); setMobileOpen(false) }} className="text-base text-left px-1.5 py-2 hover:bg-accent rounded-md">{t("header.nav.life")}</button>
              <button onClick={() => { smoothScrollTo('products'); setMobileOpen(false) }} className="text-base text-left px-1.5 py-2 hover:bg-accent rounded-md">{t("header.nav.products")}</button>
              <button onClick={() => { smoothScrollTo('contact'); setMobileOpen(false) }} className="text-base text-left px-1.5 py-2 hover:bg-accent rounded-md">{t("header.nav.contact")}</button>
            </nav>
            <div className="mt-2 border-t pt-3 flex flex-col gap-2">
              <Button onClick={() => { smoothScrollTo('products'); setMobileOpen(false) }}>{t("hero.cta.products")}</Button>
              <Button variant="outline" onClick={() => { smoothScrollTo('contact'); setMobileOpen(false) }}>{t("hero.cta.contact")}</Button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  )
}
