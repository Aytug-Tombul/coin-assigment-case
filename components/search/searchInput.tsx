"use client";
import { searchCoin } from "@/lib/actions";
import { Avatar, Select, SelectProps } from "antd";
import Link from "next/link";
import { useState } from "react";

interface Props {
  placeholder: string;
  style: object;
}

function getCoinSearchData(value: string, callback: Function) {
  searchCoin(value).then((res) => {
    let data = res.coins.map((coin: any) => {
      return {
        value: coin.id,
        text: coin.name,
        thumb: coin.thumb,
      };
    });
    callback(data);
  });
}

function renderedOption(option: any) {
  console.log(option);
  return (
    <Link href={`/coins/${option.data.value}`}>
      <Avatar key={option.data.id} shape="square" src={option.data.thumb} />{" "}
      {option.data.label}
    </Link>
  );
}

export default function SearchInput({ placeholder, style }: Props) {
  const [data, setData] = useState<SelectProps["options"]>([]);
  const [value, setValue] = useState<string>();

  const handleSearch = (newValue: string) => {
    if (newValue.length >= 3) {
      getCoinSearchData(newValue, setData);
    }
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };
  console.log();
  return (
    <Select
      showSearch
      value={value}
      placeholder={placeholder}
      style={style}
      defaultActiveFirstOption={false}
      suffixIcon={null}
      filterOption={false}
      loading={true}
      optionRender={(option) => renderedOption(option)}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
      options={(data || []).map((d) => ({
        value: d.value,
        label: d.text,
        thumb: d.thumb,
      }))}
    />
  );
}
