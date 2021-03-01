import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import { getBusRoutes } from "./BusSchedulesAPI.js";

const useStyles = makeStyles((theme) => ({
  sideBar: {
    height: "100%",
  },
  filterField: {
    paddingTop: theme.spacing(1),
    paddingBotton: theme.spacing(1),
  },
}));

const SideBar = () => {
  const classes = useStyles();
  const [routeList, setRouteList] = useState([]);
  const [filteredRouteList, setFilteredRouteList] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  useEffect(async () => {
    const routes = await getBusRoutes();
    setRouteList(routes);
    setFilteredRouteList(routes);
  }, []);

  const updateFilter = (event) => {
    const filterValue = event.target.value;

    setFilterValue(filterValue);
    if (filterValue.trim() === "") {
      setFilteredRouteList(routeList);
    } else {
      setFilteredRouteList(
        filteredRouteList.filter((route) => {
          return route.route_label.includes(filterValue);
        })
      );
    }
  };

  return (
    <div className={classes.sideBar}>
    <FormControl className={classes.filterField}>
      <TextField
        data-testid="RouteNav-filter"
        variant="outlined"
        label="Filter Routes"
        value={filterValue}
        onChange={updateFilter}
      />
      </FormControl>
      <Divider />
      <List>
        {filteredRouteList &&
          filteredRouteList.map((route) => (
            <ListItem
              data-testid={`RouteNav-${route.route_id}`}
              key={route.route_id}
              button
              component={Link}
              to={`/?routeId=${route.route_id}`}
            >
              <ListItemText primary={route.route_label} />
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default SideBar;
