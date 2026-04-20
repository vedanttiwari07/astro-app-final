import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import CheckoutPage from "@/components/CheckoutPage";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#FDF8F0]">
          <Loader2 className="h-8 w-8 animate-spin text-saffron-500" />
        </div>
      }
    >
      <CheckoutPage />
    </Suspense>
  );
}
