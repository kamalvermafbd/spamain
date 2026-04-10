import { useEffect } from "react";
import { apiGet } from "./lib/api";

export default function ServicesPrefetch({
  onLoaded,
}: {
  onLoaded?: (data: any[]) => void;
}) {
  useEffect(() => {
    prefetchServices();
  }, []);

  async function prefetchServices() {
    try {
      const res = await apiGet("getServices");

      if (res?.success) {
        console.log("🛎 Services prefetched:", res.data);

        if (typeof onLoaded === "function") {
          onLoaded(res.data);
        }
      }
    } catch (error) {
      console.error("❌ Services prefetch failed:", error);
    }
  }

  return null;
}
