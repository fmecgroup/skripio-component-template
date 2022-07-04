'use strict';
/* global skripio */

/**
* **`skripio.initObject`** function<br>
* Creates `skripio.Component` instance
* @function initObject
* @memberof skripio
* @param {string} objectName                      - Component object name
* @param {string} initOptions                     - Serialized method options
* @param {object} initOptions.componentOptions    - `Component` constructor options
* @param {*}      callback                        - 1C callback identifier of this wrapper function
* @returns {string} <br>
* - `sync payload`  Instantiated **Component** object name and **DOM element id** which will receive async responses from this object will be returned<br>
* - `async payload` None
*/
export default function (objectName, initOptions = '{}', callback = 'initObject') {
  try {
    initOptions = JSON.parse(initOptions);
  } catch (error) {
    return skripio._emitter.emitResponse(
      callback,
      skripio._lib.Emitter.codes.DEV_ERROR,
      error.message);
  }

  const {
    componentOptions = {}
  } = initOptions;

  componentOptions[Symbol.for('componentDOMElementSelector')] = '[data-skripio="component-container"]';
  componentOptions[Symbol.for('componentResponseArgs')] = {
    responseElementId: `${objectName}-response`,
    responseElementClass: 'response'
  };

  if (!objectName) {
    return skripio._emitter.emitResponse(
      callback,
      skripio._lib.Emitter.codes.DEV_ERROR,
      `${skripio._dict.errorPhrases.BAD_ARGUMENT}. '${objectName}' is not a valid component object name.`);
  }

  if (Object.keys(skripio._objects).includes(objectName)) {
    return skripio._emitter.emitResponse(
      callback,
      skripio._lib.Emitter.codes.DEV_ERROR,
      `${skripio._dict.BAD_ARGUMENT}. Object '${objectName}' has already been instantiated.`);
  }

  try {
    skripio._objects[objectName] = new skripio._lib.Component(componentOptions);
  } catch (error) {
    return skripio._emitter.emitResponse(
      callback,
      skripio._lib.Emitter.codes.DEV_ERROR,
      error.message);
  }

  return skripio._emitter.emitResponse(
    callback,
    skripio._lib.Emitter.codes.RESULT,
    {
      name: objectName,
      response: `${objectName}-response`
    });
}
