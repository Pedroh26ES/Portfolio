import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Sun, Moon, Menu, X } from "lucide-react";

const Header = ({
  t,
  lang,
  setLang,
  isLightMode,
  setIsLightMode,
  activeSection,
  setActiveSection,
  mobileOpen,
  setMobileOpen,
}) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isHoveringSettings, setIsHoveringSettings] = useState(false);

  return (
    <header
      className={`fixed top-0 w-full z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        isLightMode
          ? "bg-[#f0f0f0]/80 border-[#d4d4d4]"
          : "bg-samurai-dark/90 border-neutral-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo */}
        <div className="font-mono text-xl font-bold flex items-center gap-1">
          <span className="text-neutral-500">&lt;</span>
          <span className="text-samurai-gold">Dev</span>
          <span className="text-neutral-500">/&gt;</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {t.nav.map((item, i) => (
            <a
              key={item}
              href={`#${t.navHref[i]}`}
              onClick={() => setActiveSection(t.navHref[i])}
              className={`text-sm uppercase tracking-[0.15em] transition-colors relative py-2 font-bold ${
                activeSection === t.navHref[i]
                  ? "text-samurai-gold"
                  : isLightMode
                  ? "text-neutral-500 hover:text-neutral-900"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {item}
              {activeSection === t.navHref[i] && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-samurai-gold"
                />
              )}
            </a>
          ))}

          {/* Settings Dropdown (Desktop) */}
          <div 
            className="relative ml-2 flex justify-center"
            onMouseEnter={() => setIsHoveringSettings(true)}
            onMouseLeave={() => setIsHoveringSettings(false)}
          >
            <button
              onClick={() => {
                setSettingsOpen(!settingsOpen);
                setIsHoveringSettings(false); // Esconde a tooltip ao clicar
              }}
              className={`p-2 rounded-full border transition-all flex items-center justify-center relative z-10 ${
                settingsOpen
                  ? "border-samurai-gold text-samurai-gold bg-samurai-gold/10"
                  : "border-transparent text-samurai-gold hover:border-samurai-gold"
              }`}
            >
              <Settings size={20} className={`transition-transform duration-300 ${settingsOpen ? "rotate-90" : ""}`} />
            </button>

            {/* Tooltip de 0.5s */}
            <AnimatePresence>
              {isHoveringSettings && !settingsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5, transition: { delay: 0, duration: 0.1 } }}
                  transition={{ delay: 0.5, duration: 0.2 }}
                  className={`absolute top-12 right-0 whitespace-nowrap text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded shadow-lg pointer-events-none ${
                    isLightMode ? "bg-neutral-800 text-white" : "bg-neutral-200 text-samurai-dark"
                  }`}
                >
                  {lang === "pt" ? "Tema & Idioma" : "Theme & Language"}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {settingsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute right-0 mt-12 w-48 rounded-xl border shadow-xl overflow-hidden ${
                    isLightMode
                      ? "bg-[#f0f0f0] border-[#d4d4d4]"
                      : "bg-samurai-dark border-neutral-800"
                  }`}
                >
                  {/* Language Settings */}
                  <div className={`p-4 border-b ${isLightMode ? "border-[#d4d4d4]" : "border-neutral-800"}`}>
                    <span className={`block text-[10px] font-bold uppercase tracking-widest mb-3 ${isLightMode ? "text-neutral-500" : "text-neutral-500"}`}>
                      {lang === "pt" ? "Idioma" : "Language"}
                    </span>
                    <div className={`flex rounded-md p-1 border gap-1 ${isLightMode ? "bg-black/5 border-black/10" : "bg-white/5 border-white/10"}`}>
                      <button
                        onClick={() => setLang("pt")}
                        className={`flex-1 flex items-center justify-center gap-2 text-xs font-bold py-1.5 rounded-sm transition-colors ${lang === "pt" ? "bg-samurai-gold text-black" : "text-neutral-500 hover:text-samurai-gold"}`}
                      >
                        <img src="https://flagcdn.com/w20/br.png" alt="Brasil" className="w-4 h-3 object-cover rounded-[2px]" />
                        PT
                      </button>
                      <button
                        onClick={() => setLang("en")}
                        className={`flex-1 flex items-center justify-center gap-2 text-xs font-bold py-1.5 rounded-sm transition-colors ${lang === "en" ? "bg-samurai-gold text-black" : "text-neutral-500 hover:text-samurai-gold"}`}
                      >
                        <img src="https://flagcdn.com/w20/us.png" alt="USA" className="w-4 h-3 object-cover rounded-[2px]" />
                        EN
                      </button>
                    </div>
                  </div>

                  {/* Theme Settings */}
                  <div className="p-4">
                    <span className={`block text-[10px] font-bold uppercase tracking-widest mb-3 ${isLightMode ? "text-neutral-500" : "text-neutral-500"}`}>
                      {lang === "pt" ? "Tema" : "Theme"}
                    </span>
                    <button
                      onClick={() => setIsLightMode(!isLightMode)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold rounded-md border transition-colors ${
                        isLightMode
                          ? "border-black/10 hover:border-samurai-gold text-neutral-700 bg-black/5"
                          : "border-white/10 hover:border-samurai-gold text-neutral-300 bg-white/5"
                      }`}
                    >
                      <span>
                        {lang === "pt" 
                          ? (isLightMode ? "Tema Escuro" : "Tema Claro") 
                          : (isLightMode ? "Dark Mode" : "Light Mode")}
                      </span>
                      {isLightMode ? <Moon size={14} /> : <Sun size={14} />}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Mobile buttons */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-samurai-gold p-2"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`overflow-hidden border-t ${
              isLightMode
                ? "bg-[#f0f0f0] border-[#d4d4d4]"
                : "bg-samurai-dark border-neutral-900"
            }`}
          >
            <nav className="flex flex-col px-6 py-4">
              {/* Links */}
              <div className="flex flex-col mb-6">
                {t.nav.map((item, i) => (
                  <a
                    key={item}
                    href={`#${t.navHref[i]}`}
                    onClick={() => {
                      setActiveSection(t.navHref[i]);
                      setMobileOpen(false);
                    }}
                    className={`text-sm uppercase tracking-[0.15em] font-bold py-3 border-b transition-colors ${
                      activeSection === t.navHref[i]
                        ? "text-samurai-gold border-samurai-gold/30"
                        : isLightMode
                        ? "text-neutral-600 border-[#e5e5e5]"
                        : "text-neutral-400 border-neutral-900"
                    }`}
                  >
                    {item}
                  </a>
                ))}
              </div>

              {/* Mobile Settings Section */}
              <div className={`pt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${isLightMode ? "text-neutral-600" : "text-neutral-400"}`}>
                
                {/* Mobile Language Toggle */}
                <div className={`flex rounded-md p-1 border gap-1 w-full sm:w-auto ${isLightMode ? "bg-black/5 border-black/10" : "bg-white/5 border-white/10"}`}>
                  <button
                    onClick={() => setLang("pt")}
                    className={`flex-1 sm:px-6 flex items-center justify-center gap-2 text-xs font-bold py-2 rounded-sm transition-colors ${lang === "pt" ? "bg-samurai-gold text-black" : "hover:text-samurai-gold"}`}
                  >
                    <img src="https://flagcdn.com/w20/br.png" alt="Brasil" className="w-4 h-3 object-cover rounded-[2px]" />
                    PT
                  </button>
                  <button
                    onClick={() => setLang("en")}
                    className={`flex-1 sm:px-6 flex items-center justify-center gap-2 text-xs font-bold py-2 rounded-sm transition-colors ${lang === "en" ? "bg-samurai-gold text-black" : "hover:text-samurai-gold"}`}
                  >
                    <img src="https://flagcdn.com/w20/us.png" alt="USA" className="w-4 h-3 object-cover rounded-[2px]" />
                    EN
                  </button>
                </div>

                {/* Mobile Theme Toggle */}
                <button
                  onClick={() => setIsLightMode(!isLightMode)}
                  className={`flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2 text-xs font-bold rounded-md border transition-colors ${
                    isLightMode
                      ? "border-black/10 hover:border-samurai-gold bg-black/5"
                      : "border-white/10 hover:border-samurai-gold bg-white/5"
                  }`}
                >
                  <span>
                    {lang === "pt" 
                      ? (isLightMode ? "Tema Escuro" : "Tema Claro") 
                      : (isLightMode ? "Dark Mode" : "Light Mode")}
                  </span>
                  {isLightMode ? <Moon size={16} /> : <Sun size={16} />}
                </button>

              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;