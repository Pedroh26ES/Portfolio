# Portfólio Profissional 🚀

Este repositório contém o projeto de desenvolvimento do meu Portfólio Profissional, construído como parte dos laboratórios práticos da disciplina. O objetivo é criar um website responsivo e moderno para apresentar minha trajetória, habilidades, projetos e formas de contato.

## 📋 Descrição do Projeto

O sistema consiste em uma Single Page Application (SPA) dividida nas seguintes seções principais:
- **Sobre Mim:** Apresentação em português e inglês focada em formação, área de atuação e objetivos.
- **Experiências:** Histórico profissional, estágios e freelas.
- **Projetos:** Linha do tempo de projetos desenvolvidos, com descrição, tecnologias e links.
- **Contato:** Formulário de envio de mensagens e links para redes profissionais (LinkedIn, GitHub).

## 🛠️ Tecnologias Previstas e Utilizadas

**Front-end (Protótipo Inicial):**
- [React](https://reactjs.org/) (com Vite para build rápido)
- [Tailwind CSS](https://tailwindcss.com/) (Estilização utilitária e responsividade)
- [Framer Motion](https://www.framer.com/motion/) (Animações fluidas de interface)
- [Lucide React](https://lucide.dev/) (Ícones)

**Back-end & Hospedagem (Próximas Sprints):**
- Hospedagem na Nuvem: Vercel ou Render.
- Back-end para o formulário de contato (a definir: Node.js ou integração com EmailJS).

## 🏗️ Estrutura Inicial do Site

O layout principal foi organizado de forma semântica:
- `<header>`: Navegação fixa no topo (Header) com links de âncora para as seções.
- `<main>`: Área de conteúdo contendo as seções (Hero/Home, Sobre, Experiência, Projetos, Contato).
- `<footer>`: Rodapé com direitos autorais e links sociais.

### Estrutura de Diretórios
```text
portfolio-samurai/
├── public/              # Assets públicos
├── src/
│   ├── index.css        # CSS Global e configurações do Tailwind
│   ├── main.jsx         # Ponto de entrada do React
│   ├── App.jsx          # Componente raiz
│   └── Portfolio.jsx    # Componente principal contendo o protótipo e navegação
├── tailwind.config.js   # Configuração do tema (Cores, Fontes)
├── package.json         # Dependências do projeto
└── README.md            # Documentação