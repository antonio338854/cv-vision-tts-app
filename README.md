# 🤖 CV Vision AI - Detector de Objetos com IA

Aplicativo de visão computacional com IA que identifica objetos e pessoas em imagens e narra os resultados usando text-to-speech.

## ✨ Funcionalidades

- 📸 **Upload de Imagens** - Arraste e solte ou selecione imagens
- 🤖 **Detecção com IA** - Usa GPT-4 Vision para análise inteligente
- 🔊 **Text-to-Speech** - Narração automática dos resultados em português
- 🎨 **Interface Moderna** - Design responsivo com Tailwind CSS
- 🌙 **Modo Escuro** - Suporte automático para tema escuro
- ⚡ **Rápido e Eficiente** - Construído com Next.js 14

## 🚀 Começando

### Pré-requisitos

- Node.js 18+ instalado
- Conta na [OpenAI](https://platform.openai.com/) com API key

### Instalação Local

1. **Clone o repositório:**
```bash
git clone https://github.com/antonio338854/cv-vision-tts-app.git
cd cv-vision-tts-app
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione sua OpenAI API Key:
```
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxx
```

4. **Execute o servidor de desenvolvimento:**
```bash
npm run dev
```

5. **Abra no navegador:**
```
http://localhost:3000
```

## 📦 Deploy na Vercel

### Opção 1: Deploy via CLI

```bash
# Instale a Vercel CLI
npm install -g vercel

# Faça login
vercel login

# Deploy
vercel
```

### Opção 2: Deploy via GitHub

1. Faça push do código para o GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Importe o repositório
4. Configure a variável de ambiente `OPENAI_API_KEY` no dashboard da Vercel
5. Deploy automático!

## 🔐 Configuração de Variáveis de Ambiente na Vercel

1. Acesse seu projeto na Vercel
2. Vá em **Settings** → **Environment Variables**
3. Adicione:
   - **Nome:** `OPENAI_API_KEY`
   - **Valor:** Sua API key da OpenAI
   - **Ambientes:** Production, Preview, Development
4. Clique em **Save**
5. Faça um novo deploy (ou aguarde o próximo commit)

🔗 **Link direto:** `https://vercel.com/[seu-usuario]/cv-vision-tts-app/settings/environment-variables`

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **OpenAI API** - GPT-4 Vision para análise de imagens
- **Web Speech API** - Text-to-speech nativo do browser
- **Lucide React** - Ícones

## 📖 Como Usar

1. **Abra o app** no navegador
2. **Faça upload** de uma imagem (arraste ou clique)
3. **Aguarde** a análise da IA (alguns segundos)
4. **Veja os resultados:**
   - Descrição geral da imagem
   - Lista de objetos detectados
   - Análise detalhada
5. **Clique em "Narrar Resultados"** para ouvir a descrição

## 🔊 Suporte a Text-to-Speech

O app usa a **Web Speech API** nativa dos navegadores modernos:

- ✅ Chrome/Edge (recomendado)
- ✅ Safari
- ✅ Firefox
- ⚠️ Alguns navegadores podem precisar de permissão

## 🔒 Segurança e Privacidade

- ⚠️ **API Keys:** Nunca commite suas API keys no código
- 🔐 **Variáveis de Ambiente:** Use sempre `.env` local e Vercel Environment Variables
- 📸 **Imagens:** As imagens são enviadas para a OpenAI API para análise
- 🗑️ **Não armazenamos:** Nenhuma imagem é salva no servidor

## 📁 Estrutura do Projeto

```
cv-vision-tts-app/
├── app/
│   ├── api/
│   │   └── vision/
│   │       └── route.ts        # API endpoint
│   ├── globals.css             # Estilos globais
│   ├── layout.tsx              # Layout raiz
│   └── page.tsx                # Página principal
├── components/
│   ├── ImageUploader.tsx       # Componente de upload
│   └── ResultsDisplay.tsx      # Exibição de resultados
├── public/                     # Arquivos estáticos
├── .env.example                # Exemplo de variáveis
├── .gitignore                  # Arquivos ignorados
├── next.config.js              # Configuração Next.js
├── package.json                # Dependências
├── postcss.config.js           # Configuração PostCSS
├── README.md                   # Este arquivo
├── tailwind.config.js          # Configuração Tailwind
└── tsconfig.json               # Configuração TypeScript
```

## 🐛 Solução de Problemas

### Erro: "OPENAI_API_KEY não configurada"
- Verifique se adicionou a variável no `.env` (local) ou na Vercel (produção)
- Reinicie o servidor de desenvolvimento após adicionar

### Erro: "Seu navegador não suporta Text-to-Speech"
- Use Chrome, Edge ou Safari
- Verifique as permissões do navegador

### Erro de build na Vercel
- Verifique se todas as dependências estão no `package.json`
- Confirme que `OPENAI_API_KEY` está configurada na Vercel

## 📝 Licença

Este projeto é de código aberto e está disponível sob a [MIT License](LICENSE).

## 👤 Autor

Desenvolvido por [@antonio338854](https://github.com/antonio338854)

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

---

⭐ **Se este projeto foi útil, deixe uma estrela no GitHub!**
