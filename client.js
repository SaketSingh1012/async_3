const fetch = require("node-fetch");

async function fetchFilesInDirectory(data) {
  const files = [];
  for (const directory of data.items) {
    if (directory.isDir) {
      const directoryData = await fetch(`http://localhost:3000/${directory.name}`);
      const file = await directoryData.json();
        files.push(file);
    }
  }
  return files;
}

async function main() {
  const rootDirectory = await fetch("http://localhost:3000/");
  if (rootDirectory.ok) {
    const data = await rootDirectory.json();
    console.log(data);
    const fileNames = await fetchFilesInDirectory(data);
    console.log("Files in the root directory:");
    console.log(fileNames);
  }
}

main();
