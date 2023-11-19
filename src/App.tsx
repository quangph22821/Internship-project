import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import Home from "./pages/HomePage/Home";
import DashboardPage from "./pages/Admin/Product/DashboardPage";
import AdminLayout from "./layouts/AdminLayout";
import MainLayout from "./layouts/MainLayout";
import AboutPage from "./pages/About/AboutPage";
import BlogPage from "./pages/Blog/BlogPage";
import ContactPage from "./pages/Contact/ContactPage";
import CartPage from "./pages/cartPage/CartPage";
import Category from "./pages/Admin/Category/Category";
import ProductAllPage from "./pages/ProductAll/ProductAllPage";
import SigninPage from "./pages/Signin/SigninPage";
import SignupPage from "./pages/Signup/SignupPage";
import DetailProduct from "./pages/DetailProduct/DetailProduct";
import UserList from "./pages/Admin/User/UserList";
import TestPage from "./layouts/test";
import CreatProduct from "./pages/Admin/Product/CreatProduct";
import UpdateProduct from "./pages/Admin/Product/UpdateProduct";
import CreatCategory from "./pages/Admin/Category/CreatCategory";
import UpdateCategory from "./pages/Admin/Category/UpdateCategory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={routes.home} element={<MainLayout />} >
          <Route index element={<Home />} />
          <Route path={routes.about} element={<AboutPage />} />
          <Route path={routes.blog} element={<BlogPage />} />
          <Route path={routes.contact} element={<ContactPage />} />
          <Route path={routes.product} element={<ProductAllPage />} />
          <Route path={routes.cart} element={<CartPage />} />
          <Route path={routes.detail} element={<DetailProduct />} />
          <Route path={routes.signin} element={<SigninPage />} />
          <Route path={routes.signup} element={<SignupPage />} />
        </Route>

        {/* Admin */}
        <Route path={routes.admin} element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path={routes.productAdd} element={<CreatProduct />} />
          <Route path={routes.productUpdate} element={<UpdateProduct />} />
          <Route path={routes.user} element={<UserList />} />
          <Route path={routes.category} element={<Category />} />
          <Route path={routes.categoryAdd} element={<CreatCategory />} />
          <Route path={routes.categoryUpdate} element={<UpdateCategory />} />
        </Route>
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
