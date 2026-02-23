# National Weather Service API 

https://www.weather.gov/documentation/services-web-api 

## How to

### How do I get the forecast?
Forecasts are created at each [NWS Weather Forecast Office (WFO)](https://www.weather.gov/srh/nwsoffices) on their own grid definition, at a resolution of about 2.5km x 2.5km. The API endpoint for the 12h forecast periods at a specific grid location is formatted as:

```bash
	https://api.weather.gov/gridpoints/{office}/{gridX},{gridY}/forecast
```

For example: https://api.weather.gov/gridpoints/TOP/29.4151326,-82.2349963/forecast

To obtain the grid forecast for a point location, use the /points endpoint to retrieve the current grid forecast endpoint by coordinates:

```bash
	https://api.weather.gov/points/{latitude},{longitude}
```

For example: https://api.weather.gov/points/29.4151326,-82.2349963

This will provide the grid forecast endpoints for three format options in these properties:

- **forecast** - forecast for 12h periods over the next seven days
- **forecastHourly** - forecast for hourly periods over the next seven days
- **forecastGridData** - raw forecast data over the next seven days

Note: at this time coastal marine grid forecasts are only available from the *forecastGridData* property.

Applications may cache the grid for a location to improve latency and reduce the additional lookup request; however, it is important to note that while it generally does not occur often, the gridX and gridY values (and even the office) for a given coordinate may occasionally change. For this reason, it is necessary to check back to the /points endpoint periodically for the latest office/grid mapping.

The /points endpoint also contains information about the issuing office, observation stations, and zones for a given point location.

### Location

29.4151326,-82.2349963

