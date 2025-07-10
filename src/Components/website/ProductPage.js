import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChangeTitle from "../ChangeTitle";
import Footer from "./Footer";
import NavHome from "./NavHome";
import { Axios } from "../../API/Axios";
import { pro, PRO } from "../../API/Api";

export default function ProductPage() {
  const { id } = useParams(); // جلب ID من الـ URL
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(true);

  ChangeTitle("Chefaa | Product Details");

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await Axios.get(`${pro}/${id}`);
        console.log("Product:", res.data[0]);

        setProduct(res.data[0]);
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
          <div className="row d-flex ">
            <div className="col-md-5">
              <img
                src={product.images?.[0]?.image}
                alt={product.title}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-7 ">
              <h2 className="mb-3 d-flex align-items-start">{product.title}</h2>
              <h4 className="text-success mb-3">{product.price} EGP</h4>
              <p>{product.description || "No description available."}</p>
              <button
                className="btn  mt-3 w-100"
                style={{
                  color: "white",
                  backgroundColor: "var(--light-green)",
                }}
              >
                Add to Cart
              </button>
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
