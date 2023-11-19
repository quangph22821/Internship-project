import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hook';
import './index.css'
import { fetchAllProduct, fetchProductsAllcate, filter, filterByCategory } from '../../Redux/Slices/productSlice';
import { Link } from 'react-router-dom';
import { fetchAllCategory } from '../../Redux/Slices/categorySlice';
import { Empty, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import { SearchOutlined } from '@ant-design/icons';

const ProductAllPage = () => {
    const dispatch = useAppDispatch();
    const [selectedCategory, setSelectedCategory] = useState(null); // lưu id cate
    console.log({ selectedCategory });


    const products = useAppSelector((state) => state.product.products);
    const categorys = useAppSelector((state) => state.category.categorys);
    // console.log("categoryAll", categorys);

    // Xử Lí Lọc Theo Danh Mục
    const handleChange = (value: any) => {
        dispatch(filterByCategory(value));
    };
    useEffect(() => {
        try {
            if (selectedCategory) {
                console.log("id cate", selectedCategory);
                dispatch(fetchProductsAllcate(selectedCategory));
            } else {
                dispatch(fetchAllProduct());
            }
        } catch (error) {
            console.log(error);
        }
    }, [selectedCategory, dispatch]);
    // kết thúc lọc
    const handlefil = (value: any) => {
        const filteredItems = products.filter((item: any) =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        console.log(filteredItems);
        if (value === "") {
            dispatch(fetchAllProduct());
        }
        dispatch(filter(value.trim()))
    }

    useEffect(() => {
        try {
            // dispatch(fetchAllProduct());
            dispatch(fetchAllCategory());
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);
    return (
        <div>
            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                    <header className='flex justify-center'>
                        <img src="https://bizweb.dktcdn.net/100/414/728/themes/867455/assets/logo.png?1689410100607" alt="" />
                    </header>

                    <div className="mt-8 flex items-center justify-between">
                        <div>
                            <Select
                                size="large"
                                placeholder="Danh Mục"
                                onChange={handleChange}
                            >
                                {categorys.map((option) => (
                                    <Option key={option._id} value={option._id}>
                                        {option.name}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        <div className="flex rounded border border-gray-100">
                            <button
                                className="inline-flex h-10 w-10 items-center justify-center border-e text-gray-600 transition hover:bg-gray-50 hover:text-gray-700"
                            >
                                <SearchOutlined />
                            </button>

                            <input
                                type='text'
                                placeholder='Search products'
                                onChange={(e) => handlefil(e.target.value)}
                                className='block rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            />
                        </div>
                    </div>
                    {/* list */}
                    <div>
                        <div className='product-list mt-[30px]'>
                            {products && products.length ? (
                                products?.map((data: any) => (
                                    <div className="product-item">
                                        <div className="product-img">
                                            <img src={data.image}
                                                alt="" />
                                            <span>New Arrival</span>
                                        </div>
                                        <div className="product-content">
                                            <h3>{data.name}</h3>
                                            <span className='text-red-500'>{data.price}₫</span>
                                        </div>
                                        <Link to={`/detail/${data._id}`} className="product-btn flex justify-center">
                                            <p>CHI TIẾT</p>
                                        </Link>

                                    </div>
                                ))
                            ) : (
                                <div className='flex justify-center'><div><Empty /></div></div>
                            )}

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProductAllPage