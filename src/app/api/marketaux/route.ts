import { NextResponse } from "next/server";

const MARKETAUX_API_KEY = process.env.MARKETAUX_API_KEY;
const BASE_URL = "https://api.marketaux.com/v1";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol");

  if (!symbol) {
    return NextResponse.json({ error: "Symbol is required" }, { status: 400 });
  }

  try {
    // Get news and sentiment data
    const newsResponse = await fetch(
      `${BASE_URL}/news/all?symbols=${symbol}&filter_entities=true&sentiment_analysis=true&limit=10&api_token=${MARKETAUX_API_KEY}`
    );
    const newsData = await newsResponse.json();

    // Format the response
    const formattedNews = newsData.data?.map((article: any) => ({
      title: article.title,
      description: article.description,
      published_at: article.published_at,
      url: article.url,
      source: article.source,
      sentiment: article.entities?.[0]?.sentiment_score || null,
      highlights: article.entities?.[0]?.highlights || []
    })) || [];

    return NextResponse.json({
      news: formattedNews,
      meta: {
        found: newsData.meta?.found || 0,
        returned: newsData.meta?.returned || 0,
        sentiment_average: formattedNews.reduce((acc: number, curr: any) => 
          acc + (curr.sentiment || 0), 0) / (formattedNews.length || 1)
      }
    });
  } catch (error) {
    console.error("Error fetching MarketAux data:", error);
    return NextResponse.json(
      { error: "Failed to fetch market news data" },
      { status: 500 }
    );
  }
} 