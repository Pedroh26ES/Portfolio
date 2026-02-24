import React, { useState, useEffect, useRef } from 'react'; // Adicionado o useRef aqui
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Github, Linkedin, Mail, ChevronRight, 
  Terminal, ExternalLink, Code2, MapPin, Phone, Briefcase, Sun, Moon
} from 'lucide-react';

import ParallaxBackground from './IntroScroller';
const ProjectCard = ({ isLightMode, title, techs }) => {
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
          isLightMode ? 'bg-white border-[#d4d4d4]' : 'bg-[#0d0d0d] border-neutral-800'
        }`}
      >
        <div style={{ transform: "translateZ(50px)" }} className="relative z-10 p-6 h-full flex flex-col justify-between">
          <div>
            <div className={`h-44 relative overflow-hidden flex items-center justify-center border-b mb-6 ${
              isLightMode ? 'bg-[#f0f0f0] border-[#d4d4d4]' : 'bg-neutral-900 border-neutral-800'
            }`}>
              <Terminal size={40} className="text-neutral-500 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a href="#" className="w-10 h-10 bg-samurai-gold text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform"><ExternalLink size={18} /></a>
                <a href="#" className="w-10 h-10 bg-neutral-800 text-white rounded-full flex items-center justify-center hover:bg-neutral-700 transition-colors"><Github size={18} /></a>
              </div>
            </div>
            <h3 className="font-serif font-bold text-2xl mb-2 group-hover:text-samurai-gold transition-colors">{title}</h3>
            <p className={`text-sm line-clamp-3 ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
              Desenvolvimento de arquitetura robusta com Spring Boot e Docker. Foco em alta performance e escalabilidade.
            </p>
          </div>
          <div className="flex gap-3 font-mono text-xs font-bold text-samurai-gold mt-4">
            {techs.map(t => <span key={t}>{t}</span>)}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [isLightMode]);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    // Fundo cinza suave no modo claro, em vez de branco puro
    <div className={`min-h-screen font-sans scroll-smooth ${isLightMode ? 'bg-[#f0f0f0] text-neutral-900' : 'bg-samurai-dark text-white'}`}>
      
      <header className={`fixed top-0 w-full z-50 backdrop-blur-md border-b transition-colors duration-300 ${isLightMode ? 'bg-[#f0f0f0]/80 border-[#d4d4d4]' : 'bg-samurai-dark/90 border-neutral-900'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          
          <div className="font-mono text-xl font-bold flex items-center gap-1">
            <span className="text-neutral-500">&lt;</span>
            <span className="text-samurai-gold">Nome</span>
            <span className="text-neutral-500">/&gt;</span>
          </div>

          <nav className="hidden md:flex gap-8 items-center">
            {['home', 'sobre', 'experiencia', 'projetos', 'contato'].map((item) => (
              <a 
                key={item}
                href={`#${item}`} 
                onClick={() => setActiveSection(item)}
                className={`text-sm uppercase tracking-[0.15em] transition-colors relative py-2 font-bold ${
                  activeSection === item ? 'text-samurai-gold' : (isLightMode ? 'text-neutral-500 hover:text-neutral-900' : 'text-neutral-400 hover:text-white')
                }`}
              >
                {item}
                {activeSection === item && (
                  <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-samurai-gold" />
                )}
              </a>
            ))}
            
            <button 
              onClick={() => setIsLightMode(!isLightMode)} 
              className="ml-4 p-2 rounded-full border border-transparent hover:border-samurai-gold transition-all text-samurai-gold"
            >
              {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </nav>

          <button className="md:hidden text-samurai-gold">
            <Terminal size={24} />
          </button>
        </div>
      </header>

      {/* Passando o estado do tema para o Parallax */}
      <ParallaxBackground isLightMode={isLightMode} />

      <main className={`relative z-10 ${isLightMode ? 'bg-[#f0f0f0]' : 'bg-samurai-dark'}`}>

        <section id="home" className="min-h-[90vh] flex items-center relative overflow-hidden pt-20">
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] blur-[120px] rounded-full pointer-events-none ${isLightMode ? 'bg-samurai-gold/10' : 'bg-samurai-gold/5'}`} />
          
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10 w-full">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <div className="font-mono text-samurai-gold mb-4 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-samurai-gold"></span>
                Despertando o código
              </div>
              <h1 className="text-5xl md:text-7xl font-sans font-bold leading-tight mb-6">
                Desenvolvedor <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-samurai-gold to-yellow-500">
                  Full Stack.
                </span>
              </h1>
              <p className={`text-lg mb-8 max-w-lg font-light leading-relaxed ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              
              <div className="flex gap-4">
                <a href="#contato" className="bg-samurai-gold text-black px-8 py-4 font-bold uppercase tracking-wider text-sm hover:bg-yellow-500 transition-colors flex items-center gap-2 shadow-[0_4px_15px_rgba(212,175,55,0.3)]">
                  Contato <ChevronRight size={16} />
                </a>
                <div className="flex gap-4 items-center px-4">
                  <a href="#" className={`transition-colors ${isLightMode ? 'text-neutral-500 hover:text-samurai-gold' : 'text-neutral-400 hover:text-samurai-gold'}`}><Github size={22} /></a>
                  <a href="#" className={`transition-colors ${isLightMode ? 'text-neutral-500 hover:text-samurai-gold' : 'text-neutral-400 hover:text-samurai-gold'}`}><Linkedin size={22} /></a>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 1 }}
              className="hidden md:flex justify-center relative"
            >
              <div className={`w-80 h-80 rounded-full border-2 border-samurai-gold/30 relative flex items-center justify-center backdrop-blur-sm shadow-[0_0_50px_rgba(212,175,55,0.15)] ${isLightMode ? 'bg-white/40' : 'bg-neutral-900/50'}`}>
                
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                  <Code2 size={70} className="text-samurai-gold" />
                </motion.div>

                <motion.div 
                  animate={{ y: [0, -10, 0] }} 
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className={`absolute top-10 -right-4 border px-4 py-2 text-xs font-mono font-bold text-samurai-gold shadow-lg ${isLightMode ? 'bg-[#fcfcfc] border-[#d4d4d4]' : 'bg-black border-neutral-800'}`}
                >
                  Java
                </motion.div>
                <motion.div 
                  animate={{ y: [0, 10, 0] }} 
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className={`absolute bottom-20 -left-8 border px-4 py-2 text-xs font-mono font-bold text-samurai-gold shadow-lg ${isLightMode ? 'bg-[#fcfcfc] border-[#d4d4d4]' : 'bg-black border-neutral-800'}`}
                >
                  Spring Boot
                </motion.div>

              </div>
            </motion.div>
          </div>
        </section>

        {/* Cinza um tom mais escuro para quebrar o padrão */}
        <section id="sobre" className={`py-24 ${isLightMode ? 'bg-[#e5e5e5]' : 'bg-[#121212]'}`}>
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-16 flex items-center gap-4">
                <span className="text-samurai-gold font-mono text-lg">01.</span> Minha trajetória
              </h2>

              <div className="grid md:grid-cols-2 gap-16">
                <div>
                  <p className={`leading-relaxed mb-8 ${isLightMode ? 'text-neutral-700' : 'text-neutral-400'}`}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`border p-6 text-center hover:border-samurai-gold/50 transition-colors ${isLightMode ? 'bg-[#f5f5f5] border-[#d4d4d4]' : 'bg-black border-neutral-800'}`}>
                      <div className="text-3xl font-serif font-bold text-samurai-gold mb-2">15+</div>
                      <div className="text-xs font-mono text-neutral-500 uppercase font-bold">Projetos Back-end</div>
                    </div>
                    <div className={`border p-6 text-center hover:border-samurai-gold/50 transition-colors ${isLightMode ? 'bg-[#f5f5f5] border-[#d4d4d4]' : 'bg-black border-neutral-800'}`}>
                      <div className="text-3xl font-serif font-bold text-samurai-gold mb-2">+4</div>
                      <div className="text-xs font-mono text-neutral-500 uppercase font-bold">Anos de Foco</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-mono text-samurai-gold mb-6 uppercase tracking-widest text-sm font-bold">Arsenal Principal</h3>
                  {[
                    { name: 'Java / Spring Boot', percent: '95%' },
                    { name: 'MySQL / PostgreSQL', percent: '90%' },
                    { name: 'Docker / Microserviços', percent: '85%' },
                    { name: 'React / Frontend', percent: '70%' }
                  ].map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className={`font-mono font-bold ${isLightMode ? 'text-neutral-800' : 'text-neutral-300'}`}>{skill.name}</span>
                        <span className="font-mono text-samurai-gold font-bold">{skill.percent}</span>
                      </div>
                      <div className={`h-2 w-full rounded-full overflow-hidden ${isLightMode ? 'bg-[#d4d4d4]' : 'bg-neutral-900'}`}>
                        <motion.div 
                          className="h-full bg-samurai-gold" 
                          initial={{ width: 0 }}
                          whileInView={{ width: skill.percent }}
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

        <section id="experiencia" className={`py-24 ${isLightMode ? 'bg-[#f0f0f0]' : 'bg-samurai-dark'}`}>
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-16 flex items-center gap-4">
                <span className="text-samurai-gold font-mono text-lg">02.</span> Experiência
              </h2>

              <div className={`border-l ml-3 space-y-12 pb-8 ${isLightMode ? 'border-[#d4d4d4]' : 'border-neutral-800'}`}>
                <div className="relative pl-10">
                  <div className="absolute w-4 h-4 bg-samurai-gold rounded-full -left-[8.5px] top-1 shadow-[0_0_10px_#D4AF37]" />
                  <span className="font-mono text-xs text-samurai-gold border border-samurai-gold/30 px-2 py-1 rounded-full bg-samurai-gold/10 font-bold">2022 - Presente</span>
                  <h3 className="text-xl font-serif font-bold mt-4">Full Stack Developer (Foco Backend)</h3>
                  <div className="text-neutral-500 font-mono text-sm mb-4 flex items-center gap-2 mt-1 font-bold">
                    <Briefcase size={14} /> Empresa Tech S.A.
                  </div>
                  <p className={`font-light text-sm ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>

                <div className="relative pl-10">
                  <div className={`absolute w-4 h-4 rounded-full -left-[8.5px] top-1 ${isLightMode ? 'bg-[#a3a3a3]' : 'bg-neutral-800'}`} />
                  <span className={`font-mono text-xs border px-2 py-1 rounded-full font-bold ${isLightMode ? 'text-neutral-500 border-[#d4d4d4]' : 'text-neutral-500 border-neutral-800'}`}>2020 - 2022</span>
                  <h3 className="text-xl font-serif font-bold mt-4">Backend Developer</h3>
                  <div className="text-neutral-500 font-mono text-sm mb-4 flex items-center gap-2 mt-1 font-bold">
                    <Briefcase size={14} /> Agência Criativa
                  </div>
                  <p className={`font-light text-sm ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SUBSTITUA A SEÇÃO #PROJETOS POR ESTA */}
        <section id="projetos" className={`py-24 ${isLightMode ? 'bg-[#e5e5e5]' : 'bg-[#121212]'}`}>
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-16 flex items-center gap-4">
                <span className="text-samurai-gold font-mono text-lg">03.</span> Projetos
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProjectCard isLightMode={isLightMode} title="Sistema Projeto" techs={["Java", "Spring", "PostgreSQL"]} />
                <ProjectCard isLightMode={isLightMode} title="Sistema Projeto" techs={["Docker", "AWS", "MySQL"]} />
                <ProjectCard isLightMode={isLightMode} title="Sistema Projeto" techs={["React", "Spring"]} />
              </div>
            </motion.div>
          </div>
        </section>

        <section id="contato" className="py-24">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-16 flex items-center gap-4 justify-center">
                <span className="text-samurai-gold font-mono text-lg">04.</span> Envie uma Mensagem
              </h2>

              <div className={`grid md:grid-cols-5 gap-12 border p-8 md:p-12 ${isLightMode ? 'bg-[#f5f5f5] border-[#d4d4d4] shadow-sm' : 'bg-[#121212] border-neutral-800'}`}>
                <div className="md:col-span-2 space-y-8">
                  <h3 className="text-2xl font-serif font-bold mb-6">Informações</h3>
                  <div className={`flex items-center gap-4 font-mono text-sm font-bold ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                    <Mail className="text-samurai-gold" /> lorem@ipsum.com
                  </div>
                  <div className={`flex items-center gap-4 font-mono text-sm font-bold ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                    <Phone className="text-samurai-gold" /> +00 00 00000-0000
                  </div>
                  <div className={`flex items-center gap-4 font-mono text-sm font-bold ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                    <MapPin className="text-samurai-gold" /> Lorem ipsum, Lorem
                  </div>
                </div>

                <form className="md:col-span-3 space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <input type="text" placeholder="Seu Nome" className={`w-full border p-4 font-mono text-sm focus:outline-none focus:border-samurai-gold transition-colors ${isLightMode ? 'bg-[#ebebeb] border-[#d4d4d4] text-neutral-900' : 'bg-black border-neutral-800 text-white'}`} />
                    <input type="email" placeholder="Seu Email" className={`w-full border p-4 font-mono text-sm focus:outline-none focus:border-samurai-gold transition-colors ${isLightMode ? 'bg-[#ebebeb] border-[#d4d4d4] text-neutral-900' : 'bg-black border-neutral-800 text-white'}`} />
                  </div>
                  <textarea placeholder="Sua Mensagem..." rows="4" className={`w-full border p-4 font-mono text-sm focus:outline-none focus:border-samurai-gold transition-colors resize-none ${isLightMode ? 'bg-[#ebebeb] border-[#d4d4d4] text-neutral-900' : 'bg-black border-neutral-800 text-white'}`}></textarea>
                  <button className="w-full bg-samurai-gold text-black py-4 font-bold uppercase tracking-widest text-sm hover:bg-yellow-500 transition-colors shadow-[0_4px_15px_rgba(212,175,55,0.3)]">
                    Enviar Mensagem
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <footer className={`border-t py-8 transition-colors duration-300 ${isLightMode ? 'bg-[#e5e5e5] border-[#d4d4d4]' : 'bg-black border-neutral-900'}`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-neutral-500 tracking-widest font-bold">
            © {new Date().getFullYear()} TODOS OS DIREITOS RESERVADOS.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-neutral-500 hover:text-samurai-gold transition-colors"><Github size={18} /></a>
            <a href="#" className="text-neutral-500 hover:text-samurai-gold transition-colors"><Linkedin size={18} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;