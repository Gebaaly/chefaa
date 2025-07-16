import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { Axios } from "../../API/Axios";
import { Link, useNavigate } from "react-router-dom";
import { CAT, PRO } from "../../API/Api";

function shuffleArray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function NextArrow(props) {
  const { onClick } = props;
  return (
    <div className="custom-arrow next" onClick={onClick}>
      <svg viewBox="0 0 24 24">
        <path
          d="M9 6l6 6-6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="custom-arrow prev" onClick={onClick}>
      <svg viewBox="0 0 24 24">
        <path
          d="M15 6l-6 6 6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

const CATEGORY_IDS = [2, 5, 6, 9, 12, 13, 14, 17, 20, 48];

function CategorySkeleton() {
  return (
    <div className="mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div
          className="skeleton-title"
          style={{ width: "200px", height: "24px" }}
        />
        <div
          className="skeleton-button"
          style={{ width: "100px", height: "32px" }}
        />
      </div>
      <div className="row">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="col-lg-2 col-md-3 col-6 mb-3">
            <div className="skeleton-card" />
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoryCarousel({
  category,
  settings,
  slugify,
  handleAddToCart,
  isInCart,
}) {
  const navigate = useNavigate();

  if (!category || !category.products) {
    return <CategorySkeleton />;
  }

  return (
    <div className="mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fs-4 fw-bold">{category.name}</h2>
        <Link
          to={`/categories/${slugify(category.name)}`}
          className="btn"
          style={{ backgroundColor: "var(--light-green)", color: "#fff" }}
        >
          Show All →
        </Link>
      </div>

      {category.products.length === 0 ? (
        <div className="text-center text-muted">
          <p>No products available in this category</p>
        </div>
      ) : (
        <Slider {...settings}>
          {category.products.map((product) => {
            const isOutOfStock = product.stock === 0;

            return (
              <div key={product.id} className="p-2">
                <Link
                  to={`/products/${product.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div
                    className="product-box h-100 text-center"
                    style={{ position: "relative" }}
                  >
                    {product.images?.[0] && (
                      <div style={{ position: "relative" }}>
                        <img
                          src={product.images[0].image}
                          alt={product.title}
                          className="card-img-top"
                          style={{
                            width: "100%",
                            height: "180px",
                            objectFit: "cover",
                            borderRadius: "8px 8px 0 0",
                          }}
                          loading="lazy"
                        />
                        {isOutOfStock && (
                          <div
                            style={{
                              position: "absolute",
                              top: "8px",
                              left: "8px",
                              backgroundColor: "rgba(0,0,0,0.7)",
                              color: "#fff",
                              padding: "4px 8px",
                              fontSize: "12px",
                              borderRadius: "4px",
                              zIndex: 1,
                            }}
                          >
                            Out of Stock
                          </div>
                        )}
                      </div>
                    )}

                    <div className="card-body">
                      <h6 className="card-title text-truncate p-1">
                        {product.title}
                      </h6>
                      <p className="card-text fw-bold text-secondary d-flex justify-content-start p-1">
                        {product.price} EGP
                      </p>
                      <button
                        style={{
                          backgroundColor:
                            isInCart(product.id) || isOutOfStock
                              ? "#ccc"
                              : "var(--light-green)",
                          color:
                            isInCart(product.id) || isOutOfStock
                              ? "#333"
                              : "white",
                          cursor:
                            isInCart(product.id) || isOutOfStock
                              ? "not-allowed"
                              : "pointer",
                        }}
                        className="btn text-light w-100"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (!isInCart(product.id) && !isOutOfStock) {
                            handleAddToCart(product);
                          }
                        }}
                        disabled={isInCart(product.id) || isOutOfStock}
                      >
                        {isOutOfStock
                          ? "Out of Stock"
                          : isInCart(product.id)
                          ? "Added"
                          : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </Slider>
      )}
    </div>
  );
}

export default function ProductCarousel() {
  const [categoriesData, setCategoriesData] = useState({});
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(stored);
  }, []);

  const handleAddToCart = (product) => {
    const existingIndex = cartItems.findIndex((item) => item.id === product.id);
    let updatedCart;

    if (existingIndex !== -1) {
      updatedCart = [...cartItems];
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cart-updated"));

  };

  const isInCart = (id) => {
    return cartItems.some((item) => item.id === id);
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        setCategoriesLoading(true);
        setError(null);

        const categoryResponse = await Axios.get(CAT);
        const allCategories =
          categoryResponse.data.data || categoryResponse.data;
        const selectedCategories = allCategories.filter((cat) =>
          CATEGORY_IDS.includes(cat.id)
        );

        const initialCategories = {};
        selectedCategories.forEach((cat) => {
          initialCategories[cat.id] = {
            id: cat.id,
            name: cat.title,
            products: null,
            loading: true,
          };
        });
        setCategoriesData(initialCategories);
        setCategoriesLoading(false);

        selectedCategories.forEach(async (cat) => {
          try {
            const productRes = await Axios.get(
              `${PRO}?category_id=${cat.id}&limit=10`
            );

            const categoryData = {
              id: cat.id,
              name: cat.title,
              products: shuffleArray(productRes.data.data || []),
              loading: false,
            };

            setCategoriesData((prev) => ({
              ...prev,
              [cat.id]: categoryData,
            }));
          } catch (err) {
            console.error(
              `Error fetching products for category ${cat.id}:`,
              err
            );
            const categoryData = {
              id: cat.id,
              name: cat.title,
              products: [],
              loading: false,
            };
            setCategoriesData((prev) => ({
              ...prev,
              [cat.id]: categoryData,
            }));
          }
        });
      } catch (error) {
        console.error("Error loading categories:", error);
        setError("Failed to load products. Please try again.");
        setCategoriesLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  function slugify(text) {
    return decodeURIComponent(text)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  if (error) {
    return (
      <div className="container my-5">
        <div className="text-center">
          <p className="text-danger">{error}</p>
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      {Object.values(categoriesData).map((category) => (
        <CategoryCarousel
          key={category.id}
          category={category}
          settings={settings}
          slugify={slugify}
          handleAddToCart={handleAddToCart}
          isInCart={isInCart}
        />
      ))}
    </div>
  );
}
