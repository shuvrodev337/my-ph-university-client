import CreateCourse from "../pages/Faulty/CreateCourse";
import FacultyDashboard from "../pages/Faulty/FacultyDashboard";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard />,
  },
  {
    name: "Create course",
    path: "create-course",
    element: <CreateCourse />,
  },
];
