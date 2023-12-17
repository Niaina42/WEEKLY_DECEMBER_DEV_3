const jwt = require("jsonwebtoken");
const SECRET = "mykeyYaa";
const fs = require("fs");
const path = require("path");
const zlib = require('zlib');
const formidable = require("formidable");

module.exports = {
  generateToken: function (id, email) {
    const token = jwt.sign(
      {
        id: id,
        email: email,
      },
      SECRET,
      {
        expiresIn: "365d",
      }
    );
    return token;
  },
  uploadFile: function (file) {
    return new Promise((resolve, reject) => {
      const tempPath = file.filepath;
      const originalName = file.originalFilename.replace(/ /g, "_").split(".");
      const newName =
        originalName[0] + "_" + new Date().getTime() + "." + originalName[1] + '.gz'; 
  
      const parentDirectory = path.join(__dirname, "../../");
      const targetPath = path.join(parentDirectory, "public", newName);
  
      const readStream = fs.createReadStream(tempPath);

      const gzipStream = zlib.createGzip();

      const writeStream = fs.createWriteStream(targetPath);
  
      readStream
        .pipe(gzipStream) 
        .pipe(writeStream) 
        .on('error', (err) => {
          reject(err);
        })
        .on('finish', () => {
          resolve(`/public/${newName}`);
        });
  
      writeStream.on('finish', () => {
        fs.unlink(tempPath, err => {
          if (err) {
            console.error("Error removing temporary file:", err);
          }
        });
      });
    });
  },
  deleteFile: function (targPath) {
    if (targPath) {
      const parentDirectory = path.join(__dirname, "../../");
      const targetPath = path.join(parentDirectory, targPath);
      try {
        fs.unlink(targetPath, (err) => {
          if (err) throw err;
          else {
            return true;
          }
        });
      } catch (err) {
        throw err;
      }
    } else {
      throw "Aucun chemin";
    }
  },
  getContentType: function (ext) {
    switch (ext) {
      case ".html":
        return "text/html";
      case ".css":
        return "text/css";
      case ".js":
        return "text/javascript";
      case ".png":
        return "image/png";
      case ".jpg":
      case ".jpeg":
        return "image/jpeg";
      case ".gif":
        return "image/gif";
      default:
        return "application/octet-stream";
    }
  },
  sendRes: function (res, status = 200, data, content = "application/json") {
    res.writeHead(status, { "Content-Type": content });
    res.end(JSON.stringify(data));
  },

  getBody: function (req) {
    return new Promise((resolve, reject) => {
      const form = new formidable.IncomingForm();

      form.parse(req, async (err, fields, files) => {
        if (err) {
          reject(new Error("Error parsing form data"));
        }

        let newField = {
          fields: Object.keys(fields).reduce((acc, key) => {
            acc[key] = fields[key][0];
            return acc;
          }, {}),
        }

        resolve({ fields: newField.fields, files });
      });
    });
  },
};
