# Sources of truth

## Current OPSCode

- state.mapping.currentOptionArray[3]
- default initialOpsCode
- getter: use mapState
- setter via updateCurrentOptionArray
- Note that store.getters.place.OPSCode holds the OPSCode for the OPS currently loaded into place

## Current User

- store.state.users.account.user
- default none (== 'Guest')
- has .username and .status.loggedIn
- localStorage.getItem('user') is used to keep user logged in between page refreshes - includes jwt token
  - so is kept updated by routines in user.service.js, and used in authHeader
  - but should not be used for any other reasons
