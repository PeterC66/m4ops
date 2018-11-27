# To Do

## Top Priority

- Production version - Backups
- Popups – by feature, or in results sidebar (use click choice?)
  - details in separate panel?
  - Freeze/unfreeze
  - Format data (with images, events, html etc)
- Views – 2 maps, spy, slider
- Click actions
- Users, Passwords - use Auth0
  - Admin, Manager, User, Guest

## Await v0.12 Priority

- Mouse Position control

## Medium Priority

- WMS and WMTS sources
- new OPS for HcN
- TODO in comments items
- implementing loading aspects including "No layers" selected message
- Zoom: Center as was (??)
- window size to screen
- Upload, compile
- Demo
- Help
- Goto (search/cords)
- Copy URL
- Can slide time for Series (as a category), and for features
- each Layer with Go, Description, Key, List
- ChooseLayer Type in filter?
- Attributes closed till click
- Style Chain: feature, colour sets/formula / colorbar, layer spec, default
- Each Modifiable feature layer (MFL) has:
  - Features in the geojson, each with a geometry and properties
  - (possibly) a csv file with properties (non-georef’d)
  - Processes as M4OPS
- Each LayerDefs is one of (stored in different places):
  - Provided (by PDC) (with an Area)
  - Managed (by the person responsible for the OPS)
  - Modifiable (MFL) – by each User
- Each Provided and Managed feature layer def has:
  - Features in the geojson, each with a geometry and properties
  - (possibly) an Events json data file with Features, with each (possibly) an array of [dated] events, html and/or  images
  - A field spec, used for input and display (or a default field spec?)
- (possibly) a People_Events json data file with People, with each having an array of [dated] events and/or  images linked to features
- We need processes for:
  - Uploading (or Drag and Drop) a geojson file to a Provided, Managed or Modifiable layer (with password controls)
  - Uploading (or Drag and Drop) a csv file similarly, and compiling
  - Uploading (or Drag and Drop) a Word file similarly, and compiling
  - Georeferencing an MFL
  - Transferring a Modifiable layer to become a Managed one (with its LayerDef)
  - (assuming PDC has processes for the Provided layers)
- use [vuelayers utilities](https://github.com/ghettovoice/vuelayers/tree/master/src/util)

## Low Priority

- User favourite Layers
- layerAndSourceTile: (tileserver) const OPSCode = 'HcN'; // Kludge TODO (or remove tileserver folder)
- after OPS choice close box
- maps created asynchronously with promises
- disallow duplicates in OPS.json titles (FLG.php)
- don't allow already chosen layerDefs in new ChooseLayer, to avoid duplicate key error
- simplify Continents production FLG etc?
- reduce bundle size on build
- use [vuelayers constants](https://github.com/ghettovoice/vuelayers/blob/master/src/ol-ext/consts.js)

## Issues to be resolved

- x

## To Consider

- x

## Tried but failed

- subhead colours
