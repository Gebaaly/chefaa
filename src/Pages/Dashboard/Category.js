import { useEffect, useState } from "react";
import { Axios } from "../../API/Axios";
import { cat } from "../../API/Api";
import Loadingpage from "../../Components/website/Loadingpage";
import { useParams } from "react-router";

export default function Category() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  // 'loading' is used to indicate if the form submission is in progress
  // This is useful for showing a loading spinner or disabling the submit button
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    Axios.get(`${cat}/${id}`)
      .then((data) => {
        setTitle(data.data.title);
        setImage(data.data.image);
      })
      .then(() => setLoading(false));
  }, []);

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    try {
      const res = await Axios.post(`${cat}/edit/${id}`, formData);
      window.location.assign("/dashboard/categories");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="border p-3 rounded"
        style={{ width: "50%", margin: "auto" }}
      >
        {loading && <Loadingpage />}
        <h2 className="text-center fs-2" style={{ color: "#404040" }}>
          Welcome To chefaa
        </h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Title
          </label>
          <input
            type="title"
            className="form-control"
            id="title"
            name="title"
            placeholder="Enter Categoy Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Category Image
          </label>
          <input
            type="file"
            className="form-control"
            id="imageCat"
            name="imageCat"
            required
            onChange={(e) => setImage(e.target.files.item(0))}
          />
        </div>

        <div className="sign-up d-flex justify-content-center flex-column">
          <button
            disabled={title.length > 1 ? false : true}
            type="submit"
            className="btn btn-primary border-0 "
            style={{ background: "var(--dashBtn)", width: "100%" }}
          >
            Edit Category
          </button>
        </div>
      </form>
    </>
  );
}
