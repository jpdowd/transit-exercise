import axios from 'axios'
import {
  BUS_ROUTES_LIST_API_URL,
  BUS_ROUTE_DIRECTION_BASE_API_URL,
  BUS_ROUTE_STOPS_BASE_API_URL,
  BUS_STOP_DEPARTURE_BASE_API_URL,
  ROUTE_INFORMATION_URL,
} from './busSchedules.consts'

export const getBusRoutes = async () => {
  const response = await axios.get(BUS_ROUTES_LIST_API_URL)
  return response.data
}

export const getBusRouteDirection = async ({routeId}) => {
  const response = await axios.get(
    `${BUS_ROUTE_DIRECTION_BASE_API_URL}${routeId}`,
  )
  return response.data
}

export const getBusRouteStops = async ({routeId, directionId}) => {
  const response = await axios.get(
    `${BUS_ROUTE_STOPS_BASE_API_URL}${routeId}/${directionId}`,
  )
  return response.data
}

export const getDepartureInfo = async ({routeId, directionId, stopCode}) => {
  const response = await axios.get(
    `${BUS_STOP_DEPARTURE_BASE_API_URL}${routeId}/${directionId}/${stopCode}`,
  )
  return response.data
}

export const getRouteInformation = async () => {
  const response = await axios.get(ROUTE_INFORMATION_URL)
  return response.data
}
