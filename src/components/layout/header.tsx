import React from "react";
import styles from "./header.module.css";
import logo from "./logo.png";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.backgroundContainer}>
        <div className={styles.background}></div>
        <div className={styles.backgroundFade}></div>
      </div>
      <div className={styles.container}>
        <img alt="Banshee-44" className={styles.logo} src={logo} />
        <h1 className={styles.title}>Banshee-44</h1>
      </div>
    </div>
  );
};

export default Header;
