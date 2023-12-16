const jwt = require("jsonwebtoken");
const SECRET = "mykeyYaa";
const fs = require("fs");
const path = require('path');

module.exports = {
    generateToken: function (id, email) {
        const token = jwt.sign(
            {
                id: id,
                email: email,
            },
            SECRET,
            { 
                expiresIn: "365d" 
            }
        );
        return token;
    },

    uploadFile: function (file) {
        return new Promise((resolve, reject) => {
            // The file will have a temporary path where the form data has stored it
            const tempPath = file.filepath;
            const originalName = file.originalFilename.replace(" ", "_").split(".")
            const newName = originalName[0] +"_"+ new Date().getTime() + "." + originalName[1]

            const parentDirectory = path.join(__dirname, '../../');
            const targetPath =  path.join(parentDirectory, 'public', newName);

            // // Use fs.rename to move the file to the target directory
            fs.rename(tempPath, targetPath, err => {
                if (err) {
                    reject(err);
                }
                resolve(`/public/${newName}`)
            });
        })
      },
    
      deleteFile: function (path) {
        if (path) {
          try {
            fs.unlink(path, (err => {
                if (err) throw err;
                else {
                    return true;
                }
              }));            
          } catch (err) {
            throw err;
          }
        } else {
          throw "Aucun chemin";
        }
      },
}
