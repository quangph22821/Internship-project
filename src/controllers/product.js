import dotenv from "dotenv";
import Product from "../models/product";
import Category from "../models/category";
import { productSchema } from "../schemas/product";
dotenv.config();
// validate


export const getAll = async (req, res) => {
    try {
        const product = await Product.find();
        if (product.length === 0) {
            return res.status(404).json({
                massage: "khong co san pham nao"
            })
        }
        return res.json({
            message: "hien thi thanh cong",
            products: product,
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
}


export const getId = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("categoryId");
        if (!product) {
            return res.status(404).json({
                massage: "khong co san pham nao"
            })
        }
        const category = await Category.find({ products: req.params.id });
        return res.json({
            message: "hien thi id thanh cong",
            product: {
                ...product.toObject(),
                category,
            },
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
}


export const postProduct = async (req, res) => {
    try {
        //validate

        const product = await Product.create(req.body);
        if (!product) {
            return res.json({
                message: "Thêm không thành công",
            });
        }
        return res.json({
            message: "Thêm thành công",
            product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const putProduct = async (req, res) => {
    try {

        const product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        if (!product) {
            return res.status(404).json({
                message: "khong co san pham"
            })
        }
        return res.json({
            message: "sua thanh cong",
            product,
        })
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: "khong co san pham"
            })
        }
        res.json({
            message: "xoá thanh cong",
            product,
        })
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}