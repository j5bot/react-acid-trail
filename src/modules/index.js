import WorkerFileHasher from './WorkerFileHasher';

const handleFileChange = event => {
  const fileHasher = new WorkerFileHasher({
    files: event.target.files
  });
};

const handleFileDrag = event => {
  event.preventDefault();
};

const handleFileDrop = event => {
  event.preventDefault();

  const items = event.dataTransfer.items;
  const files =
    (items &&
      Array.prototype.map.call(
        items,
        item => item.kind === "file" && item.getAsFile()
      )) ||
    event.dataTransfer.files;

  if (!files) {
    return;
  }

  const fileHasher = new WorkerFileHasher({
    files
  });
};

document
  .getElementById("file")
  .addEventListener("change", handleFileChange, false);

const dropZone = document.getElementById("drop_zone");

dropZone.addEventListener("drop", handleFileDrop, false);
dropZone.addEventListener("dragover", handleFileDrag, false);
