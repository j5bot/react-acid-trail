import createConstructedWorker from "./ConstructedWorker";

class FileHasherWorker {
  readerOnload(event) {
    const data = event.target.result;

    this.worker.postMessage({
      type: "update",
      data
    });
  }

  send(data) {
    this.worker.postMessage(data);
  }

  read() {
    const { hasher, chunk, file, reader } = this;
    const chunkStart = chunk * hasher.chunkSize;
    const chunkEnd = Math.min(chunkStart + hasher.chunkSize, file.size);
    const blob = file.slice(chunkStart, chunkEnd);

    reader.readAsArrayBuffer(blob);
  }

  next() {
    const { chunk, chunks } = this;

    if (chunk >= chunks) {
      this.send({ type: "finish" });
      return;
    }
    this.chunk++;
    this.read();
  }

  hash() {
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      this.send({ type: "create" });
    });
  }

  onWorkerMessage(event) {
    switch (event.data.type) {
      case "create":
        console.log(event.data.type);
        this.read();
        break;
      case "update":
        console.log(event.data.type);
        this.next();
        break;
      case "finish":
        console.log(event.data.type, event.data.hashed);
        this.resolve({
          file: this.file,
          hashed: event.data.hashed
        });
        break;
      default:
        console.log("(echo) worker sent: " + JSON.stringify(event.data));
        console.log(this);
        break;
    }
  }

  constructor({ file, hasher }) {
    this.hasher = hasher;
    this.worker = createConstructedWorker(
      hasher.scripts,
      [
        `this.algorithm = '${hasher.algorithm}'`,
        hasher.hash,
        hasher.arrayBufferToWordArray
      ],
      hasher.workerOnMessage
    );
    this.worker.onmessage = this.onWorkerMessage.bind(this);
    this.file = file;
    this.chunk = 0;
    this.chunks = Math.ceil(file.size / hasher.chunkSize);
    this.reader = new FileReader();
    this.reader.onload = this.readerOnload.bind(this);
  }
}

export default FileHasherWorker;
