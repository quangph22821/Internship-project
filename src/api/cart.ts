
import Cookies from "js-cookie";
import instance from "./config";

const options = () => {
    return {
        headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
    };
};
export const getCartUser = () => {
    return instance.get(`/cart/user`, options())
}

export const getAllCart = () => {
    return instance.get(`/cart`, options())
}


export const getAddtoCart = (cart: any) => {
    return instance.post(`/cart/add`, cart, options())
}

export const deleteProductCart = (productId: string) => {
    return instance.delete(`cart/delete/${productId}`, options());
};