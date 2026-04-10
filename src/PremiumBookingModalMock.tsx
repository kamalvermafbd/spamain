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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
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

            <button
              onClick={onClose}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white"
            >
              <X className="w-5 h-5" />
            </button>
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
