"use client"

import { useCallback, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import emailjs from "@emailjs/browser"
import { MapPin, Mail, Phone, Clock } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"

const ADDRESS = "Desa Sugih Mukti, Kec. Pasirjambu, Kab. Bandung"
const EMAIL = "alexanderboymarisi@gmail.com"
const PHONE = "+62 812-3456-7890"

export function Contact() {
  const { t } = useI18n()
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const { toast } = useToast()
  const envLat = process.env.NEXT_PUBLIC_MAPS_LAT
  const envLng = process.env.NEXT_PUBLIC_MAPS_LNG
  const hasLatLng = !!envLat && !!envLng
  const baseFromCoords = hasLatLng
    ? `https://www.google.com/maps?q=${envLat},${envLng}`
    : `https://www.google.com/maps?q=-7.034,107.495`
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY
  const embedFromKey = apiKey && hasLatLng
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${envLat},${envLng}&zoom=16`
    : undefined
  const MAPS_EMBED = process.env.NEXT_PUBLIC_MAPS_EMBED_SRC || embedFromKey || `${baseFromCoords}&z=16&output=embed`
  const MAPS_LINK = process.env.NEXT_PUBLIC_MAPS_LINK || baseFromCoords

  const copyAddress = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(ADDRESS)
      toast({ title: "Alamat disalin", description: ADDRESS })
    } catch {
      toast({ title: "Gagal menyalin", description: "Silakan salin manual." })
    }
  }, [toast])

  const sendEmail = useCallback(async (formData: FormData) => {
    setStatus("sending")
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      const name = (formData.get("name") as string)?.trim()
      const email = (formData.get("email") as string)?.trim()
      const message = (formData.get("message") as string)?.trim()

      const emailRegex = /^[\w.!#$%&'*+/=?`{|}~-]+@[\w-]+(?:\.[\w-]+)+$/
      if (!emailRegex.test(email)) {
        setStatus("idle")
        setErrorMessage("Mohon masukkan email yang valid.")
        return
      }

      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

      if (
        serviceId &&
        templateId &&
        publicKey &&
        serviceId !== "service_agriwangi" &&
        publicKey !== "your_public_key"
      ) {
        const templateParams = {
          from_name: name,
          from_email: email,
          message,
          to_email: EMAIL,
        }

        await emailjs.send(serviceId, templateId, templateParams, publicKey)

        setStatus("sent")
        setSuccessMessage("Terima kasih! Pesan Anda sudah terkirim.")
        toast({
          title: "Email terkirim!",
          description: "Pesan Anda telah dikirim ke " + EMAIL,
        })
      } else {
        const subject = `Pesan dari ${name} - Website PT. Agri Wangi Sentosa`
        const body = `Nama: ${name}\nEmail: ${email}\n\nPesan: \n${message}`

        const mailtoLink = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        window.open(mailtoLink, "_blank")

        setStatus("sent")
        setSuccessMessage("Terima kasih! Pesan Anda sudah siap dikirim melalui email.")
        toast({
          title: "Email dibuka!",
          description: "Aplikasi email akan terbuka untuk mengirim ke " + EMAIL,
        })
      }
    } catch (error) {
      console.error("Error sending email:", error)
      setStatus("error")
      setErrorMessage("Gagal mengirim pesan. Silakan coba lagi.")
      toast({
        title: "Gagal mengirim email",
        description: "Silakan coba lagi atau hubungi langsung ke " + EMAIL,
      })
    }
  }, [toast])

  return (
    <section id="contact" className="border-t bg-muted">
      <div className="mx-auto max-w-6xl px-4 section-space">
        <h2 className="text-2xl font-semibold">{t("contact.title")}</h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Kolom informasi tetap tampil penuh saat form dinonaktifkan */}
          <div className="rounded-xl border bg-white p-6 shadow-sm lg:col-span-2">
            <h3 className="text-lg font-semibold text-foreground">{t("contact.info")}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t("contact.info.desc")}</p>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <span className="mt-1 rounded-full bg-[#28a745]/10 p-2 text-[#28a745]">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{t("contact.address")}</p>
                  <p className="text-sm font-medium text-foreground">{ADDRESS}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-1 rounded-full bg-[#28a745]/10 p-2 text-[#28a745]">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{t("contact.hours")}</p>
                  <p className="text-sm font-medium text-foreground">{t("contact.hours.value")}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-1 rounded-full bg-[#28a745]/10 p-2 text-[#28a745]">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{t("contact.phone")}</p>
                  <a href={"tel:" + PHONE.replace(/\s+/g, "")} className="text-sm font-medium text-foreground hover:underline">{PHONE}</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-1 rounded-full bg-[#28a745]/10 p-2 text-[#28a745]">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{t("contact.email")}</p>
                  <a href={"mailto:" + EMAIL} className="text-sm font-medium text-foreground hover:underline">{EMAIL}</a>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-lg border bg-muted/40 p-3 text-sm text-muted-foreground">
              <p>Akses utama: Simpang - Rancabolan - Patuha</p>
              <p>Akses alternatif: Kawah Putih - Brussel - Patuha</p>
              <p>Jarak: 55 km dari Bandung, 24 km dari Ciwidey</p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button variant="outline" size="lg" onClick={copyAddress} className="border-[#28a745] text-[#28a745] hover:bg-[#28a745]/10">
                Salin alamat
              </Button>
            </div>

            <Accordion type="single" collapsible className="mt-4">
              <AccordionItem value="rute-1">
                <AccordionTrigger>Detail rute Simpang - Rancabolan - Patuha</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Jalur utama dengan akses kendaraan besar dan kondisi jalan yang stabil.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="rute-2">
                <AccordionTrigger>Detail rute Kawah Putih - Brussel - Patuha</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Rute dengan panorama pegunungan, berhati-hati pada beberapa tanjakan.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Peta dinonaktifkan sementara */}
            {false && (
              <div className="mt-6 overflow-hidden rounded-lg border">
                <AspectRatio ratio={16 / 9}>
                  <div className="relative h-full w-full">
                    <iframe
                      title="Lokasi PT. Agri Wangi Sentosa"
                      src={MAPS_EMBED}
                      className="absolute inset-0 h-full w-full"
                      style={{ background: 'transparent' }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    <div className="absolute left-3 top-3">
                      <Button asChild size="sm" className="bg-[#28a745] text-white hover:bg-[#23923c] shadow-md">
                        <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer">
                          {t("contact.map.open")}
                        </a>
                      </Button>
                    </div>
                  </div>
                </AspectRatio>
              </div>
            )}
          </div>

          {/* Bagian "Hubungi Kami" (form) dinonaktifkan sementara */}
          {false && (
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground">{t("contact.form.title")}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t("contact.form.desc")}</p>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  sendEmail(formData)
                }}
                className="mt-6 space-y-4"
                aria-label="Form kontak"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-1.5">
                    <label htmlFor="name" className="text-sm font-medium text-muted-foreground">
                      {t("contact.form.name")}
                    </label>
                    <Input id="name" name="name" placeholder={t("contact.form.placeholder.name")} required />
                  </div>
                  <div className="grid gap-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                      {t("contact.email")}
                    </label>
                    <Input id="email" name="email" type="email" placeholder={t("contact.form.placeholder.email")} required />
                  </div>
                  <div className="md:col-span-2 grid gap-1.5">
                    <label htmlFor="message" className="text-sm font-medium text-muted-foreground">
                      {t("contact.form.message")}
                    </label>
                    <Textarea id="message" name="message" placeholder={t("contact.form.placeholder.message")} required />
                  </div>
                </div>

                {errorMessage && (
                  <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {errorMessage}
                  </div>
                )}

                {successMessage && (
                  <div className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                    {successMessage}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "sending"}
                    className="bg-[#28a745] text-white hover:bg-[#23923c] focus-visible:ring-[#28a745]"
                  >
                    {status === "sending" ? t("contact.form.sending") : t("contact.form.send")}
                  </Button>
                </div>
              </form>

              <div className="mt-6 rounded-md border bg-muted/40 p-3 text-sm text-muted-foreground">
                <p>Kami berusaha menjawab setiap pesan dalam waktu 1 hari kerja.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Toaster />
    </section>
  )
}
