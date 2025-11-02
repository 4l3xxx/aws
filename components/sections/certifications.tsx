"use client"

import { useI18n } from "@/components/i18n-provider"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

function encoded(name: string) {
  // Encode only the file name segment, not the path
  return "/sertifikat/" + encodeURIComponent(name)
}

type Item = { src: string; caption: string; mode: 'top' | 'contain' }

export function Certifications() {
  const { t } = useI18n()

  const items: Item[] = [
    { src: "/sertifikat/halal.png", caption: t("certs.halalMain"), mode: 'top' },
    { src: "/sertifikat/halal1.png", caption: t("certs.halalAttachment"), mode: 'top' },
    // Untuk logo vertikal + tulisan di bawah, gunakan contain agar tidak terpotong
    { src: encoded("Logo -label-vertical-qrcode[1].png"), caption: t("certs.halalLabel"), mode: 'contain' },
    { src: "/sertifikat/RA.png", caption: t("certs.ra"), mode: 'contain' },
  ]

  return (
    <section
      id="certifications"
      className="mx-auto max-w-6xl px-4 pt-4 md:pt-6 pb-16 md:pb-24"
    >
      <h2 className="text-2xl font-semibold mb-4">{t("certs.title")}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((it, idx) => (
          <Dialog key={idx}>
            <DialogTrigger asChild>
              <figure className="bg-white rounded-xl shadow-md overflow-hidden p-2 border cursor-zoom-in hover:scale-105 transition-transform duration-300">
                <img
                  src={it.src}
                  alt={it.caption}
                  className={`w-full h-[220px] rounded-md ${it.mode === 'top' ? 'object-cover object-top' : 'object-contain bg-white'}`}
                />
                <figcaption className="mt-2 px-1 text-xs text-center text-muted-foreground">{it.caption}</figcaption>
              </figure>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl">
              <div className="w-full">
                <img
                  src={it.src}
                  alt={it.caption}
                  className="max-h-[80vh] w-full object-contain"
                />
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  )
}
