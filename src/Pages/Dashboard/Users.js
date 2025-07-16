import axios from "axios";
import { baseURL, USER, USERS } from "../../API/Api";
import { useEffect, useState } from "react";
import Cookie from "cookie-universal";
import { Axios } from "../../API/Axios";
import TableShow from "../../Components/Dashboard/Table";
import PaginatedItems from "../../Components/Dashboard/paginate/Pagination";

export default function Users() {
  const cookie = Cookie();

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  async function handleDelete(id) {
    try {
      await Axios.delete(`${USER}/${id}`);
      setDeleteUser((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    axios
      .get(`${baseURL}/${USERS}?limit=${limit}&page=${page}`, {
        headers: {
          Authorization: `Bearer ${cookie.get("chefaa")}`,
        },
      })
      .then((res) => {
        setUsers(res.data.data);
        setTotalItems(res.data.total);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [limit,page, deleteUser]);

  useEffect(() => {
    Axios.get(`${USER}`)
      .then((res) => {
        setLoading(false);
        setCurrentUser(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);
  const headers = [
    {
      key: "name",
      name: "Username",
    },
    {
      key: "email",
      name: "Email",
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
      key: "role",
      name: "Role",
    },
  ];

  return (
    <div className="bg-white p-3 rounded shadow-sm border-box w-100">
      <h1>Users Page</h1>
      <TableShow
        limit={limit}
        page={page}
        headers={headers}
        data={users}
        delete={handleDelete}
        currentUser={currentUser}
        loading={loading}
        search="name"
        searchedType={USER}
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
