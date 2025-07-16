import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/Website/HomePage";
import Login from "./Pages/Website/Auth/Login";
import Register from "./Pages/Website/Auth/Register";
import Users from "./Pages/Dashboard/Users";
import Dashboard from "./Pages/Dashboard/Dashboard";
import RecuireAuth from "./Pages/Website/Auth/RecuireAuth";
import User from "./Pages/Dashboard/User";
import AddUser from "./Pages/Dashboard/AddUser";
import Writer from "./Pages/Dashboard/Writer";
import Forbidden from "./Pages/Website/Auth/403";
import NotFound from "./Pages/Website/Auth/404";
import Categories from "./Pages/Dashboard/Categories";
import AddCategory from "./Pages/Dashboard/AddCategory";
import Category from "./Pages/Dashboard/Category";
import Products from "./Pages/Dashboard/Products";
import AddProducts from "./Pages/Dashboard/AddProducts";
import Product from "./Pages/Dashboard/Product";
import ProductsOfCat from "./Components/website/ProductsOfCat";
import ProductPage from "./Components/website/ProductPage";
import CartPage from "./Pages/Website/CartPage";
export default function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/categories/:slug" element={<ProductsOfCat />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/*" element={<NotFound />} />
        <Route path="403" element={<Forbidden />} />
        <Route
          element={<RecuireAuth allowedRole={["1995", "1991", "1999 "]} />}
        >
          <Route path="/dashboard" element={<Dashboard />}>
            <Route element={<RecuireAuth allowedRole={["1995"]} />}>
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<User />} />
              <Route path="add-user" element={<AddUser />} />
            </Route>
            <Route element={<RecuireAuth allowedRole={["1999", "1995"]} />}>
              <Route path="categories" element={<Categories />} />
              <Route path="add-categories" element={<AddCategory />} />
              <Route path="categories/:id" element={<Category />} />
              <Route path="products" element={<Products />} />
              <Route path="add-products" element={<AddProducts />} />
              <Route path="products/:id" element={<Product />} />
            </Route>
            <Route element={<RecuireAuth allowedRole={["1991", "1995"]} />}>
              <Route path="writer" element={<Writer />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
