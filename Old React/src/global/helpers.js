/*
?? for switch fallthrough?
const set = (x, ...list) => list.find(val => x === val)
const given = (route) => ({
  '1': 'Salmon',
  [set(route, '2','3','5')]: 'Turkey Sandwich Special',
  '4': 'Shrimp',
  '6': 'Ham',
  '7': 'Pork',
  '8': 'Bacon',
  [set(route, '9','10')]: 'Chicken Tomato Burger'
})[route] || undefined

See http://exploringjs.com/es6/ch_modules.html#sec_importing-exporting-details

export function color() {}
*/
