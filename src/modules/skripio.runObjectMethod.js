'use strict';
/* global skripio */

/**
 * **`skripio.runObjectMethod`** function<br>
* Executes given `Component` instance method
* @function runObjectMethod
* @memberof skripio
* @param {string} object      - `Component` instance name
* @param {string} method      - `Component` instance method name
* @param {string} methodArgs  - `Component` serialized method arguments
* @param {*}      callback    - 1C callback identifier of this function
* @returns {*} <br>
* - `sync payload`  See component method docs<br>
* - `async payload` See component method docs
*/
export default (object, method, methodArgs = '{}', callback = 'runObjectMethod') => {
  try {
    methodArgs = JSON.parse(methodArgs);
  } catch (error) {
    return skripio._emitter.emitResponse(
      callback,
      skripio.lib.Emitter.codes.DEV_ERROR,
      error.message);
  }

  if (!object) {
    return skripio._emitter.emitResponse(
      callback,
      skripio.lib.Emitter.codes.DEV_ERROR,
      `${skripio._dict.errorPhrases.BAD_ARGUMENT}. '${object}' is not a valid object name.`);
  }
  if (!method) {
    return skripio._emitter.emitResponse(
      callback,
      skripio.lib.Emitter.codes.DEV_ERROR,
      `${skripio._dict.errorPhrases.BAD_ARGUMENT}. '${method}' is not a valid method name.`);
  }
  if (!(skripio._objects[object] instanceof skripio._lib.Component)) {
    return skripio._emitter.emitResponse(
      callback,
      skripio.lib.Emitter.codes.DEV_ERROR,
      `${skripio._dict.errorPhrases.BAD_ARGUMENT}. '${object}' is not a valid skripio component.`);
  }
  if (!(typeof skripio._objects[object][method] === 'function')) {
    return skripio._emitter.emitResponse(
      callback,
      skripio.lib.Emitter.codes.DEV_ERROR,
      `${skripio._dict.errorPhrases.BAD_ARGUMENT}. '${method}' is not a function.`);
  }

  try {
    return skripio._objects[object][method](methodArgs);
  } catch (error) {
    return skripio._emitter.emitResponse(
      callback,
      skripio.lib.Emitter.codes.DEV_ERROR,
      `'${method}' exception. ${error.message}`);
  }
};
