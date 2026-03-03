import React from "react";
import { motion } from "framer-motion";
import ExpItem from "../ui/ExpItem";
import { EXPERIENCES } from "../../data/experiences";

const Experience = ({ isLightMode, t, lang, fadeUp }) => (
  <section
    id="experiencia"
    className={`py-24 ${isLightMode ? "bg-[#f0f0f0]" : "bg-samurai-dark"}`}
  >
    <div className="max-w-3xl mx-auto px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-16 flex items-center gap-4">
          <span className="text-samurai-gold font-mono text-lg">{t.expNum}</span>
          {t.expTitle}
        </h2>

        <div
          className={`border-l ml-3 pb-8 ${
            isLightMode ? "border-[#d4d4d4]" : "border-neutral-800"
          }`}
        >
          {EXPERIENCES.map((exp, i) => (
            <ExpItem
              key={i}
              item={exp}
              isLightMode={isLightMode}
              lang={lang}
              t={t}
              isLast={i === EXPERIENCES.length - 1}
            />
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default Experience;
