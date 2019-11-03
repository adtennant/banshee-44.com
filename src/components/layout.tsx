import React from "react";
import Footer from "./layout/footer";
import Header from "./layout/header";
import styles from "./layout.module.css";
import Background from "./layout/background";

const Layout: React.FC<{}> = ({ children }) => {
  return (
    <>
      <div className={styles.layout}>
        <Background />
        <header className={styles.header}>
          <Header />
        </header>
        <main className={styles.main}>{children}</main>
        <footer className={styles.footer}>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Layout;
