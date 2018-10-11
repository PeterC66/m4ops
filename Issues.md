# To Do

## Issues to be resolved

- TESTING [see](https://medium.com/javascript-scene/10-tips-for-better-redux-architecture-69250425af44), and
- after OPS choice close box
- implementing loading aspects (also [see this](https://medium.com/@stowball/a-dummys-guide-to-redux-and-thunk-in-react-d8904a7005d3))
- handle action errors
- use selectors for mapStateToProps etc
- consider [Services standards](https://github.com/ghengeveld/react-redux-styleguide#services), eg all return a promise, and Utils
- maps created asynchronously with promises
- disallow duplicates in OPS.json titles (FLG.php)
- don't allow already chosen layerDefs in new ChooseLayer, to avoid duplicate key error
- chosenLayers in reverse order (base on bottom)
- on change place then remove all chosenLayers
- for continents etc sort each by name (rather than code)

## Use of react-geo

- DigitizeButton for MFLs and georeferencing
- SimpleButton - being used
- ToggleButton ??? ToggleGroup ???
- UploadButton - for file uploading
- ZoomToExtentButton - ??? or to Centre/zoom?
- CircleMenu and CircleMenuItems ???
- AddWmsPanel, AddWmsLayerEntry ??
- WfsSearch field - an input field to do a WFS-GetFeature request (how differs from WfsSearchInput)
- AgFeatureGrid - grid of features from [ag-grid](https://www.ag-grid.com/best-react-data-grid/)
- FeatureGrid ?? - grid of features from antd Table
- PropertyGrid - grid of properties of one feature
- DropTargetMap HOC  ???? what is this for??
- loadify HOC - maybe useful to link to our loading subsystem
- Legend ??
- MapComponent - used, but do asynchronously
- Panel?
- LayerTransparencySlider
- MultiLayerSlider - for series
- TimeSlider that uses ISO 8601 time strings as input
- UserChip - avatar
- Window - separate from the main one

## Consider

- [persistence](https://redux.js.org/introduction/ecosystem#persistence)
- [immutable](https://redux.js.org/introduction/ecosystem#immutable-data), even [seamless-immutable](https://github.com/rtfeldman/seamless-immutable)
- [forms](https://redux.js.org/introduction/ecosystem#forms) - see antd too
- [undo](https://redux.js.org/recipes/implementingundohistory)
