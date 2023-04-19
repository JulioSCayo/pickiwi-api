import http from 'http';
import { PORT } from './config/config.js';
import mongodbConnect from './config/database.js';
import app from './app.js';

const server = http.createServer(app);

mongodbConnect();

server.listen(PORT, ()=> {
    console.log("API running in port", PORT);
});