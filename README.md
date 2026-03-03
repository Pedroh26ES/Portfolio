# 📂 Portfolio

###  Engenharia de Software
---

## 🧠 Visão Geral do Projeto

O objetivo deste projeto é desenvolver um website de portfólio profissional para apresentar a trajetória, habilidades, projetos e formas de contato de maneira moderna, responsiva e acessível.

---

## 🛠️ Especificações Técnicas

| Categoria | Tecnologia | Finalidade |
| --- | --- | --- |
| **Core** | React 19 + Vite | Framework e Build Tool |
| **Animação (Cenário)** | GSAP + ScrollTrigger | Parallax e controle de linha do tempo via scroll |
| **Animação (UI)** | Framer Motion | Micro-interações e transições de componentes |
| **Estilização** | Tailwind CSS | Estilização utilitária e responsividade |
| **Iconografia** | Lucide React | Ícones vetoriais leves e escaláveis |

---

## ⚙️ Funcionalidades de Engenharia

* **⚡ Pipeline de Pré-carregamento:** O componente `Loader.jsx` sincroniza a renderização com o carregamento de assets para evitar *layout shifts*.
* **🏔️ Cenário Dinâmico:** Múltiplas camadas com profundidades variadas em `IntroScroller.jsx`, criando percepção 3D realística.
* **🃏 Cartões Interativos 3D:** Uso de `useMotionValue` e `useSpring` para simular inclinação física baseada na posição do mouse.
* **🌓 Gerenciamento de Tema:** Sistema de transição suave entre Light/Dark Mode sem refresh de página.

---

## 📂 Estrutura do Projeto

A organização segue padrões de modularidade no diretório `src/`:

```plaintext
src/
│
├── main.jsx              
├── App.jsx               
├── App.css               
├── index.css             
│
├── Loader.jsx            Tela de carregamento animada.
├── IntroScroller.jsx     Cena das montanhas animada.
├── Portfolio.jsx         Monta o site inteiro.
│
├── assets/              Arquivos estáticos (imagens, ícones).
│
├── components/
│   ├── layout/
│   │   ├── Header.jsx    Barra de navegação do topo.
│   │   └── Footer.jsx    Rodapé.
│   │
│   ├── sections/         Cada aba do site.
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   └── Contact.jsx
│   │
│   └── ui/               Componentes com lógica ou estrutura própria, para evitar repetição.
│       ├── ProjectCard.jsx
│       ├── ExpItem.jsx
│       └── ContactBox.jsx
│
└── data/                 Conteúdo do site (dados, informações, traduções e etc..)
    ├── experiences.js    
    ├── projects.js       
    ├── skills.js         
    └── translations.js   Textos em PT e EN.

```

## 📂 Prototipo do Figma:

### 🎨 Design & Prototipagem (Figma)

O projeto foi totalmente planejado no **Figma** antes da implementação, garantindo fidelidade visual e uma experiência de usuário (UX) fluida.

**[🔗 Clique aqui para abrir o Protótipo Interativo](https://www.figma.com/design/kvOHfh3Voe19G71f3EaRlS/Untitled?node-id=0-1&t=jXHJiFvv808NCNw2-1)**

---

---

## 🖥️ Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente:

### 1. Preparação do Ambiente

```bash
git clone https://github.com/Pedroh26ES/Portfolio.git
cd Portfolio

```

### 2. Instalação de Dependências

```bash
npm install

```

### 3. Execução

```bash
npm run dev

```

A aplicação estará disponível em: [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173)

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](https://www.google.com/search?q=LICENSE) para detalhes.

---
