"use client"

import * as React from "react"
import { useI18n } from "@/components/i18n-provider"

type Img = { id: number; src: string; alt: string }

const sekolah: Img[] = [
  { id: 1, src: "/sekolah/sekolah1.jpg", alt: "Sekolah 1" },
  { id: 2, src: "/sekolah/sekolah2.jpg", alt: "Sekolah 2" },
  { id: 3, src: "/sekolah/sekolah3.jpg", alt: "Sekolah 3" },
  { id: 4, src: "/sekolah/sekolah4.jpg", alt: "Sekolah 4" },
  { id: 5, src: "/sekolah/sekolah5.jpg", alt: "Sekolah 5" },
  { id: 6, src: "/galeri-sekolah-6.jpg", alt: "Sekolah 6" },
]

const pabrik: Img[] = [
  { id: 1, src: "/galeri-pabrik-1.jpg", alt: "Pabrik 1" },
  { id: 2, src: "/galeri-pabrik-2.jpg", alt: "Pabrik 2" },
  { id: 3, src: "/galeri-pabrik-3.jpg", alt: "Pabrik 3" },
  { id: 4, src: "/galeri-pabrik-4.jpg", alt: "Pabrik 4" },
  { id: 5, src: "/galeri-pabrik-5.jpg", alt: "Pabrik 5" },
  { id: 6, src: "/galeri-pabrik-6.jpg", alt: "Pabrik 6" },
]

const perkebunan: Img[] = [
  { id: 1, src: "/galeri-perkebunan-1.jpg", alt: "Perkebunan 1" },
  { id: 2, src: "/placeholder.svg?height=240&width=360", alt: "Perkebunan 2" },
  { id: 3, src: "/placeholder.svg?height=240&width=360", alt: "Perkebunan 3" },
  { id: 4, src: "/placeholder.svg?height=240&width=360", alt: "Perkebunan 4" },
  { id: 5, src: "/placeholder.svg?height=240&width=360", alt: "Perkebunan 5" },
  { id: 6, src: "/placeholder.svg?height=240&width=360", alt: "Perkebunan 6" },
]

const klinik: Img[] = [
  { id: 1, src: "/klinik/klinik1.jpg", alt: "Klinik 1" },
  { id: 2, src: "/klinik/klinik2.jpg", alt: "Klinik 2" },
  { id: 3, src: "/placeholder.svg?height=240&width=360", alt: "Klinik 3" },
  { id: 4, src: "/placeholder.svg?height=240&width=360", alt: "Klinik 4" },
  { id: 5, src: "/placeholder.svg?height=240&width=360", alt: "Klinik 5" },
  { id: 6, src: "/placeholder.svg?height=240&width=360", alt: "Klinik 6" },
]

const tabs = [
  { key: "sekolah", label: "Sekolah", data: sekolah },
  { key: "pabrik", label: "Pabrik", data: pabrik },
  { key: "perkebunan", label: "Perkebunan", data: perkebunan },
  { key: "klinik", label: "Klinik", data: klinik },
] as const

export function Gallery() {
  const { t } = useI18n()
  const [active, setActive] = React.useState<(typeof tabs)[number]["key"]>("sekolah")
  const current = tabs.find((t) => t.key === active) ?? tabs[0]

  return (
    <section id="gallery" className="section-space">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-pretty mb-6">{t("gallery.title")}</h2>

        <div className="flex items-center gap-2 mb-6">
          {tabs.map((tb) => (
            <button
              key={tb.key}
              onClick={() => setActive(tb.key)}
              className={`px-3 py-1.5 rounded-md text-sm border transition-base hover:-translate-y-0.5 ${
                active === tb.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-foreground hover:shadow-sm"
              }`}
            >
              {tb.key === "sekolah" && t("gallery.tab.sekolah")}
              {tb.key === "pabrik" && t("gallery.tab.pabrik")}
              {tb.key === "perkebunan" && t("gallery.tab.perkebunan")}
              {tb.key === "klinik" && t("gallery.tab.klinik")}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {current.data.map((img) => (
            <figure
              key={`${current.key}-${img.id}`}
              className="group rounded-lg overflow-hidden border bg-card aspect-square hover-card"
            >
              <img
                src={img.src || "/placeholder.svg"}
                alt={img.alt}
                className="w-full h-full object-cover transition-base group-hover:scale-[1.03]"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
