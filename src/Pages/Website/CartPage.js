import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavHome from "../../Components/website/NavHome";
import ChangeTitle from "../../Components/ChangeTitle";
import { Link } from "react-router-dom"; 
import axios from "axios";
import { Axios } from "../../API/Axios";
import { USER } from "../../API/Api";

export default function CartPage() {
  const [user,setUser]=useState("")
   useEffect(() => {
     Axios.get(`${USER}`)
       .then((data) => {
         setUser(data.data.id)
       })
   }, []);
  const [products, setProducts] = useState([]);

  ChangeTitle("Chefaa | Cart Page");
const confirmOrder = async (e) => {
  e.preventDefault();

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  if (cartItems.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  try {
    const res = await Axios.post("/orders", {
      items: cartItems,
      user_id: user, 
    });

    // ✅ فضي اللوكال ستورج
    localStorage.removeItem("cartItems");

    

    // ✅ اشعل الحدث علشان يتحدث العداد في الهيدر مثلاً
    window.dispatchEvent(new Event("cart-updated"));


    // ✅ رجّع المستخدم للصفحة الرئيسية
    window.location.href = "/";
  } catch (error) {
    console.error("Order failed:", error);
    alert("Something went wrong. Please try again.");
  }
};



  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setProducts(cartItems);
    
  }, []);

  const increaseQuantity = (productId) => {
    const updatedProducts = products.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setProducts(updatedProducts);
    localStorage.setItem("cartItems", JSON.stringify(updatedProducts));
  };

  const decreaseQuantity = (productId) => {
    const updatedProducts = products.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
        : item
    );

    setProducts(updatedProducts);
    localStorage.setItem("cartItems", JSON.stringify(updatedProducts));
  };

  const removeProduct = (productId) => {
    const updatedProducts = products.filter((item) => item.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem("cartItems", JSON.stringify(updatedProducts));
  };
const totalPrice = products.reduce(
  (sum, item) => sum + item.price * (item.quantity || 1),
  0
);

  return (
    <>
      <NavHome />
      <div className="container py-4">
        <h2 className="mb-4 ">Cart Page</h2>

        {products.length === 0 ? (
          <div className="text-center my-5">
            <img
              src="https://cdn.chefaa.com/filters:format(webp)/public/assets/app/images/empty-cart-icon.png"
              alt="Empty Cart"
              className="img-fluid"
            />
            <h3 className="text-center">No items in your cart.</h3>
            <Link
              to="/"
              className="shopping btn mt-2"
              style={{ backgroundColor: "var(--light-green)", color: "white" }}
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="row">
            {/* المنتجات */}
            <div className="col-12 col-lg-7">
              <h4 className="mb-3">Your Cart</h4>
              {products.map((product) => (
                <div className="card pb-3 mb-3" key={product.id}>
                  <div className="row g-0">
                    <Link to={`/products/${product.id}`}>
                      <div className="col-md-4">
                        <img
                          src={
                            product.images?.[0]?.image ||
                            "https://via.placeholder.com/150"
                          }
                          className="img-fluid rounded-start w-100"
                          alt={product.title}
                        />
                      </div>
                    </Link>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>

                        <div className="d-flex align-items-center mb-2">
                          <span className="me-2">Quantity:</span>
                          <button
                            className="btn btn-outline-secondary btn-sm me-2"
                            onClick={() => decreaseQuantity(product.id)}
                          >
                            -
                          </button>
                          <span className="fw-bold">
                            {product.quantity || 1}
                          </span>
                          <button
                            className="btn btn-outline-secondary btn-sm ms-2"
                            onClick={() => increaseQuantity(product.id)}
                          >
                            +
                          </button>
                        </div>

                        <p className="card-text">
                          <small className="text-muted">
                            Price: {product.price || "0.00"} EGP
                          </small>
                        </p>
                      </div>
                      <div className="delete-button d-flex justify-content-end me-3">
                        <button
                          className="btn btn-danger"
                          onClick={() => removeProduct(product.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* فورم المستخدم */}
            <div className="container col-12 col-lg-5">
              <h4 className="mb-3">Your Information</h4>
              <form onSubmit={confirmOrder}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Your Name"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="1234 Main St"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="0123456789"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="totalPrice" className="form-label">
                    total Price
                  </label>
                  <h3>{totalPrice.toFixed(2)} EGP</h3>
                </div>

                <button
                  type="submit"
                  className="btn w-100"
                  style={{
                    backgroundColor: "var(--light-green)",
                    color: "white",
                  }}
                >
                  Confirm Order
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
