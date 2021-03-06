import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
  MenuOpen, LocalAtmOutlined, ShoppingCartOutlined,
  AccountBalanceOutlined, AssessmentOutlined,
  FormatAlignJustifyOutlined, FormatAlignLeftOutlined, People, Settings, AccountCircleOutlined, BusinessOutlined, PeopleAltOutlined, TransferWithinAStationOutlined, TimerOutlined
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";

//logo
import logo from "../../assets/images/logo.png";
// import biglogo from "../../assets/images/biglogo.jpg";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";
import { Typography } from "../Wrappers/Wrappers";

const structure = [
  {
    id: 0,
    label: "User",
    link: "/app/usermanage",
    icon: <AccountCircleOutlined fontSize="small" />,
    children: [
      { label: "Administrators", link: "/app/usermanage/admin" },
      { label: "Users", link: "/app/usermanage/user" },
    ],
  },
  {
    id: 1,
    label: "Company",
    link: "/app/company",
    icon: <BusinessOutlined fontSize="small" />,
  },
  {
    id: 2,
    label: "Client",
    link: "/app/client",
    icon: <PeopleAltOutlined fontSize="small" />,

  },
  {
    id: 3,
    label: "Sales Client",
    link: "/app/sales",
    icon: <TransferWithinAStationOutlined fontSize="small" />,
  },
  {
    id: 4,
    label: "Schedule",
    link: "/app/schedule",
    icon: <TimerOutlined fontSize="small" />,
  },
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // global
  var layoutState = useLayoutState();
  // var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames(classes.drawerPaper, {
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >

      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            style={{ color: 'white' }}
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
      <div className={classes.sidebarList} style={{ justifyContent: 'center', alignSelf: 'center',  marginTop: 20}}>
        <IconButton style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}>
          <ArrowBackIcon style={{marginRight: 5}}/>
          Log Out
        </IconButton>
      </div>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
