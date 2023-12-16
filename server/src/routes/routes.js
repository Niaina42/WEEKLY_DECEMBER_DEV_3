
const userRouter = require('./users');
const folderRouter = require('./folders');
const fileRoute = require('./files');

const routes = {
    ...userRouter,
    ...folderRouter,
    ...fileRoute
}

module.exports = routes