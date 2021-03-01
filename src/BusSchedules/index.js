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
    overflow: 'hidden'
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
            <Typography>Metro Transit Exercise</Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar/>
          <div className="sideBarContainer">
            <Sidebar />
          </div>
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
