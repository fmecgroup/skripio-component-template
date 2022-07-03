'use strict';

import './styles/custom.css';
import ResponseEmitter from '@skripio/response-emitter';
import SkripioComponent from './component.js';
import errorPhrases from './modules/dict.error.phrases.js';
import initObject from './modules/skripio.initObject.js';
import runObjectMethod from './modules/skripio.runObjectMethod.js';

/**
* skripio component namespace.
* @namespace skripio
*/
const skripio = {};

/**
* A namespace for instantiated skripio objects.
* @namespace _objects
* @memberof skripio
* @private
*/
const objects = {};

/**
* Globally available dictionaries.
* @namespace _dict
* @memberof skripio
* @property {object} errorPhrases    - Standard error phrases.
* @private
*/
const dict = {
  errorPhrases: errorPhrases
};

/**
* Globally available helpers.
* @namespace _lib
* @memberof skripio
* @property {object} Emitter    - Response Emitter library.
* @property {object} Component  - Skripio component class.
* @private
*/
const lib = {
  Emitter: ResponseEmitter,
  Component: SkripioComponent
};

/**
* Globally available response emitter.
* @memberof skripio
* @private
*/
const skripioEmitter = new ResponseEmitter({
  responseElementId: 'skripio-response',
  responseElementClass: 'response'
});

skripio._objects = objects;
skripio._dict = dict;
skripio._lib = lib;
skripio._emitter = skripioEmitter;
skripio.initObject = initObject;
skripio.runObjectMethod = runObjectMethod;

window.skripio = skripio;
