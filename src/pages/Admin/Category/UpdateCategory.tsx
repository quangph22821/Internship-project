import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../Redux/hook';
import { useForm } from 'react-hook-form';
import { message } from 'antd';
import { fetchAllCategory, fetchUpdateCategory } from '../../../Redux/Slices/categorySlice';

const UpdateCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const categorys = useAppSelector((state) => state.category.categorys);
    console.log({ categorys });
    console.log("id cate", id);


    useEffect(() => {
        dispatch(fetchAllCategory());
    }, [dispatch]);
    const { register, handleSubmit, reset } = useForm({});
    useEffect(() => {
        const currentProduct = categorys?.find((item: any) => item._id == id);
        reset(currentProduct);
    }, []);
    const onUpdate = async (value: any) => {
        try {
            if (value.name == "") {
                message.error("Bạn Chưa Nhập Dữ Liệu !!!");
            }
            await dispatch(fetchUpdateCategory(value));
            await dispatch(fetchAllCategory());
            message.success("Tạo Danh Mục Thành Công");
            navigate("/admin/category")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div>
                <h1 className='text-[24px] font-sans font-[700]'>Update Danh Mục</h1>
            </div>
            <div className='grid grid-cols-2 mx-[100px]'>
                <div className='mt-[100px]'>
                    <div className="mb-6">
                        <form onSubmit={handleSubmit(onUpdate)}>
                            <label
                                htmlFor="success"
                                className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500"
                            >
                                Tên Danh Mục
                            </label>
                            <input
                                type="text"
                                {...register("name")}
                                className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                                placeholder="Nhập Tên Danh Mục" />
                            <button type="submit" className="text-white bg-[#1da1f2] my-[20px] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2">
                                Update
                            </button>
                        </form>
                    </div>
                </div>
                <div>
                    <img src="https://cdn.dribbble.com/users/1785628/screenshots/5676620/media/e8349cbaee4a18d613941c2cc7f70129.gif" alt="" />
                </div>
            </div>
        </div>
    )
}

export default UpdateCategory