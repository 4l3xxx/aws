"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { notFound } from "next/navigation"

// Data kegiatan dengan detail lengkap
const kegiatanDetail = {
  "agri-wangi-berkurban": {
    id: 1,
    title: "Agri Wangi Sentosa Berkurban",
    date: "16 Juni 2025",
    location: "Perkebunan Teh Patuahwattee",
    coverImage: "/qurban/backgroundqurban.png",
    description: "Kegiatan berkurban yang dilakukan oleh PT. Agri Wangi Sentosa sebagai bentuk kepedulian sosial dan berbagi dengan masyarakat sekitar.",
    fullStory: `Kegiatan berkurban yang dilakukan oleh PT. Agri Wangi Sentosa merupakan bentuk implementasi nilai-nilai perusahaan dalam berbagi dan peduli terhadap masyarakat sekitar perkebunan. Kegiatan ini melibatkan seluruh karyawan dan manajemen perusahaan.

Proses pemotongan hewan kurban dilakukan dengan mengikuti standar kehalalan dan kesehatan yang ketat. Hewan kurban yang dipilih adalah hewan yang sehat dan memenuhi kriteria untuk dijadikan kurban.

Daging kurban kemudian dibagikan kepada masyarakat sekitar perkebunan, terutama mereka yang membutuhkan. Distribusi dilakukan secara merata dan transparan untuk memastikan manfaat kegiatan ini dapat dirasakan oleh seluruh masyarakat.

Kegiatan ini tidak hanya menjadi momen berbagi, tetapi juga mempererat tali silaturahmi antara perusahaan dengan masyarakat sekitar perkebunan.`,
    gallery: [
      { id: 1, src: "/kegiatan/gallery/kurban-1.jpg", alt: "Persiapan hewan kurban" },
      { id: 2, src: "/kegiatan/gallery/kurban-2.jpg", alt: "Proses pemotongan kurban" },
      { id: 3, src: "/kegiatan/gallery/kurban-3.jpg", alt: "Pembagian daging kurban" },
      { id: 4, src: "/kegiatan/gallery/kurban-4.jpg", alt: "Masyarakat menerima daging kurban" },
      { id: 5, src: "/kegiatan/gallery/kurban-5.jpg", alt: "Tim distribusi kurban" },
      { id: 6, src: "/kegiatan/gallery/kurban-6.jpg", alt: "Foto bersama kegiatan kurban" }
    ]
  },
  "kegiatan-csr": {
    id: 2,
    title: "Kegiatan CSR",
    date: "10 Mei 2025",
    location: "Masyarakat Sekitar Perkebunan",
    coverImage: "/CSR/backgroundcsr.png",
    description: "Program Corporate Social Responsibility yang berfokus pada pemberdayaan masyarakat dan pengembangan lingkungan sekitar perkebunan.",
    fullStory: `Program Corporate Social Responsibility (CSR) yang dilaksanakan oleh PT. Agri Wangi Sentosa bertujuan untuk memberikan kontribusi positif bagi pembangunan masyarakat sekitar perkebunan. Program ini mencakup berbagai aspek kehidupan masyarakat.

Kegiatan CSR meliputi program pendidikan, kesehatan, pemberdayaan ekonomi, dan pelestarian lingkungan. Tim CSR perusahaan bekerja sama dengan berbagai stakeholder untuk memastikan program berjalan efektif dan berkelanjutan.

Program pendidikan memberikan beasiswa dan bantuan pendidikan untuk anak-anak di sekitar perkebunan. Program kesehatan meliputi pemeriksaan kesehatan gratis dan penyuluhan kesehatan masyarakat.

Program pemberdayaan ekonomi memberikan pelatihan dan bantuan modal untuk UMKM lokal. Sedangkan program lingkungan fokus pada pelestarian alam dan pengelolaan sampah yang berkelanjutan.`,
    gallery: [
      { id: 1, src: "/kegiatan/gallery/csr-1.jpg", alt: "Program pendidikan CSR" },
      { id: 2, src: "/kegiatan/gallery/csr-2.jpg", alt: "Pemeriksaan kesehatan gratis" },
      { id: 3, src: "/kegiatan/gallery/csr-3.jpg", alt: "Pelatihan UMKM" },
      { id: 4, src: "/kegiatan/gallery/csr-4.jpg", alt: "Program lingkungan" },
      { id: 5, src: "/kegiatan/gallery/csr-5.jpg", alt: "Pemberdayaan masyarakat" },
      { id: 6, src: "/kegiatan/gallery/csr-6.jpg", alt: "Foto bersama kegiatan CSR" }
    ]
  },
  "menjaga-kebersihan-lingkungan": {
    id: 3,
    title: "Menjaga Kebersihan Lingkungan",
    date: "22 April 2025",
    location: "Perkebunan dan Lingkungan Sekitar",
    coverImage: "/kegiatan/kebersihan-lingkungan.jpg",
    description: "Gerakan menjaga kebersihan lingkungan perkebunan dan sekitarnya untuk menciptakan lingkungan yang sehat dan berkelanjutan.",
    fullStory: `Gerakan menjaga kebersihan lingkungan merupakan komitmen PT. Agri Wangi Sentosa dalam menciptakan lingkungan yang sehat dan berkelanjutan. Kegiatan ini melibatkan seluruh karyawan dan masyarakat sekitar perkebunan.

Program kebersihan lingkungan meliputi pembersihan area perkebunan, pengelolaan sampah yang baik, dan edukasi tentang pentingnya menjaga kebersihan lingkungan. Kegiatan ini dilakukan secara berkala dan berkelanjutan.

Tim kebersihan melakukan pembersihan rutin di area perkebunan, termasuk jalan-jalan akses, area pabrik, dan fasilitas umum lainnya. Sistem pengelolaan sampah yang baik juga diterapkan untuk mengurangi dampak negatif terhadap lingkungan.

Edukasi kepada masyarakat dilakukan melalui penyuluhan dan kampanye kebersihan lingkungan. Masyarakat diajak untuk turut serta menjaga kebersihan lingkungan sekitar tempat tinggal mereka.

Program ini tidak hanya menjaga kebersihan, tetapi juga meningkatkan kesadaran masyarakat tentang pentingnya pelestarian lingkungan untuk generasi mendatang.`,
    gallery: [
      { id: 1, src: "/kegiatan/gallery/kebersihan-1.jpg", alt: "Pembersihan area perkebunan" },
      { id: 2, src: "/kegiatan/gallery/kebersihan-2.jpg", alt: "Pengelolaan sampah" },
      { id: 3, src: "/kegiatan/gallery/kebersihan-3.jpg", alt: "Edukasi kebersihan lingkungan" },
      { id: 4, src: "/kegiatan/gallery/kebersihan-4.jpg", alt: "Kampanye kebersihan" },
      { id: 5, src: "/kegiatan/gallery/kebersihan-5.jpg", alt: "Pembersihan fasilitas umum" },
      { id: 6, src: "/kegiatan/gallery/kebersihan-6.jpg", alt: "Foto bersama kegiatan kebersihan" }
    ]
  },
  "17-agustus-2025": {
    id: 4,
    title: "17 Agustus 2025",
    date: "17 Agustus 2025",
    location: "Perkebunan Teh Patuahwattee",
    coverImage: "/17/background17.png",
    description: "Perayaan Hari Kemerdekaan Republik Indonesia dengan berbagai kegiatan dan perlombaan yang melibatkan karyawan dan masyarakat sekitar.",
    fullStory: `Perayaan Hari Kemerdekaan Republik Indonesia yang diselenggarakan oleh PT. Agri Wangi Sentosa merupakan momen istimewa untuk mempererat rasa persatuan dan kesatuan antara karyawan perusahaan dengan masyarakat sekitar perkebunan.

Kegiatan perayaan meliputi upacara bendera, berbagai perlombaan tradisional, dan pertunjukan seni budaya. Upacara bendera dilaksanakan dengan khidmat di lapangan perkebunan dengan melibatkan seluruh karyawan dan masyarakat.

Berbagai perlombaan tradisional seperti balap karung, makan kerupuk, tarik tambang, dan lomba panjat pinang menjadi daya tarik utama perayaan. Perlombaan ini melibatkan karyawan dan masyarakat dari berbagai usia.

Pertunjukan seni budaya menampilkan kesenian tradisional daerah dan modern. Masyarakat sekitar perkebunan turut berpartisipasi dalam menampilkan berbagai kesenian khas daerah.

Perayaan ini tidak hanya menjadi ajang hiburan, tetapi juga mempererat tali silaturahmi dan rasa kebersamaan antara perusahaan dengan masyarakat sekitar perkebunan.`,
    gallery: [
      { id: 1, src: "/kegiatan/gallery/17agustus-1.jpg", alt: "Upacara bendera 17 Agustus" },
      { id: 2, src: "/kegiatan/gallery/17agustus-2.jpg", alt: "Perlombaan balap karung" },
      { id: 3, src: "/kegiatan/gallery/17agustus-3.jpg", alt: "Lomba makan kerupuk" },
      { id: 4, src: "/kegiatan/gallery/17agustus-4.jpg", alt: "Pertunjukan seni budaya" },
      { id: 5, src: "/kegiatan/gallery/17agustus-5.jpg", alt: "Lomba tarik tambang" },
      { id: 6, src: "/kegiatan/gallery/17agustus-6.jpg", alt: "Foto bersama perayaan 17 Agustus" }
    ]
  }
}

interface PageProps {
  params: {
    slug: string
  }
}

function GalleryImage({ image }: { image: { id: number; src: string; alt: string } }) {
  return (
    <div className="aspect-square overflow-hidden rounded-lg border bg-card">
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "/placeholder.svg?height=300&width=300&query=gallery";
        }}
      />
    </div>
  )
}

function AutoGallery({ slug, fallback }: { slug: string; fallback: Array<{ id: number; src: string; alt: string }> }) {
  const [images, setImages] = useState<Array<{ id: number; src: string; alt: string }>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch(`/api/gallery/${slug}`, { cache: "no-store" })
        if (!res.ok) throw new Error("Failed to fetch images")
        const data = await res.json()
        if (!cancelled) setImages(Array.isArray(data.images) ? data.images : [])
      } catch (_) {
        if (!cancelled) setImages([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [slug])

  const toRender = images.length > 0 ? images : fallback

  if (loading && images.length === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-lg border bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  if (toRender.length === 0) {
    return <p className="text-center text-muted-foreground">Belum ada foto di galeri.</p>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {toRender.map((image) => (
        <GalleryImage key={image.id} image={image} />
      ))}
    </div>
  )
}

export default function KegiatanDetailPage({ params }: PageProps) {
  const kegiatan = kegiatanDetail[params.slug as keyof typeof kegiatanDetail]

  if (!kegiatan) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative">
          <div className="aspect-[21/9] overflow-hidden">
            <img
              src={kegiatan.coverImage}
              alt={kegiatan.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg?height=400&width=800&query=banner";
              }}
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{kegiatan.title}</h1>
                <p className="text-xl md:text-2xl">{kegiatan.date}</p>
                <p className="text-lg mt-2">{kegiatan.location}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <section className="bg-gray-50 py-4">
          <div className="mx-auto max-w-6xl px-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-primary">Beranda</Link>
              <span className="text-muted-foreground">/</span>
              <Link href="/kegiatan" className="text-muted-foreground hover:text-primary">Kegiatan</Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground">{kegiatan.title}</span>
            </nav>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground mb-8">{kegiatan.description}</p>
              <div className="whitespace-pre-line text-foreground leading-relaxed">
                {kegiatan.fullStory}
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Galeri Kegiatan</h2>
              <p className="text-muted-foreground">Dokumentasi lengkap kegiatan {kegiatan.title}</p>
            </div>
            <AutoGallery slug={params.slug} fallback={kegiatan.gallery} />
          </div>
        </section>

        {/* Back to Activities */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <Link
              href="/kegiatan"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Kembali ke Daftar Kegiatan
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
