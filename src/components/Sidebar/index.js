import React from "react";
import { Link, navigate } from "@reach/router";

import styles from "./index.module.css";
import logo from "./feedweave-logo.png";

import { UserContext, getUserName } from "../../util";

import LoginButton from "../LoginButton";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  static contextType = UserContext;

  handleLogout = () => {
    const { handleUser } = this.context;

    navigate("/");

    handleUser(null);
  };

  render() {
    const { user } = this.context;
    return (
      <div className={styles.container}>
        <div className={styles.logoParent}>
          <Link to="/">
            <div className={styles.logo}>
              <img alt="feedweave logo" src={logo} />
              <span>FeedWeave</span>
            </div>
          </Link>
        </div>
        {user ? (
          <div className={styles.menu}>
            <div className={styles.activityMenu}>
              <div className={styles.menuItem}>
                <Link to="/">Activity on Arweave</Link>
              </div>
              <div className={styles.menuItem}>
                <Link to="/following">Following</Link>
              </div>
            </div>

            <div className={styles.userMenu}>
              <div className={styles.menuItem}>
                <Link to={`/user/${user.address}`}>
                  Profile
                  <span className={styles.userName}>
                    &nbsp;{getUserName(user.userInfo)}
                  </span>
                </Link>
              </div>
              <div className={styles.menuItem}>
                <a className={styles.logOut} onClick={this.handleLogout}>
                  Log out
                </a>
              </div>
            </div>
            <div className={styles.newPost}>
              <div className={styles.menuItem}>
                <Link to="/new-post">New Post</Link>
              </div>
            </div>
            <div></div>
          </div>
        ) : (
          <div className={styles.loginContainer}>
            <LoginButton />
          </div>
        )}
        {/* <Modal initialShow={true}>
          <Onboarding user={user} />
        </Modal> */}
      </div>
    );
  }
}

export default Sidebar;
