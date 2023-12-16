const controller = require('../controllers/users');
const { sendRes, getBody } = require('../service/service');

const userRouter = {
    '/users': (req, res) => {
        controller.getAll(req, res)
    },
    '/users/add': async (req, res) => {
        if(req.method == "POST") {
            try {
                const body = await getBody(req)
                controller.register(body, res)
            } catch (error) {
                console.log(error)
                sendRes(res, 400, "Error parsing form data")
            }
        }
        else {
            sendRes(res, 400, {error: "Method not allowed"})
        }
    },
    '/users/login':  async (req, res) => {
        if(req.method == "POST") {
            try {
                const body = await getBody(req)
                controller.getLogin(body, res)
            } catch (error) {
                console.log(error)
                sendRes(res, 400, "Error parsing form data")
            }
        }
        else {
            sendRes(res, 400, {error: "Method not allowed"})
        }
    },
    // '/file/add': (req, res) => {
    //     // controller.register(req, res)
    //     const form = new formidable.IncomingForm();
    //     form.parse(req, async (err, fields, files) => {
    //         if (err) {
    //             reject(new Error("Error parsing form data"))
    //         }
    //         let file = null, response
    //         if (files.file) {
    //             try {
    //                 file = await uploadFile(files.file[0])
    //             } catch (error) {
    //                 console.log(error)
    //             }
    //         }
    //         if(file) 
    //             response = { name: fields.lastname, filePath: file }
    //         else
    //             response = { name: fields.lastname }

    //         resolve(response)
    //     });
    // }
}

// router.get("/:u_id", controller.getOne)
// router.get("/email/:u_email", controller.getByEmail)
// router.post("/register", controller.register)
// router.post("/login", controller.getLogin)
// router.post("/search", controller.search)
// router.put("/", controller.update)
// router.delete("/:u_id", controller.delete)

module.exports = userRouter;