import React, { useState } from "react";
import { IInventoryItem } from "../state/ducks/manifest/types";

type Props = {
  items: IInventoryItem[];
  onChange: (itemHash: number) => void;
};

const ItemSearch: React.FC<Props> = ({ items, onChange }: Props) => {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  const filteredItems = items
    .filter(item => item.itemCategoryHashes.includes(1))
    .filter(item =>
      item.displayProperties.name
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase())
    )
    .sort((a, b) =>
      a.displayProperties.name.localeCompare(b.displayProperties.name)
    );

  return (
    <>
      <input
        style={{
          background: "transparent",
          border: "none",
          borderBottom: "1px solid white",
          color: "white",
          fontSize: "1.5rem",
          padding: "1rem",
          width: "calc(100% - 2rem)"
        }}
        type="text"
        placeholder="Search"
        autoFocus={true}
        onClick={() => setShowSearch(true)}
      />
      {showSearch && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            width: "100%",
            background: "rgba(0,0,0,0.8)",
            overflowY: "scroll"
          }}
        >
          <div style={{ paddingTop: "3rem", margin: "0 auto", width: "80%" }}>
            <span
              style={{
                position: "absolute",
                top: "0rem",
                right: "2rem",
                fontSize: "3rem",
                cursor: "pointer",
                color: "white"
              }}
              onClick={() => {
                setShowSearch(false);
                setQuery("");
              }}
            >
              x
            </span>
            <input
              style={{
                background: "transparent",
                border: "none",
                borderBottom: "1px solid white",
                color: "white",
                fontSize: "1.5rem",
                padding: "1rem",
                width: "calc(100% - 2rem)"
              }}
              type="text"
              placeholder="Search"
              autoFocus={true}
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <ul style={{ listStyle: "none", margin: "1rem auto", padding: 0 }}>
              {filteredItems.map(item => (
                <li key={item.hash}>
                  <article
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto auto",
                      gridGap: "1rem",
                      justifyContent: "start",
                      padding: "0.5rem",
                      cursor: "pointer",
                      color: "white"
                    }}
                    onClick={() => {
                      onChange(item.hash);
                      setShowSearch(false);
                      setQuery("");
                    }}
                  >
                    <div>
                      <img
                        alt={item.displayProperties.name}
                        src={`https://www.bungie.net/${item.displayProperties.icon}`}
                        height={48}
                        width={48}
                      />
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateRows: "auto auto"
                      }}
                    >
                      <h1 style={{ fontSize: "1rem", margin: 0 }}>
                        {item.displayProperties.name}
                      </h1>
                      <p
                        style={{
                          fontSize: "0.8rem",
                          fontStyle: "italic",
                          margin: 0
                        }}
                      >
                        {item.displayProperties.description}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemSearch;
