'use strict';
/* global skripio */

/**
* **Executes skripio component method.**<br>
* @param {string} object      - Skripio object name.
* @param {string} method      - Skripio object method name.
* @param {string} methodArgs  - Serialized object that contains skripio component method arguments.
* @param {*}      callback    - 1C callback identifier of this wrapper function.
* @returns {*} <br>
* - `sync payload`  See component method docs. <br>
* - `async payload` See component method docs.
*/
export default function (object, method, methodArgs = '{}', callback = 'run') {
  try {
    methodArgs = JSON.parse(methodArgs);
  } catch (error) {
    return skripio._emitter.emitResponse(callback, skripio._lib.Emitter.codes.DEV_ERROR, error.message);
  }

  if (!object) {
    return skripio._emitter.emitResponse(callback, skripio._lib.Emitter.codes.DEV_ERROR, `'${object}' is not a valid object name.`);
  }
  if (!method) {
    return skripio._emitter.emitResponse(callback, skripio._lib.Emitter.codes.DEV_ERROR, `'${method}' is not a valid method name.`);
  }
  if (!(window[object] instanceof skripio._lib.Component)) {
    return skripio._emitter.emitResponse(callback, skripio._lib.Emitter.codes.DEV_ERROR, `'${object}' is not a valid skripio component.`);
  }
  if (!(typeof window[object][method] === 'function')) {
    return skripio._emitter.emitResponse(callback, skripio._lib.Emitter.codes.DEV_ERROR, `'${method}' is not a function.`);
  }

  return window[object][method](methodArgs);
}
