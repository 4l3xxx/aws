import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Certifications } from "@/components/sections/certifications"
import { Plantation } from "@/components/sections/plantation"
import { Factories } from "@/components/sections/factories"
import { Life } from "@/components/sections/life"
import { Products } from "@/components/sections/products"
import { Gallery } from "@/components/sections/gallery"
import { Contact } from "@/components/sections/contact"

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <About />
      <Certifications />
      <Plantation />
      <Factories />
      <Life />
      <Products />
      <Gallery />
      <Contact />
      <SiteFooter />
    </main>
  )
}
