import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import { routesGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import FacultyDashboard from "../pages/Faculty/FacultyDashboard";
import { facultyPaths } from "./faculty.routes";
import { studentPaths } from "./student.routes";
import StudentDashboard from "../pages/Student/StudentDashboard";

const adminRoutes = routesGenerator(adminPaths);
const facultyRoutes = routesGenerator(facultyPaths);
const studentRoutes = routesGenerator(studentPaths);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, //  means there is no children in  root route , that's why "/" route is empty
  },
  {
    path: "/admin",
    element: <App />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      ...adminRoutes,
    ],
  },
  {
    path: "/faculty",
    element: <App />,
    children: [
      {
        index: true,
        element: <FacultyDashboard />,
      },
      ...facultyRoutes,
    ],
  },
  {
    path: "/student",
    element: <App />,
    children: [
      {
        index: true,
        element: <StudentDashboard />,
      },
      ...studentRoutes,
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
export default router;
