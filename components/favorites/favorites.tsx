import { Card } from "antd";
import classes from "./favorites.module.css";

export default function Favorites() {
  return (
    <>
      <Card
        className={classes.favorites}
        title="Favorite Crypto Coins"
        bordered={false}
      ></Card>
    </>
  );
}
