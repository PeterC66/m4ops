export const coordDecimalPlaces = 7;

export const maxChooseLayers = 6;

export const notOK = -999; // Used where boolean not suitable


// Used to mitigate Vuex issue in devtools
// Needs to be true in production and for map redisplay after goHome
export const useVuexForView = false;

// Also needs to be true in production
export const dontUseLogger = false;

// Enums
// From https://stijndewitt.com/2014/01/26/enums-in-javascript/
// (Can add info to values - see above link)

// Guides the Text Search
export const searchOptionEnum = {
  COUNT_ONLY: 1, // was searchOptionCountOnly
  WHOLE_WORD: 2, // was searchOptionWholeWord
  PLAIN: 3, // was searchOptionPlain
};

// keydownMode is used to tell the keydownHandler what mode it is in (see the following constants)
export const keyDownEnum = {
  NONE: 1, // was keydownMode_None = 0
  SPY: 2, // was keydownMode_Spy = 1
  SERIES: 3, // was keydownMode_Series = 2
  NORMAL: 4, // was keydownMode_Normal = 3
};

// keydownMode is used to tell the keydownHandler what mode it is in (see the following constants)
export const displayTypeEnum = {
  mostlyRasters: 'A', // sorted first
  mostlyVectors: 'B', // sorted second
};

// protection status relates to layers
export const protectionStatusEnum = {
  Unprotected: 'UN', // default
  Protected: 'PD',
  Personal: 'PL',
  Test: 'TT',
};

// user rights relates to users and OPS
export const userRightsEnum = {
  opsViewer: 'OV',
  opsTeamMember: 'OT',
  opsAdmin: 'OA',
  globalAdmin: 'GA', // No OPS needed
};
