import { useEffect, useState } from "react";
import { apiGet } from "./lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function PremiumBookingModalMock({
  onClose,
  selectedBranch,
  defaultBookingType,
  defaultSelectedOption,
  onServiceReady,
}: {
  onClose: () => void;
  selectedBranch?: string;
  defaultBookingType?: "membership" | "service";
  defaultSelectedOption?: string;
  onServiceReady?: () => void;
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

  useEffect(() => {
  if (defaultBookingType) {
    setBookingType(defaultBookingType);
  }

  if (defaultSelectedOption) {
    setSelectedOption(defaultSelectedOption);

    const selected = serviceOptions.find(
      (s) => s.title === defaultSelectedOption
    );

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
}, [defaultBookingType, defaultSelectedOption, serviceOptions]);

const [selectedVariant, setSelectedVariant] = useState("");
  const [variantsLoading, setVariantsLoading] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
const [bookingTime, setBookingTime] = useState("");
const [timeError, setTimeError] = useState("");
  const [showSummary, setShowSummary] = useState(false);
const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
const [showSuccessDialog, setShowSuccessDialog] = useState(false);
const [lastBookingPayload, setLastBookingPayload] = useState<any>(null);
  
const selectedVariantData = serviceVariants.find(
  (item) => item.id === selectedVariant
);
  const selectedBranchData = branchOptions.find(
  (item) => item.name === branch
);

  const getDurationMinutes = (duration: string) => {
  const match = String(duration).match(/\d+/);
  return match ? Number(match[0]) : 0;
};

  const getLastAllowedStartTime = () => {
  if (!selectedBranchData?.end_time) {
    return undefined;
  }

  if (!selectedVariantData?.duration) {
    return selectedBranchData.end_time;
  }

  const duration = getDurationMinutes(
    selectedVariantData.duration
  );

  const [h, m] = selectedBranchData.end_time
    .split(":")
    .map(Number);

  const total = h * 60 + m - duration;

  const hh = String(Math.floor(total / 60)).padStart(2, "0");
  const mm = String(total % 60).padStart(2, "0");

  return `${hh}:${mm}`;
};

const minDate = new Date(
  Date.now() - new Date().getTimezoneOffset() * 60000
)
  .toISOString()
  .split("T")[0];

const getMinAllowedTime = () => {
  if (!selectedBranchData?.start_time) return undefined;

  // if selected date is not today → normal branch start time
  if (bookingDate !== minDate) {
    return selectedBranchData.start_time;
  }

  const now = new Date();
  const rawMinutes = now.getHours() * 60 + now.getMinutes();
const currentMinutes = Math.ceil(rawMinutes / 15) * 15;

  const [branchH, branchM] = selectedBranchData.start_time
    .split(":")
    .map(Number);

  const branchMinutes = branchH * 60 + branchM;

  const finalMinutes = Math.max(currentMinutes, branchMinutes);

  const hh = String(Math.floor(finalMinutes / 60)).padStart(2, "0");
  const mm = String(finalMinutes % 60).padStart(2, "0");

  return `${hh}:${mm}`;
};
  
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
      console.log("Branches API:", branchesRes?.data);
  setBranchOptions(branchesRes.data || []);
}
    setIsDropdownsReady(true);
    setIsOptionsLoading(false);
  };

 loadDropdowns();
}, []);


const handleBookingSubmit = async () => {
  setIsSubmittingBooking(true);

  try {
  const todayDate = new Date().toLocaleDateString("en-GB");

const formattedDate =
  bookingType === "membership"
    ? todayDate
    : bookingDate
    ? new Date(bookingDate).toLocaleDateString("en-GB")
    : "";

let calculatedEndDate = formattedDate;

if (bookingType === "membership") {
  const end = new Date();

  if (selectedMembership?.period === "month") {
    end.setMonth(end.getMonth() + 1);
  } else if (selectedMembership?.period === "quarter") {
    end.setMonth(end.getMonth() + 3);
  } else if (selectedMembership?.period === "year") {
    end.setFullYear(end.getFullYear() + 1);
  }

  calculatedEndDate = end.toLocaleDateString("en-GB");
}

  const payload = {
    name: customerName,
    phone,
    date: formattedDate,
    time: bookingTime || "",
    service: selectedOption,
    Duration:
      bookingType === "service"
        ? selectedVariantData?.duration || selectedVariant
        : selectedMembership?.period || "",
    variant: selectedVariant || "1a",
    period:
      bookingType === "service"
        ? "1 day"
        : selectedMembership?.period || "",
    branch,
    startdate: formattedDate,
   enddate: calculatedEndDate,
    message:
      bookingType === "service"
        ? "plan selected"
        : "membership selected",
    consent: "Yes",
    timestamp: new Date().toLocaleString("en-GB").replace(",", ""),
    status: "Pending",
    email: customerEmail,
    charges:
      bookingType === "service"
        ? selectedVariantData?.charges
        : selectedMembership?.price || 0,
    paymentMode: "Cash",
    bookingType:
      bookingType === "service" ? "Single" : "membership",
  };

  console.log("📦 Final Booking Payload:", payload);
const res = await apiGet("saveBooking", payload);

console.log("✅ Booking Save Response:", res);

if (res?.success) {
  setLastBookingPayload(payload);
  setShowSuccessDialog(true);
}
    } finally {
    setIsSubmittingBooking(false);
  }
};
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

  useEffect(() => {
  if (
    bookingType === "service" &&
    defaultSelectedOption &&
    serviceVariants.length > 0 &&
    !variantsLoading &&
    !selectedVariant
  ) {
    onServiceReady?.();
  }
}, [
  bookingType,
  defaultSelectedOption,
  serviceVariants,
  variantsLoading,
  selectedVariant,
]);
  
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
          className="w-full max-w-5xl max-h-[90vh] overflow-y-auto premium-scrollbar rounded-3xl border-2 border-[#7a6220] bg-[#111] p-8 md:p-10 shadow-[0_0_40px_rgba(212,175,55,0.10)]"
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


          {bookingType && (
            <div className="mt-6 mb-6 flex justify-center">
              <button
                onClick={() => {
  setBookingType(null);
  setSelectedOption("");
  setIsOptionsLoading(false);
}}
                className="rounded-full border border-primary/50 bg-primary/10 px-5 py-2 text-xs uppercase tracking-[0.25em] text-primary hover:bg-primary/20 hover:text-white transition-all duration-300"
              >
                Change Option
              </button>
            </div>
          )}

          
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

{bookingType && (
  <div className="mt-4 mb-4 flex justify-center md:justify-start md:pl-[250px]">
    <div className="flex flex-col items-center">
      <div className="h-10 w-[3px] rounded-full bg-gradient-to-b from-[#f4d03f] to-[#d4af37]" />
      <div className="-mt-1 h-4 w-4 rotate-45 border-b-[3px] border-r-[3px] border-[#d4af37]" />
    </div>
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
{!selectedVariant && !variantsLoading && (
  <p className="text-sm text-[#d4af37] text-left pl-1 tracking-wide">
    Please select your preferred duration type to continue.
  </p>
)}
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
     min={minDate}
      value={bookingDate}
  onChange={(e) => {
  const value = e.target.value;
    if (value < minDate) {
    setTimeError("Past date booking is not allowed");
    setBookingDate("");
    setBookingTime("");
    return;
  }
  setBookingDate(value);   // ye main fix hai
  setBookingTime("");
  setTimeError("");
  setPhone("");
  setCustomerName("");
  setCustomerEmail("");
}}
      className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none focus:border-primary"
    />
{bookingDate && (
  <>
    <input
  type="time"
  value={bookingTime}
  min={getMinAllowedTime()}
  max={getLastAllowedStartTime()}
onChange={(e) => {
  const value = e.target.value;
  setBookingTime(value);

  const start = selectedBranchData?.start_time;
  const end = selectedBranchData?.end_time;

  if (!start || !end || !selectedVariantData?.duration) {
    setTimeError("Please select valid branch and duration");
    return;
  }

  const durationMins = getDurationMinutes(
    selectedVariantData.duration
  );

  const [h, m] = value.split(":").map(Number);
  const [sH, sM] = start.split(":").map(Number);
  const [eH, eM] = end.split(":").map(Number);

  const selectedTotal = h * 60 + m;
const [minH, minM] = (getMinAllowedTime() || start)
  .split(":")
  .map(Number);

const startTotal = minH * 60 + minM;
  const closeTotal = eH * 60 + eM;

  if (selectedTotal < startTotal) {
    setTimeError(
  `Please choose time after ${getMinAllowedTime()}`
);
    return;
  }

  if (selectedTotal + durationMins > closeTotal) {
    setTimeError(
      `Please choose a time before ${getLastAllowedStartTime()}`
    );
    return;
  }

  setTimeError("");
}}
  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none focus:border-primary"
/>
 
{timeError && (
  <p className="md:col-span-2 text-sm text-red-400">
    {timeError} • Working hours {selectedBranchData?.start_time} -{" "}
    {selectedBranchData?.end_time}
  </p>
)}
  </>
)}
 </div>
)}

    {(bookingType !== "service" || (bookingTime && !timeError)) && (
  
  <>
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
    {phone.length > 0 && phone.length < 10 && (
  <p className="text-sm text-red-400">
    Please enter complete 10 digit mobile number
  </p>
)}
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

<button
  disabled={
    isCustomerLoading ||
    !customerName.trim() ||
    !customerEmail.trim()
  }
  onClick={() => setShowSummary(true)}
  className="w-full rounded-2xl bg-primary px-5 py-4 text-black font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
>
  {isCustomerLoading ? "Fetching Customer..." : "Book Now"}
</button>
        
      </>
  )}





    
  </>
  )}
      </div>
)}
{showSummary && (
  <div className="fixed inset-0 z-[120] bg-black/80 flex items-center justify-center p-6">
    <div className="w-full max-w-lg rounded-3xl border-2 border-primary/50 bg-[#111] p-6 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
      <h3 className="text-2xl text-white font-headline mb-4">
        Confirm Your Booking
      </h3>

      <div className="space-y-4 text-sm text-white/80">
  <div className="space-y-2 border-b-2 border-primary/40 pb-4">
    <p className="text-white font-medium">Customer Details</p>
   <div className="space-y-2">
  <div className="flex">
    <span className="w-20 text-white/70">Name</span>
    <span className="w-4 text-white/70">:</span>
    <span>{customerName}</span>
  </div>
  <div className="flex">
    <span className="w-20 text-white/70">Phone</span>
    <span className="w-4 text-white/70">:</span>
    <span>{phone}</span>
  </div>
  <div className="flex">
    <span className="w-20 text-white/70">Email</span>
    <span className="w-4 text-white/70">:</span>
    <span>{customerEmail}</span>
  </div>
</div>
  </div>

  <div className="space-y-2 pt-4">
    <p className="text-white font-medium">Booking Details</p>
  <div className="space-y-2">
  <div className="flex">
    <span className="w-20 text-white/70">Service</span>
    <span className="w-4 text-white/70">:</span>
    <span>{selectedOption}</span>
  </div>

  <div className="flex">
    <span className="w-20 text-white/70">Branch</span>
    <span className="w-4 text-white/70">:</span>
    <span>{branch}</span>
  </div>

  <div className="flex">
    <span className="w-20 text-white/70">Date</span>
    <span className="w-4 text-white/70">:</span>

<span>
  {bookingType === "membership"
    ? new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : bookingDate
    ? new Date(bookingDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : ""}
</span>



    
  </div>

  {bookingType === "service" && (
  <div className="flex">
    <span className="w-20 text-white/70">Time</span>
    <span className="w-4 text-white/70">:</span>
    <span>{bookingTime}</span>
  </div>
)}

  <div className="flex pt-2">
    <span className="w-20 text-primary font-semibold">Amount</span>
    <span className="w-4 text-primary font-semibold">:</span>
    <span className="text-primary font-semibold">
      ₹
      {bookingType === "service"
        ? selectedVariantData?.charges
        : selectedMembership?.price}
    </span>
  </div>
</div>
  </div>
</div>

      <p className="mt-5 text-sm text-primary font-medium">
        Payment will be collected at the spa after booking confirmation.
      </p>
<button
  onClick={() => setShowSummary(false)}
  className="mt-4 w-full rounded-2xl border border-primary/30 bg-primary/5 px-5 py-3 text-primary hover:bg-primary/10 transition"
>
  Edit Details
</button>
      
      <button
  disabled={isSubmittingBooking}
  onClick={async () => {
    await handleBookingSubmit();
    setShowSummary(false);
  }}
        className="mt-3 w-full rounded-2xl bg-primary px-5 py-4 text-black font-semibold"
      >
      {isSubmittingBooking ? "Securing Your Booking..." : "Confirm Booking"}
      </button>
    </div>
  </div>
)}

{showSuccessDialog && lastBookingPayload && (
  <div className="fixed inset-0 z-[130] bg-black/85 flex items-center justify-center p-6">
    <div className="w-full max-w-lg rounded-3xl border-2 border-primary/50 bg-[#111] p-6 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
      <h3 className="text-2xl text-white font-headline mb-4">
        Your Booking Has Been Received
      </h3>

      <p className="text-sm text-white/70 mb-5">
        Thank you for choosing us. Your booking request has been successfully posted.
        Our concierge team will contact and update you shortly.
      </p>

      <div className="space-y-2 text-sm text-white/80">
        <p><span className="text-white/60">Name:</span> {lastBookingPayload.name}</p>
        <p><span className="text-white/60">Service:</span> {lastBookingPayload.service}</p>
        <p><span className="text-white/60">Branch:</span> {lastBookingPayload.branch}</p>
        <p><span className="text-white/60">Date:</span> {lastBookingPayload.startdate}</p>
      </div>

      <button
        onClick={() => {
          setShowSuccessDialog(false);
           setLastBookingPayload(null);
          setBookingType(null);
          setSelectedOption("");
          setSelectedVariant("");
          setBookingDate("");
          setBookingTime("");
          setPhone("");
          setCustomerName("");
          setCustomerEmail("");
          setBranch(selectedBranch || "");
           onClose(); // ⭐ main modal close
        }}
        className="mt-6 w-full rounded-2xl bg-primary px-5 py-4 text-black font-semibold"
      >
        Done
      </button>
    </div>
  </div>
)}
          
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
