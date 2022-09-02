const fs = require("fs");
const baseurl = "C:/";
const ignoreDir = [".git", ".vscode", "node_modules"];

function addFile(url) {
  fs.readdir(url, { withFileTypes: true }, (err, files) => {
    err && console.log(err);
    //该目录下没有文件
    if (!files.length) {
      fs.openSync(url + "/view.js", "w");
      fs.openSync(url + "/view.html", "w");
    }

    files.forEach(dir => {
      if (!ignoreDir.includes(dir.name) && dir.isDirectory()) {
        addFile(url + "/" + dir.name);
      }
    });
  });
}

// addFile(baseurl);
