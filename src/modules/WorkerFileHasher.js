/* globals hash, arrayBufferToWordArray, CryptoJS */
import FileHasherWorker from './FileHasherWorker';

class WorkerFileHasher {
  constructor ({ files, algorithm = 'SHA1', chunkSize = 1000000 /* 1mb */ }) {
    this.files = files;
    this.algorithm = algorithm;
    this.chunkSize = chunkSize;
    this.workers = {};
    this.fileWorkers = Array.prototype.map.call(this.files, file => {
      const fileWorker = this.createWorker(file);

      return fileWorker;
    });
  }

  createWorker (file) {
    const fileWorker = new FileHasherWorker({
      file,
      hasher: this
    });

    return fileWorker;
  }
}
WorkerFileHasher.prototype.createOnWorkerMessage = fileWorker => {
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
WorkerFileHasher.prototype.workerOnMessage = function workerOnMessage (event) {
  const { type, data } = event.data;

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
WorkerFileHasher.prototype.scripts = [
  '//cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/core.min.js',
  '//cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/x64-core.min.js',
  '//cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/lib-typedarrays.min.js',
  '//cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/sha1.min.js'
].map(script => `${window.location.protocol}${script}`);
WorkerFileHasher.prototype.hash = function hash () {
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
WorkerFileHasher.prototype.arrayBufferToWordArray = function arrayBufferToWordArray (
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

export default WorkerFileHasher;
