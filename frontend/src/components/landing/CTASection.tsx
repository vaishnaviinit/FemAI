"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Zap, Microscope } from "lucide-react";

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-12 shadow-2xl shadow-blue-200 relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />

          <div className="relative">
            <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full mb-5">
              Free · No Account Required
            </span>
            <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">
              Start your PCOS assessment today
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              Get AI-powered risk insights in seconds. Your data stays private and is never stored.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/assessment/quick"
                className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-semibold px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg"
              >
                <Zap className="w-4 h-4" />
                Quick Assessment
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/assessment/detailed"
                className="inline-flex items-center gap-2 bg-blue-800/60 hover:bg-blue-800/80 text-white font-semibold px-7 py-3.5 rounded-xl border border-white/20 transition-all hover:-translate-y-0.5"
              >
                <Microscope className="w-4 h-4" />
                Detailed Assessment
              </Link>
            </div>

            <p className="mt-6 text-blue-200 text-xs">
              This tool is for educational screening only. Always consult a licensed physician.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
