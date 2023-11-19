import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import { useEffect } from "react";
import { fetchAllCategory } from "../../../Redux/Slices/categorySlice";
import { useForm } from "react-hook-form";
import { message } from "antd";
import { fetchupdateProduct } from "../../../Redux/Slices/productSlice";


const UpdateProduct = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const categorys = useAppSelector((state) => state.category.categorys);
    console.log("dataCategory", categorys);
    const products = useAppSelector((state) => state.product.products);
    console.log("dataCategory", categorys);


    useEffect(() => {
        dispatch(fetchAllCategory());
    }, [dispatch]);


    const { register, handleSubmit, reset } = useForm({})
    useEffect(() => {
        const currentProduct = products?.find((item: any) => item._id == id);
        reset(currentProduct);
    }, []);
    const onUpdate = async (values: any) => {
        try {
            if (values.name == "" || values.price == "" || values.categoryId == "") {
                message.warning("Bạn Nhập Đầy Đủ để Thêm Sản Phẩm !!");
            }
            dispatch(fetchupdateProduct(values));
            message.success("Thay đổi sản phẩm thành công !!!");
            navigate('/admin');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div>
                <h1 className="text-[20px] font-sans font-[700] ml-[100px]">Thay Đổi Sản Phẩm</h1>
                <div className="grid grid-cols-2 mx-[100px] mt-[50px]">
                    <div>
                        <form onSubmit={handleSubmit(onUpdate)}>
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


                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input id="dropzone-file" {...register('image')} type="file" className="hidden" />
                                </label>
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
                                    Sửa Sản Phẩm
                                </button>
                            </div>

                        </form>
                    </div>
                    <div>
                        <img src="https://i.pinimg.com/originals/50/78/a0/5078a05eb1b6847d93383eaa4c0ed500.gif" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct