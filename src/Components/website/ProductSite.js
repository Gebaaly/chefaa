import { useEffect, useState } from "react";
import { Axios } from "../../API/Axios";
import { PRO } from "../../API/Api";
export default function ProductSite() {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await Axios.get(`${PRO}?category_id=7`);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      } 
    };

    fetchData();
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.offsetHeight;

      if (
        scrollTop + windowHeight >= docHeight - 100 && // قريب من آخر الصفحة
        !isLoading &&
        products.length < totalItems
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, products, totalItems]);
  

  return (
    <>
      <div className="container my-4">
        <div className="row g-3">
          {products.map(({ id, images, title, price }) => (
            <div key={id} className="col-6 col-sm-4 col-md-3 col-lg-3">
              <div
                className="card p-3 shadow-sm border-0 h-100"
                style={{ borderRadius: "12px" }}
              >
                {/* Wishlist Icon */}
                <div className="d-flex justify-content-end">
                  <button className="btn p-0 border-0 bg-transparent">
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61C20.33 4.1 19.72 3.69 19.06 3.42C18.39 3.14 17.67 3 16.95 3C16.23 3 15.51 3.14 14.84 3.42C14.18 3.69 13.57 4.1 13.06 4.61L12 5.67L10.94 4.61C9.91 3.58 8.51 3 7.05 3C5.59 3 4.19 3.58 3.16 4.61C2.13 5.64 1.55 7.04 1.55 8.5C1.55 9.96 2.13 11.36 3.16 12.39L12 21.23L20.84 12.39C21.35 11.88 21.76 11.27 22.03 10.61C22.31 9.94 22.45 9.22 22.45 8.5C22.45 7.78 22.31 7.06 22.03 6.39C21.76 5.73 21.35 5.12 20.84 4.61Z" />
                    </svg>
                  </button>
                </div>
                {/* Product Image */}
                {images.map((imgObj) => (
                  <img
                    key={imgObj.id}
                    src={imgObj.image}
                    alt={title}
                    style={{
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ))}
                {/* Title */}
                <h6
                  className="fw-semibold text-dark mb-2"
                  style={{ fontSize: "0.9rem", minHeight: "38px" }}
                >
                  {title}
                </h6>
                {/* Price */}
                <div className="text-dark fw-bold mb-2">{price} EGP</div>
                {/* Add to Cart */}
                <button
                  className="btn btn-success w-100"
                  style={{
                    fontSize: "0.9rem",
                    borderRadius: "8px",
                    backgroundColor: "var(--light-green)",
                    border: "none",
                  }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </>
  );
}
