import React, { useState } from "react";
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import Drawer from "@mui/material/Drawer";
import clsx from "clsx";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Link from 'next/link';

type Props = {
  title: string;
};

const drawerWidth = 160;
const toolBarHeight = 48;


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  // appBar: {
  //   zIndex: theme.zIndex.drawer + 1,
  //   transition: theme.transitions.create(["width", "margin"], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen
  //   })
  // },
  // appBarShift: {
  //   marginLeft: drawerWidth,
  //   width: `calc(100% - ${drawerWidth}px)`,
  //   transition: theme.transitions.create(["width", "margin"], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.enteringScreen
  //   })
  // },
  // toolBar: {
  //   minHeight: toolBarHeight,
  // },
  // appBarSpacer: {
  //   minHeight: toolBarHeight,
  // },
  // menuButton: {
  //   marginRight: 36
  // },
  // menuButtonHidden: {
  //   display: "none"
  // },
  // drawerPaper: {
  //   position: "relative",
  //   whiteSpace: "nowrap",
  //   width: drawerWidth,
  //   transition: theme.transitions.create("width", {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.enteringScreen
  //   })
  // },
  // drawerPaperClose: {
  //   overflowX: "hidden",
  //   transition: theme.transitions.create("width", {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen
  //   }),
  //   width: theme.spacing(7),
  //   [theme.breakpoints.up("sm")]: {
  //     width: theme.spacing(7)
  //   }
  // },

  // paper: {
  //   padding: theme.spacing(2),
  //   display: "flex",
  //   overflow: "auto",
  //   flexDirection: "column"
  // },
}));

const Navi: React.FC<Props> = (props): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const theme = createTheme();

  const menuList = [
    { text: "Home", path: "/", icon: <HomeIcon /> },
    { text: "Flashcard", path: "/flashcard", icon: <DashboardIcon /> }
  ]

  const handleDrawerOpen = () => {
    console.log("open")
    setOpen(true);
  };
  const handleDrawerClose = () => {
    console.log("close")
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        sx={{
          width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
          zIndex: theme.zIndex.drawer + 1
        }}
      // className={clsx({
      //   zIndex: theme.zIndex.drawer + 1,
      //   transition: theme.transitions.create(["width", "margin"], {
      //     easing: theme.transitions.easing.sharp,
      //     duration: theme.transitions.duration.leavingScreen
      //   })
      // }, open && {
      //   marginLeft: drawerWidth,
      //   width: `calc(100% - ${drawerWidth}px)`,
      //   transition: theme.transitions.create(["width", "margin"], {
      //     easing: theme.transitions.easing.sharp,
      //     duration: theme.transitions.duration.enteringScreen
      //   })
      // })}
      >
        <Toolbar sx={{
          paddingRight: 24 // keep right padding when drawer closed
        }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              { marginRight: 36 },
              open && { display: "none" }
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: open ? `${drawerWidth}px` : theme.spacing(7),
          ".MuiPaper-root": {
            position: open ? "fixed" : "relative"
          }
        }}
        // sx={{
        //   paper: (theme) => ({
        //     position: "relative",
        //     whiteSpace: "nowrap",
        //     // width: theme.spacing(100),
        //     // transition: theme.transitions.create("width", {
        //     //   easing: theme.transitions.easing.sharp,
        //     //   duration: theme.transitions.duration.enteringScreen
        //     // })
        //   })
        // }}
        // classes={{
        //   paper: clsx({
        //     position: "relative",
        //     whiteSpace: "nowrap",
        //     width: drawerWidth,
        //     transition: theme.transitions.create("width", {
        //       easing: theme.transitions.easing.sharp,
        //       duration: theme.transitions.duration.enteringScreen
        //     })
        //   }, !open && {
        //     overflowX: "hidden",
        //     transition: theme.transitions.create("width", {
        //       easing: theme.transitions.easing.sharp,
        //       duration: theme.transitions.duration.leavingScreen
        //     }),
        //     width: theme.spacing(7),
        //     [theme.breakpoints.up("sm")]: {
        //       width: theme.spacing(7)
        //     }
        //   })
        // }}
        open={open}
      >
        <IconButton onClick={handleDrawerClose} sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 8px",
          minHeight: toolBarHeight,
        }}>
          <ChevronLeftIcon />
        </IconButton>
        <Divider />
        <List>
          {menuList.map((item) => (
            <Link href={item.path} passHref key={item.text}>
              <ListItem button>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </div>
  );
};
export default Navi;
