const controller = require('../controllers/files');
const { sendRes, getBody } = require('../service/service');

const fileRouter = {
    '/files':  async (req, res) => {
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
    '/files/folder':  async (req, res) => {
        if(req.method == "GET") {
            try {
                const body = await getBody(req)
                controller.getByFolder(body, res)
            } catch (error) {
                console.log(error)
                sendRes(res, 500, {message: "Internal server error"})
            }
        }
        else {
            sendRes(res, 400, {error: "Method not allowed"})
        }
    },
    '/files/add': async (req, res) => {
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

module.exports = fileRouter;