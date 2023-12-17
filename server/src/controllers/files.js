const model = require("../models/files.js");
const { sendRes, uploadFile, deleteFile } = require('../service/service')
 
module.exports = {
    getAll: async (req, res) => {
        try {
            let data = await model.getAll()
            if(data) {
                sendRes(res, 200, data);
            }
            else {
                sendRes(res, 200, []);
            }
        }
        catch (error) {
            console.log(error)
            sendRes(res, 500, {message: "Error"});
        }
    },
    create: async (body, res) => {
        let { folder_id } = body.fields
        try {
            let filePath 

            if (body.files.file) {
                filePath = await uploadFile(body.files.file[0])
                let name = body.files.file[0].originalFilename
                let data = await model.create(filePath,  name,  folder_id)
                if(data) 
                    sendRes(res, 200, data);
                else 
                    sendRes(res, 200, []);
            }
            else {
                sendRes(res, 400, {message: "Error"})
            }
        }
        catch (error) {
            console.log(error)
            sendRes(res, 500, error)
        }
    },
    delete: async (body, res) => {
        let { id, path } = body.fields
        try {
            
            await deleteFile(path)
            await model.delete(id)
            sendRes(res, 200, {message: "File deleted successfuly"});
        }
        catch (error) {
            console.log(error)
            sendRes(res, 500, error)
        }
    },
    getByFolder:  async (body, res) => {
        let { folder_id } = body.fields
        try {
            let data = await model.getByFolder(folder_id)
            if(data) {
                sendRes(res, 200, data);
            }
            else {
                sendRes(res, 200, []);
            }
        }
        catch (error) {
            console.log(error)
            sendRes(res, 500, {message: "Error"});
        }
    },
};
