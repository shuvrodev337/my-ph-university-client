import { ReactNode } from "react";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import CreateAdmin from "../pages/Admin/CreateAdmin";
import CreateFaculty from "../pages/Admin/CreateFaculty";
import CreateStudent from "../pages/Admin/CreateStudent";
import { NavLink } from "react-router-dom";
type TRoute = {
  path: string;
  element: ReactNode;
};
type TSideBarItem = {
  key: string;
  label: ReactNode;
  children?: TSideBarItem[];
};

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "User management",
    path: "user-management",
    children: [
      {
        name: "Create admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create student",
        path: "create-student",
        element: <CreateStudent />,
      },
    ],
  },
];

//Programatic way
export const adminRoutes = adminPaths.reduce((acc: TRoute[], item) => {
  if (item.path && item.element) {
    acc.push({
      path: item.path,
      element: item.element,
    });
  }
  if (item.children) {
    item.children.forEach((child) => {
      acc.push({
        path: child.path,
        element: child.element,
      });
    });
  }
  return acc;
}, []);
export const adminSidebarItems = adminPaths.reduce(
  (acc: TSideBarItem[], item) => {
    if (item.name && item.path && !item.children) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
      });
    }
    if (item.name && item.path && item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => ({
          key: child.name,
          label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
        })),
      });
    }
    console.log(acc);
    return acc;
  },
  []
);

/**
 * Here we are converting adminPaths to adminRoutes and adminSidebarItems
 * so that we can serve both purpose with the One array.
 * 1.in routes(adminRoutes)
 * 2.in the sidebar(adminSidebarItems)
 *
 * adminPaths is the 1 array , we are converting it to make it work in both places.
 * we are using array REDUCE method to make it structured like 2 hard coded versions given below.
 *  two versions are for two places.
 *
 */
// Hard coded admin routes
/**
 export const adminRoutes = [
  {
    index: true,
    element: <AdminDashboard />,
  },
  {
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "create-admin",
    element: <CreateAdmin />,
  },
  {
    path: "create-faculty",
    element: <CreateFaculty />,
  },
  {
    path: "create-student",
    element: <CreateStudent />,
  },
];
 */
// hard coded admin sidebar items
/**
 const items: MenuProps["items"] = [
  {
    key: "Dashboard",
    label: <NavLink to="/admin/dashboard">Dashboard</NavLink>,
  },

  {
    key: "User Management",
    label: "User Management",
    children: [
      {
        key: "Create Admin",
        label: <NavLink to="/admin/create-admin">Create Admin</NavLink>,
      },
      {
        key: "Create Faculty",
        label: <NavLink to="/admin/create-faculty">Create Faculty</NavLink>,
      },
      {
        key: "Create Student",
        label: <NavLink to="/admin/create-student">Create Student</NavLink>,
      },
    ],
  },
];
 */
