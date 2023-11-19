import { Link, useNavigate } from 'react-router-dom'
import './index.css'
import { useForm } from 'react-hook-form'
import { signin } from '../../api/user'
import Cookies from 'js-cookie'
import { message } from 'antd'

const SigninPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const onSignin = async (values: any) => {
        console.log(values);
        try {
            const response = await signin(values);
            console.log({ response });
            //gán lên Cookies
            Cookies.set("accessToken", response?.data?.accessToken, {
                expires: new Date(Date.now() + 30 * 60 * 1000),
            });
            if (response.data.user.role == 'admin') {
                message.success('Đăng nhập thành công Admin !');
                navigate('/admin');
            } else {
                message.success(`Đăng nhập thành công ${response.data.user.name} !`);
                navigate('/');
            }

        } catch (error: any) {
            console.log(error);
            message.warning(`${error?.response?.data.message}`)
        }

    }
    return (
        <div>
            <div className="container-login">
                <div className="login">
                    <h2>ĐĂNG NHẬP TÀI KHOẢN</h2>
                    <div className='flex justify-center'>
                        <div className="social-login flex gap-2">
                            <a href="" ><img width="129px" height="37px"
                                src="https://bizweb.dktcdn.net/assets/admin/images/login/fb-btn.svg" alt="" /></a>
                            <a href=""><img width="129px" height="37px"
                                src="https://bizweb.dktcdn.net/assets/admin/images/login/gp-btn.svg" alt="" /></a>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSignin)} className="customer-login">
                        <fieldset className="from-group">
                            <label htmlFor="">
                                EMAIL
                                <span>*</span>
                            </label>
                            <input type="gmail" {...register("email")} placeholder="Nhập Địa Chỉ Email" />
                        </fieldset>
                        <fieldset className="from-group">
                            <label htmlFor="">
                                MẬT KHẨU
                                <span >*</span>
                            </label>
                            <input type="password" {...register("password")} placeholder="Nhập Mật Khẩu" />
                        </fieldset>
                        <div className="pull-xs-left" >
                            <button className="btn">ĐĂNG NHẬP</button>
                        </div>
                        <p className="btn-link-style">
                            <a href="/">Quên mật khẩu?</a>
                        </p>
                        <div className="text-login">
                            <p>
                                Bạn chưa có tài khoản. Đăng ký <Link to={`/signup`}>TẠI ĐÂY.</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SigninPage