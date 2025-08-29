# Acrylic Alchemy

A modern content creation and management application built with Next.js, featuring M3-Agent integration for advanced AI-powered content generation.

## Features

- **Content Categories**: Organize content across 12 different categories including templates, images, videos, puzzles, quizzes, games, code, audio, ebooks, designs, courses, and automation
- **Dual AI Engines**: Choose between fast simulated generation or advanced M3-Agent with long-term memory
- **Modern UI**: Clean, responsive interface with 3D effects and dark mode support
- **Content Management**: Create, edit, copy, and export content with ease
- **M3-Agent Integration**: Leverage multimodal memory and advanced reasoning capabilities

## M3-Agent Integration

Acrylic Alchemy now includes integration with [M3-Agent](https://m3-agent.github.io), a sophisticated multimodal agent framework with long-term memory capabilities.

### What is M3-Agent?

M3-Agent is an advanced AI system that can:
- Process multimodal inputs (video, audio, text)
- Build and maintain long-term memory graphs
- Perform complex reasoning over stored knowledge
- Generate contextually aware content
- Learn from interactions over time

### Setting Up M3-Agent

1. **Prerequisites**: Ensure M3-Agent repository is cloned in the parent directory:
   ```bash
   # From the aztec-glow directory
   git clone https://github.com/your-org/m3-agent.git m3-agent-master
   ```

2. **Configure API Keys**: Update the API configuration:
   ```bash
   # Edit m3-agent-master/m3-agent-master/configs/api_config.json
   {
     "gpt-4o-2024-11-20": {
       "base_url": "your-azure-endpoint",
       "api_key": "your-api-key"
     }
   }
   ```

3. **Run Setup Script**:
   ```bash
   cd content-generation-app
   npm run setup:m3-agent
   ```

### Using M3-Agent in Acrylic Alchemy

1. Start the application:
   ```bash
   npm run dev
   ```

2. Select AI Provider:
   - Choose "M3-Agent (Advanced Memory)" from the AI Provider dropdown
   - This enables long-term memory and advanced reasoning capabilities

3. Generate Content:
   - Use Manual Generation for custom prompts
   - Use Smart Generation for AI-driven content creation
   - M3-Agent will enhance content with memory-based insights

## Quick Start

1. Install dependencies:

```bash
cd content-generation-app
pnpm install
```

2. Run in development:

```bash
pnpm dev
```

3. Build for production:

```bash
pnpm build
pnpm start
```

## Environment Variables

Optional: adjust port for local running
```
PORT=3000
```

## Project Structure

- `app/` - Next.js app router pages and layouts
- `components/` - Reusable React components
- `lib/` - Utility functions and configurations
- `public/` - Static assets
- `styles/` - Global styles and CSS variables
- `scripts/` - Setup and utility scripts

## Tech Stack

- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with Shadcn/ui
- **AI Integration**: M3-Agent for advanced content generation
- **TypeScript**: Full type safety
- **Fonts**: Space Grotesk and DM Sans

## API Endpoints

- `GET /` - Main application interface
- `POST /api/m3-generate` - M3-Agent enhanced content generation

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run setup:m3-agent` - Configure M3-Agent integration

### M3-Agent Development

For advanced M3-Agent development:
- `npm run m3-agent` - Run M3-Agent control script directly
- Access M3-Agent logs and memory graphs in the m3-agent-master directory
- Configure memory processing in `m3-agent-master/configs/memory_config.json`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with both simulated and M3-Agent modes
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [M3-Agent](https://m3-agent.github.io) for the advanced multimodal agent framework
- [Next.js](https://nextjs.org) for the React framework
- [Shadcn/ui](https://ui.shadcn.com) for the UI components
- [Tailwind CSS](https://tailwindcss.com) for the styling system
