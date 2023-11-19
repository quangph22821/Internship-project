import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import { fetchAllCategory } from "../../../Redux/Slices/categorySlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { message } from "antd";
import axios from "axios";
import { fetchCreatProduct } from "../../../Redux/Slices/productSlice";

const CreatProduct = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const categorys = useAppSelector((state) => state.category.categorys);
    console.log("dataCategory", categorys);


    useEffect(() => {
        dispatch(fetchAllCategory());
    }, [dispatch]);
    //xử lí upload ảnh
    const uploadFiles = async (files: FileList): Promise<string[]> => {
        const CLOUD_NAME = "dwp7umncy";
        const PRESET_NAME = "bookshop";
        const FOLDER_NAME = "ass_ecma";
        const urls: string[] = [];
        const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

        const formData = new FormData();
        formData.append("upload_preset", PRESET_NAME);
        formData.append("folder", FOLDER_NAME);

        for (const file of Array.from(files)) {
            formData.append("file", file);
            try {
                message.loading({ content: 'Đang xử lí...', key: 'upload' });
                const response = await axios.post(api, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                urls.push(response.data.secure_url);
            } catch (error) {
                console.log(error);
                message.error({ content: 'Lỗi khi xử lí', key: 'upload' });
            }
        }
        return urls;
    };

    // xử lí Thêm
    const { register, handleSubmit } = useForm({});
    const onAdd = async (values: any) => {
        try {
            const images = await uploadFiles(values.image);
            const newData = { ...values, image: images };
            console.log({ newData });
            if (values.name == "" || values.price == "" || values.categoryId == "") {
                message.warning("Bạn Nhập Đầy Đủ để Thêm Sản Phẩm !!")
            }
            dispatch(fetchCreatProduct(newData))
            message.success("Thêm Sản Phẩm Thành Công !!!")
            navigate('/admin');

        } catch (error) {
            console.log(error);

        }

    }
    return (
        <div>
            <h1 className="text-[20px] font-sans font-[700] ml-[100px]">Thêm Sản Phẩm</h1>
            <div className="grid grid-cols-2 mx-[100px] mt-[50px]">
                <div>
                    <form onSubmit={handleSubmit(onAdd)}>
                        <label
                            htmlFor="name"
                            className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                        >
                            <span className="text-xs font-medium text-gray-700"> Tên Sản Phẩm </span>

                            <input
                                type="text"
                                {...register("name")}
                                placeholder="Nhập Tên Sản Phẩm"
                                className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                            />
                        </label>
                        <label
                            htmlFor="price"
                            className="block my-[20px] overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                        >
                            <span className="text-xs font-medium text-gray-700"> Giá Sản Phẩm </span>

                            <input
                                type="number"
                                {...register("price")}
                                min={0}
                                placeholder="Nhập Giá Sản Phẩm"
                                className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                            />
                        </label>


                        <div className=" w-full">

                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Chọn Ảnh</label>
                            <input
                                {...register("image")}
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" />

                        </div>

                        <div className='my-[20px]'>
                            <label className='text-[15px] font-[500]' htmlFor="">Danh Mục:</label>
                            <select {...register('categoryId')} className="my-[7px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option className="opacity-50" value="">Danh Mục</option>
                                {categorys?.map((item: any) =>
                                    <option value={item._id}>{item.name}</option>
                                )}
                            </select>
                        </div>

                        <div>
                            <button type="submit" className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2">
                                Thêm Sản Phẩm
                            </button>
                        </div>

                    </form>
                </div>
                <div>
                    <img src="https://cdn.dribbble.com/users/31642/screenshots/12649406/media/d9d77461d44300f77b25f58ef14f5872.gif" alt="" />
                </div>
            </div>
        </div>
    )
}

export default CreatProduct