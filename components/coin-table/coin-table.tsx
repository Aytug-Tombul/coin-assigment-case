"use client";

import { Avatar, Card, Table, TableProps } from "antd";
import classes from "./coin-table.module.css";
import { StarOutlined, EyeOutlined, StarFilled } from "@ant-design/icons";
import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import CoinsLoadingPage from "@/app/loading";
import Loading from "@/app/loading";

interface DataType {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: {
    times: number;
    currency: string;
    percentage: number;
  } | null;
  last_updated: string;
}

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  currencyDisplay: "narrowSymbol",
});

interface Props {
  getCoinsData: Function;
  favorites: string[];
  handleFavorite: Function;
}

function CoinTable({ getCoinsData, favorites, handleFavorite }: Props) {
  const [page, setPage] = useState({
    fetched: [1],
    count: 1,
  });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);

  function getData(page: string) {
    getCoinsData().then((res: any) => {
      setData(res);
    });
  }
  function handlePageChange(pageCount: number) {
    if (pageCount % 25 === 0) {
      if (!page.fetched.includes(pageCount / 25 + 1)) {
        getCoinsData((page.count + 1).toString()).then((res: any) => {
          setData((prev) => [...prev, ...res]);
          setPage((prev) => {
            return {
              fetched: [...prev.fetched, page.count + 1],
              count: prev.count + 1,
            };
          });
        });
      }
    }
  }

  useEffect(() => {
    getData(page.toString());
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <>
          <Avatar key={record.id} shape="square" src={record.image} />{" "}
          <span> {record.name}</span>
        </>
      ),
    },
    {
      title: "Price",
      dataIndex: "current_price",
      key: "current_price",
      render: (text) => priceFormatter.format(text),
    },
    {
      title: "Price Change 24 H",
      dataIndex: "price_change_24h",
      key: "price_change_24h",
      render: (text) => (
        <>
          <p
            key={text}
            className={parseFloat(text) > 0 ? classes.high : classes.low}
          >
            {priceFormatter.format(text)}
          </p>
        </>
      ),
    },
    {
      title: "Percentage Change 24 H",
      dataIndex: "price_change_percentage_24h",
      key: "price_change_percentage_24h",
      render: (text) => (
        <p
          key={text}
          className={parseFloat(text) > 0 ? classes.high : classes.low}
        >
          {" "}
          {text} %
        </p>
      ),
    },
    {
      title: "Volume",
      dataIndex: "total_volume",
      key: "total_volume",
      render: (text) => priceFormatter.format(text),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className={classes.actionCell}>
          {favorites.includes(record.id) ? (
            <span>
              <StarFilled onClick={() => handleFavorite(record.id)} />
            </span>
          ) : (
            <span>
              <StarOutlined onClick={() => handleFavorite(record.id)} />
            </span>
          )}

          <Link href={`/coins/${record.id}`}>
            <EyeOutlined />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <Card className={classes["coin-table"]} title="Coin Table" bordered={false}>
      <Suspense fallback={<CoinsLoadingPage />}>
        <Table
          rowKey={"id"}
          scroll={{ x: 400 }}
          columns={columns}
          pagination={{
            onChange: (page) => handlePageChange(page),
          }}
          dataSource={data}
        />
      </Suspense>
    </Card>
  );
}

export default React.memo(CoinTable);
