const express = require('express');
const controller = require('../controllers/users');

const router = express.Router();

router.get('/', controller.getAll);
router.get("/:u_id", controller.getOne)
router.get("/email/:u_email", controller.getByEmail)
router.post("/register", controller.register)
router.post("/login", controller.getLogin)
router.post("/search", controller.search)
router.put("/", controller.update)
router.delete("/:u_id", controller.delete)

module.exports = router;