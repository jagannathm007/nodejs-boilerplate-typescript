import { connectDB } from './utils/database.util';
import express, { Application } from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { appRoutes } from './routes/zindex';
import { serverUtil } from './utils/server.util';

//CONFIGURE .env AND CONNECT WITH MONGODB**
dotenv.config();
connectDB();

const app: Application = express();

//APPLICATION ROUTES**
appRoutes.forEach((route) => app.use(route.PATH, route.FILE));

//START SERVER**
const server: http.Server = http.createServer(app);
const port = Number(process.env.PORT) || 3000;
server.listen(port);
server.on('error', (err) => serverUtil.onError(err, port));
server.on('listening', () => serverUtil.onListening(server));
