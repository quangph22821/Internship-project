import IProduct from "./product";

interface ICategory {
    _id?: string;
    name: string;
    products?: IProduct[];
    createdAt?: string;
    updatedAt?: string;
}

export default ICategory;