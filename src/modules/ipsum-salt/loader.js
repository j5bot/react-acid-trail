const fetchScript = (url) => {
  return fetch(url).then(
    (response) => response.text()
  );
};

const appendExposure = (expose, exposeAs) => {
  return `window['${exposeAs}'] = ${expose};`;
};

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
ipsumSalt.loadedScripts = [];

window.ipsumSalt = ipsumSalt;

export default ipsumSalt;
