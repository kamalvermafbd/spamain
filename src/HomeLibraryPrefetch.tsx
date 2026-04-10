import { useEffect } from "react";
import { apiGet } from "./lib/api";

export default function HomeLibraryPrefetch({
  onLoaded,
}: {
  onLoaded?: (data: any[]) => void;
}) {
  useEffect(() => {
    prefetchLibraryVideos();
  }, []);

  async function prefetchLibraryVideos() {
    try {
      const res = await apiGet("getLibraryVideos");

      if (res?.success) {
        console.log("📚 Home library prefetched:", res.data);

        if (typeof onLoaded === "function") {
          onLoaded(res.data);
        }
      }
    } catch (error) {
      console.error("❌ Home library prefetch failed:", error);
    }
  }

  return null;
}
