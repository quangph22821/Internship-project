import { Link, useNavigate } from 'react-router-dom'
import './index.css'
import { useForm } from 'react-hook-form';
import { signup } from '../../api/user';
import { message } from 'antd';

const SignupPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const onSignup = async (values: any) => {
        console.log(values);
        try {
            const response = await signup(values);
            console.log({ response });
            message.success(`Đăng kí thành công ${response.data.user.name} !`)
            navigate('/signin');

        } catch (error: any) {
            console.log(error);
            message.warning(`${error?.response?.data.message}`)
        }

    }


    return (
        <div>
            <div className="container-login">
                <div className="login h-full">
                    <h2>ĐĂNG KÍ TÀI KHOẢN</h2>
                    <div className='flex justify-center'>
                        <div className="social-login flex gap-2">
                            <a href="" ><img width="129px" height="37px"
                                src="https://bizweb.dktcdn.net/assets/admin/images/login/fb-btn.svg" alt="" /></a>
                            <a href=""><img width="129px" height="37px"
                                src="https://bizweb.dktcdn.net/assets/admin/images/login/gp-btn.svg" alt="" /></a>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSignup)} className="customer-login">
                        <fieldset className="from-group">
                            <label htmlFor="">
                                NAME
                                <span>*</span>
                            </label>
                            <input type="text" {...register("name")} placeholder="Nhập Tên Của Bạn" />
                        </fieldset>
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
                        <fieldset className="from-group">
                            <label htmlFor="">
                                NHẬP LẠI MẬT KHẨU
                                <span >*</span>
                            </label>
                            <input type="password" {...register("confirmPassword")} placeholder="Nhập Lại Mật Khẩu" />
                        </fieldset>
                        <div className="pull-xs-left" >
                            <button className="btn">ĐĂNG NHẬP</button>
                        </div>
                        <div className="text-login mt-[10px]">
                            <p>
                                Bạn đã có tài khoản. Đăng Nhập <Link to={`/signin`}>TẠI ĐÂY.</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignupPage