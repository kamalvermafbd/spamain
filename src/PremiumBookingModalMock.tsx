import { useEffect, useState } from "react";
import { apiGet } from "./lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function PremiumBookingModalMock({
  onClose,
  selectedBranch,
}: {
  onClose: () => void;
  selectedBranch?: string;
}) {
  const [bookingType, setBookingType] = useState<
    "membership" | "service" | null
  >(null);
  const [branch, setBranch] = useState(selectedBranch || "");
  useEffect(() => {
  setBranch(selectedBranch || "");
}, [selectedBranch]);
const [phone, setPhone] = useState("");
const [customerName, setCustomerName] = useState("");
const [customerEmail, setCustomerEmail] = useState("");
const [isCustomerLoading, setIsCustomerLoading] = useState(false);  
const [selectedOption, setSelectedOption] = useState("");
const [serviceOptions, setServiceOptions] = useState<any[]>([]);
const [membershipOptions, setMembershipOptions] = useState<any[]>([]);
  const [branchOptions, setBranchOptions] = useState<any[]>([]);
const [isOptionsLoading, setIsOptionsLoading] = useState(false);
const [isDropdownsReady, setIsDropdownsReady] = useState(false);
const selectedMembership = membershipOptions.find(
  (item) => item.name === selectedOption
);  
const selectedService = serviceOptions.find(
  (item) => item.title === selectedOption
);
const [serviceVariants, setServiceVariants] = useState<any[]>([]);
const [selectedVariant, setSelectedVariant] = useState("");
  const [variantsLoading, setVariantsLoading] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
const [bookingTime, setBookingTime] = useState("");
const selectedVariantData = serviceVariants.find(
  (item) => item.id === selectedVariant
);
  const selectedBranchData = branchOptions.find(
  (item) => item.name === branch
);
  const handleBookingSelect = (type: "membership" | "service") => {
  setBookingType(type);
  setSelectedOption("");
  setPhone("");
  setCustomerName("");
  setCustomerEmail("");

  // show loader only if API data still not ready
  setIsOptionsLoading(!isDropdownsReady);
};
  
  useEffect(() => {
  const loadDropdowns = async () => {
    const [servicesRes, membershipRes, branchesRes] = await Promise.all([
  apiGet("getServices"),
  apiGet("getMembershipPlans"),
  apiGet("getBranches"),
]);

    if (servicesRes?.success) {
      setServiceOptions(servicesRes.data || []);
    }

    if (membershipRes?.success) {
      setMembershipOptions(membershipRes.data || []);
    }
    if (branchesRes?.success) {
  setBranchOptions(branchesRes.data || []);
}
    setIsDropdownsReady(true);
    setIsOptionsLoading(false);
  };

 loadDropdowns();
}, []);
  
  const fetchCustomerByPhone = async (mobile: string) => {
  if (mobile.length !== 10) return;
setIsCustomerLoading(true);
  try {
    const res = await apiGet("getCustomerByPhone", {
      phone: mobile,
    });

    if (res?.success && res.customer) {
      setCustomerName(res.customer.name || "");
      setCustomerEmail(res.customer.email || "");
    }
  } catch (error) {
    console.error("Customer fetch failed", error);
  } finally {
  setIsCustomerLoading(false);
}
};
  
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-xl flex items-center justify-center p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.96, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0 }}
          className="w-full max-w-5xl max-h-[90vh] overflow-y-auto premium-scrollbar rounded-3xl border border-primary/20 bg-[#111] p-8 md:p-10 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-primary text-[10px] uppercase tracking-[0.4em] font-bold">
                Begin Your Ritual
              </p>
              <h2 className="font-headline text-3xl md:text-5xl text-white">
                Choose Your Experience
              </h2>
            </div>

            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.08, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex h-14 w-14 items-center justify-center rounded-full
                         border border-primary/25
                         bg-gradient-to-br from-white/[0.06] to-white/[0.02]
                         backdrop-blur-xl
                         shadow-[0_0_30px_rgba(212,175,55,0.08)]
                         transition-all duration-500
                         hover:border-primary/60
                         hover:shadow-[0_0_40px_rgba(212,175,55,0.18)]"
            >
              <div className="absolute inset-0 rounded-full ring-1 ring-white/5 group-hover:ring-primary/40 transition-all duration-500" />
              <div className="absolute inset-[2px] rounded-full bg-gradient-to-b from-white/[0.06] to-transparent" />
              <X className="relative z-10 h-5 w-5 text-white/90 group-hover:text-primary transition-colors duration-500" />
            </motion.button>
          </div>

          {/* Booking Cards */}
          <div
            className={`grid gap-6 ${
              bookingType
                ? "grid-cols-1 md:grid-cols-2"
                : "md:grid-cols-2"
            }`}
          >
            {(!bookingType || bookingType === "membership") && (
              <motion.div
                layout
                onClick={() => handleBookingSelect("membership")}
                className="cursor-pointer rounded-3xl border border-primary/20 bg-white/5 p-8 hover:border-primary transition-all duration-500"
              >
                <p className="text-primary uppercase tracking-[0.3em] text-xs mb-4">
                  Membership
                </p>
                <h3 className="font-headline text-3xl text-white mb-4">
                  Premium Wellness Plans
                </h3>
                <p className="text-white/70 leading-relaxed">
                  Essential Wellness, Premium Escape, Zenith Luxury.
                </p>
              </motion.div>
            )}

            {(!bookingType || bookingType === "service") && (
              <motion.div
                layout
               onClick={() => handleBookingSelect("service")}
                className="cursor-pointer rounded-3xl border border-white/10 bg-white/5 p-8 hover:border-primary transition-all duration-500"
              >
                <p className="text-primary uppercase tracking-[0.3em] text-xs mb-4">
                  Single Ritual
                </p>
                <h3 className="font-headline text-3xl text-white mb-4">
                  Book Individual Service
                </h3>
                <p className="text-white/70 leading-relaxed">
                  Choose any massage, facial, body polish, or custom ritual.
                </p>
              </motion.div>
            )}
          </div>

          {/* Change Option */}
          {bookingType && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => {
  setBookingType(null);
  setSelectedOption("");
  setIsOptionsLoading(false);
}}
                className="text-primary text-sm tracking-[0.2em] uppercase hover:text-white transition"
              >
                Change Option
              </button>
            </div>
          )}

          {/* Selected Summary */}
          
          
          
{bookingType && (
            <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
              <p className="text-primary uppercase tracking-[0.3em] text-xs mb-2">
                Selected Flow
              </p>
              <h4 className="font-headline text-2xl text-white">
                {bookingType === "membership"
                  ? "Membership Booking Selected"
                  : "Single Service Booking Selected"}
              </h4>


{isOptionsLoading && (
  <div className="mt-8 rounded-3xl border-2 border-primary/60 bg-gradient-to-br from-primary/10 to-black/40 px-8 py-8 text-center shadow-[0_0_30px_rgba(212,175,55,0.12)] animate-pulse">
    <p className="text-primary text-xs uppercase tracking-[0.4em] mb-3 font-semibold">
      Preparing Your Experience
    </p>
    <h5 className="text-2xl font-headline text-white mb-3">
      {bookingType === "membership"
        ? "Preparing Your Membership Experiences"
        : "Preparing Your Service Menu"}
    </h5>
    <p className="text-white/80 leading-relaxed max-w-xl mx-auto">
      {bookingType === "membership"
        ? "Our wellness concierge is curating the most suitable plans for your selection."
        : "Our curated rituals are being arranged for your selection."}
    </p>
  </div>
)}

{!isOptionsLoading && (
  <div className="mt-6">
    <select
      value={selectedOption}
      onChange={(e) => {
        const value = e.target.value;
        setSelectedOption(value);

if (bookingType === "service") {
  const selected = serviceOptions.find((s) => s.title === value);

  if (selected?.no) {
    setVariantsLoading(true);
    setSelectedVariant("");
    setServiceVariants([]);

    apiGet("getServiceVariants", { no: selected.no })
      .then((res) => {
        setServiceVariants(res?.data || []);
      })
      .finally(() => {
        setVariantsLoading(false);
      });
  }
}
    if (!value) {
          setPhone("");
          setCustomerName("");
          setCustomerEmail("");
        }
      }}
      className="w-full rounded-2xl border border-primary/20 bg-white/5 px-5 py-4 text-white outline-none focus:border-primary [&>option]:text-black"
    >
      <option value="">Select an option</option>
      {(bookingType === "membership"
        ? membershipOptions
        : serviceOptions
      ).map((item, index) => {
        const label =
          bookingType === "membership"
            ? item?.name
            : item?.title;

        return (
          <option key={item.id || item.no || index} value={label}>
            {label}
          </option>
        );
      })}
    </select>

 {bookingType === "membership" &&
  selectedMembership && (
    <>
      <p className="mt-3 text-sm text-primary font-medium">
        ₹{selectedMembership?.price || 0} /{" "}
        {selectedMembership?.period || "month"}
      </p>
<p className="mt-2 text-xs text-white/60">
  Starts after confirmation • Valid for{" "}
  {selectedMembership?.period || "selected duration"}
</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {String(selectedMembership.features)
          .split(",")
          .map((feature: string, index: number) => (
            <span
              key={index}
              className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary"
            >
              {feature.trim()}
            </span>
          ))}
      </div>
    </>
  )}


{bookingType === "service" &&
  (variantsLoading || serviceVariants.length > 0) && (
    <div className="mt-4 space-y-3">
      <select
        value={selectedVariant}
        onChange={(e) => setSelectedVariant(e.target.value)}
        disabled={variantsLoading}
        className="w-full rounded-2xl border border-primary/20 bg-white/5 px-5 py-4 text-white outline-none focus:border-primary [&>option]:text-black disabled:opacity-70"
      >
        <option value="">
          {variantsLoading ? "Loading durations..." : "Select Duration"}
        </option>

        {serviceVariants.map((variant) => (
          <option key={variant.id} value={variant.id}>
            {variant.duration}
          </option>
        ))}
      </select>

      {selectedVariantData && (
        <p className="text-sm text-primary font-medium">
          ₹{selectedVariantData.charges}
        </p>
      )}
    </div>
)}


    
</div>
)}
</div>
)}

{bookingType && selectedOption && !isOptionsLoading && (

  <div className="mt-8 grid grid-cols-1 gap-6">

<select
  value={branch}
  onChange={(e) => {
  setBranch(e.target.value);
  setBookingDate("");
  setBookingTime("");
}}
  
  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none focus:border-primary [&>option]:text-black"
>
  <option value="">Select Branch</option>
  {branchOptions.map((item, index) => (
  <option key={item.id || item.no || index} value={item.name}>
   {item.name} — {item.area}
  </option>
))}
</select>

{bookingType === "service" && selectedVariant && branch && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input
      type="date"
      min={new Date().toISOString().split("T")[0]}
      value={bookingDate}
      onChange={(e) => setBookingDate(e.target.value)}
      className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none focus:border-primary"
    />

    <input
      type="time"
      value={bookingTime}
      onChange={(e) => setBookingTime(e.target.value)}
      min={selectedBranchData?.start_time || "10:00"}
      max={selectedBranchData?.end_time || "22:00"}
      className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none focus:border-primary"
    />
  </div>
)}




    
    <input
      type="tel"
      inputMode="numeric"
maxLength={10}
pattern="[6-9][0-9]{9}"
      placeholder="Mobile Number"
      value={phone}
onChange={(e) => {
  let value = e.target.value.replace(/\D/g, "");
if (value.length === 1 && !/[6-9]/.test(value)) return;
value = value.slice(0, 10);
setPhone(value);
if (value.length < 10) {
  setCustomerName("");
  setCustomerEmail("");
}
if (value.length === 10) {
  fetchCustomerByPhone(value);
}
}}
     className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none focus:border-primary disabled:opacity-60 disabled:cursor-not-allowed"
      
    />
{phone.length === 10 && (
      <>
    <input
      type="text"
      disabled={isCustomerLoading}
placeholder={isCustomerLoading ? "Loading customer..." : "Full Name"}
      value={customerName}
onChange={(e) => setCustomerName(e.target.value)}
   className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none focus:border-primary disabled:opacity-60 disabled:cursor-not-allowed"
    />

    <input
      type="email"
      disabled={isCustomerLoading}
placeholder={isCustomerLoading ? "Fetching email..." : "Email Address"}
      value={customerEmail}
onChange={(e) => setCustomerEmail(e.target.value)}
      className="md:col-span-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none focus:border-primary"
    />
      </>
  )}
      </div>
)}

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
