"use client";
import { Card, Flex } from "antd";
import classes from "./favorites.module.css";
import FavoritesCard from "./favorites-card";
import React from "react";

interface Props {
  favorites: string[];
  handleFavorite: Function;
}

function Favorites({ favorites, handleFavorite }: Props) {
  return (
    <Card
      className={classes.favorites}
      title="Favorite Crypto Coins"
      bordered={false}
    >
      <ul className={classes.coins} style={{ overflowX: "auto" }}>
        {favorites.map((coin) => (
          <li key={coin}>
            <FavoritesCard coin_id={coin} handleFavorite={handleFavorite} />
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default React.memo(Favorites);
