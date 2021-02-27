import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import {
  getBusRouteDirection,
  getBusRouteStops,
  getDepartureInfo,
} from "./BusSchedulesAPI";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const BusData = () => {
  const query = useQuery();
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

  return (
    <>
      <Typography>Test Text</Typography>
      <Select value={selectedDirection} onChange={getStopsForDirection}>
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
      <Select value={selectedStop} onChange={updateSelectedStop}>
        {routeStops &&
          routeStops.map((stop) => (
            <MenuItem key={stop.place_code} value={stop.place_code}>
              {stop.description}
            </MenuItem>
          ))}
      </Select>
      <br/>
      {/* TODO Clean up */}
      {departures && departures.map((departure, index) => (
          <Typography key={index}>{departure.departure_time}</Typography>
      ))}
    </>
  );
};

export default BusData;
