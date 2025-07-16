import { useEffect, useRef, useState } from "react";
import { Axios } from "../../API/Axios";
import { CAT, pro } from "../../API/Api";
import Loadingpage from "../../Components/website/Loadingpage";
import { useParams } from "react-router-dom";

export default function AddProduct() {
  // Product form state
  const [form, setForm] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
    stock: "",
  });

  // Images state for uploaded images
  const [images, setImages] = useState([]);
  // images state for images from server
  const [imagesFromServer, setImagesFromServer] = useState([]);
  // Categories state for select options
  const [categories, setCategories] = useState([]);
  // Loading state for page and requests
  const [loading, setLoading] = useState(false);
  // Progress state for image upload progress bar
  const [progress, setProgress] = useState(0);
  // Sent state to check if product is created
  // Product id after creation
  //   const [id, setId] = useState();

  // Ref for focusing the first input
  const focus = useRef();

  const { id } = useParams();

  // Focus on category select when component mounts
  useEffect(() => {
    focus.current.focus();
  }, []);

  //   get form data

  useEffect(() => {
    Axios.get(`${pro}/${id}`).then((data) => {
      console.log(data.data);
      setForm({
        category: data.data[0].category,
        title: data.data[0].title,
        description: data.data[0].description,
        price: data.data[0].price,
        discount: data.data[0].discount,
        About: data.data[0].About,
        stock: data.data[0].stock,
      });
      setImagesFromServer(data.data[0].images);
    });
  }, [id]);

  // Handle image upload and save image info with id from server
  async function handleImagesChange(e) {
    const newFiles = Array.from(e.target.files);

    for (let i = 0; i < newFiles.length; i++) {
      const data = new FormData();
      data.append("image", newFiles[i]);
      data.append("product_id", id);

      try {
        const res = await Axios.post("/product-img/add", data, {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percent = Math.floor((loaded * 100) / total);
            setProgress(percent);
          },
        });

        // Store uploaded image info with id from server
        const uploadedImage = {
          name: newFiles[i].name,
          size: newFiles[i].size,
          id: res.data.id,
          url: URL.createObjectURL(newFiles[i]),
        };

        setImages((prev) => [...prev, uploadedImage]);
      } catch (err) {
        console.log(err);
      }
    }
  }

  // Delete image from UI and server by id
  async function handleDeleteImage(img) {
    setImages((prev) => prev.filter((image) => image.id !== img.id));

    try {
      await Axios.delete(`/product-img/${img.id}`);
    } catch (err) {
      console.log("Error deleting image from server:", err);
    }
  }
  async function handleDeleteImageFromServer(id) {
    setImagesFromServer((prev) =>
      prev.filter((img) => img.id !== id)
    );

    try {
      await Axios.delete(`/product-img/${id}`);
    } catch (err) {
      console.log("Error deleting image from server:", err);
    }
  }
  
  // Handle form input changes and create product if not sent
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Render category options for select input
  const categoriesShow = categories.map((item, key) => (
    <option key={key} value={item.id}>
      {item.title}
    </option>
  ));

  // Render uploaded images with delete button and progress
  const imagesShow = images.map((img) => (
    <div key={img.id} className="d-flex flex-column border mb-2">
      <div className="d-flex justify-content-end pt-2 pr-2">
        <button
          className="btn btn-danger me-2"
          onClick={() => handleDeleteImage(img)}
        >
          Delete
        </button>
      </div>
      <div className="d-flex gap-2 align-items-center ms-2 me-2 pb-1">
        <img src={img.url} width={90} alt={img.name} />
        <div style={{ width: "100%" }}>
          <p className="mb-1">{img.name}</p>
          <p>
            {img.size / 1024 < 800
              ? (img.size / 1024).toFixed(2) + "KB"
              : (img.size / 1024 / 1024).toFixed(2) + "MB"}
          </p>
          <div className="progress modern-progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="progress-text d-flex justify-content-between">
            <p className="ml-1">Upload Progress</p>
            <p className="mr-1">{progress}%</p>
          </div>
        </div>
      </div>
    </div>
  ));
  const imagesFromServerShow = imagesFromServer.map((img) => (
    <div
      key={img.id}
      className="d-flex justify-content-between align-items-center border mb-2"
    >
      <div className="d-flex  align-items-center ms-2 me-2 pb-1">
        <img src={img.image} width={90} alt={img.name} />
        
      </div>
      <div className="d-flex justify-content-end pt-2 pr-2">
        <button
          className="btn btn-danger me-2"
          onClick={() => handleDeleteImageFromServer(img.id)}
        >
          Delete
        </button>
      </div>
    </div>
  ));

  // Fetch categories on mount
  useEffect(() => {
    Axios.get(`${CAT}`)
      .then((res) => {
        setLoading(false);
        setCategories(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  // Handle product edit and submit updated data
  async function handleEdit(e) {
    setLoading(true);
    e.preventDefault();

    try {
      await Axios.post(`${pro}/edit/${id}`, form);
      setLoading(false);
      window.location.assign("/dashboard/products");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  // Render the add product form
  return (
    <>
      <form
        onSubmit={handleEdit}
        className="border p-3 rounded"
        style={{ width: "80%", margin: "auto" }}
      >
        {loading && <Loadingpage />}

        <h2 className="text-center fs-2" style={{ color: "#404040" }}>
          Edit Product
        </h2>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-select"
            id="category"
            name="category"
            required
            value={form.category}
            ref={focus}
            onChange={handleChange}
          >
            <option disabled value="">
              Select Category
            </option>
            {categoriesShow}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Enter Product Title"
            required
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Enter Product Description"
            required
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="text"
            className="form-control"
            id="price"
            name="price"
            placeholder="Enter Product Price"
            required
            value={form.price}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="discount" className="form-label">
            Discount
          </label>
          <input
            type="text"
            className="form-control"
            id="discount"
            name="discount"
            placeholder="Enter Product discount"
            required
            value={form.discount}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="About" className="form-label">
            About
          </label>
          <input
            type="text"
            className="form-control"
            id="About"
            name="About"
            placeholder="Enter Product Information"
            required
            value={form.About}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Stock" className="form-label">
            Stock
          </label>
          <input
            type="text"
            className="form-control"
            id="Stock"
            name="stock"
            placeholder="Enter Product Stock"
            required
            value={form.stock}
            onChange={handleChange}
          />
        </div>
            
        

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Product Images
          </label>
          <input
            type="file"
            className="form-control"
            id="imagePro"
            name="imagePro"
            multiple
            onChange={handleImagesChange}
          />
        </div>

        <div>{imagesFromServerShow}</div>
        <div>{imagesShow}</div>

        <div className="sign-up d-flex justify-content-center flex-column">
          <button
            type="submit"
            className="btn btn-primary border-0 mt-3"
            style={{ background: "var(--dashBtn)", width: "100%" }}
          >
            Update Product
          </button>
        </div>
      </form>
    </>
  );
}
