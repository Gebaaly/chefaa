import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { Axios } from "../../API/Axios";
import { Link } from "react-router-dom";
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

const CATEGORY_IDS = [2, 5, 6, 9, 12, 13, 14, 17, 20];
// IDs from 9 to 18

export default function ProductCarousel() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const categoryResponse = await Axios.get(CAT);
        const allCategories =
          categoryResponse.data.data || categoryResponse.data;

        const selectedCategories = allCategories.filter((cat) =>
          CATEGORY_IDS.includes(cat.id)
        );

        const promises = selectedCategories.map(async (cat) => {
          const productRes = await Axios.get(
            `${PRO}?category_id=${cat.id}&limit=10`
          );
          return {
            id: cat.id,
            name: cat.title,
            products: shuffleArray(productRes.data.data || []),
          };
        });

        const results = await Promise.all(promises);
        setCategoriesData(results);
      } catch (error) {
        console.error("Error loading categories and products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);
  if (loading) {
    return (
      <div className="container my-5">
        {[...Array(3)].map((_, idx) => (
          <div key={idx} className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="skeleton skeleton-title" />
              <div className="skeleton skeleton-btn" />
            </div>
            <div className="row">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="col-lg-2 col-md-3 col-6 mb-3">
                  <div className="skeleton-card" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
    

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

  return (
    <div className="container my-5">
      {categoriesData.map((category) => (
        <div key={category.id} className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="fs-4 fw-bold">{category.name}</h2>
            <Link
              to={`/categories/${category.name}`}
              className="btn"
              style={{ backgroundColor: "var(--light-green)", color: "#fff" }}
            >
              Show All →
            </Link>
          </div>
          <Slider {...settings}>
            {category.products.map((product) => (
              <div key={product.id} className="p-2">
                <div className="product-box h-100 text-center">
                  {product.images?.[0] && (
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
                    />
                  )}
                  <div className="card-body">
                    <h6 className="card-title text-truncate p-1">
                      {product.title}
                    </h6>
                    <p className="card-text fw-bold text-secondary d-flex justify-content-start p-1">
                      {product.price} EGP
                    </p>
                    <button
                      style={{ backgroundColor: "var(--light-green)" }}
                      className="btn text-light w-100"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      ))}
    </div>
  );
}
