# M4OPS2 URL structure

## path parameters

(specific order separated by /) - see client\src\router.js  "path: '/maps/"

- :ops: code for the OPS (optional - default HcN)
- :layers: zero or more layer titles (starting at layer 0) separated by / (if none then default is Bing%20Aerial/OSM)
  - layer titles can be alphanumeric, including -_ and spaces
- :opacities: zero or more opacity numbers (% starting at layer 1, as the base is always 100% opaque) separated by / (if none then default is 50 for rasters, 100 for feature layers)
- :ZoomOrFitTo: zoom level preceded by Z eg 18, or FitTo preceded by F eg 1 (default is the HomeView)
  - (FitTo was Extent and is the number of the layer to initially fit to)
- :Lon/Lat: Longitude/Latitude decimal degrees, eg -0.0318640/52.3304020 for central Needingworth
  - (This is in 'EPSG: 4326' or Spherical Mercator, and is irrelevant if a FitTo is specified)

## Examples

(for now the final / is important)
[Basic](http://localhost:8080/maps/HcN/OpenStreetMap/Bing%20Aerial/NLS%201920s-1940s%20maps/55/Z16/)
[Protected](http://localhost:8080/maps/HcN/Bing%20Aerial/Cosmo%20Wallace%201764/90/Z17/)

## query parameters

- (key/value pairs)

- NoCHNG means you cannot change the OPS
- Showlevel= (default 9999) for demonstrations starts at 0 then goes up at cutoffpoints
- Splash= html text for splash screen when M4OPS first opens, can include abbreviations (#..#)
  - one word abbreviations will, if necessary, have the word Splash appended, and be surrounded by #..#
  - (thus Splash=Spyglass becomes #SpyglassSplash#)
  - (and Splash=25inch becomes #25inchSplash#)
- Tab= the initial advanced option tab to show:
  - Actions - PNG, Demo, icons (the default)
  - MFL - Modifiable Feature Layers
  - Upload - Upload, compile
  - Time - Time sliders
- Displaystyle= (initial view)
  - onemapOpacity - One map with Opacity slider, or
  - sidebyside - Side by Side maps, or
  - onemapSpy - One Map with Spyglass
- Colours= initial colour scheme for features
- Click= the initial drop-down value - one of:
  - no - No lat/lon click
  - M4OPScsv - M4OPS lon;lat csv
  - M4OPSparam - M4OPS parameters
  - csv - lat,lon csv
  - geojson - {lon,lat} GeoJSON
  - EPSG3857 - EPSG:3857 (x/y)
  - HDMS - DegMinSec N/E
  - GeoHack - GeoHack links
  - Featureid - Feature id
- Green if you want the background in development to be the normal Green
- NoShift if you want the layers NOT shifted east or north
- LoadwA if you want tiles loaded during animations (may improve the user experience, but can also make things stutter on devices with slow memory)
- LoadwI if you want tiles loaded while interacting with the map (ditto)
- (Mouse if you want the next feature to be Georeferenced to appear by the mouse pointer)

## Other M4OPS parameters

- from [forum](https://www.mapping4ops.org/m4ops-technicalities/m4ops-parameters/)
- File= filename of json to use, default M4OPS (.json) **NA**
