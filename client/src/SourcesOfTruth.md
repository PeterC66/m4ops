# Sources of truth

## Current OPSCode

- state.mapping.currentOptionArray[3]
- default initialOpsCode
- getter: use mapState
- setter via updateCurrentOptionArray
- Note that store.getters.place.OPSCode holds the OPSCode for the OPS currently loaded into place

## Current User

- store.state.users.account.user
- has .username and .status.loggedIn
- default none (username === 'Guest')
- localStorage.getItem('user') is used to keep user logged in between page refreshes - includes jwt token
  - so is kept updated by routines in user.service.js, and used in authHeader
  - but should not be used for any other reasons

## Current Chosen Layers

- store.state.mapping.mainmap.chosenLayers (array)
- each has .ldid, .opacity (0-1), .displaytype (A or B)
- getter chosenLayersMainmap
- set by setLayer and setOpacity
- there is also the simpler store.state.mapping.chosenRhLayer which is just ldid
- initialised to initialStateChosenLayersByOpsCode(opsCode) - none yet
- default initialStateChosenLayers.default [Bing Aerial, OSM]