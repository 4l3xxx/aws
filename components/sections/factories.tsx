"use client"
import { useI18n } from "@/components/i18n-provider"

export function Factories() {
  const { t } = useI18n()
  return (
    <section id="factories" className="mx-auto max-w-6xl px-4 section-space">
      <h2 className="text-2xl font-semibold">{t("factories.title")}</h2>
      <p className="mt-3 text-pretty text-muted-foreground">{t("factories.desc")}</p>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <FactoryCard
          title="Green Tea Factory"
          subtitle={t("factories.card.green.subtitle")}
          imageSrc="/greentea/greenfac.jpg"
          fallbackQuery="green tea processing factory stainless equipment"
        />
        <FactoryCard
          title="CTC Black Tea Factory"
          subtitle={t("factories.card.ctc.subtitle")}
          imageSrc="/ctc/ctcfac.jpg"
          fallbackQuery="ctc black tea factory rollers"
        />
        <FactoryCard
          title="Orthodox Black Tea Factory"
          subtitle={t("factories.card.orthodox.subtitle")}
          imageSrc="/orthodox/orthodoxfac.jpg"
          fallbackQuery="orthodox black tea rolling fermentation drying"
        />
      </div>
    </section>
  )
}

function FactoryCard({
  title,
  subtitle,
  imageSrc,
  fallbackQuery,
}: {
  title: string
  subtitle: string
  imageSrc: string
  fallbackQuery: string
}) {
  return (
    <article className="rounded-lg border bg-background">
      <img
        src={imageSrc || `/placeholder.svg?height=200&width=400&query=${encodeURIComponent(fallbackQuery)}`}
        alt={title}
        className="h-48 w-full rounded-t-lg object-cover"
        width={400}
        height={200}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = `/placeholder.svg?height=200&width=400&query=${encodeURIComponent(fallbackQuery)}`;
        }}
      />
      <div className="p-4">
        <h3 className="text-base font-medium">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </article>
  )
}
