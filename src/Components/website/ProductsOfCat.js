import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Axios } from "../../API/Axios";
import { CAT, PRO } from "../../API/Api";
import NavHome from "./NavHome";

function slugify(text) {
  return decodeURIComponent(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ProductsOfCat() {
  const { slug } = useParams();
  const [categoryId, setCategoryId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategoryAndProducts() {
      try {
        const catRes = await Axios.get(CAT);
        const allCategories = catRes.data.data || catRes.data;

        const matchedCategory = allCategories.find(
          (cat) => slugify(cat.title) === slug
        );
        if (matchedCategory) {
          setCategoryId(matchedCategory.id);
          const prodRes = await Axios.get(
            `${PRO}?category_id=${matchedCategory.id}`
          );
            console.log("Products in category:", prodRes.data);
          setProducts(prodRes.data || []);
        } else {
          setProducts([]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching category products:", error);
        setLoading(false);
      }
    }

    fetchCategoryAndProducts();
  }, [slug]);

  return (
    <>
      <NavHome />
      <nav style={{ "--bs-breadcrumb-divider": `'>'` }} aria-label="breadcrumb">
        <ol className="breadcrumb container my-5">
          <li className="breadcrumb-item ">
            <Link
              style={{ color: "var(--light-green)" }}
              className="text-decoration-none fw-bold fs-6"
              to="/"
            >
              Home
            </Link>
          </li>
          <li
            className="breadcrumb-item active fw-bold fs-6"
            aria-current="page"
          >
            {slug.replace(/-/g, " ")}
          </li>
        </ol>
      </nav>
      <div className="container my-5">
        <h2 className="mb-4 text-capitalize">{slug.replace(/-/g, " ")}</h2>

        {loading ? (
          <div className="row">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="col-lg-3 col-md-4 col-6 mb-3">
                <div className="skeleton-card" />
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="row">
            {products.map((product) => (
              <div
                key={product.id}
                className="col-lg-3 col-md-4 col-6 mb-4"
                onClick={() =>
                  (window.location.href = `/products/${product.id}`)
                }
              >
                <div className="product-box text-center h-100">
                  <img
                    src={product.images?.[0]?.image}
                    alt={product.title}
                    className="img-fluid mb-2"
                    style={{
                      objectFit: "cover",
                      borderRadius: "8px 8px 0 0",
                      width: "100%",
                    }}
                  />
                  <h6 className="text-truncate px-2">{product.title}</h6>
                  <p className="fw-bold text-secondary">{product.price} EGP</p>
                  <button
                    className="btn w-100 text-light"
                    style={{ backgroundColor: "var(--light-green)" }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </>
  );
}
