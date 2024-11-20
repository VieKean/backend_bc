import express from 'express';
import 'dotenv/config';
import configViewEngine from './config/viewEngine';
import initWebRoute from './routes/web';
import bodyParser from 'body-parser';
import connectDB from './config/connectDB';
import session from 'express-session'
import RedisStore from "connect-redis"
import { createClient } from "redis"
import initAPIRoute from './routes/api';
import cors from 'cors';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

// Cấu hình thư mục chứa ảnh
app.use('/uploads', express.static(path.join(__dirname, 'src', 'public', 'uploads')));
app.use('/images', express.static(path.join(__dirname, 'src', 'public', 'images')));




// Initialize client.
let redisClient = createClient()
redisClient.connect().catch(console.error)

// Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
})

// Cấu hình CORS
app.use(cors({
  origin: 'http://localhost:3000', // Cho phép React frontend truy cập
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Các phương thức được phép
  credentials: true, // Nếu cần gửi cookie hoặc thông tin đăng nhập
}));

app.use(session({
  store: redisStore,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//test connection
connectDB();


initWebRoute(app);
initAPIRoute(app);
configViewEngine(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
