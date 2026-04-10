import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function PremiumBookingModalMock({
  onClose,
}: {
  onClose: () => void;
}) {
  const [bookingType, setBookingType] = useState<
    "membership" | "service" | null
  >(null);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-xl flex items-center justify-center p-6"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.96, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0 }}
          className="w-full max-w-5xl rounded-3xl border border-primary/20 bg-[#111] p-8 md:p-10 shadow-2xl"
        >
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
  {/* outer luxury glow ring */}
  <div className="absolute inset-0 rounded-full ring-1 ring-white/5 group-hover:ring-primary/40 transition-all duration-500" />

  {/* subtle inner glass highlight */}
  <div className="absolute inset-[2px] rounded-full bg-gradient-to-b from-white/[0.06] to-transparent" />

  <X className="relative z-10 h-5 w-5 text-white/90 group-hover:text-primary transition-colors duration-500" />
</motion.button>
            
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div
              onClick={() => setBookingType("membership")}
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
            </div>

            <div
              onClick={() => setBookingType("service")}
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
            </div>
          </div>

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
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
