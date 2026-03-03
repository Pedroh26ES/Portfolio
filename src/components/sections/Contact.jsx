import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import ContactBox from "../ui/ContactBox";

// Componente customizado para os Inputs
const AnimatedInputField = ({ value, onChange, placeholder, isLightMode, type = "text", rows, error }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  
  // Referência para saber quando o input apareceu na tela
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  useEffect(() => {
    // Só inicia a animação e o loop QUANDO o usuário ver o campo
    if (isInView) {
      // Força a animação rodar imediatamente na primeira visualização
      setAnimKey((prev) => prev + 1);
      
      // Inicia o loop de 10 segundos
      const interval = setInterval(() => {
        setAnimKey((prev) => prev + 1);
      }, 10000);
      
      return () => clearInterval(interval);
    }
  }, [isInView]);

  const showPlaceholder = !value && !isFocused;
  
  // Remove automaticamente a barra "/" e os espaços iniciais do texto de tradução
  const cleanPlaceholder = placeholder.replace(/^\/\s*/, "");

  const baseClasses = `w-full border p-4 font-mono text-xs md:text-sm font-bold tracking-widest focus:outline-none focus:border-samurai-gold transition-colors bg-transparent relative z-10 antialiased ${
    isLightMode
      ? "border-[#d4d4d4] text-neutral-900 focus:bg-white"
      : "border-neutral-800 text-white focus:bg-white/5"
  } ${error ? "border-red-500" : ""}`;

  // Cor mais forte (600 no claro, 400 no escuro) para leitura perfeita
  const placeholderColor = isLightMode ? "text-neutral-600" : "text-neutral-400";

  return (
    <div ref={containerRef} className="relative">
      {rows ? (
        <textarea
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows={rows}
          className={`${baseClasses} resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={baseClasses}
        />
      )}

      {/* Placeholder Animado com Loop controlado pelo Scroll */}
      <div
        key={animKey}
        className={`absolute left-4 top-4 pointer-events-none font-mono text-xs md:text-sm font-bold tracking-widest flex ${placeholderColor} transition-opacity duration-200 z-0 ${
          showPlaceholder ? "opacity-100" : "opacity-0"
        }`}
      >
        {cleanPlaceholder.split("").map((char, index) => (
          <motion.span
            key={`${animKey}-${index}`}
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            // Delay base menor (0.1) para começar na mesma hora que bater o olho
            transition={{ delay: index * 0.03 + 0.1, duration: 0.3 }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

const Contact = ({ isLightMode, t, fadeUp }) => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState("idle");

  const formRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["2deg", "-2deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-2deg", "2deg"]);

  const handleMouseMove = (e) => {
    if (!formRef.current) return;
    const rect = formRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = t.errName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t.errEmail;
    if (!form.subject.trim()) e.subject = t.errSubject;
    if (form.message.trim().length < 20) e.message = t.errMsg;
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setFormStatus("sending");
    
    setTimeout(() => {
      setFormStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 5000);
    }, 1800);
  };

  const handleInput = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  const errLine = "text-xs font-mono text-red-500 mt-1 flex items-center gap-1 antialiased";

  return (
    <section
      id="contato"
      className={`py-24 ${isLightMode ? "bg-[#f0f0f0]" : "bg-samurai-dark"}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          {/* Cabeçalho */}
          <div className="mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-serif font-bold flex items-center gap-4 antialiased">
              <span className="text-samurai-gold font-mono text-lg">
                {t.contactNum}
              </span>
              {t.contactTitle}
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-12">
            {/* Esquerda */}
            <div className="space-y-10">
              <div>
                <h3 className="text-5xl md:text-7xl font-sans font-bold leading-[1.1] tracking-tight mb-6 antialiased">
                  {t.contactHeadline[0]}
                  <br />
                  <span className="text-samurai-gold drop-shadow-[0_0_20px_rgba(212,175,55,0.35)]">
                    {t.contactHeadline[1]}
                  </span>
                  <br />
                  {t.contactHeadline[2]}
                </h3>
                <div className="flex gap-2">
                  <div className="h-[3px] w-16 bg-samurai-gold shadow-[0_0_8px_#D4AF37]" />
                  <div className="h-[3px] w-8 bg-samurai-gold/30" />
                </div>
              </div>

              <div className="space-y-3 max-w-md">
                <ContactBox icon={Mail}   value="[ LOREM@IPSUM.COM ]"    isLightMode={isLightMode} />
                <ContactBox icon={Phone}  value="[ +00 00 00000-0000 ]"  isLightMode={isLightMode} />
                <ContactBox icon={MapPin} value="[ LOREM IPSUM, LOREM ]" isLightMode={isLightMode} />
              </div>

              <div className="flex gap-3">
                <a href="#" className={`flex items-center gap-2 border px-4 py-3 font-mono text-xs font-bold transition-all hover:border-samurai-gold hover:text-samurai-gold ${isLightMode ? "border-[#d4d4d4] text-neutral-600" : "border-neutral-800 text-neutral-400"}`}>
                  <Github size={16} /> GitHub
                </a>
                <a href="#" className={`flex items-center gap-2 border px-4 py-3 font-mono text-xs font-bold transition-all hover:border-samurai-gold hover:text-samurai-gold ${isLightMode ? "border-[#d4d4d4] text-neutral-600" : "border-neutral-800 text-neutral-400"}`}>
                  <Linkedin size={16} /> LinkedIn
                </a>
              </div>
            </div>

            {/* Direita – Formulário */}
            <div style={{ perspective: "1000px" }} className="lg:ml-auto w-full max-w-xl">
              <motion.div
                ref={formRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY }}
                className={`relative border p-8 md:p-12 transition-colors duration-500 shadow-xl ${
                  isLightMode ? "border-[#d4d4d4] bg-[#f9f9f9]" : "border-neutral-800 bg-[#0a0a0a]"
                }`}
              >
                <div className="relative z-10">
                  <h4 className="font-mono font-bold tracking-widest uppercase mb-8 text-sm text-samurai-gold antialiased">
                    {t.formTitle}
                  </h4>

                  <AnimatePresence>
                    {formStatus === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                        className="flex items-center gap-2 mb-6 p-4 border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 font-mono text-sm font-bold antialiased"
                      >
                        <CheckCircle size={16} /> {t.successMsg}
                      </motion.div>
                    )}
                    {formStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                        className="flex items-center gap-2 mb-6 p-4 border border-red-500/30 bg-red-500/10 text-red-500 font-mono text-sm font-bold antialiased"
                      >
                        <AlertCircle size={16} /> {t.errorMsg}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <AnimatedInputField
                          type="text"
                          placeholder={t.namePh}
                          value={form.name}
                          onChange={handleInput("name")}
                          isLightMode={isLightMode}
                          error={errors.name}
                        />
                        {errors.name && <p className={errLine}><AlertCircle size={12} />{errors.name}</p>}
                      </div>
                      <div>
                        <AnimatedInputField
                          type="email"
                          placeholder={t.emailPh}
                          value={form.email}
                          onChange={handleInput("email")}
                          isLightMode={isLightMode}
                          error={errors.email}
                        />
                        {errors.email && <p className={errLine}><AlertCircle size={12} />{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <AnimatedInputField
                        type="text"
                        placeholder={t.subjectPh}
                        value={form.subject}
                        onChange={handleInput("subject")}
                        isLightMode={isLightMode}
                        error={errors.subject}
                      />
                      {errors.subject && <p className={errLine}><AlertCircle size={12} />{errors.subject}</p>}
                    </div>

                    <div>
                      <AnimatedInputField
                        rows="5"
                        placeholder={t.msgPh}
                        value={form.message}
                        onChange={handleInput("message")}
                        isLightMode={isLightMode}
                        error={errors.message}
                      />
                      {errors.message && <p className={errLine}><AlertCircle size={12} />{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus === "sending"}
                      className="w-full flex items-center justify-between p-4 font-mono font-bold uppercase tracking-widest text-sm transition-all bg-samurai-gold text-black hover:bg-yellow-500 shadow-[0_4px_15px_rgba(212,175,55,0.25)] hover:shadow-[0_8px_25px_rgba(212,175,55,0.4)] disabled:opacity-60 disabled:cursor-not-allowed mt-2 antialiased"
                    >
                      <span>{formStatus === "sending" ? t.sending : t.sendBtn}</span>
                      <ArrowRight size={20} className={formStatus === "sending" ? "animate-pulse" : ""} />
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;