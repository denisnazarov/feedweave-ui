import React from "react";

import styles from "./index.module.css";
import placeholderIcon from "./placeholder-icon.png";

const UserIcon = ({ user }) => {
  const {
    userInfo: { twitterId },
  } = user;

  const iconUrl = twitterId
    ? `https://unavatar.now.sh/twitter/${twitterId}`
    : placeholderIcon;

  return (
    <img className={styles.twitterIcon} alt="twitter-avatar" src={iconUrl} />
  );
};

export default UserIcon;
