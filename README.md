<a href="https://classroom.github.com/online_ide?assignment_repo_id=99999999&assignment_repo_type=AssignmentRepo"><img src="https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg" width="200"/></a> <a href="https://classroom.github.com/open-in-codespaces?assignment_repo_id=99999999"><img src="https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg" width="250"/></a>

---

# 🏷️ Nome Profissional 👨‍💻

> [!NOTE]
> **Portfólio Profissional e SPA (Single Page Application)**.  
> Uma aplicação responsiva, animada e moderna desenhada para apresentar a minha trajetória, o meu arsenal de habilidades, projetos desenvolvidos e formas de contacto.

<table>
  <tr>
    <td width="800px">
      <div align="justify">
        Este <b>README.md</b> apresenta a documentação completa do meu <b>Portfólio Profissional</b>, construído como parte dos laboratórios práticos da disciplina. O objetivo deste projeto é criar uma plataforma centralizada e de alta performance para exibir as minhas qualificações ao mercado de trabalho, utilizando tecnologias modernas de front-end. O projeto foca-se numa <i>UI/UX refinada</i>, com animações fluidas e uma estrutura de código limpa e escalável.
      </div>
    </td>
    <td>
      <div>
        <img src="https://joaopauloaramuni.github.io/image/logo_ES_vertical.png" alt="Logo do Projeto" width="120px"/>
      </div>
    </td>
  </tr> 
</table>

---

## 🚧 Status do Projeto

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/seu-usuario/seu-repositorio/main.yml?branch=main)](https://github.com/seu-usuario/seu-repositorio/actions)
[![Versão](https://img.shields.io/badge/Versão-v1.0.0-blue)](https://github.com/seu-usuario/seu-repositorio/releases)
![React](https://img.shields.io/badge/React-18.x-007ec6?style=for-the-badge&logo=react&logoColor=white) 
![Vite](https://img.shields.io/badge/Vite-5.x-007ec6?style=for-the-badge&logo=vite&logoColor=white) 
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## 📚 Índice
- [Links Úteis](#-links-úteis)
- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura](#-arquitetura)
  - [Exemplos de diagramas](#exemplos-de-diagramas)
- [Instalação e Execução](#-instalação-e-execução)
  - [Pré-requisitos](#pré-requisitos)
  - [Variáveis de Ambiente](#-variáveis-de-ambiente)
     - [1 Back-end (Spring Boot)](#1-back-end-spring-boot)
     - [2 Front-end (React, Vite)](#2-front-end-react-vite)
     - [3 Exemplos de Variáveis de Ambiente na Vercel](#3-exemplos-de-variáveis-de-ambiente-na-vercel)
  - [Instalação de Dependências](#-instalação-de-dependências)
    - [Front-end (React)](#front-end-react)
    - [Back-end (Spring Boot)](#back-end-spring-boot)
  - [Inicialização do Banco de Dados (PostgreSQL)](#-inicialização-do-banco-de-dados-postgresql)
  - [Como Executar a Aplicação](#-como-executar-a-aplicação)
    - [Terminal 1: Back-end (Spring Boot)](#terminal-1-back-end-spring-boot)
    - [Terminal 2: Front-end (React, Vite)](#terminal-2-front-end-react-vite)
    - [Execução Local Completa com Docker Compose (Incluindo Banco de Dados)](#-execução-local-completa-com-docker-compose-incluindo-banco-de-dados)
    - [Passos para build, inicialização e execução](#-passos-para-build-inicialização-e-execução)
- [Deploy](#-deploy)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Demonstração](#-demonstração)
  - [Aplicativo Mobile](#-aplicativo-mobile)
  - [Aplicação Web](#-aplicação-web)
  - [Exemplo de saída no Terminal (para Back-end, API, CLI)](#-exemplo-de-saída-no-terminal-para-back-end-api-cli)
- [Testes](#-testes)
- [Documentações utilizadas](#-documentações-utilizadas)
- [Autores](#-autores)
- [Contribuição](#-contribuição)
- [Agradecimentos](#-agradecimentos)
- [Licença](#-licença)

---

## 🔗 Links Úteis
* 🌐 **Demo Online:** [Acessar Portfólio (Em breve)](<link-da-vercel>)
  > 💻 **Descrição:** Link para o portfólio hospedado na Vercel/Render.
* 📱 **LinkedIn:** [Meu Perfil](<link-do-linkedin>)
  > 📱 **Descrição:** Conecte-se comigo profissionalmente.
* 📖 **GitHub:** [Meu GitHub](<link-do-github>)
  > 📚 **Descrição:** Acesso aos meus repositórios e projetos open-source.

---

## 📝 Sobre o Projeto
O propósito deste projeto é estabelecer a minha presença online através de um portfólio interativo. 

- **Por que ele existe:** Criado como parte dos laboratórios práticos da disciplina e para servir como um "cartão de visitas" digital para o mercado de tecnologia.
- **Problema que resolve:** Centraliza currículo, projetos de código e links de contacto num ambiente com excelente UI/UX, dispensando PDFs estáticos.
- **Contexto:** Académico e profissional.
- **Onde pode ser utilizado:** Em processos de recrutamento e entrevistas técnicas.

---

## ✨ Funcionalidades Principais
- 👤 **Sobre Mim:** Apresentação em português e inglês focada em formação, área de atuação e objetivos, com barras de progresso das skills.
- 💼 **Experiências:** Histórico profissional estruturado numa linha do tempo (timeline) iterativa.
- 🚀 **Projetos:** Galeria de projetos desenvolvidos, com descrição, tecnologias utilizadas e links externos.
- ✉️ **Contato:** Seção com formulário de envio de mensagens e links diretos para as redes sociais (LinkedIn, GitHub).
- 🎬 **Animações e Loading:** Componente de loading inicial temático (Katana/Samurai) e transições suaves com Framer Motion.

---

## 🛠 Tecnologias Utilizadas

### 💻 Front-end
* **Framework/Biblioteca:** React 
* **Build Tool:** Vite
* **Estilização:** Tailwind CSS
* **Animações:** Framer Motion
* **Ícones:** Lucide React

### 🖥️ Back-end (Próximos Sprints / Planejado)
* **Framework:** Spring Boot ou Node.js (A definir para a API do formulário)
* **Integração:** EmailJS (Alternativa Serverless para envio de emails)

### ⚙️ Infraestrutura & DevOps
* **Cloud:** Vercel ou Render (Hospedagem Front-end)

---

## 🏗 Arquitetura

O sistema é uma **Single Page Application (SPA)** focada no Front-end, construída em componentes independentes e reutilizáveis do React.

- **Componentização:** Divisão semântica em `<header>`, `<main>` (Hero, Sobre, Experiência, Projetos, Contato) e `<footer>`.
- **Navegação:** Utilização de links de âncora para deslize suave entre seções sem recarregar a página.
- **Estado Inicial:** Gerenciamento do estado de Loading na raiz (`App.jsx`) antes de exibir o conteúdo principal (`Portfolio.jsx`).

### Exemplos de diagramas

| Diagrama de Arquitetura | Detalhe da Arquitetura |
| :---: | :---: |
| **Visão Geral (Macro)** | **Camada de Serviço (Micro)** |
| <img src="https://joaopauloaramuni.github.io/image/aramunilogo.png" alt="Diagrama de Visão Geral" width="120px" height="120px"> | <img src="https://joaopauloaramuni.github.io/image/aramunilogo.png" alt="Serviço" width="120px" height="120px"> |

---

## 🔧 Instalação e Execução

### Pré-requisitos
* **Node.js:** Versão LTS (v18.x ou superior)
* **Gerenciador de Pacotes:** npm ou yarn
* *(Nota: O Java JDK será necessário no futuro caso o backend Spring Boot seja implementado para o formulário)*

---

### 🔑 Variáveis de Ambiente

#### 1 Back-end (Spring Boot)
*(Configuração reservada para implementação futura da API)*
| Variável | Descrição | Exemplo |
| :--- | :--- | :--- |
| `SERVER_PORT` | Porta onde o Back-end será executado. | `8080` |

#### 2 Front-end (React, Vite)
Crie um arquivo **`.env`** na raiz e use o prefixo `VITE_`.
| Variável | Descrição | Exemplo |
| :--- | :--- | :--- |
| `VITE_EMAILJS_PUBLIC_KEY` | Chave pública para serviço de envio de e-mails. | `sua_public_key` |

#### 3 Exemplos de Variáveis de Ambiente na Vercel

```env
VITE_EMAILJS_SERVICE_ID=seu_service_id
VITE_EMAILJS_TEMPLATE_ID_FOR_ME=seu_template
VITE_EMAILJS_PUBLIC_KEY=sua_chave
📦 Instalação de DependênciasClone o Repositório:Bashgit clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
cd seu-repositorio
Front-end (React)Bashnpm install
Back-end (Spring Boot)(Comandos reservados para a sprint de back-end)Bashcd backend
./mvnw clean install
💾 Inicialização do Banco de Dados (PostgreSQL)(Secção reservada para sprint futura, caso seja necessário guardar mensagens do formulário numa base de dados)Bashdocker run --name portfolio_db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=senha -e POSTGRES_DB=portfolio -p 5432:5432 -d postgres:16
⚡ Como Executar a AplicaçãoTerminal 1: Back-end (Spring Boot)(Para sprints futuras)Bashcd backend
./mvnw spring-boot:run
Terminal 2: Front-end (React, Vite)Inicie o servidor de desenvolvimento do Front-end:Bashnpm run dev
🎨 O Portfólio estará disponível em http://localhost:5173.🐳 Execução Local Completa com Docker Compose (Incluindo Banco de Dados)(Para sprints futuras)📦 Passos para build, inicialização e execuçãoBashdocker-compose up --build -d
🚀 DeployBuild do Projeto Front-end:Bashnpm run build
Configuração: Hospede a pasta dist/ gerada na Vercel ou Netlify.📂 Estrutura de PastasPlaintext/
├── public/              # Assets públicos (vite.svg, etc)
├── src/
│   ├── assets/          # Imagens e ícones estáticos
│   ├── index.css        # CSS Global e configurações do Tailwind
│   ├── main.jsx         # Ponto de entrada do React
│   ├── App.jsx          # Componente raiz (Gerencia Loading)
│   ├── Loader.jsx       # Componente de loading inicial temático
│   └── Portfolio.jsx    # Componente principal (Navegação e Secções)
├── tailwind.config.js   # Configuração do tema (Cores, Fontes)
├── package.json         # Dependências do projeto (React, Vite, Motion)
└── README.md            # Documentação
🎥 Demonstração📱 Aplicativo MobileO portfólio é responsivo e adapta-se perfeitamente a ecrãs de telemóvel utilizando as classes utilitárias do Tailwind CSS.🌐 Aplicação WebTelaCaptura de TelaHero / HomeSecção de Projetos<img src="https://joaopauloaramuni.github.io/image/aramunilogo.png" alt="Hero" width="120px" height="120px"><img src="https://joaopauloaramuni.github.io/image/aramunilogo.png" alt="Projetos" width="120px" height="120px">💻 Exemplo de saída no Terminal (para Back-end, API, CLI)(Reservado para logs da API nas próximas fases)🧪 Testes(Planeado para futuras iterações utilizando Vitest ou Jest)Bashnpm run test
🔗 Documentações utilizadas📖 React: Documentação Oficial📖 Vite: Guia de Configuração📖 Tailwind CSS: Documentação📖 Framer Motion: Documentação👥 Autores👤 Nome🖼️ Foto:octocat: GitHub💼 LinkedIn📤 GmailNome Profissional<div align="center"><img src="https://joaopauloaramuni.github.io/image/aramunilogo.png" width="70px" height="70px"></div><div align="center"><a href="https://www.google.com/search?q=https://github.com/seu-usuario"><img src="https://joaopauloaramuni.github.io/image/github6.png" width="50px" height="50px"></a></div><div align="center"><a href="https://www.google.com/search?q=https://www.linkedin.com/in/seu-linkedin"><img src="https://joaopauloaramuni.github.io/image/linkedin2.png" width="50px" height="50px"></a></div><div align="center"><a href="mailto:seu-email@gmail.com"><img src="https://joaopauloaramuni.github.io/image/gmail3.png" width="50px" height="50px"></a></div>🤝 ContribuiçãoFaça um fork do projeto.Crie uma branch para a sua feature (git checkout -b feature/minha-feature).Commit as suas mudanças (git commit -m 'feat: Nova animação').Faça o push (git push origin feature/minha-feature).Abra um Pull Request.🙏 AgradecimentosGostaria de agradecer aos professores e à comunidade open-source pelo apoio na construção da base de conhecimentos para este portfólio.Engenharia de Software PUC Minas - Pela estrutura e boas práticas ensinadas nos laboratórios.📄 LicençaEste projeto é distribuído sob a Licença MIT.
Gostaria que eu já te ajudasse a substituir os campos de *placeholder* (como `seu-usuario`, 