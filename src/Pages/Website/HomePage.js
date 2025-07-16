import ChangeTitle from "../../Components/ChangeTitle";
import Advertsments from "../../Components/website/Advertsments";
import NavHome from "../../Components/website/NavHome";
import medications from "../../assets/categories/medications.webp";
import hairCare from "../../assets/categories/hair care.webp";
import skinCare from "../../assets/categories/skin care.webp";
import dailyEssentials from "../../assets/categories/daily essentials.webp";
import momBaby from "../../assets/categories/mom&baby.webp";
import makeup from "../../assets/categories/makeup&accessories.webp";
import healthCare from "../../assets/categories/health care devices.webp";
import vitamins from "../../assets/categories/vitamins&supplements.webp";
import sexualWellness from "../../assets/categories/sexual wellness.webp";
import offer from "../../assets/offer.webp"
import ProductCarousel from "../../Components/website/ProductCarousel";
import Footer from "../../Components/website/Footer";

export default function HomePage() {
  ChangeTitle("Chefaa | order all your needs from the pharmacy online");

  return (
    <>
      <NavHome />
      <Advertsments />
      <div className="categories-list container my-4">
        <h1 className="mb-4">Categories</h1>
        <div className="category-icon row g-3">
          {[
            { img: medications, label: "Medications" },
            { img: hairCare, label: "Hair Care" },
            { img: skinCare, label: "Skin Care" },
            { img: dailyEssentials, label: "Daily Essentials" },
            { img: momBaby, label: "Mom & Baby" },
            { img: makeup, label: "Makeup & Accessories" },
            { img: healthCare, label: "Health Care Devices" },
            { img: vitamins, label: "Vitamins & Supplements" },
            { img: sexualWellness, label: "Sexual Wellness" },
          ].map((category, index) => (
            <div
              key={index}
              className="col-6 col-sm-4 col-md-3 col-lg-2 text-center"
            >
              <div className="category-box p-2 rounded">
                <img
                  src={category.img}
                  alt={category.label}
                  className="img-fluid mb-2"
                  style={{ maxHeight: "100px" }}
                />
                <div className="category-label fw-bold">{category.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="offer-section container my-4">
        <img src={offer} alt="offer" className="img-fluid w-100" />
      </div>
      {/* <ProductSite/> */}
      <ProductCarousel/>
      <Footer/>
    </>
  );
}
