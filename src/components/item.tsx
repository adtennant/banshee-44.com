import React from "react";
import { IInventoryItem } from "../state/ducks/manifest/types";
import styles from "./item.module.css";

type Props = {
  item: IInventoryItem;
};

const Item: React.FC<Props> = ({ item }) => {
  return (
    <div className={styles.item}>
      <div className={styles.detail}>
        <img
          className={styles.icon}
          alt={item.displayProperties.name}
          src={`https://www.bungie.net/${item.displayProperties.icon}`}
        />
        <h1 className={styles.name}>{item.displayProperties.name}</h1>
        <p className={styles.type}>{item.itemTypeDisplayName}</p>
      </div>
      <p className={styles.description}>{item.displayProperties.description}</p>
    </div>
  );
};

export default Item;
