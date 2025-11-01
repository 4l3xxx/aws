"use client"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { useI18n } from "@/components/i18n-provider"

export function Life() {
  const { t } = useI18n()
  const FACILITIES: { label: string; detail: string }[] = [
    { label: t("life.fac.perumahan"), detail: t("life.fac.perumahan.detail") },
    { label: t("life.fac.sekolah"), detail: t("life.fac.sekolah.detail") },
    { label: t("life.fac.klinik"), detail: t("life.fac.klinik.detail") },
    { label: t("life.fac.masjid"), detail: t("life.fac.masjid.detail") },
    { label: t("life.fac.koperasi"), detail: t("life.fac.koperasi.detail") },
    { label: t("life.fac.olahraga"), detail: t("life.fac.olahraga.detail") },
  ]
  return (
    <section id="life" className="border-y bg-muted">
      <div className="mx-auto max-w-6xl px-4 section-space">
        <h2 className="text-2xl font-semibold">{t("life.title")}</h2>
        <p className="mt-3 text-pretty text-muted-foreground">{t("life.desc")}</p>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
          {FACILITIES.map((f) => (
            <HoverCard key={f.label} openDelay={80}>
              <HoverCardTrigger asChild>
                <div
                  className="inline-flex cursor-default items-center justify-center rounded-full border bg-background px-3 py-2 transition-colors hover:border-primary"
                  aria-label={f.label}
                >
                  <span className="text-sm">{f.label}</span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-64 text-sm text-muted-foreground">{f.detail}</HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </div>
    </section>
  )
}
