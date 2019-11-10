import React, { useState } from "react";
import { ISocketEntry, IInventoryItem } from "../state/ducks/manifest/types";
import styles from "./socket.module.css";
import classNames from "classnames";

type Props = {
  socket: ISocketEntry;
  onChange: (plugItemHash: number) => void;
  value: IInventoryItem;
};

const Socket: React.FC<Props> = ({ socket, onChange, value }) => {
  const plugItems = (() => {
    const plugSet = socket.randomizedPlugSet || socket.reusablePlugSet;

    if (plugSet) {
      return plugSet.reusablePlugItems;
    } else if (
      socket.singleInitialItem &&
      socket.reusablePlugItems.length > 0
    ) {
      return socket.reusablePlugItems.some(
        // Use the name not the hash because dummy masterwork items have different hashes
        plugItem =>
          plugItem.displayProperties.name ===
          socket.singleInitialItem!.displayProperties.name
      )
        ? socket.reusablePlugItems
        : [socket.singleInitialItem, ...socket.reusablePlugItems];
    } else if (socket.reusablePlugItems.length > 0) {
      return socket.reusablePlugItems;
    } else {
      return [socket.singleInitialItem!];
    }
  })();

  const [showOptions, setShowOptions] = useState(false);

  return (
    <>
      <div
        onClick={plugItems.length > 1 ? () => setShowOptions(true) : undefined}
        className={styles.socket}
        style={{ cursor: "pointer" }}
      >
        <img
          className={styles.icon}
          alt={value.displayProperties.name}
          src={`https://www.bungie.net/${value.displayProperties.icon}`}
          height={48}
          width={48}
        />
        <h1
          className={classNames(styles.name, {
            [styles.lock]: plugItems.length <= 1
          })}
        >
          {value.displayProperties.name}
        </h1>
        <p className={styles.description}>
          {value.displayProperties.description}
        </p>
      </div>

      <div
        hidden={!showOptions}
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
              setShowOptions(false);
            }}
          >
            x
          </span>
          <ul style={{ listStyle: "none", margin: "1rem auto", padding: 0 }}>
            {plugItems.map(item => (
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
                    setShowOptions(false);
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
    </>
  );
};

export default Socket;
