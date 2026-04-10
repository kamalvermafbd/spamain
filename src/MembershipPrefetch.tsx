import { useEffect } from "react";
import { apiGet } from "./lib/api";

export default function MembershipPrefetch({
  onLoaded,
}: {
  onLoaded: (data: any[]) => void;
}) {
  useEffect(() => {
    const loadMembershipPlans = async () => {
      try {
        const res = await apiGet("getMembershipPlans");

        if (res?.success) {
          console.log("🏠 Membership prefetched at app root:", res.data);
          onLoaded(res.data || []);
        }
      } catch (error) {
        console.error("❌ Membership fetch failed:", error);
      }
    };

    loadMembershipPlans();
  }, [onLoaded]);

  return null;
}
