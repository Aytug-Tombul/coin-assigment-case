"use client";
import Favorites from "@/components/favorites/favorites";
import { Content } from "antd/es/layout/layout";
import CoinTable from "@/components/coin-table/coin-table";
import { getCoins } from "@/lib/actions";
import { useEffect, useState } from "react";

export default function Home() {
  const [favorites, setFavorites] = useState<any[]>([]);

  function getFavorites() {
    setTimeout(() => {}, 1000);
    let storedFavorites = null;
    if (typeof window !== "undefined") {
      storedFavorites = localStorage.getItem("favorites");
    }

    if (!storedFavorites) {
      return [];
    }
    return JSON.parse(storedFavorites);
    return [];
  }
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  function handleFavorite(id: string) {
    setFavorites((prev: any) => {
      if (prev.includes(id)) {
        localStorage.setItem(
          "favorites",
          JSON.stringify(prev.filter((el: string) => el !== id))
        );
        return prev.filter((el: string) => el !== id);
      }
      return [...prev, id];
    });
    localStorage.setItem("favorites", JSON.stringify([...favorites, id]));
  }
  function getCoinsData(page: string) {
    let data = getCoins(page);
    return data;
  }

  return (
    <main>
      <Content style={{ padding: "0 48px" }}>
        <Favorites favorites={favorites} handleFavorite={handleFavorite} />
        <CoinTable
          getCoinsData={getCoinsData}
          favorites={favorites}
          handleFavorite={handleFavorite}
        />
      </Content>
    </main>
  );
}
