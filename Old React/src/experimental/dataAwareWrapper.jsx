import React from 'react';
import PropTypes from 'prop-types';
import OlMap from 'ol/Map';

// import Logger from '@terrestris/base-util/src/Logger';

/**
|--------------------------------------------------
| Inspired by react-geo:MappifiedComponent
| principal changes listed here
| - ignore Logger
| -  
| - 
| - 
| - 
| - 
| Note it includes aspects I do not understand yet
|--------------------------------------------------
*/

/**
 * The HOC factory function.
 *
 * Wrapped components will receive the map from the context as a prop.
 *
 * @param {Component} WrappedComponent The component to wrap and enhance.
 * @return {Component} The wrapped component.
 */
export function makeDataAware(WrappedComponent, {
  withRef = false
} = {}) {

  /**
   * The wrapper class for the given component.
   *
   * @class The DataAwareComponent
   * @extends React.Component
   */
  class DataAwareComponent extends React.Component {

    /**
     * The context types.
     * @type {Object}
     */
    static contextTypes = {
      map: PropTypes.instanceOf(OlMap).isRequired
    }

    /**
     * Create the DataAwareComponent.
     *
     * @constructs DataAwareComponent
     */
    constructor(props) {
      super(props);

      /**
       * The wrapped instance.
       * @type {Element}
       */
      this.wrappedInstance = null;
    }

    /**
     * Returns the wrapped instance. Only applicable if withRef is set to true.
     *
     * @return {Element} The wrapped instance.
     */
    getWrappedInstance = () => {
      if (withRef) {
        return this.wrappedInstance;
      } else {
        Logger.warn('No wrapped instance referenced, please call the '
          + 'makeDataAware with option withRef = true.');
      }
    }

    /**
     * Sets the wrapped instance.
     *
     * @param {Element} instance The instance to set.
     */
    setWrappedInstance = (instance) => {
      if (withRef) {
        this.wrappedInstance = instance;
      }
    }

    /**
     * The render function.
     */
    render() {
      const {
        map
      } = this.context;

      if (!map) {
        Logger.warn('You trying to makeDataAware a component without any map in the ' +
        'context. Did you implement the MapProvider?');
      }

      return (
        <WrappedComponent
          ref={this.setWrappedInstance}
          map={map}
          {...this.props}
        />
      );

    }
  }

  return DataAwareComponent;
}
