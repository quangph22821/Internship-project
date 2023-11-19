import { IUsers } from "../interfaces/user";
import instance from "./config"
import Cookies from "js-cookie";

const options = () => {
    return {
        headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
    };
};

export const signin = (user: IUsers) => {
    return instance.post("/signin", user, options())
}
export const signup = (user: any) => {
    return instance.post("/signup", user, options())
}
export const getAllUser = () => {
    return instance.get("/user")
}