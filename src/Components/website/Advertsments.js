import "../../CSS/components/home.css";
import ad1 from "../../assets/ADS/ad1.webp";
import ad2 from "../../assets/ADS/ad2.webp";
import ad3 from "../../assets/ADS/ad3.webp";
import ad4 from "../../assets/ADS/ad4.webp";
import ad5 from "../../assets/ADS/ad5.webp";
import ad6 from "../../assets/ADS/ad6.webp";
import ad7 from "../../assets/ADS/ad7.webp";
import ad8 from "../../assets/ADS/ad8.webp";
import getApp from "../../assets/ADS/getapp.webp";
import durex from "../../assets/ADS/durex.webp";
import delivery from "../../assets/icons/instant-delivery-icon.svg";
export default function Advertsments() {
  const images = [ad1, ad2, ad3, ad4, ad5, ad6, ad7, ad8];

  return (
    <>
      <div className="container ">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <div
              id="carouselExample"
              className="carousel slide position-relative"
              data-bs-ride="carousel"
            >
              {/* Indicators */}
              <div className="carousel-indicators custom-indicators">
                {images.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide-to={index}
                    className={index === 0 ? "active" : ""}
                    aria-current={index === 0 ? "true" : undefined}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Slides */}
              <div className="carousel-inner">
                {images.map((src, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <img
                      src={src}
                      className="d-block w-100 img-fluid carousel-img"
                      alt={`Slide ${index}`}
                    />
                  </div>
                ))}
              </div>

              {/* Arrows */}
              <button
                className="carousel-control-prev custom-arrow"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next custom-arrow"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className=" col-md-4 col-12  ">
            <img className="card-image my-1" src={getApp} alt="bg1" />

            <img className="card-image my-1" src={durex} alt="bg1" />
          </div>
        </div>
      </div>

      <div className="noticed-message container pt-1 pb-1 mt-2 d-flex justify-content-center align-items-center">
        <p className="text-center ">
          All medicines are dispensed from licensed pharmacies and with a
          prescription from a specialized doctor
        </p>
      </div>

      <div
        className=" delivery-section container d-flex justify-content-center align-items-center flex-row my-3"
        style={{ height: "40px" }}
      >
        <img src={delivery} alt="delivery" className="img-fluid mt-2" />
        <span className="delivery-now text-light fw-bold fs-6 me-1">
          Now Delivery
        </span>
        <span className="delivery-time d-flex justify-content-center align-items-center fw-bold fs-6 p-1 ms-1 ">
          30-60 Mins
        </span>
      </div>
    </>
  );
}
