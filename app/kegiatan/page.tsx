"use client"

import Link from "next/link"
import { SiteHeader } from "@/components/site-header"

// Data kegiatan
const kegiatanData = [
  {
    id: 1,
    title: "Agri Wangi Sentosa Berkurban",
    date: "16 Juni 2025",
    coverImage: "/qurban/backgroundqurban.png",
    description: "Kegiatan berkurban yang dilakukan oleh PT. Agri Wangi Sentosa sebagai bentuk kepedulian sosial dan berbagi dengan masyarakat sekitar.",
    slug: "agri-wangi-berkurban"
  },
  {
    id: 2,
    title: "Kegiatan CSR",
    date: "10 Mei 2025",
    coverImage: "/CSR/backgroundcsr.png",
    description: "Program Corporate Social Responsibility yang berfokus pada pemberdayaan masyarakat dan pengembangan lingkungan sekitar perkebunan.",
    slug: "kegiatan-csr"
  },

  {
    id: 4,
    title: "17 Agustus 2025",
    date: "17 Agustus 2025",
    coverImage: "/17/background17.png",
    description: "Perayaan Hari Kemerdekaan Republik Indonesia dengan berbagai kegiatan dan perlombaan yang melibatkan karyawan dan masyarakat sekitar.",
    slug: "17-agustus-2025"
  },
  
  {
    id: 3,
    title: "Menjaga Kebersihan Lingkungan",
    date: "22 April 2025",
    coverImage: "/kegiatan/kebersihan-lingkungan.jpg",
    description: "Gerakan menjaga kebersihan lingkungan perkebunan dan sekitarnya untuk menciptakan lingkungan yang sehat dan berkelanjutan.",
    slug: "menjaga-kebersihan-lingkungan"
  },
  
]

function KegiatanCard({ kegiatan }: { kegiatan: typeof kegiatanData[0] }) {
  return (
    <article className="rounded-lg border bg-background overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative overflow-hidden">
        <img
          src={kegiatan.coverImage}
          alt={kegiatan.title}
          className="w-full h-auto block hover:scale-[1.02] transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg?height=200&width=400&query=kegiatan";
          }}
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-muted-foreground">{kegiatan.date}</span>
        </div>
        <h3 className="text-xl font-semibold mb-3 line-clamp-2">{kegiatan.title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">{kegiatan.description}</p>
        <Link
          href={`/kegiatan/${kegiatan.slug}`}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Lihat Detail
        </Link>
      </div>
    </article>
  )
}

export default function KegiatanPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-50 to-blue-50 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Kegiatan Perusahaan
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Dokumentasi berbagai kegiatan dan program yang telah dilakukan oleh PT. Agri Wangi Sentosa 
                dalam mengembangkan perkebunan teh dan melayani masyarakat sekitar.
              </p>
            </div>
          </div>
        </section>

        {/* Daftar Kegiatan */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {kegiatanData.map((kegiatan) => (
                <KegiatanCard key={kegiatan.id} kegiatan={kegiatan} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
