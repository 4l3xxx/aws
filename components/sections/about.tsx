"use client"
import { useI18n } from "@/components/i18n-provider"

export function About() {
  const { t } = useI18n()
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 section-space">
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold">{t("about.title")}</h2>
          <p className="mt-3 text-pretty text-muted-foreground">{t("about.desc")}</p>
          <div className="mt-6 rounded-lg border p-4">
            <h3 className="mb-2 text-sm font-medium text-accent">{t("about.history")}</h3>
            <ul className="list-inside list-disc space-y-1 text-sm">
              <li>{t("about.history.item1910")}</li>
              <li>{t("about.history.item1925_1968")}</li>
              <li>{t("about.history.item1983")}</li>
              <li>{t("about.history.item2002")}</li>
              <li>{t("about.history.item2019_now")}</li>
            </ul>
          </div>
        </div>
        <div className="rounded-xl border">
          <img
            src="/pabrik/PT.png"
            alt="Arsip foto perkebunan teh"
            className="h-full w-full rounded-xl object-cover"
            width={800}
            height={560}
          />
        </div>
      </div>
    </section>
  )
}
