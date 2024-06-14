"use server";
const main_url = "https://api.coingecko.com/api/v3/coins/";

const currency = "usd";

export async function getCoins(page: string) {
  let params = {
    vs_currency: currency,
    per_page: "250",
    page: page,
  };
  let url = main_url + "markets?" + new URLSearchParams(params);

  const res = await fetch(url, {
    headers: {
      "x-cg-demo-api-key": process.env.GECKO_APIKEY,
    },
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getCoinDetail(id: string) {
  let params = {
    localization: "false",
    tickers: "false",
    market_data: "true",
    community_data: "false",
    developer_data: "false",
    sparkline: "false",
  };

  let url = main_url + id + "?" + new URLSearchParams(params);

  const res = await fetch(url, {
    headers: {
      "x-cg-demo-api-key": process.env.GECKO_APIKEY,
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getChartData(id: string, days: string = "365") {
  const requestHeaders: HeadersInit = new Headers();
  let params = {
    vs_currency: currency,
    days: days,
    precision: "4",
  };
  requestHeaders.set("x-cg-demo-api-key", process.env.GECKO_APIKEY);
  let url = main_url + id + "/market_chart" + "?" + new URLSearchParams(params);

  const res = await fetch(url, {
    headers: {
      "x-cg-demo-api-key": process.env.GECKO_APIKEY,
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
