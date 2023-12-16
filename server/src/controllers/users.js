const bcrypt = require("bcrypt");
const model = require("../models/users");
const { generateToken } = require('../service/service')
const saltRounds = 10;
 
module.exports = {
    getAll: async (req, res) => {
        try {
            let data = await model.getAll()
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
    getOne: async (req, res) => {
        let u_id = parseInt(req.params.u_id)

        try { 
            let data = await model.getOne(u_id)
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
        let { u_email } = req.params

        try { 
            let data = await model.getByEmail(u_email)
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
        let { query, u_id } = req.body

        try { 
            let data = await model.search(String(query), parseInt(u_id))
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
    getLogin: async (req, res) => {
        let { u_email, u_password } = req.body

        try {
            let user = await model.getByEmail(u_email)
            if(!user) {
                res.status(500).send("This user doesn't exist")
            }
            else {
                bcrypt.compare(u_password, user.u_password, function(err, verified){
                    if (err) return res.status(403).send("Incorrect Password");
                    if (verified) {
                        const token = generateToken(user.u_id , user.u_email);
                        res.send({
                            user,
                            token
                        });
                    }
                    else {
                        res.status(403).send("Incorrect Password")
                    }
                })
            }
        }
        catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    register: async (req, res) => {
        let { u_name, u_last_name, u_email, u_password } = req.body

        try {
            let find = await model.getByEmail(u_email)
            if(find) {
                res.status(500).send("This email is already in use")
            }
            else {
                let saltRounds = 10
                bcrypt.hash(u_password, saltRounds, async (err ,hash) => {
                    if(err){
                        res.status(403).send("Registration failed")
                    }
                    else {
                        let user = await model.create(u_name, u_last_name, u_email, hash)
                        if(user) {
                            let token = generateToken(user.u_id, user.u_email)
                            let response  = {
                                user,
                                token
                            }
                            res.status(200).send(response)
                        }
                        else res.status(500).send("Registration failed")
                    }
                })
            }
        }
        catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    update: async (req, res) => {
        let { u_name, u_last_name, u_email } = req.body
        let u_id = parseInt(req.body.u_id)
        try { 

            let data = await model.update(u_name, u_last_name, u_email, u_id)
            res.status(200).send(data)
        }
        catch (error) {
            console.log(error)
            res.status(500).send(error.message)
        }
    },
    delete: async (req, res) => {
        let u_id = parseInt(req.params.u_id)

        try { 
            let data = await model.delete(u_id)
            res.status(200).send(data)
        }
        catch (error) {
            console.log(error)
            res.status(500).send(error.message)
        }
    },
};
