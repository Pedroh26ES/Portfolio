import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Terminal, ExternalLink, Github } from "lucide-react";

const ProjectCard = ({ isLightMode, project, lang }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: "1000px" }} className="group">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative border transition-colors duration-500 overflow-hidden h-[420px] flex flex-col ${
          isLightMode
            ? "bg-white border-[#d4d4d4]"
            : "bg-[#0d0d0d] border-neutral-800"
        }`}
      >
        <div
          style={{ transform: "translateZ(50px)" }}
          className="relative z-10 p-6 h-full flex flex-col justify-between"
        >
          <div>
            {/* Thumbnail */}
            <div
              className={`h-44 relative overflow-hidden flex items-center justify-center border-b mb-6 ${
                isLightMode
                  ? "bg-[#f0f0f0] border-[#d4d4d4]"
                  : "bg-neutral-900 border-neutral-800"
              }`}
            >
              <Terminal
                size={40}
                className="text-neutral-500 group-hover:scale-110 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 font-mono text-xs text-samurai-gold border border-samurai-gold/30 px-2 py-0.5 bg-samurai-gold/10 font-bold">
                {project.year}
              </span>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a
                  href={project.links.demo}
                  className="w-10 h-10 bg-samurai-gold text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <ExternalLink size={18} />
                </a>
                <a
                  href={project.links.github}
                  className="w-10 h-10 bg-neutral-800 text-white rounded-full flex items-center justify-center hover:bg-neutral-700 transition-colors"
                >
                  <Github size={18} />
                </a>
              </div>
            </div>

            <h3 className="font-serif font-bold text-2xl mb-2 group-hover:text-samurai-gold transition-colors">
              {project.title[lang]}
            </h3>
            <p
              className={`text-sm line-clamp-3 ${
                isLightMode ? "text-neutral-600" : "text-neutral-400"
              }`}
            >
              {project.description[lang]}
            </p>
          </div>

          {/* Techs */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.techs.map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs font-bold text-samurai-gold border border-samurai-gold/30 px-2 py-0.5 bg-samurai-gold/5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
