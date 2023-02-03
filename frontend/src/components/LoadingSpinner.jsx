import React from "react";
import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={styles.center}>
      <div className={styles.lp}></div>
      <div className={styles.loadtext}>
        <p>Loading..</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
