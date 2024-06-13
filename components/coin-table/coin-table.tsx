"use client";

import { Avatar, Button, Card, Space, Table, TableProps, Tag } from "antd";
import classes from "./coin-table.module.css";
import { StarOutlined, EyeOutlined } from "@ant-design/icons";
import { getCoins } from "@/lib/actions";
import React, { Suspense, SyntheticEvent, useEffect, useState } from "react";
import Link from "next/link";

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
}

function CoinTable({ getCoinsData }: Props) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  function getData(page: string) {
    getCoinsData().then((res: any) => {
      setData(res);
    });
  }

  useEffect(() => {
    getData("1");
  }, []);

  /*const [favorites, setFavorites] = useState(() => {
    let storedFavorites = null;
    if (typeof window !== "undefined") {
      storedFavorites = localStorage.getItem("favorites");
    }

    if (!storedFavorites) {
      return [];
    }
    return JSON.parse(storedFavorites);
  });*/
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
        <>
          <Button
            name={record.id}
            onClick={(e) => handleFavorite(e)}
            type="link"
            size={"small"}
          >
            <StarOutlined onClick={(e) => e.stopPropagation()} />
            {/*favorites.includes(record.id) ? (
            <StarFilled onClick={(e) => e.stopPropagation()} />
          ) : (
            <StarOutlined onClick={(e) => e.stopPropagation()} />
          )*/}
          </Button>
          <Link href={`/coins/${record.id}`}>
            <EyeOutlined />
          </Link>
        </>
      ),
    },
  ];

  function handleFavorite(e: React.MouseEvent<HTMLInputElement>) {
    /*setFavorites((prev: any) => {
      if (prev.includes(e.target.name)) {
        localStorage.setItem(
          "favorites",
          JSON.stringify(prev.filter((el: string) => el !== e.target.name))
        );
        return prev.filter((el: string) => el !== e.target.name);
      }
      return [...prev, e.target.name];
    });
    localStorage.setItem(
      "favorites",
      JSON.stringify([...favorites, e.target.name])
    );*/
  }
  return (
    <Card className={classes["coin-table"]} title="Coin Table" bordered={false}>
      <Table
        rowKey={"id"}
        scroll={{ x: 400 }}
        columns={columns}
        pagination={{}}
        dataSource={data}
      />
    </Card>
  );
}

export default React.memo(CoinTable);
