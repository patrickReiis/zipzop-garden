const http = require('http');
const path = require('path');
const fs = require('fs');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
	
	// build filepath
	let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

	// extensions of file
	let extName = path.extname(filePath);

	// check ext and set content type
	switch (extName){
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.html':
			contentType = 'text/html';
			break;
		case '.json':
			contentType = 'application/json';
			break;
		case '.css':
			contentType = 'text/css';
			break;
		case '.jpg':
			contentType = 'image/jpeg';
			break;
		case '.svg':
			contentType = 'image/svg+xml';
			break;
		case '.png':
			contentType = 'image/png';
			break;
	}

	if (req.url === '/contact-us'){
		fs.readFile(path.join(__dirname, 'public', 'contact.html'), (err, content) =>{
			if (err) {
				res.writeHead(404)
				res.end('Not found')
			};
			res.writeHead(200, {'Content-Type':'text/html'});
			res.end(content)
		})
	}

	if (req.url === '/about-us'){
		fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) =>{
			if (err) {
				res.writeHead(404)
				res.end('Not found')
			};
			res.writeHead(200, {'Content-Type':'text/html'});
			res.end(content)
		})
	} else {
		fs.readFile(filePath, (err, content) => {
			if(err){
				if (err.code === 'ENOENT'){
					fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
						if (err) throw err;
						res.writeHead(200, {'Content-Type':'text/html'});
						res.end(content, 'utf8');})
				} else {
					res.writeHead(500);
					res.end(`Server error: ${err}`);
				}
			} else {
				res.writeHead(200, {'Content-Type':contentType});
				res.end(content)
			}
		})	
	}

	


})

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}`)
})