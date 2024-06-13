import Image from "next/image";
import styles from "./page.module.css";
import Favorites from "@/components/favorites/favorites";
import { Content } from "antd/es/layout/layout";
import CoinTable from "@/components/coin-table/coin-table";
import { getCoins } from "@/lib/actions";

export default async function Home() {
  async function getCoinsData(page: string) {
    "use server";
    let data = await getCoins(page);
    return data;
  }

  return (
    <main>
      <Content style={{ padding: "0 48px" }}>
        <Favorites />
        <CoinTable getCoinsData={getCoinsData} />
      </Content>
    </main>
  );
}
