const controller = require('../controllers/folders');
const { sendRes, getBody } = require('../service/service');

const folderRouter = {
    '/folders':  async (req, res) => {
        if(req.method == "GET") {
            try {
                controller.getAll(req, res)
            } catch (error) {
                console.log(error)
                sendRes(res, 500, {message: "Internal server error"})
            }
        }
        else {
            sendRes(res, 400, {error: "Method not allowed"})
        }
    },
    '/folders/one':  async (req, res) => {
        if(req.method == "GET") {
            try {
                const body = await getBody(req)
                controller.getOne(body, res)
            } catch (error) {
                console.log(error)
                sendRes(res, 500, {message: "Internal server error"})
            }
        }
        else {
            sendRes(res, 400, {error: "Method not allowed"})
        }
    },
    '/folders/user':  async (req, res) => {
        if(req.method == "GET") {
            try {
                const body = await getBody(req)
                controller.getByUser(body, res)
            } catch (error) {
                console.log(error)
                sendRes(res, 500, {message: "Internal server error"})
            }
        }
        else {
            sendRes(res, 400, {error: "Method not allowed"})
        }
    },
    '/folders/add': async (req, res) => {
        if(req.method == "POST") {
            try {
                const body = await getBody(req)
                controller.create(body, res)
            } catch (error) {
                console.log(error)
                sendRes(res, 500, {message: "Internal server error"})
            }
        }
        else {
            sendRes(res, 400, {error: "Method not allowed"})
        }
    },
}

module.exports = folderRouter;