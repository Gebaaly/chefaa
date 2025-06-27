import {
  FaTachometerAlt,
  FaUsers,
  FaUserPlus,
  FaBox,
  FaFolderPlus,
  FaShoppingCart,
  FaPlusSquare,
} from "react-icons/fa";

export const links = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <FaTachometerAlt />,
    role: ["1995"],
  },
  {
    name: "Add User",
    path: "/dashboard/add-user",
    icon: <FaUserPlus />,
    role: ["1995"],
  },
  {
    name: "Users",
    path: "/dashboard/users",
    icon: <FaUsers />,
    role: ["1995"],
  },

  {
    name: "Add Categories",
    path: "/dashboard/add-categories",
    icon: <FaFolderPlus />,
    role: ["1995", "1999"],
  },
  {
    name: "Categories",
    path: "/dashboard/categories",
    icon: <FaBox />,
    role: ["1995", "1999"],
  },
  {
    name: "Add Products",
    path: "/dashboard/add-products",
    icon: <FaPlusSquare />,
    role: ["1995", "1999"],
  },
  {
    name: "Products",
    path: "/dashboard/products",
    icon: <FaShoppingCart />,
    role: ["1995", "1999"],
  },
 
];
