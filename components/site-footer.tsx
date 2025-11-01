"use client"

import { useI18n } from "@/components/i18n-provider"

export function SiteFooter() {
  const { t } = useI18n()
  return (
    <footer className="mt-24 border-t bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <img
              src="/images/agriwangi-logo.png"
              alt="Logo PT. Agri Wangi Sentosa"
              width={140}
              height={40}
              className="h-10 w-auto transition-opacity duration-300 hover:opacity-90"
            />
            <p className="text-sm text-muted-foreground leading-7">
              © {new Date().getFullYear()} PT. Agri Wangi Sentosa. {t("footer.rights")}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 md:items-end">
            <div className="text-sm leading-7 text-[#333333]">
              Desa Sugih Mukti, Kec. Pasirjambu, Kab. Bandung • 55 km dari Bandung, 24 km dari Ciwidey
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="#terms" className="hover:underline">{t("footer.links.terms")}</a>
              <span aria-hidden>•</span>
              <a href="#privacy" className="hover:underline">{t("footer.links.privacy")}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
