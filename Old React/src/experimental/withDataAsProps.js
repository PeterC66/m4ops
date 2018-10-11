import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
|--------------------------------------------------
| Inspired by react-geo:MappifiedComponent
| based on https://www.avitzurel.com/blog/2016/08/03/connected-higher-order-components-with-react-and-redux/
|
 * @param 1 {Component} WrappedComponent The component to wrap and enhance.
 * @param 2 {Component} a selector, or an array of selectors.
 * @param 3 {Component} WrappedComponent The component to wrap and enhance.
 * @return {Component} The wrapped component.

| Note that by design at present:
| - we do not cope with refs
| - we pass all unrelated props through to the Wrapped Component
| - but any ref is not passed through
| - don't use this (or any HOC) inside a render
| - any static methods of the WrappedComponent are not carried over
| - although we do pass on state (as props), we are trying to keep to stateless components
| - we try to make the displayName useful
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| The actions aspect of this has not been tried yet
|--------------------------------------------------
*/
function withDataAsProps(WrappedComponent, selectors = [], actions = []) {
  const selectorArray = Array.isArray(selectors) ? selectors : [selectors];
  const DataWrapper = props => (
    /* eslint-disable react/jsx-filename-extension */
    <WrappedComponent
      {...props}
    />
    /* eslint-enable react/jsx-filename-extension */
  );

  // format is state.reducerName.collectionName
  const mapStateToProps = (state) => {
    let result = {};
    selectorArray.forEach((selector) => {
      const selectorResult = selector(state);
      result = { ...result, ...selectorResult };
    });

    return result;
  };

  function mapDispatchToProps(dispatch) {
    return {
      ...bindActionCreators(actions, dispatch),
    };
  }

  function getDisplayName(ComponentX) {
    return ComponentX.displayName || ComponentX.name || 'Component';
  }

  withDataAsProps.displayName = `withDataAsProps(${getDisplayName(WrappedComponent)})`;

  return connect(mapStateToProps, mapDispatchToProps)(DataWrapper);
}

export default withDataAsProps;
