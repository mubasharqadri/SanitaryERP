import { DocManager } from "@/components/docs";
export default function PurchasesPage() {
  return <DocManager docType="PINV" title="Purchase Invoices" icon="📥" showConvert={false} />;
}
