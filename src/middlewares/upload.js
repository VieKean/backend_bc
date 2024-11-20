import multer, { diskStorage } from 'multer';
import { extname } from 'path';

// Cấu hình nơi lưu ảnh và cách đặt tên file
const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/uploads/'); // Đường dẫn thư mục lưu file
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + extname(file.originalname)); // Tên file: thời gian hiện tại + phần mở rộng
    }
});

// Cấu hình bộ lọc file
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/; // Các loại file được chấp nhận
    const isValidExt = allowedTypes.test(extname(file.originalname).toLowerCase());
    const isValidMime = allowedTypes.test(file.mimetype);

    if (isValidExt && isValidMime) {
        cb(null, true);
    } else {
        cb('Error: Only image files are allowed!');
    }
};

// Tạo instance của multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } // Giới hạn dung lượng 2MB
});

export default upload;
