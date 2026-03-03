import React from "react";
import { motion } from "framer-motion";
import { SKILLS } from "../../data/skills";

const About = ({ isLightMode, t, fadeUp }) => (
  <section
    id="sobre"
    className={`py-24 ${isLightMode ? "bg-[#e5e5e5]" : "bg-[#121212]"}`}
  >
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-16 flex items-center gap-4">
          <span className="text-samurai-gold font-mono text-lg">
            {t.aboutNum}
          </span>
          {t.aboutTitle}
        </h2>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Bio + estatísticas */}
          <div>
            <p
              className={`leading-relaxed mb-8 ${
                isLightMode ? "text-neutral-700" : "text-neutral-400"
              }`}
            >
              {t.aboutBio}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div
                className={`border p-6 text-center hover:border-samurai-gold/50 transition-colors ${
                  isLightMode
                    ? "bg-[#f5f5f5] border-[#d4d4d4]"
                    : "bg-black border-neutral-800"
                }`}
              >
                <div className="text-3xl font-serif font-bold text-samurai-gold mb-2">
                  {t.stat1}
                </div>
                <div className="text-xs font-mono text-neutral-500 uppercase font-bold">
                  {t.stat1Label}
                </div>
              </div>
              <div
                className={`border p-6 text-center hover:border-samurai-gold/50 transition-colors ${
                  isLightMode
                    ? "bg-[#f5f5f5] border-[#d4d4d4]"
                    : "bg-black border-neutral-800"
                }`}
              >
                <div className="text-3xl font-serif font-bold text-samurai-gold mb-2">
                  {t.stat2}
                </div>
                <div className="text-xs font-mono text-neutral-500 uppercase font-bold">
                  {t.stat2Label}
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-6">
            <h3 className="font-mono text-samurai-gold mb-6 uppercase tracking-widest text-sm font-bold">
              {t.skillsTitle}
            </h3>
            {SKILLS.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span
                    className={`font-mono font-bold ${
                      isLightMode ? "text-neutral-800" : "text-neutral-300"
                    }`}
                  >
                    {skill.name}
                  </span>
                  <span className="font-mono text-samurai-gold font-bold">
                    {skill.percent}%
                  </span>
                </div>
                <div
                  className={`h-2 w-full rounded-full overflow-hidden ${
                    isLightMode ? "bg-[#d4d4d4]" : "bg-neutral-900"
                  }`}
                >
                  <motion.div
                    className="h-full bg-samurai-gold"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default About;
