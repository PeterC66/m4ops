# To Do

## Top Priority

- Production version - Backups
- Popups – by feature, or in results sidebar (use click choice?)
  - details in separate panel
  - Freeze on click, interaction condition
  - Format data (with images, events, html etc)
  - SelectionPopup towards centre
- Views – spy, slider
- Click actions
- Debounce mouse movements
- ? [v-viewer](http://mirari.cc/v-viewer/) gallery, or [Carousel](https://github.com/vuejs/awesome-vue#carousel)
- Register Page to modalforms

## VFG enhancement

- 'label' display? eg 2A
- required validator vs attribute

## Await v0.12 Priority

- Mouse Position control

## Medium Priority

- urls - opentopomap
- WMS and WMTS sources
- new OPS for HcN
- TODO in comments items
- implementing layer loading aspects - see loadingId etc in M4OPSView, openlayers-3-adding-a-progress-indicator-341431e3a938
- add "No layers" selected message
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
- [context menu](https://github.com/vuejs/awesome-vue#context-menu)?
- [print to paper](https://github.com/mycure-inc/vue-html-to-paper)

## Low Priority

- [magnify](https://openlayers.org/en/latest/examples/magnify.html)
- [swipe](https://openlayers.org/en/latest/examples/layer-swipe.html)
- User favourite Layers
- layerAndSourceTile: (tileserver) const OPSCode = 'HcN'; // Kludge TODO (or remove tileserver folder)
- after OPS choice close box
- maps created asynchronously with promises
- disallow duplicates in OPS.json titles (FLG.php)
- don't allow already chosen layerDefs in new ChooseLayer, to avoid duplicate key error
- simplify Continents production FLG etc?
- reduce bundle size on build
- use [vuelayers constants](https://github.com/ghettovoice/vuelayers/blob/master/src/ol-ext/consts.js)
- [upload images](https://levelup.gitconnected.com/how-to-preview-images-before-uploading-them-in-vue-4964803adb64)

## Issues to be resolved

- x

## To Consider

- x

## Tried but failed

- subhead colours

## For OLD M4OPS

- Group Feature layers???
- Clear cache automatically??
- polygons not disappearing
- NLS? OS 1:25000 1937-61

- Census compile XRefs1 takes too long
- Compile OPS does not compile AllFeatures, but blank (All) does - why?
  - AllFeatures does not include features from other csv files than Features.csv??
- If AllFeatures MFL has no un-georeferenced then no need for dropdown
- HNB pseudo-1 features added - why, exclude from downloads?
- pre-1894 BDY  - why featureid = pseudo-1
- need to be able to delete a csv
- show key - show colourset if no key
- Attribution for MFL not showing?
- FLG use moveProperties etc in compileFL and remove most uses of "data"
- List to have auto column width eg 1910 Valuation
- Upgrade to OL5
- All Properties to understand field types
- Loading layers - [turn on/off loading (busy)](https://gis.stackexchange.com/questions/123149/using-layer-loadstart-loadend-events-in-openlayers-3)
- General Modal to have copy all button?
  - and scroll ?
- Instead of Features->All Features
  - use MFLs - can have features without geometries?
- Read Features.csv and People_Specs only once - like People
  - Regenerate People.csv from Access - with Pnnn not Innn!
  - Add repeat header lines in generated csv files
  - P_8974 not found in Fast search
- "EDI>Local>Kirkwood:_1817" description