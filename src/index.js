'use strict';

import './styles/custom.css';
import ResponseEmitter from '@skripio/response-emitter';
import SkripioComponent from './modules/skripio.component.js';

window.ResponseEmitter = ResponseEmitter;
const re = new ResponseEmitter({
  responseElementId: 'init-response',
  responseElementClass: 'response'
});

/**
* **Gets downloadable assets required for component to function.**
* @param {string}   loaderArgs  - Serialized loader args object.
* @param {*}        callback    - 1C callback identifier of this wrapper function.
* @returns {*} <br>
* - `sync payload`  {{Describe sync payload here}}. <br>
* - `async payload` {{Describe async payload here}}.
*/
window.getComponentAssets = function (loaderArgs = '{}', callback = 'get') {
  try {
    loaderArgs = JSON.parse(loaderArgs);
  } catch (error) {
    return re.emitResponse(callback, ResponseEmitter.codes.DEV_ERROR, error.message);
  }
  /*
  * Place here any code that will download any assets and libraries required for skripio component
  * that are not packaged in component bundle.
  * Amend argument object parameters set as required.
  */
  return re.emitResponse(callback, ResponseEmitter.codes.DONE, 'DONE');
};

/**
* **Instantiates skripio component object.**
* @param {string} objectName          - Component name to instantiate.
* @param {string} constructorArgs     - Serialized constructor arguments object. See component constructor docs for details.
* @param {*}      callback            - 1C callback identifier of this wrapper function.
* @returns {string} <br>
* - `sync payload`  If successful a serialized object that contains instantiated **skripio component** object name and **DOM element id** which will receive async responses from this object will be returned. <br>
* - `async payload` None.
*/
window.initComponentObject = function (objectName, constructorArgs = '{}', callback = 'init') {
  try {
    constructorArgs = JSON.parse(constructorArgs);
  } catch (error) {
    return re.emitResponse(callback, ResponseEmitter.codes.DEV_ERROR, error.message);
  }

  constructorArgs.responseArgs = {
    responseElementId: objectName,
    responseElementClass: 'response'
  };

  if (!objectName) {
    return re.emitResponse(callback, ResponseEmitter.codes.DEV_ERROR, `'${objectName}' is not a valid component object name.`);
  }

  if (objectName in window) {
    return re.emitResponse(callback, ResponseEmitter.codes.DEV_ERROR, `Object '${objectName}' has already been instantiated.`);
  }

  try {
    window[objectName] = new SkripioComponent(constructorArgs);
  } catch (error) {
    return re.emitResponse(callback, ResponseEmitter.codes.DEV_ERROR, error.message);
  }

  return re.emitResponse(callback, ResponseEmitter.codes.RESULT, {
    name: objectName,
    response: objectName
  });
};

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
window.runComponentMethod = function (object, method, methodArgs = '{}', callback = 'run') {
  try {
    methodArgs = JSON.parse(methodArgs);
  } catch (error) {
    return re.emitResponse(callback, ResponseEmitter.codes.DEV_ERROR, error.message);
  }

  if (!object) {
    return re.emitResponse(callback, ResponseEmitter.codes.DEV_ERROR, `'${object}' is not a valid object name.`);
  }
  if (!method) {
    return re.emitResponse(callback, ResponseEmitter.codes.DEV_ERROR, `'${method}' is not a valid method name.`);
  }
  if (!(window[object] instanceof SkripioComponent)) {
    return re.emitResponse(callback, ResponseEmitter.codes.DEV_ERROR, `'${object}' is not a valid skripio component.`);
  }
  if (!(typeof window[object][method] === 'function')) {
    return re.emitResponse(callback, ResponseEmitter.codes.DEV_ERROR, `'${method}' is not a function.`);
  }

  return window[object][method](methodArgs);
};
