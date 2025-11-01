"use client"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/components/i18n-provider"

export function Hero() {
  const { t } = useI18n()
  return (
    <section className="border-b bg-secondary">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
        <div>
          <p className="mb-2 text-sm font-medium text-primary">{t("hero.brand")}</p>
          <h1 className="text-balance text-3xl font-semibold md:text-4xl">{t("hero.title")}</h1>
          <p className="mt-4 text-pretty text-muted-foreground">{t("hero.desc")}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <a href="#products" aria-label={t("hero.cta.products")}>
                {t("hero.cta.products")}
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#contact" aria-label={t("hero.cta.contact")}>
                {t("hero.cta.contact")}
              </a>
            </Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl">
          <img
            src="/pabrik/PT.png"
            alt="Pemandangan udara Perkebunan Teh Patuahwattee"
            className="h-full w-full object-cover"
            width={800}
            height={560}
          />
        </div>
      </div>
    </section>
  )
}
