import React, {useEffect, useReducer} from 'react'
import PropTypes from 'prop-types'
import {useLocation} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import {
  getBusRouteDirection,
  getBusRouteStops,
  getDepartureInfo,
} from './BusSchedulesAPI'
import * as consts from './busSchedules.consts'
import {DateTime} from 'luxon'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  departureTable: {
    width: 160,
  },
}))

const reducer = (state, action) => {
  switch (action.type) {
    case consts.ACTIONS_SET_ROUTE_ID:
        return {...initialState, routeId: action.value}
    case consts.ACTIONS_SET_ROUTE_DIRECTIONS:
      return {...state, directions: action.value}
    case consts.ACTIONS_SET_ROUTE_STOPS:
        return {...state, routeStops: action.value}
    case consts.ACTIONS_SET_DEPARTURES:
        return {...state, departures: action.value}
    case consts.ACTIONS_SET_DIRECTION:
      return {...state, selectedDirection: action.value, selectedStop: [], departures: []}
    case consts.ACTIONS_SET_STOP:
      return {...state, selectedStop: action.value}
    default:
      return state
  }
}

const initialState = {
  routeId: '',
  directions: [],
  selectedDirection: '',
  routeStops: [],
  selectedStop: '',
  departures: [],
}

const BusData = ({routeInformation}) => {
  const query = useQuery()
  const classes = useStyles()
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(async () => {
    const routeId = query.get('routeId')
    const routeDirectionData = await getBusRouteDirection({
      routeId: routeId,
    })
    dispatch({type: consts.ACTIONS_SET_ROUTE_ID, value: routeId})
    dispatch({type: consts.ACTIONS_SET_ROUTE_DIRECTIONS, value: routeDirectionData})
  }, [query.get('routeId')])

  useEffect(async () => {
    const stopData = await getBusRouteStops({
      routeId: state.routeId,
      directionId: state.selectedDirection,
    })
    dispatch({type: consts.ACTIONS_SET_ROUTE_STOPS, value: stopData})
  }, [state.selectedDirection])

  useEffect(async () => {
    const departureData = await getDepartureInfo({
      routeId: state.routeId,
      directionId: state.selectedDirection,
      stopCode: state.selectedStop,
    })
    dispatch({type: consts.ACTIONS_SET_DEPARTURES, value: departureData.departures})
  }, [state.selectedStop])

  const getFormattedTime = timeStamp => {
    const dt = DateTime.fromSeconds(timeStamp).setZone('America/Chicago')
    return dt.toLocaleString(DateTime.TIME_SIMPLE)
  }

  const getRouteDescription = () => {
    const routeId = state.routeId

    if (!routeId) {
      return consts.PLEASE_SELECT_ROUTE_STRING
    }

    const matchingRoute = routeInformation.filter(route => {
      return route.route_id === routeId
    })

    if (matchingRoute.length > 0) {
      return `${consts.ROUTE_SELECTED_STRING}: ${matchingRoute[0].route_label} - ${matchingRoute[0].description}`
    } else {
      return consts.ROUTE_NOT_FOUND_STRING
    }
  }

  return (
    <>
      <Typography>{getRouteDescription()}</Typography>
      <FormControl className={classes.formControl}>
        <InputLabel>{consts.DIRECTION_STRING}</InputLabel>
        <Select
          data-testid={'BusData-directionSelection'}
          value={state.selectedDirection}
          onChange={event => dispatch({type: consts.ACTIONS_SET_DIRECTION, value: event.target.value})}
        >
          {state.directions &&
            state.directions.map(direction => (
              <MenuItem
                value={direction.direction_id}
                key={direction.direction_id}
                data-testid={`BusData-directionSelection-${direction.direction_id}`}
              >
                {direction.direction_name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>{consts.SELECTED_STOP_STRING}</InputLabel>
        <Select
          data-testid={'BusData-stopSelection'}
          value={state.selectedStop}
          onChange={event => dispatch({type: consts.ACTIONS_SET_STOP, value: event.target.value})}
        >
          {state.routeStops &&
            state.routeStops.map(stop => (
              <MenuItem
                key={stop.place_code}
                value={stop.place_code}
                data-testId={`BusData-stopSelection-${stop.place_code}`}
              >
                {stop.description}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      {state.departures && state.departures.length > 0 && (
        <TableContainer component={Paper} className={classes.departureTable}>
          <Table size="small">
            <TableHead>
              <TableCell>
                <Typography>{consts.NEXT_DEPARTURES_STRING}</Typography>
              </TableCell>
            </TableHead>
            <TableBody>
              {state.departures &&
                state.departures.map((departure, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography
                        data-testId={`BusData-departureTimes-${index}`}
                      >
                        {getFormattedTime(departure.departure_time)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}

BusData.propTypes = {
  routeInformation: PropTypes.array,
}

export default BusData
