import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import FormControl from '@material-ui/core/FormControl'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'
import {getBusRoutes} from './BusSchedulesAPI.js'

const useStyles = makeStyles(theme => ({
  filterField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  listContainer: {
      height: '100vh',
      overflow: 'auto',
  },
}))

const SideBar = () => {
  const classes = useStyles()
  const [routeList, setRouteList] = useState([])
  const [filteredRouteList, setFilteredRouteList] = useState([])
  const [filterValue, setFilterValue] = useState('')

  useEffect(async () => {
    const routes = await getBusRoutes()
    setRouteList(routes)
    setFilteredRouteList(routes)
  }, [])

  const updateFilter = event => {
    const filterValue = event.target.value

    setFilterValue(filterValue)
    if (filterValue.trim() === '') {
      setFilteredRouteList(routeList)
    } else {
      setFilteredRouteList(
        filteredRouteList.filter(route => {
          return route.route_label.toLowerCase().includes(filterValue.toLowerCase())
        }),
      )
    }
  }

  return (
    <>
      <FormControl>
        <TextField
          variant="outlined"
          className={classes.filterField}
          inputProps= {{
            'data-testid': 'RouteNav-filter',
          }}
          label="Filter Routes"
          value={filterValue}
          onChange={updateFilter}
        />
      </FormControl>
      <Divider />
      <div className={classes.listContainer}>
      <List>
        {filteredRouteList &&
          filteredRouteList.map(route => (
            <ListItem
              data-testid={`RouteNav-route-${route.route_id}`}
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
    </>
  )
}

export default SideBar
