import React, { useContext } from "react";
import {
  useLocation,
  Outlet,
  Link
} from "react-router-dom";
import classnames from "classnames";
import { Box, IconButton } from '@material-ui/core'
import Icon from '@mdi/react'

//icons
import {
  mdiFacebook as FacebookIcon,
  mdiTwitter as TwitterIcon,
  // mdiGithub as GithubIcon,
  mdiInstagram as InstagramIcon,
} from '@mdi/js'

// styles
import useStyles from "./styles";

// components
import Header from "../AgentHeader";
import Sidebar from "../AgentSidebar";
import { Context } from "../../context/Context"


// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  const classes = useStyles();
  // global
  const layoutState = useLayoutState();
  let location = useLocation();
  const { user } = useContext(Context);

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar location={location} />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <Outlet />

          <div className={classes.fakeToolbar} />

          <Box
            mt={5}
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent="space-between"
          >
            <div>
              <a
                color={'primary'}
                href="http://fundhill.com.ng/"
                target={'_blank'}
                rel="noreferrer"
                className={classes.link}
              >
                Fundhill
              </a>
              <a
                color={'primary'}
                href="http://fundhill.com.ng/about"
                target={'_blank'}
                rel="noreferrer"
                className={classes.link}
              >
                About Us
              </a>
              <a
                color={'primary'}
                href="http://fundhill.com.ng/"
                target={'_blank'}
                rel="noreferrer"
                className={classes.link}
              >
                Blog
              </a>
            </div>
            <div>
              <a
                href="https://web.facebook.com/fundhill"
                target={'_blank'}
                rel="noreferrer"
              >
                <IconButton aria-label="facebook">
                  <Icon
                    path={FacebookIcon}
                    size={1}
                    color="#6E6E6E99"
                  />
                </IconButton>
              </a>
              <a
                href="https://twitter.com/fundhill_hq"
                target={'_blank'}
                rel="noreferrer"
              >
                <IconButton aria-label="twitter">
                  <Icon
                    path={TwitterIcon}
                    size={1}
                    color="#6E6E6E99"
                  />
                </IconButton>
              </a>
              <a
                href="https://www.instagram.com/accounts/login/?next=/fundhill_hq/"
                target={'_blank'}
                rel="noreferrer"

              >
                <IconButton
                  aria-label="github"
                  style={{ marginRight: -12 }}
                >
                  <Icon
                    path={InstagramIcon}
                    size={1}
                    color="#6E6E6E99"
                  />
                </IconButton>
              </a>
            </div>
          </Box>
        </div>
      </>
    </div>
  );
}

export default Layout;
