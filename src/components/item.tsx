import React from "react";
import { IInventoryItem } from "../state/ducks/manifest/types";

type Props = {
  item: IInventoryItem;
};

const Item: React.FC<Props> = ({ item }: Props) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto auto",
        gridGap: "1rem"
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          gridGap: "1rem",
          justifyContent: "start"
        }}
      >
        <div>
          <img
            style={{
              border: "1px white solid"
            }}
            alt={item.displayProperties.name}
            src={`https://www.bungie.net/${item.displayProperties.icon}`}
            height={64}
            width={64}
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateRows: "auto auto"
          }}
        >
          <h1
            style={{
              fontSize: "2.75rem",
              margin: 0,
              marginTop: "-8px",
              textTransform: "uppercase"
            }}
          >
            {item.displayProperties.name}
          </h1>
          <p
            style={{
              alignSelf: "end",
              fontSize: "1.2rem",
              margin: 0,
              marginBottom: "8px",
              textTransform: "uppercase"
            }}
          >
            {item.itemTypeDisplayName}
          </p>
        </div>
      </div>
      <div>
        <p style={{ fontStyle: "italic", margin: 0 }}>
          {item.displayProperties.description}
        </p>
      </div>
    </div>
  );
};

export default Item;
