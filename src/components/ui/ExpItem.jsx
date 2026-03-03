import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, ChevronDown, ChevronUp, ChevronRight } from "lucide-react";

const ExpItem = ({ item, isLightMode, lang, t, isLast }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative pl-10">
      {/* Dot na timeline */}
      <div
        className={`absolute w-4 h-4 rounded-full -left-[8.5px] top-1 ${
          item.current
            ? "bg-samurai-gold shadow-[0_0_10px_#D4AF37]"
            : isLightMode
            ? "bg-[#a3a3a3]"
            : "bg-neutral-700"
        }`}
      />

      {/* Período + badge "ATUAL" */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span
          className={`font-mono text-xs border px-2 py-1 rounded-full font-bold ${
            item.current
              ? "text-samurai-gold border-samurai-gold/30 bg-samurai-gold/10"
              : isLightMode
              ? "text-neutral-500 border-[#d4d4d4]"
              : "text-neutral-500 border-neutral-800"
          }`}
        >
          {item.period}
        </span>
        {item.current && (
          <span className="text-xs font-mono font-bold text-emerald-500 border border-emerald-500/30 px-2 py-0.5 rounded-full bg-emerald-500/10">
            ● ATUAL
          </span>
        )}
      </div>

      <h3 className="text-xl font-serif font-bold mt-2">{item.role[lang]}</h3>

      <div className="font-mono text-sm mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 font-bold text-neutral-500">
        <span className="flex items-center gap-1">
          <Briefcase size={13} /> {item.company}
        </span>
        <span className="flex items-center gap-1">
          <MapPin size={13} /> {item.location}
        </span>
      </div>

      <p
        className={`font-light text-sm leading-relaxed ${
          isLightMode ? "text-neutral-600" : "text-neutral-400"
        }`}
      >
        {item.description[lang]}
      </p>

      {/* Botão expandir */}
      <button
        onClick={() => setOpen(!open)}
        className="mt-3 flex items-center gap-1 text-xs font-mono font-bold text-samurai-gold hover:underline underline-offset-2"
      >
        {open ? t.seeLess : t.seeMore}
        {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
      </button>

      {/* Highlights expandíveis */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden mt-3 space-y-2"
          >
            {item.highlights[lang].map((h, i) => (
              <li
                key={i}
                className={`text-sm flex items-start gap-2 ${
                  isLightMode ? "text-neutral-600" : "text-neutral-400"
                }`}
              >
                <ChevronRight
                  size={14}
                  className="text-samurai-gold mt-0.5 flex-shrink-0"
                />
                {h}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {!isLast && <div className="mt-12" />}
    </div>
  );
};

export default ExpItem;
