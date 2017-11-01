import { DocumentClient } from 'documentdb';
import * as express from 'express';
import * as fs from 'fs';
import * as http from 'http';
import * as path from 'path';
import * as sockets from 'socket.io';

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

const clientPath = path.resolve(__dirname, '../../client/');
const PORT = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.resolve(clientPath, './index.html'));
});

app.use(function (req, res, next) {
  if (path.extname(req.path).length > 0) {
      next();
  } else {
      req.url = '/index.html';
      next();
  }
});

app.use(express.static(path.resolve(clientPath, './')));

const server = app
  .listen(PORT, () => {
    console.log(
      `
      -=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-
      | Server is up at http://localhost:${PORT} |
      -=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-
      `
    );
  });

const io = sockets(server);

io.on('connection', function(socket){
  console.log('SERVER CONNECTED');
});

export default app;
