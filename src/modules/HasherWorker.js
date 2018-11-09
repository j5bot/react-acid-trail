import ConstructedWorker from './ConstructedWorker';

/**
 * Coordinates between the main process and a
 * [Worker]{@link https://developer.mozilla.org/en-US/docs/Web/API/Worker}
 * process in order to hash a file using a CryptoJS algorithm.
 */
class HasherWorker {

  /**
   * When the FileReader finishes reading a chunk of the file,
   * send the data to the
   * [Worker]{@link https://developer.mozilla.org/en-US/docs/Web/API/Worker}
   * to be hashed.
   *
   * @param  {event} event  Event emitted by the FileReader when a read
   *                        operation has been completed.
   */
  readerOnload (event) {
    const data = event.target.result;

    this.worker.postMessage({
      type: 'update',
      data
    });
  }

  /**
   * Send a message to the
   * [Worker]{@link https://developer.mozilla.org/en-US/docs/Web/API/Worker}
   * process.
   * @param  {Object} data Message to send to the [Worker]{@link https://developer.mozilla.org/en-US/docs/Web/API/Worker} process.
   */
  send (data) {
    this.worker.postMessage(data);
  }

  /**
   * Use the FileReader to read a chunk of the file.
   */
  read () {
    const { hasher, chunk, file, reader } = this;
    const chunkStart = chunk * hasher.chunkSize;
    const chunkEnd = Math.min(chunkStart + hasher.chunkSize, file.size);
    const blob = file.slice(chunkStart, chunkEnd);

    reader.readAsArrayBuffer(blob);
  }

  hashString () {
    this.send({
      type:   'hash',
      string: this.string
    });
  }

  /**
   * If there are more chunks to be read, initiate reading of the next chunk of
   * of the file.  Otherwise, send a message to the worker process that all data
   * has been hashed.
   */
  next () {
    const { chunk, chunks } = this;

    if (chunk >= chunks) {
      this.send({ type: 'finish' });
      return;
    }
    this.chunk++;
    this.read();
  }

  /**
   * Begin the process of hashing the file by sending a create message to the
   * [Worker]{@link https://developer.mozilla.org/en-US/docs/Web/API/Worker} process.
   *
   * @return {Promise}  A [Promise]{@link
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise}
   *                    which will resolve when hashing has been
   *                    completed.
   */
  hash () {
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      this.send({ type: 'create' });
    });
  }

  /**
   * Handle messages sent by the
   * [Worker]{@link https://developer.mozilla.org/en-US/docs/Web/API/Worker}
   * process.
   *
   * When a `create` message is received, execute `read` to begin reading the
   * file.
   *
   * When an `update` message is received, execute `next` to initiate reading
   * the remaining portions of the file.
   *
   * When a `finish` message is received, resolve the
   * [Promise]{@link
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise}
   * returned by the call to `hash`, including the file hash generated.
   *
   * @param  {MessageEvent} event Message sent by the
   * [Worker]{@link https://developer.mozilla.org/en-US/docs/Web/API/Worker}
   *                              process
   */
  onWorkerMessage (event) {
    switch (event.data.type) {
    case 'create':
      console.log(event.data.type);
      this.file ? this.read() : this.hashString();
      break;
    case 'update':
      console.log(event.data.type);
      this.next();
      break;
    case 'hash':
    case 'finish':
      console.log(event.data.type, event.data.hashed);
      this.resolve({
        string: this.string,
        file:   this.file,
        hashed: event.data.hashed
      });
      break;
    default:
      console.log('(echo) worker sent: ' + JSON.stringify(event.data));
      console.log(this);
      break;
    }
  }

  /**
   * Create a new {@link HasherWorker} object.
   *
   * Initialize the object with:
   *  - hasher -- a reference to the parent {@link WorkerHasher}
   *  - worker -- a
   *  [Worker]{@link https://developer.mozilla.org/en-US/docs/Web/API/Worker}
   * process created using {@link ConstructedWorker#createConstructedWorker}
   *  - string -- the String to be hashed
   *  OR
   *  - file -- the
   *  [File]{@link https://developer.mozilla.org/en-US/docs/Web/API/File}
   *  or string to be hashed
   *  - chunk -- the index of the current chunk
   *  - chunks -- the number of chunks in the file
   *  - reader -- a
   *  [FileReader]{@link https://developer.mozilla.org/en-US/docs/Web/API/FileReader}
   *  object used to read the file
   *
   * @param {File||String} fileOrString The
   * [File]{@link https://developer.mozilla.org/en-US/docs/Web/API/File}
   *                                    or String
   *                                    to be hashed by the
   * [Worker]{@link https://developer.mozilla.org/en-US/docs/Web/API/Worker}
   *                                    process
   * @param {WorkerHasher} hasher The parent {@link WorkerHasher}
   */
  constructor ({ fileOrString, hasher }) {
    this.hasher = hasher;
    this.worker = ConstructedWorker.createConstructedWorker(
      hasher.scripts,
      [
        `this.algorithm = '${hasher.algorithm}'`,
        `this.hash = ${hasher.hash}`,
        hasher.arrayBufferToWordArray
      ],
      hasher.workerOnMessage
    );
    this.worker.onmessage = this.onWorkerMessage.bind(this);

    if (typeof fileOrString === 'string') {
      this.string = fileOrString;
      return;
    }
    this.file = fileOrString;
    this.chunk = 0;
    this.chunks = Math.ceil(this.file.size / hasher.chunkSize);
    this.reader = new FileReader();
    this.reader.onload = this.readerOnload.bind(this);
  }
}

export default HasherWorker;
