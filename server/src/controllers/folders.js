const bcrypt = require("bcrypt");
const model = require("../models/folders.js");
const { generateToken, sendRes } = require('../service/service')
const saltRounds = 10;
 
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
    getOne: async (body, res) => {
        let { folder_id } = body.fields
        try {
            let data = await model.getOne(folder_id)
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
        let { name, uid } = body.fields
        try {
            let data = await model.create(name, uid)
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
    getByUser:  async (body, res) => {
        let { uid } = body.fields
        try {
            let data = await model.getByUser(uid)
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
