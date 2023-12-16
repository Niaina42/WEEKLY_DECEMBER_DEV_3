const http = require('http');
const { uploadFile } = require('./service/service');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const routes = require('./routes/routes');

function getContentType(ext) {
    switch (ext) {
      case '.html':
        return 'text/html';
      case '.css':
        return 'text/css';
      case '.js':
        return 'text/javascript';
      case '.png':
        return 'image/png';
      case '.jpg':
      case '.jpeg':
        return 'image/jpeg';
      case '.gif':
        return 'image/gif';
      default:
        return 'application/octet-stream';
    }
}

const server = http.createServer(async (req, res) => {
    if (req.method.toLowerCase() === 'get' && req.url.split("/").includes("public")) {
        // Get the static file
        let fileName = req.url.replace("/public/","")
        fileName = decodeURIComponent(fileName)

        const parentDirectory = path.join(__dirname, '../');
        const filePath =  path.join(parentDirectory, 'public', fileName);

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('404 Not Found');
            } else {
                const ext = path.extname(filePath);
                const contentType = getContentType(ext);
                console.log(ext)
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            }
        });

    } 
    else if(req.url in routes) {
        return routes[req.url](req, res)
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Resource not found' }));
    }
});

const port = 9090;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
