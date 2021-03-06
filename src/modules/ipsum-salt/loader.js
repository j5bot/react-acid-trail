/**
 * ipsum-salt/loader module provides methods for loading single-file ipsum
 * generator modules and exposing them via the window object, allowing for lazy
 * loading of various ipsum generators.
 *
 * @module loader
 */

/**
 * Fetch a script from the URL using fetch API and returning a promise.
 * @param  {String} url URL of the script to fetch
 * @return {Promise}    A Promise which will resolve when the fetch operation
 *                      completes.
 */
const fetchScript = (url) => {
  return fetch(url).then(
    (response) => response.text()
  );
};

/**
 * Create script line(s) to expose module members on the `window` object.
 *
 * @param  {String} expose   The module member to expose
 * @param  {String} exposeAs What property to set on the `window` object
 * @return {String}          Script source for exposing the member
 */
const appendExposure = (expose, exposeAs) => {
  return `window['${exposeAs}'] = ${expose};`;
};

/**
 * Loader method which provides for loading single-file module scripts from
 * the given URL and exposing module members on the `window` object.
 *
 * Optionally call an `onLoad` callback when the module script is loaded.
 *
 * @param  {String} url               The URL to the module script
 * @param  {String} expose            The module member to expose
 * @param  {String} [exposeAs=expose] The property of `window` to set
 * @param  {Function} onLoad          A function to call when the script is
 *                                    loaded
 * @return {Promise}                  The Promise object used to fetch the
 *                                    module script
 */
export const ipsumSalt = ({ url, expose, exposeAs = expose, onLoad }) => {
  if (window.ipsumSalt.loadedScripts[url]) {
    return new Promise();
  }
  let promise = fetchScript(url).then(
    (response) => {
      const script = document.createElement('script');
      const exposureScript = appendExposure(expose, exposeAs);

      script.innerHTML = `
  var module = {
    exports: {}
  };

  var require = {};

  ${response}
  ${exposureScript}`;

      document.body.appendChild(script);
      window.ipsumSalt.loadedScripts.push(url);
    }
  );

  if (onLoad) {
    promise = promise.then(onLoad);
  }

  return promise;

};

/**
 * Collection of loaded module script URLs used to track whether a script has
 * already been loaded and so need not be loaded again.
 *
 * @type {Array}
 */
ipsumSalt.loadedScripts = [];

/**
 * Expose the {@link ipsumSalt} loader on the `window` object.
 * @type {Function}
 */
window.ipsumSalt = ipsumSalt;

export default ipsumSalt;
