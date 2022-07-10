'use strict';
/* global skripio */

/**
* **`Component`** class<br>
* An object of this class is instantiated by the `skripio.initObject` function.
* @param {object}   componentOptions      - Constructor options interface object.
* @returns {string} <br>
* - `sync payload`  None<br>
* - `async payload` None
*/
export default class Component {
  constructor ({
    [Symbol.for('componentDOMElementSelector')]: componentDOMElementSelector,
    [Symbol.for('componentResponseArgs')]: componentResponseArgs
  }) {
    try {
      this._re = new skripio._lib.Emitter(componentResponseArgs);
    } catch (error) {
      throw new Error(error.message);
    }

    this._componentDiv = document.querySelector(componentDOMElementSelector);
    if (!this._componentDiv) {
      throw new Error(`'${componentDOMElementSelector}' is not a valid DOM element selector.`);
    }
  }

  /**
  * **`syncMethod`** Component method<br>
  * Returns result synchronously.
  * @param    {object} args           - Method arguments object.
  * @param    {string} args.message   - Message text.
  * @param    {string} args.callback  - 1C callback identifier.
  * @returns  {string} <br>
  * - `sync payload`  Message passed<br>
  * - `async payload` None
  */
  syncMethod ({ message = 'Hi from sync method!', callback = 'syncMethod' }) {
    this._componentDiv.innerText = message;
    return this._re.emitResponse(callback, skripio._lib.Emitter.codes.RESULT, message);
  }

  /**
  * **`asyncMethod`** Component method<br>
  * Returns result asynchronously after given timeout.
  * @param    {object} args           - Method arguments object.
  * @param    {string} args.message   - Message text.
  * @param    {string} args.timeout   - Emit timeout.
  * @param    {string} args.callback  - 1C callback identifier.
  * @returns  {string} <br>
  * - `sync payload`  None<br>
  * - `async payload` Message passed
  */
  asyncMethod ({ message = 'Hi from async method after timeout!', timeout = 1200, callback = 'asyncMethod' }) {
    setTimeout(() => {
      this._componentDiv.innerText = message;
      this._re.emitResponse(callback, skripio._lib.Emitter.codes.RESULT, message, true);
    }, timeout);
    this._componentDiv.innerText = 'Wait for async response...';
    return this._re.emitResponse(callback, skripio._lib.Emitter.codes.DONE, timeout);
  }
}
