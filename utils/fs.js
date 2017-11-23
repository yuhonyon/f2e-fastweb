const fs = require('fs');
exports.readFile = function(fileName) {
  return new Promise(function (resolve, reject){
    fs.readFile(fileName, function(error, data) {
      if (error){
        reject(error);
        return;
      }
      resolve(data.toString());
    });
  });
};


exports.writeFile = function(fileName,data) {
  return new Promise(function (resolve, reject){
    fs.writeFile(fileName,data, function(error) {
      if (error){
        reject(error);
        return;
      }
      resolve(true);
    });
  });
};

exports.deleteFile = function(fileName) {
  return new Promise(function (resolve, reject){
    fs.unlink(fileName, function(error) {
      if (error){
        reject(error);
        return;
      }
      resolve(true);
    });
  });
};

exports.readdir = function(path) {
  return new Promise(function (resolve, reject){
    fs.readdir(path, function(error,data) {
      if (error){
        reject(error);
        return;
      }
      resolve(data);
    });
  });
};

exports.hasFile = function(fileName) {
  return fs.existsSync(fileName);
};
