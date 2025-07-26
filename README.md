# GutFlix - Interactive Gut Health Explorer

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fgutflix&env=AZURE_OPENAI_ENDPOINT,AZURE_OPENAI_API_KEY,AZURE_OPENAI_DEPLOYMENT,AZURE_OPENAI_API_VERSION,NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY&envDescription=Configure%20these%20environment%20variables%20in%20Vercel&envLink=https%3A%2F%2Fgithub.com%2Fyourusername%2Fgutflix%2Fblob%2Fmain%2Fdocs%2FLLM_INTEGRATION.md%23environment-setup&project-name=gutflix&repository-name=gutflix)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Vercel account
- Azure OpenAI service
- Supabase project

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gutflix.git
   cd gutflix
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your environment variables (see `.env.example`)

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Deployment

### Vercel Deployment

1. Click the "Deploy with Vercel" button above

2. Configure environment variables in Vercel:
   - `AZURE_OPENAI_ENDPOINT`: Your Azure OpenAI endpoint
   - `AZURE_OPENAI_API_KEY`: Your Azure OpenAI API key
   - `AZURE_OPENAI_DEPLOYMENT`: Your deployment name
   - `AZURE_OPENAI_API_VERSION`: API version (e.g., 2024-02-15-preview)
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon/public key

3. Deploy!

## 📚 Documentation

- [LLM Integration Guide](./docs/LLM_INTEGRATION.md)
- [User Guide](./docs/USER_GUIDE.md)
- [Technical Reference](./docs/TECHNICAL_REFERENCE.md)

## 🛠 Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Azure OpenAI](https://azure.microsoft.com/en-us/products/ai-services/openai-service)
- [Supabase](https://supabase.com/)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ for better gut health awareness
- Special thanks to all contributors
