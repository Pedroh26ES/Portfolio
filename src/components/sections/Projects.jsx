import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "../ui/ProjectCard";
import { PROJECTS } from "../../data/projects";

const Projects = ({ isLightMode, t, lang, fadeUp }) => (
  <section
    id="projetos"
    className={`py-24 ${isLightMode ? "bg-[#e5e5e5]" : "bg-[#121212]"}`}
  >
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 flex items-center gap-4">
          <span className="text-samurai-gold font-mono text-lg">{t.projNum}</span>
          {t.projTitle}
        </h2>

        {/* Timeline de anos */}
        <div className="flex items-center mb-12 overflow-x-auto pb-2">
          {PROJECTS.map((p, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center min-w-[80px]">
                <div className="w-3 h-3 rounded-full bg-samurai-gold shadow-[0_0_8px_#D4AF37]" />
                <span className="font-mono text-xs text-samurai-gold font-bold mt-1">
                  {p.year}
                </span>
              </div>
              {i < PROJECTS.length - 1 && (
                <div className="flex-1 h-[2px] bg-gradient-to-r from-samurai-gold to-samurai-gold/20 min-w-[60px]" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={i}
              isLightMode={isLightMode}
              project={project}
              lang={lang}
            />
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default Projects;
