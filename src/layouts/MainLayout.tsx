import { Link, Outlet } from 'react-router-dom';
import './mainLayout.css'
import { PhoneOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';

const MainLayout = () => {
  return <div>
    <header className="header flex justify-center">
      <div className=''>
        <div className="inner-header">
          <div className="label-header">
            <nav className="nav-left">
              <ul className="nav-left-info">
                <li className="nav-left-item">
                  <a href=""><i className='bx bxs-map bx-size mg'></i>ĐỊA CHỈ: VIỆT NAM</a>
                </li>
                <li className="nav-left-item">
                  <a href=""><PhoneOutlined />SĐT: 0858879636 </a>
                </li>
              </ul>
            </nav>
            <a href="" className="logo-wrapper" title="CLOWNZⓇ STREETWEAR"><img className="img-wrapper center-block mg-logo" src="/thuctap/img/logo.png" alt="" /></a>
            <nav className="nav-right-utility mg-nav">
              <ul className="nav-right-account">
                <li className="nav-right-item pd"><a href=""><SearchOutlined /></a></li>
                <li className="nav-right-item pd-26">
                  <button>
                    <Link to={`/signin`}>
                      <UserOutlined />TÀI KHOẢN
                    </Link>
                  </button>
                </li>
                <li className="nav-right-item">
                  <button>
                    <Link to={`/cart`}>
                      GIỎ HÀNG<ShoppingCartOutlined />
                    </Link>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="menu-header">
          <nav className="container flex justify-center">
            <ul className="main-menu">
              <li><Link to={`/`}>TRANG CHỦ</Link></li>
              <li><Link to={`/product`}>SẢN PHẨM</Link></li>
              <li><a href="/">BUBBLE GUM</a></li>
              <li><a href="/">STAND FOR NORTHSIDE</a></li>
              <li><a href="/">ALL SALE</a></li>
              <li><Link to={`/about`}>VỀ CHÚNG TÔI</Link></li>
              <li><Link to={`/blog`}>BLOG</Link></li>
              <li><Link to={`/contact`}>LIÊN HỆ</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <main>
      <Outlet />
    </main>

    <footer className='mt-[50px]'>
      <div className='footer'>
        <div className='footer-menu padding-bottom20'>
          <div className="footer-connected flex justify-center w-full gap-[100px]">
            <div className="footer-contact">
              <h3><a href=""><img src="/thuctap/img/footerlogo.png" alt="" /></a></h3>
              <div className="footer-contact-text ">
                <p><i className='bx bxs-car'></i>Ship COD toàn quốc</p>
                <p><i className='bx bxs-gift'></i>FREESHIP đơn hàng từ 700.000đ</p>
              </div>
            </div>
            <div>
              <h3>LIÊN HỆ</h3>
              <div className="footer-connected-text" >
                <p><i className='bx bxs-home'></i>CLOWNZ STORE</p>
                <p><i className='bx bx-map'></i>45 Núi Trúc, Ba Đình, HN</p>
                <p><i className='bx bx-map'></i>19 Hồ Đắc Di, Đống Đa, HN</p>
                <p><a href="" className="text-none"><i className='bx bxs-envelope'></i>duong@clownz.vn</a></p>
                <p><a href="" className="text-none"><i className='bx bxs-phone'></i>058660 8660</a></p>
              </div>
            </div>
            <div className="footer-widget">
              <h3>CHÍNH SÁCH</h3>
              <div className="footer-widget-text">
                <ul className="footer-hover">
                  <li className="margin-bottom-15">
                    <a href="" className="text-none">CHÍNH SÁCH THÀNH VIÊN</a>
                  </li>
                  <li className="margin-bottom-15">
                    <a href="" className="text-none">CHÍNH SÁCH ĐỔI TRẢ</a>
                  </li>
                  <li>
                    <a href="" className="text-none">CHÍNH SÁCH VẬN CHUYỂN</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-register">
              <h3>ĐĂNG KÝ NHẬN TIN</h3>
              <p>Nhận thông tin sản phẩm mới nhất, tin khuyến mãi <br />
                và nhiều hơn nữa.</p>
              <form className='bulletin-from' action="">
                <input type="text" className="bulletin-text" />
                <button className="bulletin-btn"><span>ĐĂNG KÝ</span></button>
              </form>

              <div className="footer-register-list flex">
                <img src="https://bizweb.dktcdn.net/100/414/728/themes/867455/assets/payment_1.svg?1685614743610"
                  alt="" />
                <img src="https://bizweb.dktcdn.net/100/414/728/themes/867455/assets/payment_2.svg?1685614743610"
                  alt="" />
                <img src="https://bizweb.dktcdn.net/100/414/728/themes/867455/assets/payment_3.svg?1685614743610"
                  alt="" />
                <img src="https://bizweb.dktcdn.net/100/414/728/themes/867455/assets/payment_4.svg?1685614743610"
                  alt="" />
                <img src="https://bizweb.dktcdn.net/100/414/728/themes/867455/assets/payment_5.svg?1685614743610"
                  alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>


    {/* ahv */}
  </div>;
};

export default MainLayout;
