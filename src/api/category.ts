import instance from "./config";

export const getAllCategory = () => {
    return instance.get(`/categories`);
};
export const getOneCategory = (id: any) => {
    return instance.get(`/categories/${id}`);
};
export const getCreatCategory = (category: any) => {
    return instance.post(`/categories`, category);
};
export const getUpdateCategory = (category: any) => {
    return instance.put(`/categories/${category._id}`, category);
};
export const getDeleteCategory = (id: any) => {
    return instance.delete(`/categories/${id}`);
};