import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ChatStreamService } from '@/chat/chat.stream.service';
import { ChatStaticService } from '@/chat/chat.static.service';
import { VisionService } from '@/vision/vision.service';

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

dotenv.config();
const server = http.createServer(app);
const port = process.env.PORT || 8080;

app.get('/check', function (req, res) {
	console.log('DEBUG: check');
	res.send('alive');
});

app.post('/chat/stream', function (req, res) {
	ChatStreamService(req, res);
});

app.post('/chat/static', function (req, res) {
	ChatStaticService(req, res);
});

app.post('/vision', function (req, res) {
	VisionService(req, res);
});

server.listen(port, () => {
	console.log(`Express API server listening on port ${port}`);
});
