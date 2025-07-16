import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChangeTitle from "../ChangeTitle";
import Footer from "./Footer";
import NavHome from "./NavHome";
import { Axios } from "../../API/Axios";
import { pro } from "../../API/Api";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(true);
  const [isInCart, setIsInCart] = useState(false); 

  ChangeTitle(`Chefaa | ${product.title}`);

  const handleAddToCart = () => {
    const getItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingIndex = getItems.findIndex((item) => item.id === product.id);

    if (existingIndex !== -1) {
      getItems[existingIndex].quantity += 1;
    } else {
      getItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cartItems", JSON.stringify(getItems));
    setIsInCart(true); 
        window.dispatchEvent(new Event("cart-updated"));
    
  };

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await Axios.get(`${pro}/${id}`);
        const fetchedProduct = res.data[0];
        setProduct(fetchedProduct);

        const getItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const exists = getItems.some((item) => item.id === fetchedProduct.id);
        setIsInCart(exists);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  return (
    <>
      <NavHome />
      <div className="container my-5">
        {loading ? (
          <p>Loading product details...</p>
        ) : product ? (
          <div className="row d-flex">
            <div className="col-md-5">
              <img
                src={product.images?.[0]?.image}
                alt={product.title}
                className="img-fluid rounded"
              />
            </div>

            <div className="col-md-7">
              <h2 className="mb-3 d-flex align-items-start">{product.title}</h2>
              <h4 className="text-success mb-3">{product.price} EGP</h4>
              <p>{product.description || "No description available."}</p>

              <button
                onClick={
                  !isInCart && product.stock > 0 ? handleAddToCart : null
                }
                className="btn mt-3 w-100"
                style={{
                  backgroundColor:
                    isInCart || product.stock === 0
                      ? "#ccc"
                      : "var(--light-green)",
                  color: isInCart || product.stock === 0 ? "#333" : "white",
                  cursor:
                    isInCart || product.stock === 0 ? "not-allowed" : "pointer",
                }}
                disabled={isInCart || product.stock === 0}
              >
                {product.stock === 0
                  ? "Out of Stock"
                  : isInCart
                  ? "Added"
                  : "Add to Cart"}
              </button>

              {product.stock < 10 && product.stock > 0 && (

                <p className="text-success fw-bold mt-2">
                  {`There Is ${product.stock} Only`}
                </p>
              )}
            </div>
          </div>
        ) : (
          <p>Product not found.</p>
        )}
      </div>
      <Footer />
    </>
  );
}
