import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        image: {
            type: Array
        },
        price: {
            type: Number,
        },
        categoryId: {
            type: mongoose.Types.ObjectId,
            ref: "Category",
        },
        cartId: {
            type: mongoose.Types.ObjectId,
            ref: "Cart",
        },

    },
    { timestamps: true, versionKey: false }

);


export default mongoose.model("Product", productSchema);