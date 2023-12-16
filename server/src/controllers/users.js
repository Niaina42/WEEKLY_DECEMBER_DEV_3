const bcrypt = require("bcrypt");
const model = require("../models/users");
const { generateToken, sendRes } = require('../service/service')
const saltRounds = 10;
 
module.exports = {
    getAll: async (req, res) => {
        try {
            let data = await model.getAll()
            if(data) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(data));
            }
            else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end([])
            }
        }
        catch (error) {
            console.log(error)
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({message: "Error"}))
        }
    },
    getOne: async (req, res) => {
        let id = parseInt(req.params.id)

        try { 
            let data = await model.getOne(id)
            if(data)
                res.status(200).send(data)
            else
                res.status(200).send({})
        }
        catch (error) {
            console.log(error)
            res.status(500).send(error.message)
        }
    },
    getByEmail:  async (req, res) => {
        let { email } = req.params

        try { 
            let data = await model.getByEmail(email)
            if(data)
                res.status(200).send(data)
            else
                res.status(200).send({})
        }
        catch (error) {
            console.log(error)
            res.status(500).send(error.message)
        }
    },
    search:  async (req, res) => {
        let { query, id } = req.body

        try { 
            let data = await model.search(String(query), parseInt(id))
            if(data)
                res.status(200).send(data)
            else
                res.status(200).send([])
        }
        catch (error) {
            console.log(error)
            res.status(500).send(error.message)
        }
    },
    getLogin: async (body, res) => {
        let { email, password } = body.fields

        try {
            let user = await model.getByEmail(email)
            if(!user) {
                sendRes(res, 500, { message: "This user doesn't exist" })
            }
            else {
                bcrypt.compare(password, user.password, function(err, verified){
                    if (err) return sendRes(res, 403, { message: "Incorrect Password" });
                    if (verified) {
                        const token = generateToken(user.id , user.email);
                        sendRes(res, 200, {
                            user,
                            token
                        });
                    }
                    else {
                        sendRes(res, 403, { message:  "Incorrect Password"})
                    }
                })
            }
        }
        catch (error) {
            console.log(error)
            sendRes(res, 500, error)
        }
    },
    register: async (body, res) => {
        let { name, last_name, email, password } = body.fields
        try {
            let find = await model.getByEmail(email)
            if(find) {
                sendRes(res, 500, { message: "This email is already in use" })
            }
            else {
                let saltRounds = 10
                bcrypt.hash(password, saltRounds, async (err ,hash) => {
                    if(err){
                        sendRes(res, 403, { message: "Registration failed" })
                    }
                    else {
                        let user = await model.create(name, last_name, email, hash)
                        if(user) {
                            let token = generateToken(user.id, user.email)
                            let response  = {
                                user,
                                token
                            }
                            sendRes(res, 200, response)
                        }
                        else sendRes(res, 500, { message: "Registration failed" })
                    }
                })
            }
        }
        catch (error) {
            console.log(error)
            sendRes(res, 500, error)
        }
    },
    update: async (req, res) => {
        let { name, last_name, email } = req.body
        let id = parseInt(req.body.id)
        try { 

            let data = await model.update(name, last_name, email, id)
            res.status(200).send(data)
        }
        catch (error) {
            console.log(error)
            res.status(500).send(error.message)
        }
    },
    delete: async (req, res) => {
        let id = parseInt(req.params.id)

        try { 
            let data = await model.delete(id)
            res.status(200).send(data)
        }
        catch (error) {
            console.log(error)
            res.status(500).send(error.message)
        }
    },
};
