/**
 * Static class used to create
 * [Worker]{@link https://developer.mozilla.org/en-US/docs/Web/API/Worker}
 * processes constructed from dynamic source(s).
 * @class
 * @hideconstructor
 */
export class ConstructedWorker {}

/**
 * Create a [Blob]{@link https://developer.mozilla.org/en-US/docs/Web/API/Blob}
 * with which to initialize the constructed
 * [Worker]{@link https://developer.mozilla.org/en-US/docs/Web/API/Worker}.
 *
 * @param  {String} data The source string used to instantiate the
 * [Worker]{@link https://developer.mozilla.org/en-US/docs/Web/API/Worker}
 * @param  {Object} type An object providing the MIME type for the source string
 * @return {Blob}        a
 * [Blob]{@link https://developer.mozilla.org/en-US/docs/Web/API/Blob} usable to
 *                       create a new
 * [Worker]{@link https://developer.mozilla.org/en-US/docs/Web/API/Worker}.
 */
ConstructedWorker.blobber = (data, type) => {
  let blob =
    (Blob && new Blob([data], type));

  blob = blob || (
    (window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder)
      &&
      (blob = new (
        window.BlobBuilder ||
        window.WebKitBlobBuilder ||
        window.MozBlobBuilder)()) &&
      blob.append(data) &&
      blob.getBlob());

  return blob;
};

/**
 * Create a new
 * [Worker]{@link https://developer.mozilla.org/en-US/docs/Web/API/Worker}
 * constructed from the provided sources.
 *
 * @param  {Array} imports      An array of script URLs which will be imported
 *                              by the
 * [Worker]{@link https://developer.mozilla.org/en-US/docs/Web/API/Worker}
 * @param  {Array} srcs         Source, functions, etc. to be provided to the
 * [Worker]{@link https://developer.mozilla.org/en-US/docs/Web/API/Worker}.
 *                              Each item in the array will be provided using
 *                              it's `toString` method.
 * @param  {Function} onMessage Function which the worker will use to handle
 *                              incoming messages.
 * @return {Worker}
 * [Worker]{@link https://developer.mozilla.org/en-US/docs/Web/API/Worker}.
 */
ConstructedWorker.createConstructedWorker = (imports, srcs, onMessage) => {
  const source = [
    `this.importScripts('${imports.join('\',\'')}');`,
    srcs.map(src => src.toString()).join(`
    `),
    `this.onmessage = ${onMessage.toString()};`
  ].join(`
  `);

  const blob = ConstructedWorker.blobber(source, { type: 'application/javascript' });
  const worker = new Worker(URL.createObjectURL(blob));

  return worker;
};

export default ConstructedWorker;
