'use strict';
/* global ResponseEmitter */

/**
* **Skripio component object.**<br>
* [document component constructor here].
* @returns {string} <br>
* - `sync payload`  None. <br>
* - `async payload` [document async payloads here].
*/
export default class SkripioComponent {
  constructor ({ responseArgs, callback = 'component' }) {
    try {
      this._re = new ResponseEmitter(responseArgs);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
  * **Skripio component method.**<br>
  * [document component method here].
  * @param {object} args            - Method arguments object.
  * @param {object} args.param1     - Method parameter.
  * @returns {string} <br>
  * - `sync payload`  [document sync payloads here]. <br>
  * - `async payload` [document async payloads here].
  */
  method ({ param1 = 'do it', callback = 'method' }) {
    this._re.emitResponse(callback, ResponseEmitter.codes.RESULT, param1, true);
    // Do something.
  }
}
