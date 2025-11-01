"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/components/i18n-provider"

type Product = {
  title: string
  subtitle: string
  imageSrc: string
  category: "White" | "Black" | "Green" | "Yellow"
  description: string
  highlights: string[]
  origin: string
  processing: string
  brew: {
    temp: string
    time: string
  }
}

const PRODUCTS: Product[] = [
  {
    title: "White Tea",
    subtitle: "Black Needle, Silver Needle",
    imageSrc: "/white-tea-dry-leaves-macro-and-brewed-cup.jpg",
    category: "White",
    description:
      "Dipetik dari pucuk termuda dan diproses minimal untuk mempertahankan aroma floral yang lembut dan rasa halus.",
    highlights: [
      "Daun pilihan pucuk muda",
      "Aroma floral, body ringan",
      "Kadar kafein lebih rendah",
    ],
    origin: "Patuahwattee, Sumatera Barat (±1.200 mdpl)",
    processing: "Withering ringan, pengeringan lambat, tanpa oksidasi",
    brew: { temp: "75-80°C", time: "2-3 menit" },
  },
  {
    title: "Black Tea",
    subtitle: "Orthodox & CTC",
    imageSrc: "/black-tea-dried-leaves-close-up-and-brewed-cup.jpg",
    category: "Black",
    description:
      "Teh hitam dengan profil rasa tegas dan warna seduhan pekat. Cocok untuk campuran premium maupun sajian langsung.",
    highlights: [
      "Orthodox daun utuh & CTC",
      "Body kuat, brisk, malty",
      "Stabil untuk blending",
    ],
    origin: "Patuahwattee, Sumatera Barat (±1.200 mdpl)",
    processing: "Penggulungan, oksidasi penuh, pengeringan",
    brew: { temp: "90-95°C", time: "3-4 menit" },
  },
  {
    title: "Green Tea",
    subtitle: "Hijau segar",
    imageSrc: "/greentea/greentea.jpg",
    category: "Green",
    description:
      "Teh hijau segar dengan karakter sayuran hijau dan manis lembut di akhir. Diproses untuk menjaga klorofil dan antioksidan.",
    highlights: [
      "Segar, grassy, sedikit umami",
      "Kaya antioksidan",
      "Nyaman diminum harian",
    ],
    origin: "Patuahwattee, Sumatera Barat (±1.200 mdpl)",
    processing: "Fixing (pan/steam) untuk hentikan oksidasi, pengeringan",
    brew: { temp: "75-85°C", time: "2-3 menit" },
  },
  {
    title: "Yellow Tea",
    subtitle: "Khas pilihan",
    imageSrc: "/yellow-tea-rare-style-leaves-and-cup.jpg",
    category: "Yellow",
    description:
      "Gaya langka dengan proses ‘menyudut’ sehingga memberi cangkir lembut, manis bersih, dan warna keemasan jernih.",
    highlights: [
      "Lembut dan bersih",
      "Aroma manis-keemasan",
      "Produksi terbatas",
    ],
    origin: "Patuahwattee, Sumatera Barat (±1.200 mdpl)",
    processing: "Fixing ringan, wrapping (menyudut), pengeringan",
    brew: { temp: "80–85°C", time: "2–3 menit" },
  },
  {
    title: "Matcha Tea",
    subtitle: "Bubuk teh hijau premium",
    imageSrc: "/greentea/greentea.jpg",
    category: "Green",
    description:
      "Matcha ditumbuk halus dari daun teh hijau berkualitas, memberikan rasa umami lembut dengan tekstur creamy.",
    highlights: [
      "Grade premium untuk kuliner & minuman",
      "Warna hijau cerah, rasa umami",
      "Cocok untuk latte, pastry, ceremonial",
    ],
    origin: "Patuahwattee, Sumatera Barat (~1.200 mdpl)",
    processing: "Shading pra-panen, steaming, pengeringan, penggilingan batu",
    brew: { temp: "70-80°C", time: "Whisk 20-30 detik" },
  },
]

export function Products() {
  const { t } = useI18n()
  const active = "all" as const
  const filtered = PRODUCTS
  return (
    <section id="products" className="mx-auto max-w-6xl px-4 section-space">
      <h2 className="text-2xl font-semibold">{t("products.title")}</h2>
      <p className="mt-3 text-pretty text-muted-foreground">{t("products.desc")}</p>

      <div className="mt-6 rounded-lg border bg-muted p-2">
        <div className="mt-6 rounded-lg border bg-background p-3">
          <Carousel>
            <CarouselContent>
              {filtered.map((p, i) => (
                <CarouselItem key={p.title + i} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <ProductCard {...p} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="h-12 w-12 -left-4 md:-left-8 rounded-full bg-white/90 text-foreground shadow-lg border border-foreground/10 hover:bg-white focus-visible:ring-2 focus-visible:ring-emerald-400" />
            <CarouselNext className="h-12 w-12 -right-4 md:-right-8 rounded-full bg-white/90 text-foreground shadow-lg border border-foreground/10 hover:bg-white focus-visible:ring-2 focus-visible:ring-emerald-400" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}

function ProductCard({ title, subtitle, imageSrc, category, description, highlights, origin, processing, brew }: Product) {
  const { t } = useI18n()
  return (
    <article className="overflow-hidden rounded-lg border bg-background hover-card">
      <img
        src={imageSrc || "/placeholder.svg?height=172&width=320&query=teh premium"}
        alt={title}
        className="h-44 w-full object-cover transition-base"
        width={320}
        height={220}
      />
      <div className="p-4">
        <h3 className="text-base font-medium">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        <div className="mt-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-emerald-600 text-white hover:bg-emerald-700 border border-emerald-600">
                {t("products.viewDetail")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {title}
                  <Badge variant="secondary">{category} Tea</Badge>
                </DialogTitle>
              </DialogHeader>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <img
                    src={imageSrc || "/placeholder.svg?height=240&width=360&query=tea"}
                    alt={title}
                    className="h-40 w-full rounded-md object-cover sm:h-48"
                    width={360}
                    height={240}
                  />
                </div>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p className="text-foreground/90">{description}</p>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-foreground/60">{t("products.advantages")}</p>
                    <ul className="mt-1 list-disc space-y-1 pl-5">
                      {highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-foreground/60">{t("products.origin")}</p>
                      <p>{origin}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-foreground/60">{t("products.process")}</p>
                      <p>{processing}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{t("products.brew")} {brew.temp}</Badge>
                    <Badge variant="outline">{brew.time}</Badge>
                  </div>
                  <div className="pt-1">
                    <Button asChild size="sm" className="mt-1">
                      <a href="#contact" aria-label={`${t("products.contactUs")} - ${title}`}>{t("products.contactUs")}</a>
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </article>
  )
}
