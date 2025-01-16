import { NextResponse } from "next/server";

const POLYGON_API_KEY = process.env.POLYGON_API_KEY;
const BASE_URL = "https://api.polygon.io/v2";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol");

  if (!symbol) {
    return NextResponse.json({ error: "Symbol is required" }, { status: 400 });
  }

  try {
    // Get previous day's close data
    const previousClose = await fetch(
      `${BASE_URL}/aggs/ticker/${symbol}/prev?adjusted=true&apiKey=${POLYGON_API_KEY}`
    );
    const previousCloseData = await previousClose.json();

    // Get company details
    const details = await fetch(
      `${BASE_URL}/reference/tickers/${symbol}?apiKey=${POLYGON_API_KEY}`
    );
    const detailsData = await details.json();

    // Get news
    const news = await fetch(
      `${BASE_URL}/reference/news?ticker=${symbol}&limit=5&apiKey=${POLYGON_API_KEY}`
    );
    const newsData = await news.json();

    return NextResponse.json({
      previousClose: previousCloseData.results?.[0] || null,
      details: detailsData.results || null,
      news: newsData.results || [],
    });
  } catch (error) {
    console.error("Error fetching Polygon data:", error);
    return NextResponse.json(
      { error: "Failed to fetch market data" },
      { status: 500 }
    );
  }
} 