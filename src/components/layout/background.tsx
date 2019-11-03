import React from "react";
import styles from "./background.module.css";

const Background: React.FC<{}> = () => {
  return (
    <>
      <div className={styles.firstStripe}></div>
      <div className={styles.secondStripe}></div>
      <div className={styles.thirdStripe}></div>
    </>
  );
};

export default Background;
