/*
these globals are created in the worker processes, so it is necessary to mark
them as being predefined for linting purposes
*/
/* globals hash, arrayBufferToWordArray, CryptoJS */
import HasherWorker from './HasherWorker';

/**
 * WorkerHasher is the class of objects that coordinates hashing of
 * files using [WebWorker]{@link
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API}
 * processes.
 *
 * Each worker is an instance of {@link HasherWorker}
 */
class WorkerHasher {
  /**
   * Instantiates a {@link WorkerHasher}, creates a collection for {@link
   * HasherWorker} instances and calls {@link #createWorker} to create a
   * {@link HasherWorker} for each file in {@link files}
   *
   * @param {Array} [strings]               A collection of strings to be hashed
   * @param {FileList} [files]              A collection of files to be hashed
   * @param {String} [algorithm='SHA1']     The CryptoJS algorithm to use for
   *                                        hashing, defaults to 'SHA1'.
   * @param {Integer} [chunkSize=1000000]   The size of each file chunk to be
   *                                        sent to the worker process for
   *                                        hashing, defaults to 1,000,00 (1mb).
   */
  constructor ({
    strings = undefined,
    files = undefined,
    algorithm = 'SHA1',
    chunkSize = 1000000 /* 1mb */
  }) {
    this.strings = strings || [];
    this.files = files || [];
    this.algorithm = algorithm;
    this.chunkSize = chunkSize;
    this.workers =
      this.strings.concat(
        Array.prototype.map.call(
          this.files,
          file => file
        )
      ).map(
        (fileOrString) => this.createWorker(fileOrString)
      );
  }

  /**
   * Create a new {@link HasherWorker} for the given file or string.
   * @param  {Any} fileOrString  A file or string to be hashed.
   * @return {HasherWorker}
   */
  createWorker (fileOrString) {
    return new HasherWorker({
      fileOrString,
      hasher: this
    });
  }
}

/**
 * To be used by {@link HasherWorker}:
 *
 * Bind a function to be used by {@link HasherWorker} when it receives
 * messages from the worker process.
 * @param  {HasherWorker} fileWorker  The {@link HasherWorker} to handle
 *                                        messages for.
 * @return {function}                     Function used to handle messages.
 */
WorkerHasher.prototype.createOnWorkerMessage = fileWorker => {
  return event => {
    switch (event.data.type) {
    case 'update':
      console.log(event.data.type);
      fileWorker.next();
      break;
    case 'finish':
      console.log(event.data.hashed);
      break;
    default:
      console.log('(echo) worker sent: ' + JSON.stringify(event.data));
      console.log(fileWorker);
      break;
    }
  };
};

/**
 * To be used by {@link HasherWorker}:
 *
 * Function provided to {@link HasherWorker}'s internal WebWorkers to handle
 * messages from the {@link HasherWorker} object.
 *
 * Upon `create` message, creates a new `CryptoJS` algorithm of the type
 * specified when the {@link HasherWorker} was instantiated.  Sends an
 * acknowledgement message back to the caller.
 *
 * Upon `update` message, uses the algorithm's update method to update the hash
 * using the data in the message.  Sends an acknowledgement message back to the
 * caller.
 *
 * Upon 'finish' message, returns the hash generated from the file as a String.
 *
 * @param  {Event} event [WebWorker MessageEvent]{@link
 *  https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent}
 */
WorkerHasher.prototype.workerOnMessage = function workerOnMessage (event) {
  const { type, data, string } = event.data;

  switch (type) {
  case 'create':
    console.log('worker got create', JSON.stringify(event.data));
    this.algo = hash().createAlgo(this.algorithm);
    postMessage({ type });
    break;
  case 'update':
    console.log('worker got update', JSON.stringify(event.data));
    hash().updateAlgo(this.algo, arrayBufferToWordArray(data));
    postMessage({ type });
    break;
  case 'hash':
    console.log('worker got hash', JSON.stringify(event.data));
    hash().updateAlgo(this.algo, string);
    this.onmessage({
      data: {
        type: 'finish'
      }
    });
    break;
  case 'finish':
    console.log('worker got finish', JSON.stringify(event.data));
    postMessage({
      type,
      hashed: hash()
        .finalizeAlgo(this.algo)
        .toString() });
    break;
  default:
    console.log('(echo) worker got: ' + JSON.stringify(event.data));
    postMessage(event.data);
    break;
  }
};

// WorkerHasher.prototype.scripts = [
// '//cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/core.min.js',
// '//cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/x64-core.min.js',
// '//cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/lib-typedarrays.min.js',
// '//cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/sha1.min.js'
// ].map(script => `${window.location.protocol}${script}`);

/**
 * To be used by {@link HasherWorker}:
 *
 * Script URLs provided to the WebWorker to import, in this case, CryptoJS
 * scripts for the core library, WordArray, and SHA1.
 * @type {Array}
 */
WorkerHasher.prototype.scripts = [
  'scripts/vendor/crypto-js/core.js',
  'scripts/vendor/crypto-js/x64-core.js',
  'scripts/vendor/crypto-js/lib-typedarrays.js',
  'scripts/vendor/crypto-js/sha1.js'
]
  .map(
    script => `${window.location.toString()}${script}`
  );

/**
 * To be used by {@link HasherWorker}:
 *
 * Function which creates an object to implement create, update, and finalize
 * methods for a particular CryptoJS algorithm.
 * @return {Object} Object containing methods for using a CryptoJS algorithm.
 */
WorkerHasher.prototype.hash = function hash () {
  return {
    createAlgo: algorithm => {
      return CryptoJS.algo[algorithm].create();
    },
    finalizeAlgo: algo => {
      return algo.finalize();
    },
    updateAlgo: (algo, data) => {
      return algo.update(data);
    }
  };
};

/**
 * To be used by {@link HasherWorker}:
 *
 * Function which converts an ArrayBuffer to a CryptoJS WordArray.
 * @param  {ArrayBuffer} buffer Binary buffer read from a file.
 * @return {WordArray}          CryptoJS WordArray which can be hashed.
 */
WorkerHasher.prototype.arrayBufferToWordArray =
  function arrayBufferToWordArray (
    buffer
  ) {
    const int8array = new Uint8Array(buffer);
    const array = [];

    for (let i = 0; i < int8array.length; i += 4) {
      array.push(
        (int8array[i] << 24) |
          (int8array[i + 1] << 16) |
          (int8array[i + 2] << 8) |
          int8array[i + 3]
      );
    }
    return CryptoJS.lib.WordArray.create(array, int8array.length);
  };

export default WorkerHasher;
