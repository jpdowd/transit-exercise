import React from "react";
import { BrowserRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Sidebar from "./Sidebar";
import BusData from "./BusData";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    height: "100%",
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const BusSchedules = () => {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar>
            <Typography>Transit Exercise</Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <Toolbar />
          <div className={classes.toolbar} />
          <Sidebar />
        </Drawer>
        <main className={classes.content}>
          <Toolbar />
          <BusData />
        </main>
      </div>
    </BrowserRouter>
  );
};

export default BusSchedules;
