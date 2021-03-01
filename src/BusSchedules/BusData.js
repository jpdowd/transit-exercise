import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import {
  getBusRouteDirection,
  getBusRouteStops,
  getDepartureInfo,
} from "./BusSchedulesAPI";
import { DateTime } from "luxon";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const useStyles = makeStyles ((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
      },
}))

const BusData = () => {
  const query = useQuery();
  const classes = useStyles()
  const [directions, setDirections] = useState();
  const [selectedDirection, setSelectedDirection] = useState();
  const [routeStops, setRouteStops] = useState();
  const [selectedStop, setSelectedStop] = useState();
  const [departures, setDepartures] = useState([]);

  useEffect(async () => {
    const routeDirectionData = await getBusRouteDirection({
      routeId: query.get("routeId"),
    });
    setDirections(routeDirectionData);
  }, [query.get("routeId")]);

  useEffect(async () => {
    const stopData = await getBusRouteStops({
      routeId: query.get("routeId"),
      directionId: selectedDirection,
    });
    setRouteStops(stopData);
  }, [selectedDirection]);

  useEffect(async () => {
    const departureData = await getDepartureInfo({
      routeId: query.get("routeId"),
      directionId: selectedDirection,
      stopCode: selectedStop,
    });
    setDepartures(departureData.departures);
  }, [selectedStop]);

  const getStopsForDirection = (event) =>
    setSelectedDirection(event.target.value);
  const updateSelectedStop = (event) => setSelectedStop(event.target.value);

  const getFormattedTime = (timeStamp) => {
    const dt = DateTime.fromSeconds(timeStamp).setZone("America/Chicago");
    return dt.toLocaleString(DateTime.TIME_SIMPLE);
  };

  return (
    <>
      <Typography>Schedule for {query.get("routeId")}</Typography>
      <FormControl className={classes.formControl}>
        <InputLabel>Direction</InputLabel>
        <Select data-testid={'BusData-directionSelection'} value={selectedDirection} onChange={getStopsForDirection}>
          {directions &&
            directions.map((direction) => (
              <MenuItem
                value={direction.direction_id}
                key={direction.direction_id}
              >
                {direction.direction_name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Selected Stop</InputLabel>
        <Select data-testid={'BusData-stopSelection'} value={selectedStop} onChange={updateSelectedStop}>
          {routeStops &&
            routeStops.map((stop) => (
              <MenuItem key={stop.place_code} value={stop.place_code}>
                {stop.description}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      {departures &&
        departures.map((departure, index) => (
          <Typography key={index}>
            {getFormattedTime(departure.departure_time)}
          </Typography>
        ))}
    </>
  );
};

export default BusData;
