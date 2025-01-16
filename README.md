# NAVADA AI BOT

A modern AI-powered stock trading assistant that provides real-time market insights and analysis.

## Features

- Real-time stock market data and analysis
- AI-powered market insights using Groq API
- Interactive 3D visualization
- Real-time stock ticker updates
- Modern, responsive UI with glass-morphism design

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: TailwindCSS
- **3D Rendering**: Spline
- **AI**: Groq API (Mixtral-8x7b-32768 model)
- **Market Data**: Alpha Vantage API

## API Configuration

The application requires two API keys to function properly:

### 1. Groq API
- Used for AI-powered market analysis and insights
- Get your API key from [Groq Console](https://console.groq.com)
- Model: Mixtral-8x7b-32768
- Environment variable: `GROQ_API_KEY`

### 2. Alpha Vantage API
- Used for real-time stock market data
- Get your API key from [Alpha Vantage](https://www.alphavantage.co)
- Provides stock quotes, company information, and market data
- Environment variable: `ALPHA_VANTAGE_API_KEY`

## Environment Setup

1. Create a `.env.local` file in the project root
2. Add the following environment variables:
```env
GROQ_API_KEY=your_groq_api_key
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key
```

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Run the development server:
```bash
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Usage

### Groq API
- Used for natural language processing and market analysis
- Endpoint: `/api/chat`
- Features:
  - Market trend analysis
  - Stock performance predictions
  - Technical analysis insights

### Alpha Vantage API
- Used for real-time market data
- Endpoint: `/api/stock`
- Features:
  - Real-time stock quotes
  - Company information
  - Market performance metrics
  - Historical data

## License

© 2024 NAVADA AI BOT. All rights reserved.

Designed + Coded by Lee
