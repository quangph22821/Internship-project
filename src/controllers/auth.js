import bcrypt from "bcryptjs";
import dotenv from "dotenv"
import User from "../models/user";
import jwt from "jsonwebtoken"
import { signinSchema, signupSchema } from "../schemas/auth"

dotenv.config();
export const getAllUser = async (req, res) => {
    try {
        const user = await User.find();
        if (user.length === 0) {
            return res.status(404).json({
                massage: "không có tài khoản nào"
            })
        }
        return res.json({
            message: "hiển thị thành công",
            user,
        })
    } catch (error) {
        return res.status(400).json({
            message: error.massage,
        });
    }
}
export const signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        const { error } = signupSchema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }

        // kiểm tra tồn tại email

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                message: "Email đã tồn tại",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        user.password = undefined;
        //tao token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: 60 * 60 });
        return res.status(201).json({
            message: "Đăng ký thành công",
            accessToken: token,
            user,
        });
    } catch (error) { }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { error } = signinSchema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Tài khoản không tồn tại",
            });
        }
        // nó vừa mã hóa và vừa so sánh
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Sai mật khẩu",
            });
        }

        user.password = undefined;
        // tạo token từ server
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: 60 * 60 });

        return res.status(201).json({
            message: "Đăng nhập thành công",
            accessToken: token,
            user,
        });
    } catch (error) { }
};