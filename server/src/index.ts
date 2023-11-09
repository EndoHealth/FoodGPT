import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import { ChatStreamService } from '@/chat/chat.stream.service';
import { ChatStaticService } from '@/chat/chat.static.service';
import { VisionService } from '@/vision/vision.service';
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, path.join(__dirname, '../temp')); // 파일이 저장될 경로
	},
	filename: (req, file, cb) => {
	  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
	  cb(null, uniqueSuffix + path.extname(file.originalname)); // 파일 이름 설정
	}
  });
  
  const upload = multer({ storage: storage });
  

app.post('/food', upload.single('image'), function (req, res) {
	console.log('DEBUG: food');
	if (req.file) {
		res.json({
		  success: true,
		  message: 'File uploaded successfully!',
		  fileInfo: req.file
		});
	  } else {
		res.status(400).json({ success: false, message: 'No file uploaded.' });
	  }
});

server.listen(port, () => {
	console.log(`Express API server listening on port ${port}`);
});
