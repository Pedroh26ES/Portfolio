import React from "react";
import { Github, Linkedin } from "lucide-react";

const Footer = ({ isLightMode, t }) => (
  <footer
    className={`border-t py-8 transition-colors duration-300 ${
      isLightMode
        ? "bg-[#e5e5e5] border-[#d4d4d4]"
        : "bg-black border-neutral-900"
    }`}
  >
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="font-mono text-xs text-neutral-500 tracking-widest font-bold">
        © {new Date().getFullYear()} {t.footer}
      </p>
      <div className="flex gap-6">
        <a
          href="#"
          className="text-neutral-500 hover:text-samurai-gold transition-colors"
        >
          <Github size={18} />
        </a>
        <a
          href="#"
          className="text-neutral-500 hover:text-samurai-gold transition-colors"
        >
          <Linkedin size={18} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
