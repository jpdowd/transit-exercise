import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { getBusRoutes } from "./BusSchedulesAPI.js";

const useStyles = makeStyles((theme) => ({
  sideBar: {
    backgroundColor: "lightblue",
    height: "100%",
  },
}));

const SideBar = () => {
  const classes = useStyles();
  const [routeList, setRouteList] = useState([]);

  useEffect(async () => {
    const routes = await getBusRoutes();
    setRouteList(routes);
  }, []);

  return (
    <>
          <Typography>Filter to Go Here</Typography>
          <Divider />
          <List>
            {routeList && routeList.map((route) => (
                    <ListItem data-testid={`RouteNav-${route.route_id}`}key={route.route_id} button component={Link} to={`/?routeId=${route.route_id}`}>
                        <ListItemText primary={route.route_label} />
                    </ListItem>
            ))}
          </List>
    </>
  );
};

export default SideBar;
