"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

export type Lang = "ID" | "EN"

type Dict = Record<string, Record<Lang, string>>

const DICT: Dict = {
  "header.nav.about": { ID: "Tentang", EN: "About" },
  "header.nav.plantation": { ID: "Perkebunan", EN: "Plantation" },
  "header.nav.factories": { ID: "Pabrik", EN: "Factories" },
  "header.nav.life": { ID: "Kehidupan", EN: "Life" },
  "header.nav.activities": { ID: "Kegiatan", EN: "Activities" },
  "header.nav.products": { ID: "Produk", EN: "Products" },
  "header.nav.contact": { ID: "Kontak", EN: "Contact" },
  "header.cta.contact": { ID: "Hubungi Kami", EN: "Contact Us" },

  "footer.rights": {
    ID: "Seluruh hak cipta dilindungi.",
    EN: "All rights reserved.",
  },

  // Hero
  "hero.brand": { ID: "Perkebunan Teh Patuahwattee", EN: "Patuahwattee Tea Plantation" },
  "hero.title": { ID: "Dari Dataran Tinggi ke Cangkirmu", EN: "From Highland to Your Cup" },
  "hero.desc": {
    ID: "Perkebunan teh bersejarah di ketinggian 1.500–2.200 mdpl. Dikelola oleh PT. Agri Wangi Sentosa dengan komitmen keberlanjutan dan kualitas terbaik.",
    EN: "A historic tea estate at 1,500–2,200 masl. Managed by PT. Agri Wangi Sentosa with a commitment to sustainability and quality.",
  },
  "hero.cta.products": { ID: "Lihat Produk Kami", EN: "See Our Products" },
  "hero.cta.contact": { ID: "Hubungi Kami", EN: "Contact Us" },

  // About
  "about.title": { ID: "Tentang Kami", EN: "About Us" },
  "about.desc": {
    ID: "PT. Agri Wangi Sentosa mengelola Perkebunan Teh Patuahwattee di Jawa Barat, berdiri di ketinggian 1.500–2.200 mdpl dengan luas 2.127 ha, mencakup perkebunan, pabrik, dan fasilitas penunjang.",
    EN: "PT. Agri Wangi Sentosa manages the Patuahwattee Tea Plantation in West Java, located at 1,500–2,200 masl across 2,127 ha, covering estate, factories, and supporting facilities.",
  },
  "about.history": { ID: "Sejarah Singkat", EN: "Brief History" },
  "about.history.item1910": {
    ID: "1910 - Didirikan oleh perusahaan Belgia.",
    EN: "1910 - Founded by a Belgian company.",
  },
  "about.history.item1925_1968": {
    ID: "1925-1968 - Beralih kepemilikan ke beberapa perusahaan asing.",
    EN: "1925–1968 - Ownership transferred to several foreign companies.",
  },
  "about.history.item1983": {
    ID: "1983 - Diambil alih oleh PT. Sinar Mas.",
    EN: "1983 - Acquired by PT. Sinar Mas.",
  },
  "about.history.item2002": {
    ID: "2002 - Dikelola PT. Sariwangi AEA.",
    EN: "2002 - Managed by PT. Sariwangi AEA.",
  },
  "about.history.item2019_now": {
    ID: "2019-Sekarang - Dikelola PT. Agri Wangi Sentosa.",
    EN: "2019–Present - Managed by PT. Agri Wangi Sentosa.",
  },

  // Plantation
  "plantation.title": { ID: "Perkebunan & Lingkungan", EN: "Plantation & Environment" },
  "plantation.desc": {
    ID: "Varietas: Camellia sinensis var. Assamica. Bersertifikat Rainforest Alliance untuk tata kelola kebun yang berkelanjutan.",
    EN: "Variety: Camellia sinensis var. Assamica. Rainforest Alliance certified for sustainable estate management.",
  },
  "plantation.stat.total": { ID: "Total Area", EN: "Total Area" },
  "plantation.stat.tea": { ID: "Perkebunan Teh", EN: "Tea Estate" },
  "plantation.stat.forest": { ID: "Hutan Lindung", EN: "Conservation Forest" },
  "plantation.stat.facilities": { ID: "Fasilitas", EN: "Facilities" },
  "plantation.stat.nursery": { ID: "Persemaian", EN: "Nursery" },
  "plantation.tab.map": { ID: "Peta", EN: "Map" },
  "plantation.tab.sustain": { ID: "Keberlanjutan", EN: "Sustainability" },

  // Factories
  "factories.title": { ID: "Pabrik Pengolahan", EN: "Processing Factories" },
  "factories.desc": {
    ID: "Tiga pabrik di area kebun: Green Tea (idle), CTC Black (belum beroperasi), Orthodox Black (aktif).",
    EN: "Three factories on the estate: Green Tea (idle), CTC Black (not operating), Orthodox Black (active).",
  },
  "factories.card.green.subtitle": {
    ID: "Kapasitas 12,5 ton daun/hari – saat ini idle",
    EN: "Capacity 12.5 tons leaf/day – currently idle",
  },
  "factories.card.ctc.subtitle": {
    ID: "Belum beroperasi",
    EN: "Not operating",
  },
  "factories.card.orthodox.subtitle": {
    ID: "Kapasitas 45 ton daun/hari – aktif berproduksi",
    EN: "Capacity 45 tons leaf/day – active production",
  },

  // Life
  "life.title": { ID: "Kehidupan di Perkebunan", EN: "Life on the Estate" },
  "life.desc": {
    ID: "870+ karyawan dan keluarga tinggal di area kebun dengan fasilitas pendidikan, kesehatan, dan sosial.",
    EN: "+870 employees and families live on the estate with education, healthcare, and social facilities.",
  },
  "life.fac.perumahan": { ID: "Perumahan", EN: "Housing" },
  "life.fac.perumahan.detail": { ID: "Hunian layak dan dekat dengan area kerja.", EN: "Decent housing close to the workplace." },
  "life.fac.sekolah": { ID: "Sekolah (TK, SD, SMP)", EN: "Schools (Kindergarten–Junior HS)" },
  "life.fac.sekolah.detail": { ID: "Pendidikan dasar bagi anak karyawan dan warga sekitar.", EN: "Basic education for employees' children and nearby residents." },
  "life.fac.klinik": { ID: "Klinik Kesehatan", EN: "Clinic" },
  "life.fac.klinik.detail": { ID: "Pelayanan kesehatan dasar dan program preventif.", EN: "Basic healthcare and preventive programs." },
  "life.fac.masjid": { ID: "Masjid & Pusat Komunitas", EN: "Mosque & Community Center" },
  "life.fac.masjid.detail": { ID: "Fasilitas ibadah dan kegiatan sosial kemasyarakatan.", EN: "Place of worship and social activities." },
  "life.fac.koperasi": { ID: "Koperasi, ATM, BTS", EN: "Co-op, ATM, BTS" },
  "life.fac.koperasi.detail": { ID: "Dukungan ekonomi, akses perbankan, dan telekomunikasi.", EN: "Economic support, banking access, and telecom." },
  "life.fac.olahraga": { ID: "Olahraga & Pusat Anak", EN: "Sports & Child Center" },
  "life.fac.olahraga.detail": { ID: "Lapangan olahraga, ruang bermain dan pembinaan anak.", EN: "Sports field, playground, and child development." },

  // Products
  "products.title": { ID: "Produk", EN: "Products" },
  "products.desc": {
    ID: "Teh premium dari Patuahwattee: White Tea, Black Tea, Green Tea, dan Yellow Tea.",
    EN: "Premium teas from Patuahwattee: White, Black, Green, and Yellow Tea.",
  },
  "products.viewDetail": { ID: "Lihat detail", EN: "View details" },
  "products.contactUs": { ID: "Hubungi Kami", EN: "Contact Us" },
  "products.advantages": { ID: "Keunggulan", EN: "Highlights" },
  "products.origin": { ID: "Asal", EN: "Origin" },
  "products.process": { ID: "Proses", EN: "Processing" },
  "products.brew": { ID: "Seduh", EN: "Brew" },

  // Gallery
  "gallery.title": { ID: "Galeri", EN: "Gallery" },
  "gallery.tab.sekolah": { ID: "Sekolah", EN: "School" },
  "gallery.tab.pabrik": { ID: "Pabrik", EN: "Factory" },
  "gallery.tab.perkebunan": { ID: "Perkebunan", EN: "Estate" },
  "gallery.tab.klinik": { ID: "Klinik", EN: "Clinic" },

  // Contact
  "contact.title": { ID: "Kontak & Alamat", EN: "Contact & Address" },
  "contact.info": { ID: "Informasi Akses", EN: "Access Info" },
  "contact.info.desc": {
    ID: "Temukan lokasi kebun dan cara berkunjung ke PT. Agri Wangi Sentosa.",
    EN: "Find the estate location and how to visit PT. Agri Wangi Sentosa.",
  },
  "contact.address": { ID: "Alamat", EN: "Address" },
  "contact.hours": { ID: "Jam Operasional", EN: "Operating Hours" },
  "contact.email": { ID: "Email", EN: "Email" },
  "contact.phone": { ID: "Telepon", EN: "Phone" },
  "contact.form.title": { ID: "Hubungi Kami", EN: "Contact Us" },
  "contact.form.desc": {
    ID: "Silakan isi formulir ini dengan pesan singkat dan tim kami akan segera merespons.",
    EN: "Fill in this form with a brief message and our team will respond shortly.",
  },
  "contact.form.name": { ID: "Nama", EN: "Name" },
  "contact.form.message": { ID: "Pesan", EN: "Message" },
  "contact.form.send": { ID: "Kirim Pesan", EN: "Send Message" },
  "contact.form.sending": { ID: "Mengirim...", EN: "Sending..." },
  "contact.form.placeholder.name": { ID: "Masukkan nama Anda", EN: "Your Name" },
  "contact.form.placeholder.email": { ID: "Masukkan email aktif", EN: "Email Address" },
  "contact.form.placeholder.message": { ID: "Tuliskan pesan atau pertanyaan Anda di sini", EN: "Your Message" },
  "contact.hours.value": { ID: "Senin - Jumat, 08:00 - 17:00 WIB", EN: "Mon - Fri, 08:00 - 17:00 WIB" },
  "contact.map.open": { ID: "Lihat peta lebih besar", EN: "View larger map" },

  // Plantation map & details
  "plantation.zoneData": { ID: "Zona & Data", EN: "Zones & Data" },
  "plantation.map.item.prod": { ID: "Blok produksi utama: 1.291 ha", EN: "Main production blocks: 1,291 ha" },
  "plantation.map.item.forest": { ID: "Hutan lindung & konservasi: 555 ha", EN: "Protected & conservation forest: 555 ha" },
  "plantation.map.item.facilities": { ID: "Fasilitas & perumahan: 279 ha", EN: "Facilities & housing: 279 ha" },
  "plantation.map.item.nursery": { ID: "Persemaian & riset: 2 ha", EN: "Nursery & research: 2 ha" },
  "plantation.legend.teaGarden": { ID: "Kebun Teh", EN: "Tea Garden" },
  "plantation.legend.conservation": { ID: "Area Konservasi", EN: "Conservation Area" },
  "plantation.legend.plantation": { ID: "Area Perkebunan", EN: "Plantation Area" },
  "plantation.map.alt": { ID: "Peta luas kebun", EN: "Estate area map" },

  // Sustainability / compliance
  "sustain.title.soilWater": { ID: "Pengelolaan Tanah & Air", EN: "Soil & Water Management" },
  "sustain.body.soilWater": {
    ID: "Praktik konservasi untuk mengurangi erosi, menjaga kualitas air, dan memaksimalkan infiltrasi.",
    EN: "Conservation practices to reduce erosion, protect water quality, and maximize infiltration.",
  },
  "sustain.title.biodiversity": { ID: "Keanekaragaman Hayati", EN: "Biodiversity" },
  "sustain.body.biodiversity": {
    ID: "Pelestarian habitat satwa liar dan koridor hijau pada area lindung.",
    EN: "Preservation of wildlife habitats and green corridors in protected areas.",
  },
  "sustain.title.safety": { ID: "Keselamatan & Kesejahteraan", EN: "Safety & Welfare" },
  "sustain.body.safety": {
    ID: "Program K3, fasilitas kesehatan, dan pelatihan berkelanjutan bagi pekerja.",
    EN: "OHS programs, health facilities, and ongoing training for workers.",
  },
  "sustain.title.balance": { ID: "Keseimbangan Ekosistem", EN: "Ecosystem Balance" },
  "sustain.body.balance": {
    ID: "Menjaga proporsi area lindung dan produksi agar ekologi tetap stabil.",
    EN: "Maintaining the proportion of protected and production areas for ecological stability.",
  },
  "sustain.compliance.title": { ID: "Indikator Kepatuhan", EN: "Compliance Indicators" },
  "sustain.progress.soilWater": { ID: "Konservasi tanah & air", EN: "Soil & water conservation" },
  "sustain.progress.biodiversity": { ID: "Biodiversitas", EN: "Biodiversity" },
  "sustain.progress.ohs": { ID: "K3 & kesejahteraan", EN: "OHS & welfare" },
  "sustain.progress.balance": { ID: "Keseimbangan ekosistem", EN: "Ecosystem balance" },

  // Footer links
  "footer.links.terms": { ID: "Syarat & Ketentuan", EN: "Terms & Conditions" },
  "footer.links.privacy": { ID: "Kebijakan Privasi", EN: "Privacy Policy" },
}

type I18nContext = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: keyof typeof DICT) => string
}

const Ctx = createContext<I18nContext | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ID")

  useEffect(() => {
    try {
      const cookie = document.cookie.split("; ").find((c) => c.startsWith("lang="))
      const fromCookie = (cookie?.split("=")[1] as Lang | undefined)
      const fromStorage = (localStorage.getItem("lang") as Lang | null) ?? undefined
      const initial = fromCookie || fromStorage || (navigator.language?.startsWith("en") ? "EN" : "ID")
      apply(initial)
    } catch {
      // ignore
    }
    // Listen for changes from other tabs
    const onStorage = (e: StorageEvent) => {
      if (e.key === "lang" && (e.newValue === "ID" || e.newValue === "EN")) {
        apply(e.newValue)
      }
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const apply = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem("lang", l)
      document.cookie = `lang=${l}; path=/; max-age=${60 * 60 * 24 * 365}`
      document.documentElement.setAttribute("lang", l.toLowerCase())
    } catch {}
  }, [])

  const setLang = useCallback((l: Lang) => apply(l), [apply])

  const t = useCallback((key: keyof typeof DICT) => DICT[key]?.[lang] ?? key, [lang])

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useI18n() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}
