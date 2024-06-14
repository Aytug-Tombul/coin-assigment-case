"use client";
import Loading from "@/app/loading";
import { getChartData, getCoinDetail } from "@/lib/actions";
import { DeleteOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { priceFormatter } from "@/lib/helper";
import dynamic from "next/dynamic";

const CustomChart = dynamic(() => import("@/components/chart/chart"), {
  ssr: false,
});

interface Props {
  coin_id: string;
  handleFavorite: Function;
}

function FavoritesCard({ coin_id, handleFavorite }: Props) {
  const [data, setData] = useState<any | null>(null);
  const [chartData, setChartData] = useState<object | null>(null);

  function getCoinData(coin_id: string) {
    getCoinDetail(coin_id).then((res) => {
      setData(res);
    });
  }
  function getCoinChartData(coin_id: string) {
    getChartData(coin_id, "1").then((res) => {
      setChartData(res);
    });
  }

  useEffect(() => {
    getCoinData(coin_id);
    getCoinChartData(coin_id);
  }, []);
  if (data == null) {
    return <Loading />;
  }
  return (
    <Card
      key={coin_id}
      style={{ overflowX: "hidden" }}
      title={
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Avatar
              size={32}
              key={data.id}
              shape="square"
              src={data?.image?.small}
            />{" "}
            <span style={{ fontSize: 12 }}>
              {" "}
              <Link href={`/coins/${coin_id}`}>{data.name}</Link> 24 hour Chart
              Current:{" "}
              {priceFormatter.format(data.market_data?.current_price?.usd)}
            </span>
            <span>
              <DeleteOutlined
                type="link"
                onClick={() => handleFavorite(coin_id)}
              />
            </span>
          </div>
        </>
      }
      bordered={false}
    >
      <CustomChart data={chartData} height={200} toolbar={false} />
    </Card>
  );
}
export default React.memo(FavoritesCard);
