import React from "react";
import AppVersion from "./footer/appVersion";
import ManifestVersion from "./footer/mainfestVersion";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerLeft}>
          <a
            href="https://github.com/adtennant/banshee-44.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Github
          </a>
          <a
            href="https://twitter.com/adtennant"
            rel="noopener noreferrer"
            target="_blank"
          >
            Twitter
          </a>
        </div>
        <div className={styles.footerRight}>
          <AppVersion />
          <ManifestVersion />
          <span>Copyright &copy; 2019 Alex Tennant</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
