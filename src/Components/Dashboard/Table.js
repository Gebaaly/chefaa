import { useEffect, useState } from "react";
import { Form, Link } from "react-router-dom";
import { Axios } from "../../API/Axios";
import TransformDate from "../../context/helpers/TransformDate";

export default function TableShow(props) {
  // State for search term
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const finalData = searchTerm ? searchedData : props.data;
  async function getSearchedData() {
    try {
      const ress = await Axios.post(
        `${props.searchedType}/search?title=${searchTerm}`
      );
      setSearchedData(ress.data);
      console.log(ress.data);
      console.log(ress);
    } catch (err) {
      console.log(err);
    }
  }
  // Effect to handle search input changes with debounce
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchTerm) {
        // If search term is not empty, fetch searched data
        setSearchLoading(true);
        getSearchedData().finally(() => setSearchLoading(false));
      } else {
        // If search term is empty, reset searched data and loading state
        setSearchedData([]);
        setSearchLoading(false);
      }
    }, 800);
    // Cleanup function to clear the timeout
    return () => clearTimeout(debounce);
  }, [searchTerm]);
  TransformDate("2025-06-24T14:09:55.000000Z");

  // Check if data and headers are valid before rendering
  if (!props.data || !Array.isArray(props.data) || !props.headers) {
    return <p>Loading or invalid data...</p>;
  }

  // Get current user info from props
  const currentUser = props.currentUser || { name: "" };

  // Render table headers
  const headerShow = props.headers.map((item, key1) => (
    <th key={key1}>{item.name}</th>
  ));

  // Render table rows with data and actions
  const dataShow = finalData.map((item) => (
    <tr key={item.id} className="text-center align-middle">
      <td className="text-center">{item.id}</td>
      {props.headers.map((item2) => (
        <td key={`${item.id}-${item2.key}`}>
          {item2.key === "images" ? (
            item[item2.key]?.length > 0 ? (
              <div className="d-flex justify-content-center gap-2 flex-wrap">
                {item[item2.key].map((imgObj, i) => (
                  <img
                    key={i}
                    src={imgObj.image}
                    alt={`img-${i}`}
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                ))}
              </div>
            ) : (
              "No Images"
            )
          ) : item2.key === "created_at" || item2.key === "updated_at" ? (
            TransformDate(item[item2.key])
          ) : item[item2.key] === "1995" ? (
            "Admin"
          ) : item[item2.key] === "2001" ? (
            "User"
          ) : item[item2.key] === "1999" ? (
            "Product Manager"
          ) : item[item2.key] === "1991" ? (
            "Writer"
          ) : item2.key === "image" ? (
            <img
              src={item[item2.key]}
              alt="img"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          ) : item2.key === "category" ? (
            props.categoriesList?.find((cat) => cat.id === item.category)
              ?.title || "—"
          ) : (
            item[item2.key]
          )}

          {/* Show "(You)" next to the current user's name */}
          {currentUser && item[item2.key] === currentUser.name && " (You)"}
        </td>
      ))}
      <td className="d-flex justify-content-center align-items-center">
        {/* Show delete button only for users other than the current user */}
        {currentUser && item.id !== currentUser.id && (
          <button
            className="btn btn-danger me-2"
            onClick={() => props.delete(item.id)}
          >
            Delete
          </button>
        )}
        {/* Edit button for each row */}
        <Link to={`${item.id}`}>
          <button className="btn btn-primary ms-2">Edit</button>
        </Link>
      </td>
    </tr>
  ));

  // Render the table with headers and data rows
  return (
    <>
      <div className="bg-white p-3 rounded shadow-sm border-box w-100">
        <form className="d-flex justify-content-between align-items-center">
          <input
            type="text"
            className="form-control mx-3"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>
      <table className="table table-striped" style={{ width: "100%" }}>
        <thead style={{ backgroundColor: "#f5f5f5" }}>
          <tr className="text-center">
            <th className="text-center">id</th>
            {headerShow}
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Show data rows if not loading */}
          {!props.loading && dataShow}
          <tr>
            {/* Show loading or no data message */}
            {props.loading ? (
              <td colSpan={12} className="text-center">
                Loading...
              </td>
            ) : searchLoading ? (
              <td colSpan={12} className="text-center">
                Searching...
              </td>
            ) : (
              props.data.length === 0 && (
                <td colSpan={12} className="text-center">
                  No Data Found
                </td>
              )
            )}
          </tr>
        </tbody>
      </table>
    </>
  );
}
