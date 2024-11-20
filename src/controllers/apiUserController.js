import userService from "../services/userService";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const handleLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userService.checkLoginCustomer(username, password);
        if (user) {
            // Tạo token JWT
            const token = jwt.sign(
                { id: user.id, username: user.username },
                process.env.JWT_SECRET, // Khóa bí mật
                { expiresIn: '1h' }     // Thời gian hết hạn token
            );

            // Trả về token và thông tin user
            return res.status(200).json({ token, user });
        } else {
            return res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// const handleRegister = async (req, res) => {
//     const { username, password, fullname, address, phonenumber, email, role } = req.body;
//     const user = await userService.createNewCustomer(username, password, fullname, address, phonenumber, email, role);
//     return res.status(200).json(user);
// }

const handleRegister = async (req, res) => {
    const { username, password, fullname, address, phonenumber, email, role } = req.body;
    const user = await userService.createNewCustomer(username, password, fullname, address, phonenumber, email, role);

    return res.status(200).json(
        {
            err: user.err,
            message: user.message,
            data: user
        }
    );
}

const handleLogout = async (req, res) => {
    req.session.destroy();
    return res.status(200).json({ message: "Logout successful" });
}

const handleLoginApi = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userService.checkLoginCustomer(username, password);
        if (user) {
            // Tạo token JWT
            const token = jwt.sign(
                { id: user.id, username: user.username },
                process.env.JWT_SECRET, // Khóa bí mật
                { expiresIn: '1h' }     // Thời gian hết hạn token
            );

            // Trả về token và thông tin user
            return res.status(200).json({ token, user });
        } else {
            return res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default { handleLogin, handleRegister, handleLogout, handleLoginApi };