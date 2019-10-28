import React, { useState, useEffect } from "react";
import { ISocketEntry } from "../state/ducks/manifest/types";

type Props = {
  socket: ISocketEntry;
  onChange: (plugItemHash: number) => void;
};

const Socket: React.FC<Props> = ({ socket, onChange }: Props) => {
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
  const [value, setValue] = useState(socket.singleInitialItem || plugItems[0]);

  useEffect(() => {
    setValue(socket.singleInitialItem || plugItems[0]);
  }, [socket, plugItems]);

  return (
    <>
      <div
        onClick={plugItems.length > 1 ? () => setShowOptions(true) : undefined}
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          gridGap: "1rem",
          justifyContent: "start"
        }}
      >
        <div>
          <img
            alt={value.displayProperties.name}
            src={`https://www.bungie.net/${value.displayProperties.icon}`}
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
          <h1
            style={{
              fontSize: "1.5rem",
              margin: 0,
              marginTop: "-4px",
              textTransform: "uppercase"
            }}
          >
            {value.displayProperties.name}
            {plugItems.length <= 1 && (
              <span style={{ marginLeft: "1rem" }}>&#x1f512;</span>
            )}
          </h1>
          <p
            style={{
              alignSelf: "end",
              fontSize: "1rem",
              fontStyle: "italic",
              margin: 0,
              marginBottom: "4px"
            }}
          >
            {value.displayProperties.description}
          </p>
        </div>
      </div>
      {showOptions && (
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
                      setValue(item);
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
      )}
    </>
  );
};

export default Socket;
