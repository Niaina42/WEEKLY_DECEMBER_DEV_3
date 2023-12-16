const model = require("../models/files.js");
const { sendRes, uploadFile } = require('../service/service')
 
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
            console.log(body)
            if (body.files.file) {
                filePath = await uploadFile(body.files.file[0])
            }

            let data = await model.create(filePath, folder_id)
            if(data) 
                sendRes(res, 200, data);
            else 
                sendRes(res, 200, []);
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
