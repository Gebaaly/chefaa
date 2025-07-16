import { useEffect, useState } from "react";
import TableShow from "../../Components/Dashboard/Table";
import { Axios } from "../../API/Axios";
import { cat, CAT } from "../../API/Api";
import PaginatedItems from "../../Components/Dashboard/paginate/Pagination";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [deleteCategory, setDeleteCategory] = useState(false);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");

  async function handleDelete(id) {
    try {
      await Axios.delete(`${cat}/${id}`);
      setDeleteCategory((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    Axios.get(`${CAT}?limit=${limit}&page=${page}`)
      .then((res) => {
        setLoading(false);
        setCategories(res.data.data);

        console.log(res.data);
        setTotalItems(res.data.total);
        console.log(categories.length);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [limit, page, deleteCategory]);

  const headers = [
    {
      key: "title",
      name: "Title",
    },
    {
      key: "image",
      name: "Image",
    },
    { key: "created_at", name: "Created" },
    { key: "updated_at", name: "Updated" },
  ];

  return (
    <>
      <TableShow
        limit={limit}
        page={page}
        headers={headers}
        data={categories}
        delete={handleDelete}
        loading={loading}
        search="title"
        searchedType={cat}
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
    </>
  );
}
