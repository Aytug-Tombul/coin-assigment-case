"use client";
import { Avatar, Card, Descriptions, DescriptionsProps } from "antd";
import classes from "./page.module.css";
import { getChartData, getCoinDetail } from "@/lib/actions";
import { Suspense, useEffect, useState } from "react";
import { priceFormatter } from "@/lib/helper";
import dynamic from "next/dynamic";
import CoinsLoadingPage from "@/app/loading";
import RootError from "@/app/error";

export interface CoinDataType {
  id: string;
  market_data: any;
  name: string;
  description: any;
  image: any;
}
const CustomChart = dynamic(() => import("@/components/chart/chart"), {
  ssr: false,
});
export default function Coin({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<CoinDataType>({
    id: "",
    name: "",
    market_data: {},
    description: "",
    image: {},
  });
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(false);

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Name",
      children: data.name,
    },
    {
      key: "2",
      label: "24 hr Highest",
      children: priceFormatter.format(data?.market_data?.high_24h?.usd),
    },
    {
      key: "3",
      label: "24 hr Lowest",
      children: priceFormatter.format(data?.market_data?.low_24h?.usd),
    },
    {
      key: "4",
      label: "Current Price",
      children: priceFormatter.format(data.market_data?.current_price?.usd),
    },
    {
      key: "5",
      label: "Price Change 24 hr",
      children: (
        <>
          <p
            key={"btc-current"}
            className={
              parseFloat(data.market_data?.price_change_24h) > 0
                ? classes.high
                : classes.low
            }
          >
            {priceFormatter.format(data.market_data?.price_change_24h)}
          </p>
        </>
      ),
      span: 2,
    },
    {
      key: "10",
      label: "Description",
      children: (
        <p
          dangerouslySetInnerHTML={{
            __html: data.description?.en,
          }}
        ></p>
      ),
    },
  ];
  useEffect(() => {
    getData();
    getChart();
  }, []);
  function getData() {
    getCoinDetail(params.slug).then((res: any) => {
      if (res != 500) {
        setData(res);
      } else {
        setError(true);
      }
    });
  }
  function getChart() {
    getChartData(params.slug).then((res: any) => {
      setChartData(res);
    });
  }
  if (error) {
    return <RootError />;
  }
  if (!data.id) return <CoinsLoadingPage />;
  return (
    <Card
      className={classes.maincard}
      title={
        <>
          <div>
            <Avatar
              size={64}
              key={data.id}
              shape="square"
              src={data?.image?.large}
            />{" "}
            <span style={{ fontSize: 24 }}> {data.name}</span>
          </div>
        </>
      }
      bordered={false}
    >
      <Descriptions title="Coin Info" bordered items={items} />
      <Card className={classes.maincard} title="Coin Chart" bordered={false}>
        <div id="chart">
          <CustomChart data={chartData} height={350} toolbar={true} />
        </div>
      </Card>
    </Card>
  );
}
