import { useNavigate } from 'react-router-dom';
import './index.css'
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { Empty, message } from 'antd';
import { useAppDispatch, useAppSelector } from '../../Redux/hook';
import { fetchCartUser } from '../../Redux/Slices/cartSlice';

const CartPage = () => {
    const navigate = useNavigate();
    // NGĂN CHẠN NGƯỜI DÙNG KHI CHƯA ĐĂNG NHẬP
    const accessToken = Cookies.get("accessToken");
    useEffect(() => {
        if (!accessToken) {
            navigate("/signin");
            message.warning("Bạn phải đăng nhập để truy cập giỏ hàng");
        }
    }, [accessToken, navigate]);
    //call Redux
    const dispatch = useAppDispatch();

    const cartUser = useAppSelector((state) => state.cart.entities);
    console.log("CartUsser", cartUser?.cart?.products);
    const dataCart = cartUser?.cart?.products;


    useEffect(() => {
        dispatch(fetchCartUser());
    }, [dispatch]);
    return (
        <div>
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <h1 className="text-2xl font-bold my-4 font-sans">GIỎ HÀNG CỦA BẠN</h1>
                    <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                        Checkout
                    </button>
                </div>
                <div className="mt-8">
                    {/*  */}
                    {dataCart && dataCart.length > 0 ? (
                        dataCart.map((data: any) => (
                            <div className="flex flex-col md:flex-row border-b border-gray-400 py-4">
                                <div className="flex-shrink-0">
                                    <img src={data.productId.image} alt="Product image" className="w-32 h-32 object-cover" />
                                </div>
                                <div className="mt-4 md:mt-0 md:ml-6">
                                    <h2 className="text-lg font-bold">{data.productId.name}</h2>
                                    <p className="mt-2 text-red-600 ">{data.productId.price * data.quantity} đ</p>
                                    <div className="mt-4 flex items-center">
                                        <span className="mr-2 text-gray-600">Quantity:</span>
                                        <div className="flex items-center">
                                            <button className="bg-gray-200 rounded-l-lg px-2 py-1" disabled>-</button>
                                            <span className="mx-2 text-gray-600">{data.quantity}</span>
                                            <button className="bg-gray-200 rounded-r-lg px-2 py-1" disabled>+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div><Empty /></div>
                    )}

                    {/*  */}
                </div>
                <div className="flex justify-end items-center mt-8">
                    <span className="text-gray-600 mr-4">Subtotal:</span>
                    <span className="text-xl font-bold">$35.00</span>
                </div>
            </div>

            <section>
                <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="bg-blue-600 p-8 md:p-12 lg:px-16 lg:py-24">
                            <div className="mx-auto max-w-xl text-center">
                                <h2 className="text-2xl font-bold text-white md:text-3xl">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit
                                </h2>

                                <p className="hidden text-white/90 sm:mt-4 sm:block">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas
                                    tempus tellus etiam sed. Quam a scelerisque amet ullamcorper eu enim
                                    et fermentum, augue. Aliquet amet volutpat quisque ut interdum
                                    tincidunt duis.
                                </p>

                                <div className="mt-4 md:mt-8">
                                    <a
                                        href="#"
                                        className="inline-block rounded border border-white bg-white px-12 py-3 text-sm font-medium text-blue-500 transition hover:bg-transparent hover:text-white focus:outline-none focus:ring focus:ring-yellow-400"
                                    >
                                        Get Started Today
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
                            <img
                                alt="Student"
                                src="https://images.unsplash.com/photo-1621274790572-7c32596bc67f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80"
                                className="h-40 w-full object-cover sm:h-56 md:h-full"
                            />

                            <img
                                alt="Student"
                                src="https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                                className="h-40 w-full object-cover sm:h-56 md:h-full"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CartPage