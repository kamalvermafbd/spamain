import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

type MembershipPlan = {
  id: string;
  name: string;
  tag: string;
  price: number;
  period: string;
  featured: boolean;
  features: string[];
  buttonText: string;
};

export default function MembershipPlans({
  plans = [],
  onSelectPlan,
}: {
  plans?: MembershipPlan[];
  onSelectPlan?: (plan: MembershipPlan) => void;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.18,
          },
        },
      }}
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      {plans.map((plan) => (
        <motion.div
          key={plan.id}
          whileHover={{ y: -8, scale: 1.02 }}
          variants={{
            hidden: { opacity: 0, y: 40, scale: 0.96 },
            show: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.6, ease: "easeOut" },
            },
          }}
          className={`p-10 rounded-xl flex flex-col h-full relative ${
            plan.featured
              ? "bg-white/[0.05] border-t-4 border-primary shadow-2xl backdrop-blur-xl"
              : "bg-white/[0.03] border border-white/10 backdrop-blur-xl"
          }`}
        >
          {plan.featured && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
              Most Immersive
            </div>
          )}

          <div className={`mb-8 ${plan.featured ? "text-center" : ""}`}>
            <span className="text-primary text-xs uppercase tracking-widest">
              {plan.tag}
            </span>

            <h4 className="font-headline text-3xl mt-6 text-white">
              {plan.name}
            </h4>

            <div
              className={`mt-4 flex items-baseline gap-1 ${
                plan.featured ? "justify-center" : ""
              }`}
            >
              <span
                className={`font-headline ${
                  plan.featured
                    ? "text-5xl text-primary"
                    : "text-4xl text-white"
                }`}
              >
                ₹{plan.price}
              </span>
              <span className="text-white/60 text-sm">
                /{plan.period}
              </span>
            </div>
          </div>

          <ul className="space-y-4 mb-12 flex-grow">
            {plan.features.map((feature, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-sm text-white/80"
              >
                <CheckCircle2 className="w-5 h-5 text-primary" />
                {feature}
              </li>
            ))}
          </ul>

          <button
            onClick={() => onSelectPlan?.(plan)}
            className={`w-full py-4 rounded-full font-body text-xs uppercase tracking-widest transition-all duration-500 ${
              plan.featured
                ? "bg-primary text-on-primary hover:scale-[1.02] shadow-xl shadow-primary/20"
                : "border border-primary/50 text-primary hover:bg-primary hover:text-on-primary"
            }`}
          >
            {plan.buttonText}
          </button>
        </motion.div>
      ))}
    </motion.div>
  );
}
