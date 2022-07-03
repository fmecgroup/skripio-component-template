'use strict';
/* global skripio */

/**
* SkripioComponent options.
* @param {object}   componentOptions                          - Options used to instantiate a component object.
* @param {object}   componentOptions.spectrumOptions          - Options used to instantiate spectrum object. For complete list of options see [Spectrum options](https://seballot.github.io/spectrum/#options).
* @param {string}   componentOptions.colorFormat              - Function name that defines output color format. For complete list of supported output formats see [Spectrum color outputs](https://seballot.github.io/spectrum/#details-acceptedColorInputs).
* @param {string}   componentOptions.spectrumEvent            - Spectrum event name that will trigger color responses. For complete list of supported events see [Spectrum events](https://seballot.github.io/spectrum/#events).
* @param {*}        componentOptions.callback                 - Callback returned by component at color response event.
* @returns {string} <br>
* - `sync payload`  None <br>
* - `async payload` Color selected by user at each componentOptions.spectrumEvent event fired.
*/
export default class SkripioComponent {
  constructor ({
    [Symbol.for('responseArgs')]: responseArgs
  }) {
    try {
      this._re = new skripio._lib.Emitter(responseArgs);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
  * **Skripio component method.**<br>
  * @param    {object} args           - Method arguments object.
  * @param    {string} args.param1    - Method parameter.
  * @param    {string} args.callback  - 1C callback identifier.
  * @returns  {string} <br>
  * - `sync payload`  [document sync payloads here]. <br>
  * - `async payload` [document async payloads here].
  */
  syncMethod ({ param1 = 'do it', callback = 'method' }) {
    this._re.emitResponse(callback, skripio._lib.Emitter.codes.RESULT, param1, true);
    // Do something.
  }

  /**
  * **Skripio component method.**<br>
  * @param    {object} args           - Method arguments object.
  * @param    {string} args.param1    - Method parameter.
  * @param    {string} args.callback  - 1C callback identifier.
  * @returns  {string} <br>
  * - `sync payload`  [document sync payloads here]. <br>
  * - `async payload` [document async payloads here].
  */
  asyncMethod ({ param1 = 'do it', callback = 'method' }) {
    this._re.emitResponse(callback, skripio._lib.Emitter.codes.RESULT, param1, true);
    // Do something.
  }
}
