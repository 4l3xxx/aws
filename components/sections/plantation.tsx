"use client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { useI18n } from "@/components/i18n-provider"

export function Plantation() {
  const { t } = useI18n()
  return (
    <section id="plantation" className="border-y bg-muted">
      <div className="mx-auto max-w-6xl px-4 section-space">
        <h2 className="text-balance text-2xl font-semibold">{t("plantation.title")}</h2>
        <p className="mt-3 text-pretty text-muted-foreground">{t("plantation.desc")}</p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          <Stat label={t("plantation.stat.total")} value="2.127 ha" />
          <Stat label={t("plantation.stat.tea")} value="1.291 ha" />
          <Stat label={t("plantation.stat.forest")} value="555 ha" />
          <Stat label={t("plantation.stat.facilities")} value="279 ha" />
          <Stat label={t("plantation.stat.nursery")} value="2 ha" />
        </div>

        <div className="mt-8 rounded-lg border bg-background p-4">
          <Tabs defaultValue="peta">
            <TabsList>
              <TabsTrigger value="peta">{t("plantation.tab.map")}</TabsTrigger>
              <TabsTrigger value="keberlanjutan">{t("plantation.tab.sustain")}</TabsTrigger>
            </TabsList>

            <TabsContent value="peta">
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg border bg-background p-3">
                  <AspectRatio ratio={16 / 9}>
                    <img
                      src="/peta/luas_kebun.png"
                      alt={t("plantation.map.alt")}
                      className="h-full w-full rounded-md object-cover"
                    />
                  </AspectRatio>
                  <ul className="mt-3 grid grid-cols-1 gap-2 text-xs text-muted-foreground sm:grid-cols-3">
                    <li className="flex items-center gap-2"><span className="inline-block size-3 rounded-sm bg-green-500"></span>{t("plantation.legend.teaGarden")}</li>
                    <li className="flex items-center gap-2"><span className="inline-block size-3 rounded-sm bg-emerald-700"></span>{t("plantation.legend.plantation")}</li>
                    <li className="flex items-center gap-2"><span className="inline-block size-3 rounded-sm bg-lime-400"></span>{t("plantation.legend.conservation")}</li>
                  </ul>
                </div>
                <div className="rounded-lg border bg-background p-4">
                  <h3 className="text-sm font-medium">{t("plantation.zoneData")}</h3>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    <li>{t("plantation.map.item.prod")}</li>
                    <li>{t("plantation.map.item.forest")}</li>
                    <li>{t("plantation.map.item.facilities")}</li>
                    <li>{t("plantation.map.item.nursery")}</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="keberlanjutan">
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg border bg-background">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="tanah-air">
                      <AccordionTrigger>{t("sustain.title.soilWater")}</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">{t("sustain.body.soilWater")}</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="keanekaragaman">
                      <AccordionTrigger>{t("sustain.title.biodiversity")}</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">{t("sustain.body.biodiversity")}</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="kesejahteraan">
                      <AccordionTrigger>{t("sustain.title.safety")}</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">{t("sustain.body.safety")}</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="keseimbangan">
                      <AccordionTrigger>{t("sustain.title.balance")}</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">{t("sustain.body.balance")}</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div className="rounded-lg border bg-background p-4">
                  <h3 className="text-sm font-medium">{t("sustain.compliance.title")}</h3>
                  <div className="mt-3 space-y-3">
                    <ProgressItem label={t("sustain.progress.soilWater")} value={82} />
                    <ProgressItem label={t("sustain.progress.biodiversity")} value={76} />
                    <ProgressItem label={t("sustain.progress.ohs")} value={88} />
                    <ProgressItem label={t("sustain.progress.balance")} value={80} />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-background p-4 text-center">
      <div className="text-lg font-semibold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  )
}

function ProgressItem({ label, value: _value }: { label: string; value: number }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <Progress
        value={100}
        className="mt-1 bg-[#28a745] [&>[data-slot=progress-indicator]]:bg-[#28a745]"
      />
    </div>
  )
}
