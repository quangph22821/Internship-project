interface IProduct {
    _id?: string;
    name: string;
    image: string;
    price: number;
    categoryId: string;
    cartId?: string;
    createdAt?: string;
    updatedAt?: string;
}

export default IProduct;