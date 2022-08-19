import React,{useContext} from "react";
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
  mdiGithub as GithubIcon,
} from '@mdi/js'

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";
import AdminSideBar from "../AdminSidebar";
import {Context} from "../../context/Context"


// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  const classes = useStyles();
  // global
  const layoutState = useLayoutState();
  let location = useLocation();
  const {user} = useContext(Context);

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        {/* <Sidebar location={location} /> */}
        {
          user.data.created_by === "FUNDHILL" ?
          (
            <AdminSideBar location={location} />
          )
          :
          (
            <Sidebar location={location} />

          )
        }
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
              <Link
                color={'primary'}
                to="#"
                target={'_blank'}
                className={classes.link}
              >
                Fundhill
              </Link>
              <Link
                color={'primary'}
                to="#"
                target={'_blank'}
                className={classes.link}
              >
                About Us
              </Link>
              <Link
                color={'primary'}
                to="#"
                target={'_blank'}
                className={classes.link}
              >
                Blog
              </Link>
            </div>
            <div>
              <Link
                to="#"
                target={'_blank'}
              >
                <IconButton aria-label="facebook">
                  <Icon
                    path={FacebookIcon}
                    size={1}
                    color="#6E6E6E99"
                  />
                </IconButton>
              </Link>
              <Link
                to="#"
                target={'_blank'}
              >
                <IconButton aria-label="twitter">
                  <Icon
                    path={TwitterIcon}
                    size={1}
                    color="#6E6E6E99"
                  />
                </IconButton>
              </Link>
              <Link
                to="#"
                target={'_blank'}
              >
                <IconButton
                  aria-label="github"
                  style={{ marginRight: -12 }}
                >
                  <Icon
                    path={GithubIcon}
                    size={1}
                    color="#6E6E6E99"
                  />
                </IconButton>
              </Link>
            </div>
          </Box>
        </div>
      </>
    </div>
  );
}

export default Layout;
