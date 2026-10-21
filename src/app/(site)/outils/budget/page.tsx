import type { Metadata } from "next";
import { BudgetTool } from "@/components/tools/BudgetTool";
import { SourceList } from "@/components/guides/shared";
import { Container, PageHeader } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Outil de budget mensuel",
  description: "Calculez simplement votre reste à vivre mensuel. Gratuit, sans inscription, vos données restent sur votre appareil.",
  alternates: { canonical: "/outils/budget" },
};

export default function BudgetPage() {
  return (
    <>
      <PageHeader
        eyebrow="Outil gratuit"
        title="Mon budget mensuel"
        description="Listez vos revenus et vos dépenses pour connaître votre reste à vivre. Un outil d'organisation simple, sans conseil financier."
      />
      <Container className="py-10 sm:py-14">
        <BudgetTool />
        <section className="mt-12" aria-labelledby="pour-aller-plus-loin">
          <h2 id="pour-aller-plus-loin" className="text-xl font-bold text-ink">
            Pour aller plus loin
          </h2>
          <div className="mt-4">
            <SourceList ids={["mesquestionsdargent", "banque-france"]} />
          </div>
        </section>
      </Container>
    </>
  );
}
