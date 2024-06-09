// import React from 'react';
import styles from './SideBox.module.css';
function SideBox(props) {
  return (
    <div className={styles.theBoxWrapper}>
      <div className={styles.mainContent}>
        {<img src={props.imgSrc} alt={props.imgAlt} />}
        <h2>{props.heading}</h2>
      </div>
      <div className={styles.content}>
        <p>{props.content}</p>
      </div>
    </div>
  );
}

export default SideBox;
