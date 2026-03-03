import React, { useState, useEffect } from "react";
import ParallaxBackground from "./IntroScroller";

import { i18n }          from "./data/translations";

import Header     from "./components/layout/Header";
import Footer     from "./components/layout/Footer";
import Home       from "./components/sections/Home";
import About      from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Projects   from "./components/sections/Projects";
import Contact    from "./components/sections/Contact";

// Detecta qual secao esta visivel no centro da tela
function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = React.useState(sectionIds[0]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return [activeSection, setActiveSection];
}

const SECTION_IDS = ["home", "sobre", "experiencia", "projetos", "contato"];

export const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Portfolio = () => {
  const [isLightMode, setIsLightMode] = useState(false);
  const [lang, setLang]               = useState("pt");
  const [mobileOpen, setMobileOpen]   = useState(false);

  const [activeSection, setActiveSection] = useActiveSection(SECTION_IDS);

  const t = i18n[lang];

  useEffect(() => {
    document.body.classList.toggle("light-mode", isLightMode);
  }, [isLightMode]);

  return (
    <div className={`min-h-screen font-sans scroll-smooth ${isLightMode ? "bg-[#f0f0f0] text-neutral-900" : "bg-samurai-dark text-white"}`}>
      <Header
        t={t} lang={lang} setLang={setLang}
        isLightMode={isLightMode} setIsLightMode={setIsLightMode}
        activeSection={activeSection} setActiveSection={setActiveSection}
        mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}
      />

      <ParallaxBackground isLightMode={isLightMode} />

      <main className={`relative z-10 ${isLightMode ? "bg-[#f0f0f0]" : "bg-samurai-dark"}`}>
        <Home       isLightMode={isLightMode} t={t} fadeUp={fadeUp} />
        <About      isLightMode={isLightMode} t={t} fadeUp={fadeUp} />
        <Experience isLightMode={isLightMode} t={t} lang={lang} fadeUp={fadeUp} />
        <Projects   isLightMode={isLightMode} t={t} lang={lang} fadeUp={fadeUp} />
        <Contact    isLightMode={isLightMode} t={t} fadeUp={fadeUp} />
      </main>

      <Footer isLightMode={isLightMode} t={t} />
    </div>
  );
};

export default Portfolio;