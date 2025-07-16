import { useEffect, useState } from "react";
import TableShow from "../../Components/Dashboard/Table";
import { Axios } from "../../API/Axios";
import { CAT, PRO, pro } from "../../API/Api";
import PaginatedItems from "../../Components/Dashboard/paginate/Pagination";

export default function Products() {
  const [Products, setProducts] = useState([]);
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    Axios.get(`${CAT}`)
      .then((res) => {
        setCategoriesList(res.data.data || res.data); 
      })
      .catch((err) => {
        console.log("Error fetching categories:", err);
      });
  }, []);

  async function handleDelete(id) {
    try {
      await Axios.delete(`${pro}/${id}`);
      setDeleteProduct((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    Axios.get(`${PRO}?limit=${limit}&page=${page}`)
      .then((res) => {
        setLoading(false);
        setProducts(res.data.data);
        console.log(res.data);
        setTotalItems(res.data.total);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [limit,page,deleteProduct]);

  const headers = [
    {
      key: "title",
      name: "Title",
    },

    {
      key: "price",
      name: "Price",
    },
    {
      key: "category",
      name: "Category",
    },
    {
      key: "stock",
      name: "Stock",
    },
    {
      key: "created_at",
      name: "Created At",
    },
    {
      key: "updated_at",
      name: "Updated At",
    },
    {
      key: "images",
      name: "Images",
    },
  ];

  return (
    <div className="bg-white p-3 rounded shadow-sm border-box w-100">
      <h1>Products Page</h1>
      <TableShow
        limit={limit}
        page={page}
        headers={headers}
        data={Products}
        delete={handleDelete}
        loading={loading}
        search="title"
        searchedType={pro}
        categoriesList={categoriesList}
      />
      <PaginatedItems
        currentPage={page}
        totalItems={totalItems}
        itemsPerPage={limit}
        onPageChange={setPage}
        limit={limit}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
      />
    </div>
  );
}
