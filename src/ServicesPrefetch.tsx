import { useEffect } from "react";
import { apiGet } from "./lib/api";

const ServicesPrefetch = () => {
  useEffect(() => {
    const loadServices = async () => {
      try {
        const cached = localStorage.getItem("spaServices");

        if (cached) {
          console.log("📦 Services already prefetched");
          return;
        }

        console.log("🚀 Prefetching services...");
        const res = await apiGet("getServices");

        if (res?.success) {
          localStorage.setItem(
            "spaServices",
            JSON.stringify(res.data || [])
          );

          console.log("✅ Services prefetched:", res.data?.length);
        }
      } catch (error) {
        console.error("❌ Services prefetch failed:", error);
      }
    };

    loadServices();
  }, []);

  return null;
};

export default ServicesPrefetch;
