const blobber = (data, type) => {
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

const createConstructedWorker = (imports, srcs, onMessage) => {
  const source = [
    `this.importScripts('${imports.join('\',\'')}');`,
    srcs.map(src => src.toString()).join(`
    `),
    `this.onmessage = ${onMessage.toString()};`
  ].join(`
  `);

  const blob = blobber(source, { type: 'application/javascript' });
  const worker = new Worker(URL.createObjectURL(blob));

  return worker;
};

export default createConstructedWorker;
