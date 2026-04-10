import { useEffect, useState } from "react";
import { apiGet } from "./lib/api";
import MembershipPlans from "./MembershipPlans";

export default function MembershipPrefetch() {
  const [plans, setPlans] = useState<any[]>([]);

  useEffect(() => {
    const loadMembershipPlans = async () => {
      try {
        const res = await apiGet("getMembershipPlans");

        if (res?.success) {
          console.log("Membership prefetched:", res);
          setPlans(res?.data || []);
        }
        
      } catch (error) {
        console.error("❌ Membership fetch failed:", error);
      }
    };

    loadMembershipPlans();
  }, []);
  console.log("membership plans state:", plans);
  return <MembershipPlans plans={plans} />;

}
