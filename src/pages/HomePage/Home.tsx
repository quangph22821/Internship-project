import { useEffect } from 'react';
import './index.css'
import { useAppDispatch, useAppSelector } from '../../Redux/hook';
import { fetchAllProduct } from '../../Redux/Slices/productSlice';
import { Link } from 'react-router-dom';
import { Empty } from 'antd';

import ImageCarousel from '../../components/Home/banner';


const Home = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.product.products);
  console.log("productHome", products);


  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [dispatch]);
  return <div>
    <ImageCarousel/>
    {/* <section className="">
      <img src="https://bizweb.dktcdn.net/100/414/728/themes/867455/assets/slider_1.jpg?1689410100607" alt="" />
    </section > */}
    {/* all product */}

    <section className='flex gap-[20px] mx-[20px] mt-[30px]'>
      <div>
        <img src="https://bizweb.dktcdn.net/100/414/728/themes/867455/assets/ant_index_banner_1.jpg?1689410100607" alt="" />
      </div>
      <div>
        <img src="https://bizweb.dktcdn.net/100/414/728/themes/867455/assets/ant_index_banner_2.jpg?1689410100607" alt="" />
      </div>
      <div>
        <img src="https://bizweb.dktcdn.net/100/414/728/themes/867455/assets/ant_index_banner_3.jpg?1689410100607" alt="" />
      </div>
    </section>

    <section className='mt-[30px]'>
      <div>
        <img src="https://bizweb.dktcdn.net/100/414/728/themes/867455/assets/slider_story_1.jpg?1689410100607" alt="" />
      </div>
    </section>

  </div >
};

export default Home;
