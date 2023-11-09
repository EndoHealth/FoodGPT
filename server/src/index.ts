import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import { ChatStreamService } from '@/chat/chat.stream.service';
import { ChatStaticService } from '@/chat/chat.static.service';
import { VisionService } from '@/vision/vision.service';
import { MailService } from '@/mail/mail.service';
import path from 'path';
import { fileURLToPath } from 'url';


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

app.post('/mail', async function (req, res) {
	const { email, body } = req.body;
	console.log(email);
	const mailService = new MailService();
	await mailService.sendEmail(email, `Today's Meal Nutrition Breakdown and Insights`, body);
	res.send('success');
});

server.listen(port, () => {
	console.log(`Express API server listening on port ${port}`);
});
