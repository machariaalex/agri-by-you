import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "AgriByYou — Something fresh is growing",
  description:
    "Our website is getting some improvements and will be back shortly. You can still order fresh vegetables, fruits, organic onions and farm-raised ducks from AgriByYou.",
};

export default function ComingSoonPage() {
  return <ComingSoon />;
}
